export interface Product {
  id: number
  name: string
  description: string
  price: number
  stockQuantity: number
  createdAt: string
}

export interface ProductInput {
  name: string
  description: string
  price: number
  stockQuantity: number
}
