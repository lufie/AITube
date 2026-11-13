import type { APIRoute } from "astro";
import { absUrl } from "../lib/seo";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absUrl("/sitemap.xml")}`,
    `# LLMs Index: ${absUrl("/llms.txt")}`,
    `# LLMs Full Corpus: ${absUrl("/llms-full.txt")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
