import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#071A2B',
        brand: '#1D4ED8',
        'brand-dark': '#173EA5',
        terracotta: '#C96A4A',
        'terracotta-soft': '#F4E1D9',
        snow: '#FFFFFF',
        slate: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
          400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
          800: '#1e293b', 900: '#0f172a', DEFAULT: '#475569',
        },
        border: 'hsl(var(--border))',
      },
      boxShadow: {
        card: '0 18px 50px rgba(7, 26, 43, 0.10)',
        hero: '0 30px 80px rgba(7, 26, 43, 0.28)',
      },
      fontFamily: { sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};

export default config;
