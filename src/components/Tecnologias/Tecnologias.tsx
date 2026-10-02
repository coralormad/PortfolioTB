import { techs, stackPrincipal } from '../../data/techs'
import styles from './Tecnologias.module.css'

export default function Tecnologias() {
  return (
    <section className="seccion" id="tecnologias">
      <h2>Tecnologías</h2>
      <ul className={styles.stack}>
        {stackPrincipal.map((id) => {
          const { nombre, clase } = techs[id]
          return (
            <li key={id}>
              <i className={clase} aria-hidden="true" />
              {nombre}
            </li>
          )
        })}
      </ul>
    </section>
  )
}