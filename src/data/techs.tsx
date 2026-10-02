export interface Tech {
  nombre: string
  clase: string // clase CSS de Devicon
}

export const techs = {
  javascript: { nombre: 'JavaScript', clase: 'devicon-javascript-plain' },
  typescript: { nombre: 'TypeScript', clase: 'devicon-typescript-plain' },
  nodejs: { nombre: 'Node.js', clase: 'devicon-nodejs-plain' },
  react: { nombre: 'React', clase: 'devicon-react-original' },
  vite: { nombre: 'Vite', clase: 'devicon-vitejs-plain' },
  tailwind: { nombre: 'Tailwind CSS', clase: 'devicon-tailwindcss-plain' },
  postgresql: { nombre: 'PostgreSQL', clase: 'devicon-postgresql-plain' },
  supabase: { nombre: 'Supabase', clase: 'devicon-supabase-plain' },
  php: { nombre: 'PHP', clase: 'devicon-php-plain' },
  git: { nombre: 'Git', clase: 'devicon-git-plain' },
  azure: { nombre: 'Azure', clase: 'devicon-azure-plain' },
} satisfies Record<string, Tech>

export type TechId = keyof typeof techs

// Orden de la sección Tecnologías (el mismo que tu HTML)
export const stackPrincipal: TechId[] = [
  'javascript', 'typescript', 'nodejs', 'react', 'vite', 'tailwind',
  'postgresql', 'supabase', 'php', 'git', 'azure',
]