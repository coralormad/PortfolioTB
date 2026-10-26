import { useEffect } from 'react'

const FUERZA_X = 0.25
const FUERZA_Y = 0.35
const MAXIMO = 8

const limitar = (valor: number) => Math.max(-MAXIMO, Math.min(MAXIMO, valor))

export function useBotonesMagneticos() {
  useEffect(() => {
    const punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)')
    let actual: HTMLElement | null = null

    const soltar = () => {
      if (!actual) return
      actual.style.removeProperty('--iman-x')
      actual.style.removeProperty('--iman-y')
      actual = null
    }

    const mover = (e: PointerEvent) => {
      if (!punteroFino.matches || reducir.matches || e.pointerType !== 'mouse') return soltar()

      const objetivo = e.target instanceof Element ? e.target : null
      const boton = objetivo?.closest<HTMLElement>('.btn:not(:disabled)') ?? null
      if (boton !== actual) soltar()
      if (!boton) return

      actual = boton
      const caja = boton.getBoundingClientRect()
      const x = limitar((e.clientX - (caja.left + caja.width / 2)) * FUERZA_X)
      const y = limitar((e.clientY - (caja.top + caja.height / 2)) * FUERZA_Y)
      boton.style.setProperty('--iman-x', `${x}px`)
      boton.style.setProperty('--iman-y', `${y}px`)
    }

    document.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', soltar)
    window.addEventListener('blur', soltar)

    return () => {
      soltar()
      document.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', soltar)
      window.removeEventListener('blur', soltar)
    }
  }, [])
}
