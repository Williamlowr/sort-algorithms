import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // equivalent to 0.0.0.0
    port: 5173, // optional; use any port if 5173 is taken
  },
  preview: {
    host: true,
  },
});
