import type { APIRoute } from "astro";
import { CONCEPTS, NODES, TAXONOMY_DIMS, getNodesByFacet } from "../lib/content";
import { LANGS } from "../lib/i18n";
import { absUrl } from "../lib/seo";

export const GET: APIRoute = () => {
  const paths: string[] = ["/"];

  for (const lang of LANGS) {
    paths.push(
      `/${lang}/`,
      `/${lang}/timeline/`,
      `/${lang}/directory/`,
      `/${lang}/roadmap/`,
      `/${lang}/vault/`
    );
    for (const c of CONCEPTS) {
      paths.push(`/${lang}/concepts/${c.slug}/`);
    }
    for (const dim of TAXONOMY_DIMS) {
      for (const item of dim.items) {
        if (getNodesByFacet(dim.key, item.slug).length >= 3) {
          paths.push(`/${lang}/topics/${dim.key}/${item.slug}/`);
        }
      }
    }
    for (const n of NODES) {
      paths.push(`/${lang}/nodes/${n.slug}/`);
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((p) => `  <url><loc>${absUrl(p)}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
