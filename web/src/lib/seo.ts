import type { Lang } from "./i18n";
import { switchLangPath } from "./i18n";
import type { Concept, MediaNode } from "./content";

export const SITE_ORIGIN = (import.meta.env.SITE || "https://aitube.dev").replace(/\/+$/, "");

export function absUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${clean}`;
}

export function buildAlternates(pathname: string) {
  const zhPath = switchLangPath(pathname, "zh");
  const enPath = switchLangPath(pathname, "en");
  return {
    zh: absUrl(zhPath),
    en: absUrl(enPath),
    xDefault: absUrl(zhPath),
  };
}

export function orgAndSiteGraph(lang: Lang) {
  return [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "AITube",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/icon-512.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      name: "AITube",
      url: `${SITE_ORIGIN}/${lang}/`,
      inLanguage: lang === "zh" ? "zh-CN" : "en-US",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    },
  ];
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function buildConceptSchema(concept: Concept, nodes: MediaNode[], lang: Lang, pathname: string) {
  const loc = concept[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...orgAndSiteGraph(lang),
      buildBreadcrumbSchema([
        { name: "AITube", path: `/${lang}/` },
        { name: lang === "zh" ? "概念趋势时间线" : "Concept Timeline", path: `/${lang}/timeline/` },
        { name: loc.shortName, path: pathname },
      ]),
      {
        "@type": "DefinedTerm",
        "@id": `${absUrl(pathname)}#term`,
        name: loc.name,
        description: loc.oneLiner,
        termCode: concept.slug,
        inDefinedTermSet: absUrl(`/${lang}/timeline/`),
      },
      {
        "@type": "CollectionPage",
        name: loc.name,
        url: absUrl(pathname),
        description: `${loc.oneLiner} ${loc.whyNow}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: nodes.length,
          itemListElement: nodes.slice(0, 15).map((n, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: absUrl(`/${lang}/nodes/${n.slug}/`),
            name: n[lang].title,
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: lang === "zh" ? `${loc.shortName} 带来了什么核心范式跃迁？` : `What paradigm shift defines ${loc.shortName}?`,
            acceptedAnswer: { "@type": "Answer", text: loc.paradigmShift },
          },
          {
            "@type": "Question",
            name: lang === "zh" ? `为什么在 2026 年仍需掌握 ${loc.shortName}？` : `Why does ${loc.shortName} matter in 2026?`,
            acceptedAnswer: { "@type": "Answer", text: loc.whyNow },
          },
        ],
      },
    ],
  };
}

export function buildNodeSchema(node: MediaNode, concept: Concept | undefined, lang: Lang, pathname: string) {
  const loc = node[lang];
  const s = node.source;
  const graph: Record<string, unknown>[] = [
    ...orgAndSiteGraph(lang),
    buildBreadcrumbSchema([
      { name: "AITube", path: `/${lang}/` },
      {
        name: concept ? concept[lang].shortName : "Directory",
        path: concept ? `/${lang}/concepts/${concept.slug}/` : `/${lang}/directory/`,
      },
      { name: loc.title, path: pathname },
    ]),
    {
      "@type": "HowTo",
      name: loc.title,
      description: loc.subtitle,
      step: loc.steps.map((st, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: st.title,
        text: st.detail,
      })),
    },
  ];

  if (s.kind === "video-cut" && s.platform === "youtube" && s.videoId) {
    graph.push({
      "@type": "VideoObject",
      name: loc.title,
      description: loc.whyWatch,
      thumbnailUrl: [`https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`],
      uploadDate: "2025-01-15T00:00:00Z",
      duration: `PT${Math.max(1, (s.endSec || 60) - (s.startSec || 0))}S`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${s.videoId}?start=${s.startSec || 0}&end=${s.endSec || 60}`,
      author: { "@type": "Person", name: s.channelName },
    });
  } else {
    graph.push({
      "@type": "TechArticle",
      headline: loc.title,
      description: loc.subtitle,
      author: { "@type": "Organization", name: s.channelName },
      url: absUrl(pathname),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
