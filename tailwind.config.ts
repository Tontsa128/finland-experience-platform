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
        aurora: '#20C997',
        snow: '#F8FAFC',
        slate: '#475569',
      },
      boxShadow: {
        card: '0 18px 50px rgba(7, 26, 43, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
