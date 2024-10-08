// vite.config.ts
import { defineConfig, splitVendorChunkPlugin } from "file:///C:/Users/Tal%20Yaron/Documents/gitHub/delib-5-p/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/Tal%20Yaron/Documents/gitHub/delib-5-p/node_modules/vite-plugin-pwa/dist/index.js";
import react from "file:///C:/Users/Tal%20Yaron/Documents/gitHub/delib-5-p/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { visualizer } from "file:///C:/Users/Tal%20Yaron/Documents/gitHub/delib-5-p/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var manifestPlugin = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico"],
  injectRegister: "inline",
  devOptions: {
    enabled: true
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
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
        type: "image/png"
      },
      {
        src: "./assets/logo/logo-72px.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "./assets/logo/logo-96px.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "./assets/logo/logo-128px.png",
        sizes: "128x128",
        type: "image/png"
      },
      {
        src: "./assets/logo/logo-192px.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./assets/logo/logo-512px.png",
        sizes: "512x512"
      }
    ],
    start_url: "/"
  }
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA(manifestPlugin),
    visualizer({ open: true, gzipSize: true, brotliSize: true }),
    splitVendorChunkPlugin()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUYWwgWWFyb25cXFxcRG9jdW1lbnRzXFxcXGdpdEh1YlxcXFxkZWxpYi01LXBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFRhbCBZYXJvblxcXFxEb2N1bWVudHNcXFxcZ2l0SHViXFxcXGRlbGliLTUtcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVGFsJTIwWWFyb24vRG9jdW1lbnRzL2dpdEh1Yi9kZWxpYi01LXAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBLCBWaXRlUFdBT3B0aW9ucyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuLy8gaW1wb3J0IGNvbW1vbmpzIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21tb25qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xyXG5cclxuY29uc3QgbWFuaWZlc3RQbHVnaW46IFBhcnRpYWw8Vml0ZVBXQU9wdGlvbnM+ID0ge1xyXG4gICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcclxuICAgIGluY2x1ZGVBc3NldHM6IFtcImZhdmljb24uaWNvXCJdLFxyXG4gICAgaW5qZWN0UmVnaXN0ZXI6IFwiaW5saW5lXCIsXHJcbiAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Z31cIl0sXHJcbiAgICB9LFxyXG4gICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiBcIkRlbGliIDVcIixcclxuICAgICAgICBzaG9ydF9uYW1lOiBcIkRlbGliIDVcIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZWxpYjogQnVpbGRpbmcgQ29uc2Vuc3VzXCIsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiIzQ4NkZGQVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiIzQ4NkZGQVwiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcIi4vYXNzZXRzL2xvZ28vbG9nby00OHB4LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiNDh4NDhcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCIuL2Fzc2V0cy9sb2dvL2xvZ28tNzJweC5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjcyeDcyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiLi9hc3NldHMvbG9nby9sb2dvLTk2cHgucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCI5Nng5NlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcIi4vYXNzZXRzL2xvZ28vbG9nby0xMjhweC5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjEyOHgxMjhcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCIuL2Fzc2V0cy9sb2dvL2xvZ28tMTkycHgucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiLi9hc3NldHMvbG9nby9sb2dvLTUxMnB4LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgIH0sXHJcbn07XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgVml0ZVBXQShtYW5pZmVzdFBsdWdpbiksXHJcbiAgICAgICAgdmlzdWFsaXplcih7IG9wZW46IHRydWUsIGd6aXBTaXplOiB0cnVlLCBicm90bGlTaXplOiB0cnVlIH0pLFxyXG4gICAgICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcclxuICAgIF0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVVLFNBQVMsY0FBYyw4QkFBOEI7QUFDNVgsU0FBUyxlQUErQjtBQUV4QyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxrQkFBa0I7QUFFM0IsSUFBTSxpQkFBMEM7QUFBQSxFQUM1QyxjQUFjO0FBQUEsRUFDZCxlQUFlLENBQUMsYUFBYTtBQUFBLEVBQzdCLGdCQUFnQjtBQUFBLEVBQ2hCLFlBQVk7QUFBQSxJQUNSLFNBQVM7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsRUFDbkQ7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGtCQUFrQjtBQUFBLElBQ2xCLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxNQUNIO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQUEsSUFDQSxXQUFXO0FBQUEsRUFDZjtBQUNKO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sUUFBUSxjQUFjO0FBQUEsSUFDdEIsV0FBVyxFQUFFLE1BQU0sTUFBTSxVQUFVLE1BQU0sWUFBWSxLQUFLLENBQUM7QUFBQSxJQUMzRCx1QkFBdUI7QUFBQSxFQUMzQjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
