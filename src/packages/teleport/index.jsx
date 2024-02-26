import ReactDOM from 'react-dom'

export function Teleport({ children, to }) {
  const target = to ? document.querySelector(to) : document.body
  return ReactDOM.createPortal(
    children,
    target
  )
}