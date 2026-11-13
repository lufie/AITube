import type { Lang } from "./i18n";
import { stripBase, switchLangPath, withBase } from "./i18n";
import type { Concept, MediaNode } from "./content";

export const SITE_ORIGIN = (import.meta.env.SITE || "https://lufie.github.io").replace(/\/+$/, "");

export function absUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${withBase(path)}`;
}

export function buildAlternates(pathname: string) {
  const clean = stripBase(pathname);
  return {
    zh: `${SITE_ORIGIN}${switchLangPath(clean, "zh")}`,
    en: `${SITE_ORIGIN}${switchLangPath(clean, "en")}`,
    xDefault: `${SITE_ORIGIN}${switchLangPath(clean, "zh")}`,
  };
}

export function orgAndSiteGraph(lang: Lang) {
  return [
    {
      "@type": "Organization",
      "@id": `${absUrl("/")}#organization`,
      name: "AITube",
      url: absUrl("/"),
      logo: absUrl("/icon-512.png"),
    },
    {
      "@type": "WebSite",
      "@id": `${absUrl("/")}#website`,
      name: "AITube",
      url: absUrl(`/${lang}/`),
      inLanguage: lang === "zh" ? "zh-CN" : "en-US",
      publisher: { "@id": `${absUrl("/")}#organization` },
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
        { name: lang === "zh" ? "概念时间线" : "Concept Timeline", path: `/${lang}/timeline/` },
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
            name: lang === "zh" ? `有了「${loc.shortName}」之后，做法跟以前有什么不同？` : `What changed once ${loc.shortName} arrived?`,
            acceptedAnswer: { "@type": "Answer", text: loc.paradigmShift },
          },
          {
            "@type": "Question",
            name: lang === "zh" ? `现在（2026 年）普通人或开发者该怎么用好「${loc.shortName}」？` : `How should you use ${loc.shortName} in 2026?`,
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
