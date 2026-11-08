export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

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
