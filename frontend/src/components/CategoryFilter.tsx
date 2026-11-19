import type { Categoria } from "@/types/catalogo"

type Props = {
  categorias: Categoria[]
  activa: number | null
  alCambiar: (categoria: number | null) => void
}
export function CategoryFilter({ categorias, activa, alCambiar }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      <button type="button" aria-pressed={activa === null} onClick={() => alCambiar(null)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${activa === null ? "bg-violet-600 text-white" : "border border-zinc-200 bg-white text-zinc-600 hover:border-violet-300"}`}>Todos</button>
      {categorias.map((categoria) => (
        <button type="button" key={categoria.id} aria-pressed={activa === categoria.id} onClick={() => alCambiar(categoria.id)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${activa === categoria.id ? "bg-violet-600 text-white" : "border border-zinc-200 bg-white text-zinc-600 hover:border-violet-300"}`}>{categoria.nombre}</button>
      ))}
    </div>
  )
}
