import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "/src/sass/variables.scss";
        @import "/public/fonts/OswaldFont.scss";
        `
      }
    }
  },
  base: '/event-spotlight-client-v2',
})
