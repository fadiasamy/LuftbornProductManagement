import { useState } from 'react'
import { Alert } from './components/Alert'
import { ProductForm } from './components/ProductForm'
import { ProductHeader } from './components/ProductHeader'
import { ProductTable } from './components/ProductTable'
import { SearchBar } from './components/SearchBar'
import { useProducts } from './hooks/useProducts'
import type { Product, ProductInput } from './types/product'

function App() {
  const { products, loading, saving, error, successMessage, clearMessages, saveProduct, removeProduct } =
    useProducts()

  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const openForm = (product: Product | null) => {
    clearMessages()
    setEditingProduct(product)
    setShowForm(true)
  }

  const closeForm = () => {
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleSubmit = async (input: ProductInput) => {
    const succeeded = await saveProduct(input, editingProduct?.id)

    if (succeeded) closeForm()
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await removeProduct(id)
    }
  }

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="product-container">
      <ProductHeader onAddClick={() => openForm(null)} />

      <Alert type="success" message={successMessage} />

      {showForm && (
        <ProductForm
          key={editingProduct?.id ?? 'new'}
          editingProduct={editingProduct}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <Alert type="error" message={error} />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductTable products={visibleProducts} onEdit={openForm} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default App
