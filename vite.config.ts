import { defineConfig, splitVendorChunkPlugin } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
// import commonjs from "vite-plugin-commonjs";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

const manifestPlugin: Partial<VitePWAOptions> = {
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    injectRegister: "inline",
    devOptions: {
        enabled: true,
    },
    workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    manifest: {
        name: "Delib 5",
        short_name: "Delib 5",
        description: "Delib: Building Consensus",
        theme_color: "#486FFA",
        background_color: "#486FFA",
        display: "standalone",
        orientation: "portrait",
        icons: [
            {
                src: "./assets/logo/logo-48px.png",
                sizes: "48x48",
                type: "image/png",
            },
            {
                src: "./assets/logo/logo-72px.png",
                sizes: "72x72",
                type: "image/png",
            },
            {
                src: "./assets/logo/logo-96px.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                src: "./assets/logo/logo-128px.png",
                sizes: "128x128",
                type: "image/png",
            },
            {
                src: "./assets/logo/logo-192px.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "./assets/logo/logo-512px.png",
                sizes: "512x512",
            },
        ],
        start_url: "/",
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA(manifestPlugin),
        visualizer({ open: true, gzipSize: true, brotliSize: true }),
        splitVendorChunkPlugin(),
    ],
});
