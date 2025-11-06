export default function Button({ children, type, ...props }) {
  return (
    <button type={type} className="primary-button" {...props}>
      {children}
    </button>
  )
}