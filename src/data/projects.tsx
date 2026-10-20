import type { TechId } from './techs'

export interface Project {
  id: string
  titulo: string
  descripcion: string
  techs: TechId[]
  enlace: string
  textoEnlace: string
  problema: string
  solucion: string
  resultado?: string
  demo?: string
  imagen?: string // ruta dentro de public/, sin barra inicial
  alt?: string
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
    problema:
      'Las empresas de limpieza que atienden varias localidades no pueden saber con fiabilidad si sus trabajadoras han acudido al puesto, a qué hora han llegado ni si el trabajo está bien hecho. Además, el cliente necesitaba controlar el material que falta en cada centro y organizar la compra a sus proveedores.',
    solucion:
      'PWA con fichaje de entrada y salida geolocalizado; sin conexión, la trabajadora verifica su presencia con una foto en el puesto. Cada edificio o casa define fotos en puntos clave para comprobar la limpieza. Las limpiadoras consultan su horario semanal o mensual con enlace a Google Maps y declaran los productos que faltan. La gerencia ve un panel con la gráfica de fichajes cumplidos y ausentes, recopila el material por lugar y compara precios entre proveedores para optimizar la compra semanal.',
  },
  {
    id: '2tattoo',
    titulo: '2Tattoo',
    descripcion:
      'Proyecto de fin de grado dedicado a la exposición y gestión de flashes de tatuajes. Organiza las citas con el tatuador para facilitar la agilización de su agenda.',
    techs: ['php', 'javascript'],
    enlace: 'https://github.com/coralormad/2tattoo',
    textoEnlace: 'Ver en GitHub',
    problema:
      'El tatuador necesitaba un espacio propio donde organizar sus citas y exponer sus flashes en un mismo lugar.',
    solucion:
      'Aplicación web donde el cliente explora los flashes del tatuador, elige uno y lo reserva como cita. Al reservar, consulta las fechas disponibles del tatuador y puede contactar con él o ella directamente.',
  },
  {
    id: 'novenobe',
    titulo: 'NoveNoBé',
    descripcion:
      'SPA de cine con datos de TheMovieDB construida alrededor de una idea: ver / no ver.',
    techs: ['javascript'],
    enlace: 'https://github.com/coralormad/NoveNoBe',
    textoEnlace: 'Ver NoveNoBé en GitHub',
    demo: 'https://coralormad.github.io/NoveNoBe/',
    imagen: 'img/proyectos/novenobe.webp',
    alt: 'Vista Películas de NoveNoBé: anillo de géneros y carrusel 3D de carteles',
    problema:
      'El proyecto integrador de JavaScript avanzado pedía una SPA que buscara películas en TheMovieDB, mostrara en un mapa dónde se produjeron y analizara sus géneros con gráficas.',
    solucion:
      'JavaScript vanilla con módulos ES6 y clases: búsqueda con debounce y AbortController, mapa Leaflet de países de producción y un anillo de Chart.js que filtra un carrusel 3D. Añade un recomendador propio, Mi lista en localStorage y tema claro/oscuro.',
  },
]