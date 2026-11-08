
import { useCallback, useEffect, useState } from 'react'
import * as productApi from '../api/productApi'
import type { Product, ProductInput } from '../types/product'

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong.'
}

export function useProducts(token: string | null) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const refresh = useCallback(async (page = pageNumber) => {
    if (!token) return

    try {
      setError('')

      const result = await productApi.getProducts(
        page,
        pageSize,
        token
      )

      setProducts(result.items)
      setTotalPages(result.totalPages)
      setTotalCount(result.totalCount)
    } catch (err) {
      setError(toErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [pageNumber, pageSize, token])

  useEffect(() => {
    if (!token) {
      setProducts([])
      setTotalPages(0)
      setTotalCount(0)
      setLoading(false)
      return
    }

    let ignore = false

    setLoading(true)
    setError('')

    productApi.getProducts(pageNumber, pageSize, token)
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
  }, [pageNumber, pageSize, token])

  const clearMessages = useCallback(() => {
    setError('')
    setSuccessMessage('')
  }, [])

  const runAndRefresh = async (
    action: () => Promise<void>,
    successText: string
  ) => {
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

  const saveProduct = async (
    input: ProductInput,
    editingId?: number
  ) => {
    if (!token) return false

    setSaving(true)

    try {
      const isEditing = editingId !== undefined

      return await runAndRefresh(
        () => (
          isEditing
            ? productApi.updateProduct(editingId, input, token)
            : productApi.createProduct(input, token)
        ),
        isEditing
          ? 'Product updated successfully!'
          : 'Product added successfully!'
      )
    } finally {
      setSaving(false)
    }
  }

  const removeProduct = async (id: number) => {
    if (!token) return false

    return runAndRefresh(
      () => productApi.deleteProduct(id, token),
      'Product deleted successfully!'
    )
  }

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
