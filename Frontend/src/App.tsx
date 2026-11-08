
import { useState } from 'react'
import { Alert } from './components/Alert'
import { ProductForm } from './components/ProductForm'
import { ProductHeader } from './components/ProductHeader'
import { ProductTable } from './components/ProductTable'
import { SearchBar } from './components/SearchBar'
import { useProducts } from './hooks/useProducts'
import type { Product, ProductInput } from './types/product'
import { GoogleLogin } from '@react-oauth/google'
import type { CurrentUser } from './api/productApi'
import { getCurrentUser } from './api/productApi'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [googleToken, setGoogleToken] = useState<string | null>(null)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const {
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
    totalPages,
    totalCount,
  } = useProducts(googleToken)

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string
  }) => {
    if (!credentialResponse.credential) {
      setAuthError('Google did not return a valid token.')
      return
    }

    try {
      setAuthLoading(true)
      setAuthError('')

      const token = credentialResponse.credential
      const user = await getCurrentUser(token)

      setGoogleToken(token)
      setCurrentUser(user)
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Login failed.'
      )
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    setGoogleToken(null)
    setPageNumber(1)
    setSearchTerm('')
    setShowForm(false)
    setEditingProduct(null)
    clearMessages()
  }

  const openForm = (product?: Product) => {
    clearMessages()
    setEditingProduct(product ?? null)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (input: ProductInput) => {
    const success = await saveProduct(input, editingProduct?.id)

    if (success) closeForm()
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await removeProduct(id)
    }
  }

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      {!currentUser ? (
        <main className="auth-container">
          <div className="auth-card">
            <h1>Product Management</h1>
            <p>Sign in to manage your products</p>

            {authError && <Alert type="error" message={authError} />}

            {authLoading ? (
              <p>Signing in...</p>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setAuthError('Google login failed.')}
              />
            )}
          </div>
        </main>
      ) : (
        
        

      <main className="container">

        <div className="page-top">
          <h1>Product Management</h1>

          <button
            className="button button--secondary"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>

        {error && <Alert type="error" message={error} />}

        {successMessage && (
          <Alert type="success" message={successMessage} />
        )}

        {showForm && (
          <ProductForm
            editingProduct={editingProduct}
            saving={saving}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}

        <div className="table-toolbar">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <button
            className="button button--primary"
            onClick={() => openForm()}
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <ProductTable
              products={visibleProducts}
              onEdit={openForm}
              onDelete={handleDelete}
            />

            <div className="pagination">
              <p>Total Products: {totalCount}</p>

              <div className="pagination__controls">
                <button
                  className="button button--secondary"
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                >
                  Previous
                </button>

                <span>
                  Page {pageNumber} of {totalPages || 1}
                </span>

                <button
                  className="button button--secondary"
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

      </main>


      )}
    </div>
  )
}

export default App
