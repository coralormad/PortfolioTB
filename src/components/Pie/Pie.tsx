import styles from './Pie.module.css'

const ANIO = new Date().getFullYear()

export default function Pie() {
  return (
    <footer className={styles.pie}>
      <p>© {ANIO} Coral de Pablos Ormad. Todos los derechos reservados</p>
    </footer>
  )
}
