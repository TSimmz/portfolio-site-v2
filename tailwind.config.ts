import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const colorThemes = Object.freeze({
  light: colors.slate[100],
  dark: colors.slate[800],
  accent: colors.rose[500],
});

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '425px',
      },
      textColor: {
        light: {
          base: colors.slate[800],
          sub: colors.slate[400],
        },
        dark: {
          base: colors.slate[100],
          sub: colors.slate[500],
        },
        accent: colors.rose[500],
      },
      backgroundColor: colorThemes,
      fill: colorThemes,
      stroke: colorThemes,
      colors: {
        brand: colors.rose,
        neutrals: colors.slate,
        success: colors.emerald,
        warning: colors.amber,
        error: colors.red,
        accent: colors.rose[500],
      },
    },
  },
  plugins: [],
} satisfies Config;
