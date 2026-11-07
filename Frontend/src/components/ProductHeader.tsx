interface ProductHeaderProps {
  onAddClick: () => void
}

export function ProductHeader({ onAddClick }: ProductHeaderProps) {
  return (
    <header className="product-header">
      <div>
        <h1>Product Management</h1>
        <p>Manage your products</p>
      </div>

      <button className="button button--primary button--large" onClick={onAddClick}>
        + Add Product
      </button>
    </header>
  )
}
