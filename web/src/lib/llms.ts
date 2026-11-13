import { CONCEPTS, ERAS, NODES, SPINE_NODES } from "./content";
import { SITE_ORIGIN } from "./seo";
import { formatTime } from "./i18n";

export function buildLlmsSummary(): string {
  const lines = [
    "# AITube — AI Concept Evolution Timeline & Verified Video Slice Index",
    "",
    "> AITube organizes modern AI (2017–2026) along two orthogonal axes: a 5-Era, 22-Concept Trend Timeline Index and a Multi-Faceted Screening Directory of 280 verified implementation video cuts and primary monographs.",
    "",
    "## Core Entry Points",
    `- Chinese Home: ${SITE_ORIGIN}/zh/`,
    `- English Home: ${SITE_ORIGIN}/en/`,
    `- Concept Trend Timeline (ZH): ${SITE_ORIGIN}/zh/timeline/`,
    `- Concept Trend Timeline (EN): ${SITE_ORIGIN}/en/timeline/`,
    `- Multi-Faceted Directory (ZH): ${SITE_ORIGIN}/zh/directory/`,
    `- Multi-Faceted Directory (EN): ${SITE_ORIGIN}/en/directory/`,
    `- 4-Stage Learning Roadmap (ZH): ${SITE_ORIGIN}/zh/roadmap/`,
    `- Full Machine Corpus: ${SITE_ORIGIN}/llms-full.txt`,
    "",
    "## 22 Canonical AI Concepts (Chronological Evolution)",
  ];

  for (const era of ERAS) {
    lines.push("", `### ${era.period} — ${era.en.title} / ${era.zh.title}`);
    for (const c of CONCEPTS.filter((x) => x.eraId === era.id)) {
      lines.push(
        `- [${c.en.name} / ${c.zh.name}](${SITE_ORIGIN}/en/concepts/${c.slug}/) (${c.originQuarter} → ${c.inflectionQuarter}, ${c.lifecycle}): ${c.en.oneLiner}`
      );
    }
  }

  lines.push("", "## Flagship Spine Cuts (52 Primary Nodes)");
  for (const n of SPINE_NODES) {
    lines.push(`- [${n.en.title}](${SITE_ORIGIN}/en/nodes/${n.slug}/) — ${n.source.channelName}: ${n.en.whyWatch}`);
  }

  return lines.join("\n") + "\n";
}

export function buildLlmsFull(): string {
  const lines = [
    buildLlmsSummary().trimEnd(),
    "",
    "---",
    "",
    `## Complete Verified Node Catalog (${NODES.length} Cuts)`,
  ];

  for (const n of NODES) {
    const s = n.source;
    const win =
      s.kind === "video-cut"
        ? `${formatTime(s.startSec || 0)}–${formatTime(s.endSec || 0)}`
        : `${s.readingMinutes || 10}m monograph`;
    lines.push(
      "",
      `### ${n.order}. ${n.en.title} / ${n.zh.title}`,
      `- URL (ZH): ${SITE_ORIGIN}/zh/nodes/${n.slug}/`,
      `- URL (EN): ${SITE_ORIGIN}/en/nodes/${n.slug}/`,
      `- Primary Concept: \`${n.primaryConcept}\` (${n.conceptRole})`,
      `- Source: ${s.channelName} (${s.platform}, ${win}) — "${s.originalTitle}"`,
      `- Why Watch: ${n.en.whyWatch}`,
      `- Steps: ${n.en.steps.map((st, idx) => `(${idx + 1}) ${st.title}`).join("; ")}`,
      `- 2026 Patch: ${n.en.versionPatch}`
    );
  }

  return lines.join("\n") + "\n";
}
