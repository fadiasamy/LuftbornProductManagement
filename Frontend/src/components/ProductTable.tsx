import type { Product } from '../types/product'

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

const COLUMN_COUNT = 6

function StockBadge({ quantity }: { quantity: number }) {
  const isOutOfStock = quantity === 0

  return (
    <span className={isOutOfStock ? 'badge badge--out' : 'badge'}>
      {isOutOfStock ? 'Out of stock' : quantity}
    </span>
  )
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th className="product-table__actions">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={COLUMN_COUNT} className="product-table__empty">
              No products found.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id}>
              <td className="product-table__id">{product.id}</td>
              <td className="product-table__name" dir="auto">{product.name}</td>
              <td className="product-table__description" dir="auto" title={product.description}>
                {product.description}
              </td>
              <td className="product-table__number">
                {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
              <td>
                <StockBadge quantity={product.stockQuantity} />
              </td>
              <td className="product-table__actions">
                <button type="button" className="button button--edit" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button type="button" className="button button--danger" onClick={() => onDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
