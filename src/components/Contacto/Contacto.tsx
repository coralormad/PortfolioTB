import { useState, type FormEvent } from 'react'
import styles from './Contacto.module.css'

const DESTINO = 'https://formsubmit.co/ajax/soft.apps360@gmail.com'
const EMAIL_VISIBLE = 'soft.apps360@gmail.com'
const MAX_COMENTARIO = 1000

type Estado = 'inactivo' | 'enviando' | 'enviado' | 'error'

const TEXTO_BOTON: Record<Estado, string> = {
  inactivo: 'Enviar',
  enviando: 'Enviando…',
  enviado: 'Enviado ✓',
  error: 'Reintentar',
}

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [comentario, setComentario] = useState('')
  const [emailTocado, setEmailTocado] = useState(false)
  const [estado, setEstado] = useState<Estado>('inactivo')
  const [copiado, setCopiado] = useState(false)

  const emailOk = EMAIL_VALIDO.test(email)
  const mostrarErrorEmail = emailTocado && email !== '' && !emailOk

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() || !emailOk) {
      setEmailTocado(true)
      form.reportValidity()
      return
    }

    setEstado('enviando')
    const datos = new FormData(form)

    try {
      const respuesta = await fetch(DESTINO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(datos)),
      })
      if (!respuesta.ok) throw new Error(String(respuesta.status))
      setEstado('enviado')
      setNombre('')
      setEmail('')
      setComentario('')
      setEmailTocado(false)
    } catch {
      setEstado('error')
    }
  }

  const reiniciarEstado = () => {
    if (estado === 'enviado' || estado === 'error') setEstado('inactivo')
  }

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_VISIBLE)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2000)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <section className="seccion" id="contacto">
      <h2>Contacto</h2>

      <div className={styles.panel}>
        <aside className={styles.lateral}>
          <p className={styles.invitacion}>
            ¿Tienes una oferta, un proyecto o una duda? Escríbeme y te respondo lo antes posible.
          </p>

          <div className={styles.dato}>
            <span className={styles.etiqueta}>Email</span>
            <div className={styles.copiar}>
              <span className={styles.email}>{EMAIL_VISIBLE}</span>
              <button
                type="button"
                className={`${styles.botonCopiar} ${copiado ? styles.copiado : ''}`}
                onClick={copiarEmail}
              >
                {copiado ? (
                  <svg className={styles.check} viewBox="0 0 16 16" fill="none" stroke="#3d9a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <rect x="5" y="5" width="9" height="9" rx="2" />
                    <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
                  </svg>
                )}
                <span aria-live="polite">{copiado ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <div className={styles.dato}>
            <span className={styles.etiqueta}>Ubicación</span>
            <span>Sevilla, España</span>
          </div>

          <div className={styles.dato}>
            <span className={styles.etiqueta}>Redes</span>
            <div className={styles.redes}>
              <a
                className="subrayado"
                href="https://github.com/coralormad"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="subrayado"
                href="https://www.linkedin.com/in/coral-de-pablos-ormad-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </aside>

        <form className={styles.formulario} onSubmit={enviar} onInput={reiniciarEstado} noValidate>
          <input type="hidden" name="_subject" value="Nuevo mensaje desde el portfolio" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="text"
            name="_honey"
            className={styles.trampa}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className={styles.campo}>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder=" "
              autoComplete="name"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="nombre">Nombre</label>
          </div>

          <div className={`${styles.campo} ${mostrarErrorEmail ? styles.invalido : ''} ${emailTocado && emailOk ? styles.valido : ''}`}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTocado(true)}
              aria-invalid={mostrarErrorEmail}
              aria-describedby="email-ayuda"
            />
            <label htmlFor="email">Email</label>
            <span id="email-ayuda" className={styles.ayuda} aria-live="polite">
              {mostrarErrorEmail ? 'Revisa el email: debe tener el formato nombre@dominio.com' : ''}
            </span>
          </div>

          <div className={styles.campo}>
            <textarea
              id="comentario"
              name="comentario"
              rows={5}
              placeholder=" "
              maxLength={MAX_COMENTARIO}
              required
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              aria-describedby="comentario-contador"
            />
            <label htmlFor="comentario">Comentario</label>
            <span id="comentario-contador" className={styles.contador}>
              {comentario.length}/{MAX_COMENTARIO}
            </span>
          </div>

          <button
            type="submit"
            className={`btn ${styles.enviar} ${styles[estado] ?? ''}`}
            disabled={estado === 'enviando'}
          >
            {TEXTO_BOTON[estado]}
          </button>

          <p className={styles.estado} role="status">
            {estado === 'enviado' && '¡Gracias! Tu mensaje ha llegado. Te responderé pronto.'}
            {estado === 'error' && `No se ha podido enviar. Prueba de nuevo o escríbeme a ${EMAIL_VISIBLE}.`}
          </p>
        </form>
      </div>
    </section>
  )
}
