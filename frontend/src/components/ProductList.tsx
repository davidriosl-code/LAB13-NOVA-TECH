import { PackageSearch } from "lucide-react"
import { ProductCard } from "@/components/ProductCard"
import type { Producto } from "@/types/catalogo"

export function ProductList({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-18 text-center">
        <PackageSearch className="mx-auto mb-4 size-10 text-zinc-400"/>
        <h3 className="font-semibold text-zinc-900">No encontramos productos</h3>
        <p className="mt-1 text-sm text-zinc-500">Prueba otra categoría o término de búsqueda.</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {productos.map((producto) => <ProductCard key={producto.id} producto={producto}/>) }
    </div>
  )
}
