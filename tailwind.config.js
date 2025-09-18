/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(214, 30%, 12%)',
        accent: 'hsl(204, 96%, 55%)',
        primary: 'hsl(210, 95%, 45%)',
        surface: 'hsl(214, 35%, 15%)',
        'text-primary': 'hsl(0, 0%, 90%)',
        'text-secondary': 'hsl(0, 0%, 70%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 2px 10px hsla(0, 0%, 0%, 0.2)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      }
    },
  },
  plugins: [],
}
