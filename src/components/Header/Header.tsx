import { useRef, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './Header.module.css'
import { useScrollado } from '../../hooks/useScrollado'
import { useSeccionActiva } from '../../hooks/useSeccionActiva'

const enlaces = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#proyectos', texto: 'Proyectos' },
  { href: '#tecnologias', texto: 'Tecnologías' },
  { href: '#contacto', texto: 'Contacto' },
]

const ids = enlaces.map((e) => e.href.slice(1))

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)
  const centinela = useRef<HTMLDivElement>(null)
  const scrollado = useScrollado(centinela)
  const activa = useSeccionActiva(ids)

  return (
    <>
      <div ref={centinela} className={styles.centinela} aria-hidden="true" />
      <header className={`${styles.cabecera} ${scrollado ? styles.conScroll : ''}`}>
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
              <a
              key={e.href}
              href={e.href}
              onClick={cerrar}
              className={activa === e.href.slice(1) ? styles.activo : undefined}
              aria-current={activa === e.href.slice(1) ? 'location' : undefined}
            >
                {e.texto}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}