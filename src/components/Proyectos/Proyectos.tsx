import type { PointerEvent } from 'react'
import { projects } from '../../data/projects'
import Capsula from '../Capsula/Capsula'
import styles from './Proyectos.module.css'

function moverLuz(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const tarjeta = e.currentTarget
  const caja = tarjeta.getBoundingClientRect()
  tarjeta.style.setProperty('--mx', `${e.clientX - caja.left}px`)
  tarjeta.style.setProperty('--my', `${e.clientY - caja.top}px`)
}

function apagarLuz(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.removeProperty('--mx')
  e.currentTarget.style.removeProperty('--my')
}

export default function Proyectos() {
  return (
    <section className="seccion" id="proyectos">
      <h2>Proyectos</h2>
      <div className={styles.tarjetas}>
        {projects.map((p) => (
          <article
            key={p.id}
            className={styles.tarjeta}
            onPointerMove={moverLuz}
            onPointerLeave={apagarLuz}
          >
            {p.imagen ? (
              <div className={styles.portada}>
                <img
                  src={`${import.meta.env.BASE_URL}${p.imagen}`}
                  alt={p.alt ?? ''}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className={`${styles.portada} ${styles.sinImagen}`} aria-hidden="true">
                <span>{p.titulo}</span>
              </div>
            )}

            <div className={styles.cuerpo}>
              <h3>{p.titulo}</h3>
              <span className={styles.tipo}>{p.tipo}</span>
              <p className={styles.resumen}>{p.resumen}</p>

              <details className={styles.reto}>
                <summary>Reto y solución</summary>
                <div className={styles.retoCuerpo}>
                  <h4>Reto</h4>
                  <p>{p.problema}</p>
                  <h4>Solución</h4>
                  <p>{p.solucion}</p>
                </div>
              </details>

              <ul className={styles.tecnologias} aria-label={`Tecnologías de ${p.titulo}`}>
                {p.techs.map((id) => (
                  <Capsula key={id} id={id} tamano="compacta" />
                ))}
              </ul>

              <div className={styles.acciones}>
                <a
                  className={`btn ${styles.enlace}`}
                  href={p.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.textoEnlace}
                  <span className={styles.flecha} aria-hidden="true">→</span>
                </a>
                {p.demo && (
                  <a
                    className={`subrayado ${styles.demo}`}
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
