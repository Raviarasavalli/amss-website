import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on 0.0.0.0 so mobile devices on the local Wi-Fi network can connect
  },
  build: {
    target: 'es2015', // Ensures JS bundle works on older Android & iOS mobile browsers
  },
})
