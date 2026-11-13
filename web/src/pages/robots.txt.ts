import type { APIRoute } from "astro";
import { SITE_ORIGIN } from "../lib/seo";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `# LLMs Index: ${SITE_ORIGIN}/llms.txt`,
    `# LLMs Full Corpus: ${SITE_ORIGIN}/llms-full.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
