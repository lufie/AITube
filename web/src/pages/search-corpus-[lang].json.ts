import type { APIRoute } from "astro";
import { CONCEPTS, NODES, SYNONYMS, getConcept } from "../lib/content";
import { LANGS, LIFECYCLE_META, formatTime, type Lang } from "../lib/i18n";

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = ({ params }) => {
  const lang = (params.lang || "zh") as Lang;
  const items: Array<{ badge: string; title: string; sub: string; href: string; tags: string }> = [];

  for (const c of CONCEPTS) {
    const syn = (SYNONYMS[c.slug] || []).join(" ");
    items.push({
      badge: `CONCEPT · ${c.originQuarter} → ${c.inflectionQuarter} · ${LIFECYCLE_META[c.lifecycle][lang]}`,
      title: c[lang].name,
      sub: c[lang].oneLiner,
      href: `/${lang}/concepts/${c.slug}/`,
      tags: `${c.en.name} ${c.zh.name} ${c[lang].paradigmShift} ${syn}`,
    });
  }

  for (const n of NODES) {
    const c = getConcept(n.primaryConcept);
    const s = n.source;
    const win =
      s.kind === "video-cut"
        ? `${formatTime(s.startSec || 0)}–${formatTime(s.endSec || 0)}`
        : `${s.readingMinutes || 10}m`;
    items.push({
      badge: `${c ? c[lang].shortName : n.primaryConcept} · ${s.channelName} (${win})`,
      title: n[lang].title,
      sub: n[lang].whyWatch,
      href: `/${lang}/nodes/${n.slug}/`,
      tags: `${n[lang].searchQuestions.join(" ")} ${n.facets.stacks.join(" ")} ${n.facets.tasks.join(" ")}`,
    });
  }

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
