import type { TechId } from './techs'

export interface Project {
  id: string
  titulo: string
  descripcion: string
  techs: TechId[]
  enlace: string
  textoEnlace: string
}

export const projects: Project[] = [
  {
    id: 'cleanops',
    titulo: 'CleanOps',
    descripcion:
      'PWA fullstack para la gestión de servicios de limpieza, desarrollada en solitario.',
    techs: ['react', 'typescript', 'vite', 'tailwind', 'supabase', 'postgresql'],
    enlace: 'https://github.com/coralormad/CleanOps',
    textoEnlace: 'Ver CleanOps en GitHub',
  },
  {
    id: '2tattoo',
    titulo: '2Tattoo',
    descripcion:
      'Proyecto de fin de grado dedicado a la exposición y gestión de flashes de tatuajes. Organiza las citas con el tatuador para facilitar la agilización de su agenda.',
    techs: ['php', 'javascript'],
    enlace: 'https://github.com/coralormad/2tattoo',
    textoEnlace: 'Ver en GitHub',
  },
]