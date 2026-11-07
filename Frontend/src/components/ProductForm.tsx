import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Product, ProductInput } from '../types/product'
import { validateProductForm } from '../utils/validateProductForm'

interface ProductFormProps {
  editingProduct: Product | null
  saving: boolean
  onSubmit: (input: ProductInput) => void
  onCancel: () => void
}

export function ProductForm({ editingProduct, saving, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(editingProduct?.name ?? '')
  const [description, setDescription] = useState(editingProduct?.description ?? '')
  const [price, setPrice] = useState(editingProduct ? String(editingProduct.price) : '')
  const [stockQuantity, setStockQuantity] = useState(
    editingProduct ? String(editingProduct.stockQuantity) : '',
  )
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errorMessage = validateProductForm({ name, description, price, stockQuantity })
    setValidationError(errorMessage)

    if (errorMessage) return

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      stockQuantity: Number(stockQuantity),
    })
  }

  const submitLabel = editingProduct ? 'Update Product' : 'Save Product'

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

      <div className="product-form__grid">
        <div className="product-form__field product-form__field--full">
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            dir="auto"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter product name"
            maxLength={100}
            required
          />
        </div>

        <div className="product-form__field product-form__field--full">
          <label htmlFor="product-description">Description</label>
          <textarea
            id="product-description"
            dir="auto"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter product description"
            maxLength={500}
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="product-price">Price</label>
          <input
            id="product-price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="product-stock">Stock Quantity</label>
          <input
            id="product-stock"
            type="number"
            value={stockQuantity}
            onChange={(event) => setStockQuantity(event.target.value)}
            placeholder="0"
            min="0"
            step="1"
            required
          />
        </div>
      </div>

      {validationError && <p className="alert alert--error">{validationError}</p>}

      <div className="product-form__actions">
        <button type="button" className="button button--secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="button button--primary" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
