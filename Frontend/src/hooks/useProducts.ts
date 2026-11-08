
import { useCallback, useEffect, useState } from 'react'
import * as productApi from '../api/productApi'
import type { Product, ProductInput } from '../types/product'

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong.'
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Pagination state
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const refresh = useCallback(async (page = pageNumber) => {
    try {
      setError('')
      const result = await productApi.getProducts(page, pageSize)

      setProducts(result.items)
      setTotalPages(result.totalPages)
      setTotalCount(result.totalCount)
    } catch (err) {
      setError(toErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [pageNumber, pageSize])

  useEffect(() => {
    let ignore = false

    setLoading(true)

    productApi.getProducts(pageNumber, pageSize)
      .then((result) => {
        if (!ignore) {
          setProducts(result.items)
          setTotalPages(result.totalPages)
          setTotalCount(result.totalCount)
        }
      })
      .catch((err) => {
        if (!ignore) setError(toErrorMessage(err))
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [pageNumber, pageSize])

  const clearMessages = useCallback(() => {
    setError('')
    setSuccessMessage('')
  }, [])

  const runAndRefresh = async (action: () => Promise<void>, successText: string) => {
    try {
      clearMessages()
      await action()
      await refresh()
      setSuccessMessage(successText)
      return true
    } catch (err) {
      setError(toErrorMessage(err))
      return false
    }
  }

  const saveProduct = async (input: ProductInput, editingId?: number) => {
    setSaving(true)

    const isEditing = editingId !== undefined
    const succeeded = await runAndRefresh(
      () => (
        isEditing
          ? productApi.updateProduct(editingId, input)
          : productApi.createProduct(input)
      ),
      isEditing ? 'Product updated successfully!' : 'Product added successfully!',
    )

    setSaving(false)
    return succeeded
  }

  const removeProduct = (id: number) =>
    runAndRefresh(
      () => productApi.deleteProduct(id),
      'Product deleted successfully!',
    )

  return {
    products,
    loading,
    saving,
    error,
    successMessage,
    clearMessages,
    saveProduct,
    removeProduct,
    pageNumber,
    setPageNumber,
    pageSize,
    totalPages,
    totalCount,
  }
}
