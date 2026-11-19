import { useEffect, useMemo, useState } from "react"
import { ArrowRight, BadgeCheck, Boxes, ChevronDown, Loader2, Search, ShieldCheck, Sparkles, Truck, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/Header"
import { ProductList } from "@/components/ProductList"
import { CategoryFilter } from "@/components/CategoryFilter"
import { obtenerCategorias, obtenerProductos } from "@/services/catalogo"
import type { Categoria, Producto } from "@/types/catalogo"

export function CatalogoPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [categoriaActiva, setCategoriaActiva] = useState<number | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [orden, setOrden] = useState("destacados")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [reintento, setReintento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    async function cargarCatalogo() {
      setCargando(true)
      setError("")
      try {
        const [categoriasAPI, productosAPI] = await Promise.all([
          obtenerCategorias(controller.signal), obtenerProductos(controller.signal)
        ])
        if (!controller.signal.aborted) {
          setCategorias(categoriasAPI)
          setProductos(productosAPI)
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "No se pudo conectar al servidor")
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }
    void cargarCatalogo()
    return () => controller.abort()
  }, [reintento])

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es-PE")
    const encontrados = productos.filter(p =>
      (categoriaActiva === null || p.categoria === categoriaActiva) &&
      (p.nombre.toLocaleLowerCase("es-PE").includes(texto) || p.descripcion.toLocaleLowerCase("es-PE").includes(texto))
    )
    if (orden === "precio-asc") encontrados.sort((a, b) => Number(a.precio) - Number(b.precio))
    if (orden === "precio-desc") encontrados.sort((a, b) => Number(b.precio) - Number(a.precio))
    if (orden === "nombre") encontrados.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
    return encontrados
  }, [productos, categoriaActiva, busqueda, orden])

  return (
    <div id="inicio" className="min-h-screen bg-white text-zinc-950">
      <Header/>
      <main>
        <section className="relative overflow-hidden bg-[#101017] text-white">
          <div className="pointer-events-none absolute -right-40 -top-44 size-[600px] rounded-full bg-violet-600/25 blur-[120px]"/>
          <div className="pointer-events-none absolute -bottom-48 left-1/4 size-[500px] rounded-full bg-fuchsia-500/10 blur-[110px]"/>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-17 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-25">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold tracking-wider text-violet-200"><Sparkles className="size-3.5"/> TU TECNOLOGÍA, TU ESTILO</span>
              <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.05] tracking-[-0.07em] sm:text-6xl lg:text-7xl">Eleva tu mundo <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-300 bg-clip-text text-transparent">digital.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-300">Explora accesorios innovadores y productos esenciales para llevar tus ideas al siguiente nivel. Diseño, rendimiento y estilo en un solo lugar.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" className="rounded-full bg-violet-500 px-7 text-white hover:bg-violet-600" onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}>Ver catálogo <ArrowRight className="ml-1 size-4"/></Button>
                <span className="flex items-center gap-2 text-sm text-zinc-400"><BadgeCheck className="size-4 text-emerald-400"/> Catálogo actualizado</span>
              </div>
              <div className="mt-12 flex gap-10 border-t border-white/10 pt-7">
                <div><p className="text-2xl font-black">{productos.length || "12"}+</p><p className="text-xs text-zinc-400">Productos</p></div>
                <div><p className="text-2xl font-black">{categorias.length || "4"}</p><p className="text-xs text-zinc-400">Categorías</p></div>
                <div><p className="text-2xl font-black">100%</p><p className="text-xs text-zinc-400">Digital</p></div>
              </div>
            </div>
            <div className="relative flex min-h-85 items-center justify-center lg:min-h-105" aria-hidden="true">
              <div className="absolute size-82 rounded-full border border-violet-300/15 sm:size-100"/>
              <div className="absolute size-65 rounded-full border border-violet-300/20 sm:size-82"/>
              <div className="absolute size-48 rounded-full bg-violet-600/15 blur-3xl"/>
              <div className="relative rotate-[-12deg] rounded-[42px] border border-violet-300/30 bg-white/10 p-5 shadow-[0_0_90px_rgba(125,65,220,0.15)] backdrop-blur-md">
                <img src="/images/audifonos-pro.svg" className="size-60 drop-shadow-2xl sm:size-79" alt=""/>
              </div>
              <span className="absolute bottom-7 left-1 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur-lg sm:left-5">✦ Diseño premium</span>
              <span className="absolute right-0 top-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur-lg sm:right-8">⚡ Tecnología actual</span>
            </div>
          </div>
        </section>

        <section id="beneficios" className="border-b border-zinc-100 bg-zinc-50">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 lg:px-8">
            {[
              { icon: Truck, title: "Compra informada", caption: "Productos con precios y stock visibles" },
              { icon: ShieldCheck, title: "Catálogo organizado", caption: "Información clara por categoría" },
              { icon: Boxes, title: "Gestión en tiempo real", caption: "Datos publicados desde Django REST" }
            ].map(({icon: Icon, title, caption}) => <div key={title} className="flex items-center gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700"><Icon className="size-5"/></span><div><p className="text-sm font-bold">{title}</p><p className="text-xs text-zinc-500">{caption}</p></div></div>)}
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-25 px-5 py-16 lg:px-8 lg:py-22">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Nuestra selección</p><h2 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">Explora el catálogo<span className="text-violet-600">.</span></h2><p className="mt-3 text-sm text-zinc-500">Encuentra la tecnología ideal para ti.</p></div>
            <div className="flex items-center gap-2 text-sm text-zinc-500"><span className="size-2 rounded-full bg-emerald-500"/> Datos desde Django REST API</div>
          </div>
          <div className="mb-7 flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-zinc-50/70 p-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400"/><Input aria-label="Buscar productos" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar auriculares, teclados, mouse..." className="h-11 rounded-2xl border-zinc-200 bg-white pl-11"/></div>
              <div className="relative md:w-58"><select aria-label="Ordenar productos" value={orden} onChange={(e) => setOrden(e.target.value)} className="h-11 w-full appearance-none rounded-2xl border border-zinc-200 bg-white px-4 pr-10 text-sm font-medium text-zinc-700"><option value="destacados">Destacados</option><option value="precio-asc">Precio: menor a mayor</option><option value="precio-desc">Precio: mayor a menor</option><option value="nombre">Nombre: A a Z</option></select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400"/></div>
            </div>
            <CategoryFilter categorias={categorias} activa={categoriaActiva} alCambiar={setCategoriaActiva}/>
          </div>
          <div className="mb-5 flex items-center justify-between"><p className="text-sm text-zinc-500"><strong className="text-zinc-900">{visibles.length}</strong> productos encontrados</p><p className="hidden text-xs text-zinc-400 sm:block">Stock y precios en soles (PEN)</p></div>
          {cargando ? <div role="status" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({length:6}).map((_,i)=><div key={i} className="space-y-3 rounded-3xl border border-zinc-200 p-4"><Skeleton className="aspect-[1.12] w-full rounded-2xl"/><Skeleton className="h-5 w-3/4"/><Skeleton className="h-4 w-full"/><Skeleton className="h-8 w-1/3"/></div>)}</div>
            : error ? <div role="alert" className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center"><WifiOff className="mx-auto mb-4 size-10 text-rose-600"/><h3 className="text-lg font-bold text-rose-900">No pudimos cargar el catálogo</h3><p className="mt-2 text-sm text-rose-700">{error}. Verifica que Django esté iniciado en el puerto 8000.</p><Button className="mt-5" onClick={()=>setReintento(n=>n+1)}><Loader2 className="mr-2 size-4"/> Reintentar conexión</Button></div>
            : <ProductList productos={visibles}/>
          }
        </section>
      </main>
      <footer className="bg-zinc-950 py-11 text-zinc-300"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8"><div><span className="text-xl font-black tracking-[-0.06em] text-white">NOVA<span className="text-violet-400">.</span>TECH</span><p className="mt-2 max-w-sm text-xs text-zinc-400">Laboratorio 13 · Desarrollo de Aplicaciones Empresariales · TECSUP</p></div><p className="text-xs text-zinc-400">Catálogo demostrativo académico · React + Django REST Framework</p></div></footer>
    </div>
  )
}
