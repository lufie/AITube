import { defineConfig } from "astro/config";

const SITE_URL = (process.env.SITE_URL || "https://aitube.dev").replace(/\/+$/, "");

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
