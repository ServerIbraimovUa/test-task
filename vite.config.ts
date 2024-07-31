import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://live.devnimble.com/api/v1",
                changeOrigin: true,
                rewrite: (route) => route.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            src: "/src",
            components: "/src/components",
            pages: "/src/pages",
            assets: "/src/assets",
        },
    },
    base: "/test-task/",
});
