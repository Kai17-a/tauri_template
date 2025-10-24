import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const host = process.env.TAURI_DEV_HOST;

export default defineNuxtConfig({
  compatibilityDate: "2025-01-22",
  devtools: { enabled: true },
  ssr: false,
  srcDir: "./src",
  devServer: {
    host: host || "localhost",
    port: 1420,
  },
  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
      hmr: host ? { protocol: "ws", host, port: 1420 } : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      }
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ]
});
