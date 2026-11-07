export interface ProductFormValues {
  name: string
  description: string
  price: string
  stockQuantity: string
}

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 500
const PRICE_MAX = 1_000_000
const STOCK_MAX = 100_000

export function validateProductForm(values: ProductFormValues): string {
  const name = values.name.trim()

  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    return `Product name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`
  }

  if (values.description.trim().length > DESCRIPTION_MAX_LENGTH) {
    return `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`
  }

  const price = Number(values.price)

  if (!values.price.trim() || !Number.isFinite(price) || price < 0.01 || price > PRICE_MAX) {
    return `Price must be between 0.01 and ${PRICE_MAX.toLocaleString()}.`
  }

  const stock = Number(values.stockQuantity)

  if (!values.stockQuantity.trim() || !Number.isInteger(stock) || stock < 0 || stock > STOCK_MAX) {
    return `Stock quantity must be a whole number between 0 and ${STOCK_MAX.toLocaleString()}.`
  }

  return ''
}
