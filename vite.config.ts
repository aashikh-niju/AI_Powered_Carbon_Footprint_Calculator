import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AI_Powered_Carbon_Footprint_Calculator/', // 👈 IMPORTANT
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
