import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/confi
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
  },
});
