import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    // NEXTUI
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        headingExtraLight: ['Heading Pro Trial Extra Light', 'sans-serif'],
        headingLight: ['Heading Pro Trial Light', 'sans-serif'],
        heading: ['Heading Pro Trial', 'sans-serif'],
        headingThin: ['Heading Pro Trial Thin', 'sans-serif'],
        headingBold: ['Heading Pro Trial Bold', 'sans-serif'],
        headingExtraBold: ['Heading Pro Trial Extra Bold', 'sans-serif'],
        headingHeavy: ['Heading Pro Trial Heavy', 'sans-serif'],
        chineseRocksRegular: ['ChineseRocks Regular', 'sans-serif'],
        monumentExtendedUltraBold: ['MonumentExtended Ultrabold', 'sans-serif'],
        monumentExtendedRegular: ['MonumentExtended Regular', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(), addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}

export default config
