import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Como o site usará domínio próprio, a base deve ser a raiz.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
