import { areas } from '../../data/techs'
import Capsula from '../Capsula/Capsula'
import styles from './Tecnologias.module.css'

export default function Tecnologias() {
  return (
    <section className="seccion" id="tecnologias">
      <h2>Tecnologías</h2>
      <div className={styles.areas}>
        {areas.map((area) => (
          <div
            key={area.titulo}
            className={`${styles.area} ${area.foco ? styles.foco : ''} ${area.formacion ? styles.formacion : ''}`}
          >
            <h3 className={styles.titulo}>
              {area.titulo}
              {area.foco && <span className={styles.etiqueta}>Foco</span>}
            </h3>
            <ul className={styles.stack}>
              {area.techs.map((id) => (
                <Capsula key={id} id={id} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
