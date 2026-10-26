import javascript from '../assets/tecnologias/javascript.svg'
import typescript from '../assets/tecnologias/typescript.svg'
import nodejs from '../assets/tecnologias/nodejs.svg'
import react from '../assets/tecnologias/react.svg'
import vite from '../assets/tecnologias/vite.svg'
import tailwind from '../assets/tecnologias/tailwind.svg'
import postgresql from '../assets/tecnologias/postgresql.svg'
import supabase from '../assets/tecnologias/supabase.svg'
import php from '../assets/tecnologias/php.svg'
import git from '../assets/tecnologias/git.svg'
import azure from '../assets/tecnologias/azure.svg'

export type TechId =
  | 'javascript'
  | 'typescript'
  | 'nodejs'
  | 'react'
  | 'vite'
  | 'tailwind'
  | 'postgresql'
  | 'supabase'
  | 'php'
  | 'git'
  | 'azure'
  | 'tmdb'
  | 'leaflet'
  | 'chartjs'

export interface Tech {
  nombre: string
  icono?: string
}

export const techs: Record<TechId, Tech> = {
  javascript: { nombre: 'JavaScript', icono: javascript },
  typescript: { nombre: 'TypeScript', icono: typescript },
  nodejs: { nombre: 'Node.js', icono: nodejs },
  react: { nombre: 'React', icono: react },
  vite: { nombre: 'Vite', icono: vite },
  tailwind: { nombre: 'Tailwind CSS', icono: tailwind },
  postgresql: { nombre: 'PostgreSQL', icono: postgresql },
  supabase: { nombre: 'Supabase', icono: supabase },
  php: { nombre: 'PHP', icono: php },
  git: { nombre: 'Git', icono: git },
  azure: { nombre: 'Azure', icono: azure },
  tmdb: { nombre: 'TheMovieDB API' },
  leaflet: { nombre: 'Leaflet' },
  chartjs: { nombre: 'Chart.js' },
}

export const stackPrincipal: TechId[] = [
  'javascript', 'typescript', 'nodejs', 'react', 'vite', 'tailwind',
  'postgresql', 'supabase', 'php', 'git', 'azure',
]
