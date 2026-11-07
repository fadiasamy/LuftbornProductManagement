interface AlertProps {
  type: 'success' | 'error'
  message: string
}

export function Alert({ type, message }: AlertProps) {
  if (!message) return null

  return <p className={`alert alert--${type}`}>{message}</p>
}
