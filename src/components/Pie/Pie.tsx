import { useEffect, useState } from 'react'
import styles from './Pie.module.css'

const ANIO = new Date().getFullYear()

const formatoHora = new Intl.DateTimeFormat('es-ES', {
  timeZone: 'Europe/Madrid',
  hour: '2-digit',
  minute: '2-digit',
})

export default function Pie() {
  const [ahora, setAhora] = useState(() => new Date())

  useEffect(() => {
    const intervalo = window.setInterval(() => setAhora(new Date()), 30_000)
    return () => window.clearInterval(intervalo)
  }, [])

  return (
    <footer className={styles.pie}>
      <p>© {ANIO} Coral de Pablos Ormad. Todos los derechos reservados</p>
      <p className={styles.hora}>
        Hecho en Sevilla · <time dateTime={ahora.toISOString()}>{formatoHora.format(ahora)}</time> aquí ahora
      </p>
    </footer>
  )
}
