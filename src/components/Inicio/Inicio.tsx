import styles from './Inicio.module.css'

export default function Inicio() {
  return (
    <section className="seccion" id="inicio">
      <div className={styles.perfil}>
        <img
          className={styles.foto}
          src={`${import.meta.env.BASE_URL}img/foto-perfil.jpg`}
          width={200}
          height={200}
          alt="Foto de Coral de Pablos Ormad, desarrolladora Full Stack"
        />
        <div className={styles.descripcion}>
          <h1>Coral de Pablos Ormad, desarrolladora Full Stack</h1>
          <p>
            Soy Coral, desarrolladora fullstack de Sevilla, recién titulada en Desarrollo de Aplicaciones Web. Me gusta el backend: pensar cómo se estructuran los datos, quién puede ver qué y por qué una cosa falla cuando no debería. Busco mi primera oportunidad profesional en un equipo donde pueda aprender rápido y aportar desde el backend, con Node.js, TypeScript y PostgreSQL. Además, estoy formándome en Dynamics 365 y Power Platform, porque me interesa cómo se conecta el código con las necesidades reales de una empresa.
          </p>
        </div>
      </div>
    </section>
  )
}