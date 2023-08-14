import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const brand = colors.rose;
const neutrals = colors.slate;
const success = colors.emerald;
const warning = colors.amber;
const error = colors.red;
const accent = brand[500];
const lightBg = neutrals[100];
const darkBg = neutrals[800];
const lightBaseText = neutrals[800];
const lightSubText = neutrals[400];
const darkBaseText = neutrals[100];
const darkSubText = neutrals[500];

const colorThemes = Object.freeze({
  light: lightBg,
  dark: darkBg,
  accent: accent,
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
          base: lightBaseText,
          sub: lightSubText,
        },
        dark: {
          base: darkBaseText,
          sub: darkSubText,
        },
        accent: accent,
      },
      backgroundColor: colorThemes,
      fill: colorThemes,
      stroke: colorThemes,
      colors: {
        brand: brand,
        neutrals: neutrals,
        success: success,
        warning: warning,
        error: error,
        accent: accent,
      },
    },
  },
  plugins: [],
} satisfies Config;
