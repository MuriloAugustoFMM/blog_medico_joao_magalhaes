import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta unificada com a home (Dr. João Magalhães)
        ink: '#09284a',          // era #0D1B2A
        navy: '#062d63',         // era #1B3A52 — agora o azul profundo da hero
        navyLight: '#0a3d85',    // era #2C5F7A
        teal: '#087ff5',         // era #2A9D8F — agora o azul de destaque (CTAs, links)
        tealDark: '#066fd7',     // era #238d80
        slate: '#5b6b7d',        // era #6B7A8D
        slateLight: '#8fc0ff',   // era #8FBBCF — azul claro p/ texto sobre fundo navy
        border: '#E8EDF2',
        bg: '#f5f9fd',           // era #F7F9FC — igual ao fundo da home
        blue: '#C8D9E4',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
