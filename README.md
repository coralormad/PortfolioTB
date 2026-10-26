# Portfolio · Coral de Pablos Ormad

Portfolio personal de desarrolladora Full Stack. Reúne mis proyectos, las tecnologías con las que trabajo y un formulario de contacto, con un diseño propio e interactivo.

**Web publicada:** https://coralormad.github.io/PortfolioTB/

## Qué incluye

- **Inicio:** presentación y enfoque profesional (backend con Node.js, TypeScript y PostgreSQL).
- **Proyectos:** tarjetas con tipo de proyecto, resumen corto, tecnologías utilizadas y enlaces a GitHub y a la demo.
- **Tecnologías:** stack principal con los logotipos oficiales.
- **Contacto:** formulario que se envía sin salir de la página.
- **Fondo interactivo:** constelación animada que reacciona al cursor y al scroll.

## Stack

| Área | Tecnología |
|---|---|
| Interfaz | React 19 + TypeScript |
| Build | Vite |
| Estilos | CSS Modules + variables CSS, Mobile First |
| Iconos | Logotipos oficiales de Devicon (SVG en el proyecto) y react-icons en la cabecera |
| Formulario | FormSubmit (envío AJAX) |
| Calidad | oxlint + comprobación de tipos en el build |
| Despliegue | GitHub Actions + GitHub Pages |

## Decisiones técnicas

- **Fondo en Canvas 2D, no WebGL.** Con unos 150 puntos no compensa la complejidad de WebGL. Los colores se leen de las variables CSS, la densidad se adapta al tamaño de pantalla y, con `prefers-reduced-motion`, se dibuja un único fotograma estático.
- **`IntersectionObserver` en lugar de escuchar el scroll** para saber cuándo la cabecera debe ganar opacidad (`useScrollado`) y qué sección del menú está activa (`useSeccionActiva`).
- **Un único componente `Capsula`** con dos tamaños, compartido por Tecnologías y por las tarjetas de proyecto, para no duplicar estilos.
- **Datos separados de la interfaz.** Los proyectos y las tecnologías viven en `src/data/`, tipados con TypeScript. Si un proyecto usa una tecnología que no existe, el build falla.
- **Formulario controlado.** Validación en vivo, estados de envío (`inactivo`, `enviando`, `enviado`, `error`), anuncios para lectores de pantalla y un campo trampa contra el spam.
- **Accesibilidad.** Foco visible con teclado, `aria-current` en el menú y respeto a `prefers-reduced-motion` en todas las animaciones.

## Estructura

```
.github/workflows/deploy.yml   Compilación y publicación automática en GitHub Pages
_legacy/                       Primera versión del portfolio (solo HTML y CSS)
public/img/                    Foto de perfil y capturas de proyectos
src/
├── assets/tecnologias/        Logotipos SVG de cada tecnología
├── components/
│   ├── Capsula/               Cápsula de tecnología (normal y compacta)
│   ├── Contacto/              Formulario de contacto
│   ├── Fondo/                 Fondo interactivo en canvas
│   ├── Header/                Cabecera, menú y menú móvil
│   ├── Inicio/
│   ├── Pie/
│   ├── Proyectos/
│   └── Tecnologias/
├── data/
│   ├── projects.tsx           Proyectos del portfolio
│   └── techs.tsx              Tecnologías y sus iconos
├── hooks/
│   ├── useScrollado.ts
│   └── useSeccionActiva.ts
└── styles/
    ├── tokens.css             Colores, espaciado, radios y sombras
    └── base.css               Estilos globales
```

## Uso en local

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # comprobación de tipos y build de producción en dist/
npm run preview   # sirve dist/ para revisarlo antes de publicar
npm run lint      # oxlint
```

## Añadir un proyecto

1. Si tiene captura, guárdala en `public/img/proyectos/`.
2. Añade un objeto al array de `src/data/projects.tsx` con `titulo`, `tipo`, `resumen`, `techs`, `enlace` y el resto de campos de la interfaz `Project`.
3. Si usa una tecnología nueva, añádela en `src/data/techs.tsx` (con su SVG en `src/assets/tecnologias/` si tiene logotipo).

## Despliegue

Cada push a `main` ejecuta el workflow de GitHub Actions: instala dependencias con `npm ci`, compila con `npm run build` y publica la carpeta `dist/` en GitHub Pages. También se puede lanzar a mano desde la pestaña *Actions*.

## Origen

El portfolio nació en el bootcamp de Desarrollo Web Full Stack de The Bridge como un proyecto de solo HTML y CSS (guardado en `_legacy/`) y después lo migré a React + TypeScript + Vite.

## Contacto

- GitHub: [coralormad](https://github.com/coralormad)
- LinkedIn: [Coral de Pablos Ormad](https://www.linkedin.com/in/coral-de-pablos-ormad-dev)
