import { useEffect, useState, type RefObject } from 'react'

export function useScrollado(centinela: RefObject<HTMLElement | null>) {
  const [scrollado, setScrollado] = useState(false)

  useEffect(() => {
    const el = centinela.current
    if (!el) return

    const observador = new IntersectionObserver(([entrada]) => {
      setScrollado(!entrada.isIntersecting)
    })
    observador.observe(el)

    return () => observador.disconnect()
  }, [centinela])

  return scrollado
}
