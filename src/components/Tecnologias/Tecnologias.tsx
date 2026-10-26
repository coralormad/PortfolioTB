import { stackPrincipal } from '../../data/techs'
import Capsula from '../Capsula/Capsula'
import styles from './Tecnologias.module.css'

export default function Tecnologias() {
  return (
    <section className="seccion" id="tecnologias">
      <h2>Tecnologías</h2>
      <ul className={styles.stack}>
        {stackPrincipal.map((id) => (
          <Capsula key={id} id={id} />
        ))}
      </ul>
    </section>
  )
}
