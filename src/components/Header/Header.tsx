import { useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './Header.module.css'

const enlaces = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#proyectos', texto: 'Proyectos' },
  { href: '#tecnologias', texto: 'Tecnologías' },
  { href: '#contacto', texto: 'Contacto' },
]

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)

  return (
    <header className={styles.cabecera}>
      <div className={styles.inner}>
        <div className={styles.marca}>
          <a className={styles.logo} href="#inicio">Coral de Pablos</a>
          <div className={styles.redes}>
            <a
              href="https://github.com/coralormad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Coral de Pablos Ormad"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/coral-de-pablos-ormad-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Coral de Pablos Ormad"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
          onClick={() => setAbierto((a) => !a)}
        >
          <span className={`${styles.barras} ${abierto ? styles.barrasAbiertas : ''}`} />
        </button>

        <nav
          id="menu-principal"
          className={`${styles.menu} ${abierto ? styles.menuAbierto : ''}`}
          aria-label="Navegación principal"
        >
          {enlaces.map((e) => (
            <a key={e.href} href={e.href} onClick={cerrar}>
              {e.texto}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}