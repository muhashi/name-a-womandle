import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/name-a-womandle/', // https://vitejs.dev/guide/static-deploy.html#github-pages
  plugins: [react()],
});
