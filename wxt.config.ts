import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  dev: { server: { port: 3002 } },
  webExt: { disabled: true },
  manifest: {
    name: isDev ? "Saysike (DEV)" : "Saysike",
    description: "Save money and more with Saysike!",
    icons: isDev ? { 128: "icon-dev-128.png" } : { 128: "icon-128.png" },
    permissions: ["tabs", "activeTab"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@saysike/ui": path.resolve(import.meta.dirname, "src/lib/ui/src"),
        "@saysike/utils": path.resolve(import.meta.dirname, "src/lib/utils"),
        "@saysike/http": path.resolve(import.meta.dirname, "src/lib/http"),
        "@saysike/schemas": path.resolve(
          import.meta.dirname,
          "src/lib/schemas",
        ),
      },
    },
  }),
});
