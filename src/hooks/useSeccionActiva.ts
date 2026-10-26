import { useEffect, useState } from 'react'

export function useSeccionActiva(ids: string[]) {
  const [activa, setActiva] = useState(ids[0] ?? '')

  useEffect(() => {
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (secciones.length === 0) return

    const enBanda = new Set<string>()

    const calcular = () => {
      if (window.scrollY < 50) return setActiva(secciones[0].id)

      const enElFondo =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (enElFondo) return setActiva(secciones[secciones.length - 1].id)

      const visible = secciones.find((s) => enBanda.has(s.id))
      if (visible) setActiva(visible.id)
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) enBanda.add(e.target.id)
          else enBanda.delete(e.target.id)
        })
        calcular()
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    secciones.forEach((s) => observador.observe(s))
    window.addEventListener('scroll', calcular, { passive: true })

    return () => {
      observador.disconnect()
      window.removeEventListener('scroll', calcular)
    }
  }, [ids])

  return activa
}
