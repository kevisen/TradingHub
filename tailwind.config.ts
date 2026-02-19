import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(229 231 235)',
        input: 'rgb(243 244 246)',
        ring: 'rgb(59 130 246)',
        background: 'rgb(255 255 255)',
        foreground: 'rgb(15 23 42)',
        primary: {
          DEFAULT: 'rgb(15 23 42)',
          foreground: 'rgb(255 255 255)',
        },
        secondary: {
          DEFAULT: 'rgb(243 244 246)',
          foreground: 'rgb(15 23 42)',
        },
        destructive: {
          DEFAULT: 'rgb(239 68 68)',
          foreground: 'rgb(255 255 255)',
        },
        muted: {
          DEFAULT: 'rgb(243 244 246)',
          foreground: 'rgb(107 114 128)',
        },
        accent: {
          DEFAULT: 'rgb(59 130 246)',
          foreground: 'rgb(255 255 255)',
        },
        popover: {
          DEFAULT: 'rgb(255 255 255)',
          foreground: 'rgb(15 23 42)',
        },
        card: {
          DEFAULT: 'rgb(255 255 255)',
          foreground: 'rgb(15 23 42)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
