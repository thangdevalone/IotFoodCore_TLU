import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from 'vite-tsconfig-paths';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), pluginRewriteAll()],
  server: {
    open: true,
  },
 
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
