import { projects } from '../../data/projects'
import { techs } from '../../data/techs'
import styles from './Proyectos.module.css'

export default function Proyectos() {
  return (
    <section className="seccion" id="proyectos">
      <h2>Proyectos</h2>
      <div className={styles.tarjetas}>
        {projects.map((p) => (
          <article key={p.id} className={styles.tarjeta}>
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
              <p>{p.descripcion}</p>

              <dl className={styles.caso}>
                <div>
                  <dt>El reto</dt>
                  <dd>{p.problema}</dd>
                </div>
                <div>
                  <dt>La solución</dt>
                  <dd>{p.solucion}</dd>
                </div>
              </dl>

              <ul className={styles.tecnologias}>
                {p.techs.map((id) => {
                  const { nombre, clase } = techs[id]
                  return (
                    <li key={id}>
                      <i className={clase} aria-hidden="true" />
                      {nombre}
                    </li>
                  )
                })}
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
                    className={styles.demo}
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
