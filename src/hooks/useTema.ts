import { useState } from 'react'

type Tema = 'dark' | 'light'

const COLOR_BARRA: Record<Tema, string> = {
  dark: '#121418',
  light: '#F3FAF7',
}

export function useTema() {
  const [tema, setTema] = useState<Tema>('dark')

  const alternar = () => {
    const nuevo: Tema = tema === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nuevo
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLOR_BARRA[nuevo])
    setTema(nuevo)
  }

  return { tema, alternar }
}
