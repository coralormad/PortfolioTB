import { useEffect, useRef } from 'react'
import styles from './Fondo.module.css'

type Capa = {
  prof: number
  radio: [number, number]
  alfa: number
  vel: number
  enlace: number
  linea: 'primario' | 'morado'
  peso: number
}

type Nodo = {
  c: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const CAPAS: Capa[] = [
  { prof: 0.25, radio: [0.8, 1.3], alfa: 0.3, vel: 6, enlace: 80, linea: 'morado', peso: 0.45 },
  { prof: 0.55, radio: [1.2, 1.9], alfa: 0.45, vel: 10, enlace: 105, linea: 'morado', peso: 0.35 },
  { prof: 1, radio: [1.8, 2.6], alfa: 0.6, vel: 14, enlace: 130, linea: 'primario', peso: 0.2 },
]

const MARGEN = 60
const RADIO_CURSOR = 170
const INTENSIDAD = 1.6
const INACTIVIDAD_MS = 2500

function leerRgb(variable: string, porDefecto: string) {
  const valor = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return valor || porDefecto
}

export default function Fondo() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const color = {
      primario: leerRgb('--color-primario-rgb', '92, 127, 166'),
      morado: leerRgb('--color-morado-rgb', '184, 172, 224'),
      secundario: leerRgb('--color-secundario-rgb', '191, 225, 245'),
      rosa: leerRgb('--color-rosa-rgb', '242, 166, 194'),
    }

    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)')
    let ancho = 0
    let alto = 0
    let nodos: Nodo[] = []
    let ultimo = 0
    let frame = 0
    const raton = {
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.4,
      sx: window.innerWidth / 2,
      sy: window.innerHeight * 0.4,
      ultimoMov: -Infinity,
    }

    const envolver = (v: number, max: number) => {
      const total = max + MARGEN * 2
      return (((v + MARGEN) % total) + total) % total - MARGEN
    }

    const crearNodos = () => {
      const total = Math.round(Math.min(150, Math.max(45, (ancho * alto) / 9000)))
      nodos = []
      CAPAS.forEach((capa, c) => {
        const cantidad = Math.round(total * capa.peso)
        for (let i = 0; i < cantidad; i++) {
          const angulo = Math.random() * Math.PI * 2
          nodos.push({
            c,
            x: Math.random() * (ancho + MARGEN * 2) - MARGEN,
            y: Math.random() * (alto + MARGEN * 2) - MARGEN,
            vx: Math.cos(angulo) * capa.vel,
            vy: Math.sin(angulo) * capa.vel,
            r: capa.radio[0] + Math.random() * (capa.radio[1] - capa.radio[0]),
          })
        }
      })
    }

    const dibujar = (t: number, dt: number) => {
      ctx.clearRect(0, 0, ancho, alto)

      const inactivo = t - raton.ultimoMov > INACTIVIDAD_MS
      const objetivoX = inactivo ? ancho * (0.5 + 0.32 * Math.sin(t * 0.00012)) : raton.x
      const objetivoY = inactivo ? alto * (0.4 + 0.2 * Math.sin(t * 0.00017)) : raton.y
      const suavizado = reducir.matches ? 1 : Math.min(1, dt * 0.004)
      raton.sx += (objetivoX - raton.sx) * suavizado
      raton.sy += (objetivoY - raton.sy) * suavizado

      const luz = ctx.createRadialGradient(raton.sx, raton.sy, 0, raton.sx, raton.sy, 280)
      luz.addColorStop(0, `rgba(${color.morado}, ${0.32 * INTENSIDAD})`)
      luz.addColorStop(0.45, `rgba(${color.secundario}, ${0.18 * INTENSIDAD})`)
      luz.addColorStop(1, `rgba(${color.rosa}, 0)`)
      ctx.fillStyle = luz
      ctx.fillRect(0, 0, ancho, alto)

      const desplX = (raton.sx - ancho / 2) / ancho
      const desplY = (raton.sy - alto / 2) / alto
      const scroll = window.scrollY

      const posiciones = nodos.map((n) => {
        const capa = CAPAS[n.c]
        let x = envolver(n.x - desplX * 28 * capa.prof, ancho)
        let y = envolver(n.y - scroll * 0.2 * capa.prof - desplY * 28 * capa.prof, alto)
        if (n.c > 0) {
          const dx = raton.sx - x
          const dy = raton.sy - y
          const d = Math.hypot(dx, dy)
          if (d < RADIO_CURSOR) {
            const f = (1 - d / RADIO_CURSOR) * 0.12
            x += dx * f
            y += dy * f
          }
        }
        return { x, y, n }
      })

      ctx.lineWidth = 1
      for (let i = 0; i < posiciones.length; i++) {
        const a = posiciones[i]
        const capa = CAPAS[a.n.c]
        for (let j = i + 1; j < posiciones.length; j++) {
          const b = posiciones[j]
          if (b.n.c !== a.n.c) continue
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < capa.enlace) {
            ctx.strokeStyle = `rgba(${color[capa.linea]}, ${(1 - d / capa.enlace) * capa.alfa * 0.6 * INTENSIDAD})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (a.n.c > 0) {
          const d = Math.hypot(a.x - raton.sx, a.y - raton.sy)
          if (d < RADIO_CURSOR) {
            ctx.strokeStyle = `rgba(${color.primario}, ${(1 - d / RADIO_CURSOR) * 0.35 * INTENSIDAD})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(raton.sx, raton.sy)
            ctx.stroke()
          }
        }
      }

      for (const p of posiciones) {
        const capa = CAPAS[p.n.c]
        ctx.fillStyle = `rgba(${color.primario}, ${Math.min(1, capa.alfa * INTENSIDAD)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const bucle = (t: number) => {
      const dt = Math.min(50, t - (ultimo || t))
      ultimo = t
      for (const n of nodos) {
        n.x += (n.vx * dt) / 1000
        n.y += (n.vy * dt) / 1000
      }
      dibujar(t, dt)
      frame = requestAnimationFrame(bucle)
    }

    const arrancar = () => {
      cancelAnimationFrame(frame)
      ultimo = 0
      if (reducir.matches) dibujar(0, 0)
      else frame = requestAnimationFrame(bucle)
    }

    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ancho = window.innerWidth
      alto = window.innerHeight
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(alto * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      crearNodos()
      if (reducir.matches) dibujar(0, 0)
    }

    const alMoverRaton = (e: PointerEvent) => {
      raton.x = e.clientX
      raton.y = e.clientY
      raton.ultimoMov = performance.now()
    }

    const alHacerScroll = () => {
      if (reducir.matches) dibujar(0, 0)
    }

    window.addEventListener('pointermove', alMoverRaton, { passive: true })
    window.addEventListener('resize', redimensionar)
    window.addEventListener('scroll', alHacerScroll, { passive: true })
    reducir.addEventListener('change', arrancar)

    redimensionar()
    arrancar()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', alMoverRaton)
      window.removeEventListener('resize', redimensionar)
      window.removeEventListener('scroll', alHacerScroll)
      reducir.removeEventListener('change', arrancar)
    }
  }, [])

  return <canvas className={styles.fondo} ref={ref} aria-hidden="true" />
}
