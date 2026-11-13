import { defineConfig } from "astro/config";

const SITE_URL = (process.env.SITE_URL || "https://lufie.github.io").replace(/\/+$/, "");
const RAW_BASE = process.env.BASE_PATH || "/";
const BASE_PATH = RAW_BASE === "/" ? "/" : `/${RAW_BASE.replace(/^\/+|\/+$/g, "")}`;

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
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
