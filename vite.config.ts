import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const configBabelForDev = () => {
  // if (process.env.NODE_ENV !== "development") return;
  return {
    babel: {
      plugins: [
        [
          "babel-plugin-styled-components",
          {
            displayName: true,
            fileName: false
          }
        ]
      ]
    }
  };
};

export default defineConfig({
  plugins: [react(configBabelForDev())],
  server: {
    cors: { origin: '*' },
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/payments': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
});
