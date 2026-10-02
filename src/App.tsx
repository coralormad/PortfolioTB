import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import Proyectos from './components/Proyectos/Proyectos'
import Tecnologias from './components/Tecnologias/Tecnologias'

function App() {
  return (
    <>
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