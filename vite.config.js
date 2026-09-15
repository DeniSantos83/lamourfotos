import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O base precisa ter o mesmo nome do repositório do GitHub.
export default defineConfig({
  plugins: [react()],
  base: "/lamour-react/",
});
