import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": resolve(__dirname, "./src/components"),
            "@services": resolve(__dirname, "./src/services"),
            "@stores": resolve(__dirname, "./src/stores"),
            "@assets": resolve(__dirname, "./src/assets"),
            "@pages": resolve(__dirname, "./src/pages"),
            "@types": resolve(__dirname, "./src/types"),
            "@utils": resolve(__dirname, "./src/utils"),
        },
    },
    server: {
        port: 5173,
    },
});
