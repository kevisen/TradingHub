/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        background: '#0E1116',
        panel: '#141922',
        border: '#2A3441',
        primaryText: '#E2E8F0',
        secondaryText: '#94A3B8',
        accent: '#3B82F6',
        profit: '#22C55E',
        loss: '#EF4444'
      },
      fontFamily: {
        ui: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
      }
    }
  },
  plugins: []
}
