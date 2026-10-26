import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import Proyectos from './components/Proyectos/Proyectos'
import Tecnologias from './components/Tecnologias/Tecnologias'
import Fondo from './components/Fondo/Fondo'

function App() {
  return (
    <>
      <Fondo />
      <Header />
      <main>
        <Inicio />
        <Proyectos />
        <Tecnologias />
        <section id="contacto" className="seccion"><h2>Contacto</h2></section>
      </main>
    </>
  )
}

export default App
