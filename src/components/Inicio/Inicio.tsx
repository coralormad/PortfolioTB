import FotoMoneda from './FotoMoneda'
import styles from './Inicio.module.css'

export default function Inicio() {
  return (
    <section className="seccion" id="inicio">
      <div className={styles.perfil}>
        <FotoMoneda />
        <div className={styles.descripcion}>
          <p className={styles.estado}>
            <span className={styles.punto} aria-hidden="true" />
            Disponible · Sevilla o remoto
          </p>
          <h1 className={styles.nombre}>Coral de Pablos</h1>
          <p className={styles.rol}>Desarrolladora Full Stack con foco en backend</p>
          <p className={styles.bio}>
            Me gusta pensar <mark>cómo se estructuran los datos, quién puede ver qué</mark> y por qué algo
            falla cuando no debería. Trabajo con Node.js, TypeScript y PostgreSQL, y me formo en
            Dynamics 365 y Power Platform.
          </p>
          <div className={styles.acciones}>
            <a className="btn" href="#proyectos">
              Ver proyectos <span aria-hidden="true">→</span>
            </a>
            <a className={`btn ${styles.secundario}`} href="#contacto">
              Escríbeme
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
