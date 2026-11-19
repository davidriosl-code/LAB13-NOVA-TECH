import type { Categoria, Producto } from "@/types/catalogo"

async function solicitar<T>(ruta: string, signal?: AbortSignal): Promise<T> {
  const respuesta = await fetch(`/api/${ruta}`, { signal })
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió con el código ${respuesta.status}`)
  }
  return respuesta.json() as Promise<T>
}

export const obtenerCategorias = (signal?: AbortSignal) =>
  solicitar<Categoria[]>("categorias/", signal)

export const obtenerProductos = (signal?: AbortSignal) =>
  solicitar<Producto[]>("productos/", signal)
