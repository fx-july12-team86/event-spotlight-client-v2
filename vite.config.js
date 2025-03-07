import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "/src/sass/_global.scss";
        @import "/src/sass/_variables.scss";
        @import "/src/fonts/_OswaldFont.scss";
        `
      }
    }
  }
})
