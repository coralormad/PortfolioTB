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
            <h3>{p.titulo}</h3>
            <p>{p.descripcion}</p>
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
            <a
              className={`btn ${styles.enlace}`}
              href={p.enlace}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.textoEnlace}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}