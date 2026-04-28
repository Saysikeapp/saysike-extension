import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { Plugin } from "vite";
import { EnvironmentVariables } from "@/types/env.types";

const isDev = process.env.NODE_ENV === "development";

/** Fails the build immediately if any required env var is missing or empty. */
function assertEnvPlugin(): Plugin {
  const required = Object.keys({
    WXT_BASE_CLIENT_URI: true,
    WXT_BASE_SERVER_URI: true,
  } satisfies Record<keyof EnvironmentVariables, true>) as Array<
    keyof EnvironmentVariables
  >;
  return {
    name: "assert-env",
    apply: "build",
    buildStart() {
      const missing = required.filter((k) => !process.env[k]);
      if (missing.length > 0) {
        throw new Error(
          `Build failed — missing required env vars: ${missing.join(", ")}\n` +
            `Set them in .env.production or as CI environment variables.`,
        );
      }
    },
  };
}

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
    plugins: [tailwindcss(), assertEnvPlugin()],
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
