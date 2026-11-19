import { ArrowUpRight, PackageCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Producto } from "@/types/catalogo"

const moneda = (precio: string) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(precio))

interface Props { producto: Producto }
export function ProductCard({ producto }: Props) {
  const disponible = producto.cantidad_disponible > 0
  return (
    <Card className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white p-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-zinc-900/5">
      <div className="relative flex aspect-[1.12] items-center justify-center overflow-hidden bg-[#f3f3f8]">
        <img src={producto.imagen_url} alt={producto.nombre} loading="lazy" className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
        <Badge className="absolute left-4 top-4 rounded-full border-none bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm">{producto.categoria_nombre}</Badge>
        <span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm"><ArrowUpRight className="size-4"/></span>
      </div>
      <CardContent className="px-5 pb-5 pt-4">
        <p className="mb-2 line-clamp-1 text-[11px] font-bold uppercase tracking-[0.16em] text-violet-600">{producto.categoria_nombre}</p>
        <h3 className="min-h-12 text-lg font-bold leading-tight tracking-tight text-zinc-950">{producto.nombre}</h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500">{producto.descripcion}</p>
        <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4">
          <strong className="text-[22px] font-extrabold tracking-tighter text-zinc-950">{moneda(producto.precio)}</strong>
          <span className={`flex items-center gap-1.5 text-xs font-medium ${disponible ? "text-emerald-700" : "text-rose-600"}`}>
            <PackageCheck className="size-3.5"/> {disponible ? `${producto.cantidad_disponible} en stock` : "Agotado"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
