import { useState, useEffect } from 'react'

export function useViewport() {
  const [vw, setVw] = useState(document.documentElement.clientWidth)
  const [vh, setVh] = useState(document.documentElement.clientHeight)
  useEffect(() => {
    const handleResize = () => {
      setVw(document.documentElement.clientWidth)
      setVh(document.documentElement.clientHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return { vw, vh }
}