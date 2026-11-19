import { ArrowUpRight, Headphones, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" className="group flex items-center gap-3" aria-label="NOVA TECH, inicio">
          <span className="flex size-10 items-center justify-center rounded-xl bg-zinc-950 text-white transition-transform group-hover:rotate-6">
            <ShoppingBag className="size-5" strokeWidth={2.2}/>
          </span>
          <span className="text-xl font-black tracking-[-0.07em] text-zinc-950">NOVA<span className="text-violet-600">.</span>TECH</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex" aria-label="Navegación principal">
          <a href="#inicio" className="hover:text-violet-600">Inicio</a>
          <a href="#catalogo" className="hover:text-violet-600">Productos</a>
          <a href="#beneficios" className="hover:text-violet-600">Nosotros</a>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-xs font-semibold text-zinc-500 sm:flex"><Headphones className="size-4 text-violet-600"/> Atención en Arequipa</span>
          <Button className="rounded-full bg-zinc-950 px-5 hover:bg-violet-700" onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}>Explorar <ArrowUpRight className="ml-1 size-4"/></Button>
        </div>
      </div>
    </header>
  )
}
