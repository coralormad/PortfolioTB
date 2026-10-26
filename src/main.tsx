import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/figtree'
import '@fontsource-variable/bricolage-grotesque'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.tsx'

if (import.meta.env.PROD) {
  console.info(
    '%c¿Revisando el código? 👀\n%cEstá en github.com/coralormad y estoy abierta a hablar.',
    'font: bold 14px sans-serif; color: #7b6cc0',
    'font: 12px sans-serif; color: #5C7FA6',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
