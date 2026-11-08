import type { Product, ProductInput, PagedResult } from '../types/product';
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

export async function getProducts(
  pageNumber: number,
  pageSize: number,
  token: string
): Promise<PagedResult<Product>> {
  const response = await fetch(
    `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: getAuthHeaders(token),
    }
  )

  await ensureSuccess(response, 'Failed to fetch products.')
  return response.json()
}

export async function createProduct(input: ProductInput, token: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(token, true),
    body: JSON.stringify(input),
  })

  await ensureSuccess(response, 'Failed to add product.')
}

export async function updateProduct(id: number,input: ProductInput,token: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token, true),
    body: JSON.stringify(input),
  })

  await ensureSuccess(response, 'Failed to update product.')
}

export async function deleteProduct(id: number,token: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  })

  await ensureSuccess(response, 'Failed to delete product.')
}

export interface CurrentUser {
  id: string | null
  email: string | null
  name: string | null
}

export async function getCurrentUser(
  googleToken: string
): Promise<CurrentUser> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${googleToken}`,
    },
  })

  await ensureSuccess(response, 'Google authentication failed.')

  return response.json()
}
function getAuthHeaders(token: string, json = false) {
  return {
    Authorization: `Bearer ${token}`,
    ...(json ? { 'Content-Type': 'application/json' } : {}),
  }
}

