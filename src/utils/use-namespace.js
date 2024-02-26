const b = (namespace, block) => {
  let className = namespace
  if (block) {
    className += `-${block}`
  }
  return className
}

export const useNamespace = (namespace) => {
  return {
    b: (block) => b(namespace, block),
  }
}