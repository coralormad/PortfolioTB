import { useState, type CSSProperties } from 'react'
import styles from './FotoMoneda.module.css'

const MEDIA_VUELTAS = 900
const CAPAS_CANTO = [-4, -3, -2, -1, 0, 1, 2, 3, 4]

export default function FotoMoneda() {
  const [vueltas, setVueltas] = useState(0)
  const girada = vueltas % 2 === 1

  return (
    <div className={styles.escena}>
      <button
        type="button"
        className={styles.moneda}
        aria-pressed={girada}
        aria-label="Girar la foto de Coral para ver la otra cara"
        data-girada={girada}
        onClick={() => setVueltas((v) => v + 1)}
      >
        <span
          className={styles.cuerpo}
          style={{ '--angulo': `${vueltas * MEDIA_VUELTAS}deg` } as CSSProperties}
        >
          {CAPAS_CANTO.map((z) => (
            <span
              key={z}
              className={styles.canto}
              style={{ transform: `translateZ(${z}px)` }}
              aria-hidden="true"
            />
          ))}

          <span className={`${styles.cara} ${styles.anverso}`}>
            <img
              src={`${import.meta.env.BASE_URL}img/foto-perfil.jpg`}
              width={200}
              height={200}
              alt=""
            />
          </span>

          <span className={`${styles.cara} ${styles.reverso}`} aria-hidden="true">
            <span className={styles.ficha}>
              <strong>Coral de Pablos</strong>
              <span>Full Stack · foco backend</span>
              <span className={styles.stack}>Node.js · TypeScript · PostgreSQL</span>
              <span className={styles.ciudad}>Sevilla</span>
            </span>
          </span>

          {vueltas > 0 && <span key={vueltas} className={styles.brillo} aria-hidden="true" />}
        </span>
      </button>
    </div>
  )
}
