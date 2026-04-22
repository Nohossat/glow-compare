import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F0FFF4',
          100: '#C6F6D5',
          300: '#68D391',
          500: '#38A169',
          700: '#276749',
          900: '#1C4532',
        },
        secondary: {
          100: '#FFF3E4',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          600: '#EA580C',
        },
        dark: {
          bg:      '#0F1117',
          surface: '#1A1D27',
          card:    '#252836',
          border:  '#2E3347',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['Nunito', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, rgba(15,17,23,0.75), rgba(39,103,73,0.45))',
      },
    },
  },
  plugins: [],
}

export default config
