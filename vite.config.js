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
        @import "/src/sass/_variables.scss";
        @import "/src/fonts/_OswaldFont.scss";
        `
      }
    }
  }
})
