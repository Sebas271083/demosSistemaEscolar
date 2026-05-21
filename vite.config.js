import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['demo.sistemaescolar.com.ar', '147.182.128.247']
  }
})