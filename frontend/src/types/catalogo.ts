export interface Categoria {
  id: number
  nombre: string
  slug: string
}

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: string
  imagen_url: string
  cantidad_disponible: number
  categoria: number
  categoria_nombre: string
}
