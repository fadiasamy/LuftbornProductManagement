import type { Product, ProductInput } from '../types/product'

const API_URL = '/api/products'

interface ApiErrorBody {
  message?: string
  errors?: Record<string, string[]>
}

async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body: ApiErrorBody = await response.json()

    if (body.errors) {
      return Object.values(body.errors).flat().join(' ')
    }

    return body.message ?? fallback
  } catch {
    return fallback
  }
}

async function ensureSuccess(response: Response, fallback: string): Promise<void> {
  if (!response.ok) {
    throw new Error(await readErrorMessage(response, fallback))
  }
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL)
  await ensureSuccess(response, 'Failed to fetch products.')

  return response.json()
}

export async function createProduct(input: ProductInput): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  await ensureSuccess(response, 'Failed to add product.')
}

export async function updateProduct(id: number, input: ProductInput): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  await ensureSuccess(response, 'Failed to update product.')
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })

  await ensureSuccess(response, 'Failed to delete product.')
}
