import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        text: {
          main: 'var(--text-main)',
          secondary: 'var(--text-secondary)',
        },
      },
    },
  },
} satisfies Config;

