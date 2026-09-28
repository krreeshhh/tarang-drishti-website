/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purewhite: '#ffffff',
        subtlegray: '#f8fafc',
        surfacegray: '#f1f5f9',
        borderlight: '#e2e8f0',
        borderdark: '#cbd5e1',
        charcoal: '#0f172a',
        charcoalsoft: '#334155',
        rfcopper: '#c25e00',
        rflband: '#0284c7',
        rfuhf: '#4f46e5',
        rfgreen: '#059669',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
