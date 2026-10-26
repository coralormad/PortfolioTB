import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import Proyectos from './components/Proyectos/Proyectos'
import Tecnologias from './components/Tecnologias/Tecnologias'
import Fondo from './components/Fondo/Fondo'
import Contacto from './components/Contacto/Contacto'
import Pie from './components/Pie/Pie'

function App() {
  return (
    <>
      <Fondo />
      <Header />
      <main>
        <Inicio />
        <Proyectos />
        <Tecnologias />
        <Contacto />
      </main>
      <Pie />
    </>
  )
}

export default App
