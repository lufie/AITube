import conceptsRaw from "../../../content/concepts.json";
import nodesRaw from "../../../content/nodes.json";
import taxonomyRaw from "../../../content/taxonomy.json";
import stagesRaw from "../../../content/stages.json";
import vaultRaw from "../../../content/vault.json";
import type { Lang, Lifecycle } from "./i18n";

export interface Era {
  id: string;
  period: string;
  en: { title: string; subtitle: string };
  zh: { title: string; subtitle: string };
}

export interface ConceptLocale {
  name: string;
  shortName: string;
  oneLiner: string;
  paradigmShift: string;
  whyNow: string;
}

export interface Concept {
  slug: string;
  order: number;
  eraId: string;
  originQuarter: string;
  inflectionQuarter: string;
  domain: string;
  lifecycle: Lifecycle;
  momentum: string;
  trendSeries: number[];
  inflectionIndex: number;
  lineage: { from: string[]; into: string[] };
  en: ConceptLocale;
  zh: ConceptLocale;
}

export interface NodeStep {
  title: string;
  detail: string;
}

export interface NodeTool {
  name: string;
  url: string;
  tag: string;
  desc: string;
}

export interface NodeLocale {
  title: string;
  subtitle: string;
  whyWatch: string;
  steps: NodeStep[];
  versionPatch: string;
  checklist: string[];
  tools: NodeTool[];
  searchQuestions: string[];
}

export interface NodeSource {
  kind: "video-cut" | "article-digest";
  platform: "youtube" | "bilibili" | "web";
  videoId?: string;
  articleUrl?: string;
  channelName: string;
  originalTitle: string;
  totalDurationSec?: number;
  startSec?: number;
  endSec?: number;
  readingMinutes?: number;
  isShort?: boolean;
  videosReviewedCount: number;
  hoursSaved: number;
}

export interface MediaNode {
  slug: string;
  order: number;
  isSpine: boolean;
  primaryConcept: string;
  conceptIds: string[];
  conceptRole: "origin" | "practice" | "frontier";
  stageId: string;
  vaultId: string;
  facets: {
    domains: string[];
    tasks: string[];
    stacks: string[];
    difficulty: string;
    openness: string;
  };
  source: NodeSource;
  en: NodeLocale;
  zh: NodeLocale;
}

export interface TaxonomyItem {
  slug: string;
  en: { name: string; desc: string };
  zh: { name: string; desc: string };
}

export interface TaxonomyDimension {
  key: "domain" | "task" | "stack";
  prop: "domains" | "tasks" | "stacks";
  en: { label: string; pluralLabel: string };
  zh: { label: string; pluralLabel: string };
  items: TaxonomyItem[];
}

export interface Stage {
  id: string;
  order: number;
  badge: string;
  en: { code: string; title: string; summary: string };
  zh: { code: string; title: string; summary: string };
}

export interface VaultItem {
  id: string;
  code: string;
  conceptSlug: string;
  en: { title: string; tag: string; summary: string; items: string[]; previewSnippet: string };
  zh: { title: string; tag: string; summary: string; items: string[]; previewSnippet: string };
}

export const ERAS: Era[] = conceptsRaw.eras as Era[];
export const SERIES_LABELS: string[] = conceptsRaw.seriesLabels;
export const CONCEPTS: Concept[] = (conceptsRaw.concepts as Concept[]).slice().sort((a, b) => a.order - b.order);
export const NODES: MediaNode[] = (nodesRaw as MediaNode[]).slice().sort((a, b) => a.order - b.order);
export const SPINE_NODES: MediaNode[] = NODES.filter((n) => n.isSpine);
export const TAXONOMY_DIMS: TaxonomyDimension[] = taxonomyRaw.dimensions as TaxonomyDimension[];
export const SYNONYMS: Record<string, string[]> = taxonomyRaw.synonyms;
export const STAGES: Stage[] = (stagesRaw as Stage[]).slice().sort((a, b) => a.order - b.order);
export const VAULT_ITEMS: VaultItem[] = vaultRaw as VaultItem[];

const conceptBySlug = new Map(CONCEPTS.map((c) => [c.slug, c]));
const eraById = new Map(ERAS.map((e) => [e.id, e]));
const nodeBySlug = new Map(NODES.map((n) => [n.slug, n]));

export function getConcept(slug: string): Concept | undefined {
  return conceptBySlug.get(slug);
}

export function getEra(id: string): Era | undefined {
  return eraById.get(id);
}

export function getNode(slug: string): MediaNode | undefined {
  return nodeBySlug.get(slug);
}

export function getNodesForConcept(conceptSlug: string): MediaNode[] {
  const primary = NODES.filter((n) => n.primaryConcept === conceptSlug);
  const secondary = NODES.filter((n) => n.primaryConcept !== conceptSlug && n.conceptIds.includes(conceptSlug));
  return [...primary, ...secondary];
}

export function getRepresentativeConceptCuts(conceptSlug: string, limit = 3): MediaNode[] {
  const all = getNodesForConcept(conceptSlug);
  const spineFirst = [...all].sort((a, b) => Number(b.isSpine) - Number(a.isSpine) || a.order - b.order);
  const roles: Array<"origin" | "practice" | "frontier"> = ["origin", "practice", "frontier"];
  const picked: MediaNode[] = [];
  const used = new Set<string>();
  for (const r of roles) {
    const found = spineFirst.find((n) => n.conceptRole === r && !used.has(n.slug));
    if (found) {
      picked.push(found);
      used.add(found.slug);
    }
  }
  for (const n of spineFirst) {
    if (picked.length >= limit) break;
    if (!used.has(n.slug)) {
      picked.push(n);
      used.add(n.slug);
    }
  }
  return picked.slice(0, limit);
}

export function getNodesByFacet(dimKey: "domain" | "task" | "stack", slug: string): MediaNode[] {
  const prop = dimKey === "domain" ? "domains" : dimKey === "task" ? "tasks" : "stacks";
  return NODES.filter((n) => n.facets[prop].includes(slug));
}

export function getFacetItem(dimKey: "domain" | "task" | "stack", slug: string) {
  const dim = TAXONOMY_DIMS.find((d) => d.key === dimKey);
  const item = dim?.items.find((i) => i.slug === slug);
  return dim && item ? { dim, item } : undefined;
}

export function getAdjacentNodes(slug: string): { prev?: MediaNode; next?: MediaNode } {
  const idx = NODES.findIndex((n) => n.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? NODES[idx - 1] : undefined,
    next: idx < NODES.length - 1 ? NODES[idx + 1] : undefined,
  };
}

export function getWaveformBars(seed: string, count = 28): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    h ^= i * 374761393;
    h = Math.imul(h, 668265263);
    const norm = ((h >>> 0) % 72) + 22;
    bars.push(norm);
  }
  return bars;
}

export function buildSparklineGeometry(series: number[], width = 180, height = 44, pad = 5) {
  const w = width - pad * 2;
  const h = height - pad * 2;
  const points = series.map((val, idx) => {
    const x = +(pad + (w * idx) / Math.max(1, series.length - 1)).toFixed(1);
    const clamped = Math.max(4, Math.min(100, val));
    const y = +(pad + h - (h * clamped) / 100).toFixed(1);
    return { x, y, val };
  });
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pad},${height - pad} ${polyline} ${width - pad},${height - pad}`;

  let path = "";
  if (points.length > 0) {
    path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const dx = +((p1.x - p0.x) * 0.42).toFixed(1);
      path += ` C ${+(p0.x + dx).toFixed(1)},${p0.y} ${+(p1.x - dx).toFixed(1)},${p1.y} ${p1.x},${p1.y}`;
    }
  }
  const bottomY = +(height - pad).toFixed(1);
  const areaPath =
    points.length > 0
      ? `${path} L ${points[points.length - 1].x},${bottomY} L ${points[0].x},${bottomY} Z`
      : "";

  return { points, polyline, area, path, areaPath };
}

/**
 * Piecewise chronological coordinate (0..100) compressing 2017–2021 origins
 * while giving 2022–2026 frontier quarters high visual resolution.
 */
export function quarterToNorm(qStr: string): number {
  const m = qStr.trim().match(/^(\d{4})\s*Q([1-4])$/i);
  const dec = m ? Number(m[1]) + (Number(m[2]) - 1) * 0.25 : 2024.0;
  const stops: Array<[number, number]> = [
    [2017.0, 1.5],
    [2022.0, 17.5],
    [2024.0, 44.5],
    [2025.0, 65.5],
    [2026.0, 86.5],
    [2026.75, 97.5],
  ];
  if (dec <= stops[0][0]) return stops[0][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, p0] = stops[i];
    const [t1, p1] = stops[i + 1];
    if (dec <= t1) {
      return p0 + ((dec - t0) / (t1 - t0)) * (p1 - p0);
    }
  }
  return stops[stops.length - 1][1];
}

export interface HorizonNodePos {
  concept: Concept;
  laneKey: string;
  xOrigin: number;
  xInflect: number;
  y: number;
  labelLeft: boolean;
}

export interface HorizonEdge {
  from: string;
  to: string;
  d: string;
}

export function buildHorizonLayout(lang: Lang) {
  const SVG_W = 1140;
  const LEFT_GUTTER = 184;
  const RIGHT_PAD = 28;
  const PLOT_W = SVG_W - LEFT_GUTTER - RIGHT_PAD;

  const toX = (qStr: string) => +(LEFT_GUTTER + (quarterToNorm(qStr) / 100) * PLOT_W).toFixed(1);

  const laneDefs = [
    { key: "foundations", zh: "底层架构底座", en: "Foundations", sub: "Attention · BPE · Scaling" },
    { key: "frontier-models", zh: "基座与后训练", en: "Frontier & Post-Train", sub: "RLHF · 1M · RLVR · World" },
    { key: "ai-engineering", zh: "智能体与工程系统", en: "Agentic Engineering", sub: "Prompt · RAG · MCP · Skills" },
    { key: "coding-multimodal", zh: "自主编程与多模态", en: "Coding & Multimodal", sub: "Diffusion · Comfy · CLI" },
  ];

  const TRACK_H = 26;
  const LANE_PAD_TOP = 14;
  const LANE_PAD_BOT = 12;

  let curY = 44; // top axis header height
  const lanes: Array<{
    key: string;
    title: string;
    sub: string;
    yTop: number;
    height: number;
  }> = [];
  const nodes: HorizonNodePos[] = [];

  for (const ld of laneDefs) {
    const laneConcepts = CONCEPTS.filter((c) => c.domain === ld.key).sort(
      (a, b) => quarterToNorm(a.inflectionQuarter) - quarterToNorm(b.inflectionQuarter) || a.order - b.order
    );
    const trackEnds: number[] = [];

    const staged: Array<{ c: Concept; x1: number; x2: number; track: number; labelLeft: boolean }> = [];
    for (const c of laneConcepts) {
      const x1 = toX(c.originQuarter);
      const x2 = Math.max(x1 + 18, toX(c.inflectionQuarter));
      const labelText = c[lang].shortName;
      const estLabelW = Math.min(165, labelText.length * (lang === "zh" ? 11.5 : 6.6) + 34);
      const labelLeft = x2 + estLabelW > SVG_W - 14;
      const occStart = labelLeft ? Math.max(LEFT_GUTTER, x1 - estLabelW - 8) : x1 - 8;
      const occEnd = labelLeft ? x2 + 16 : x2 + estLabelW + 14;

      let assigned = -1;
      for (let t = 0; t < trackEnds.length; t++) {
        if (trackEnds[t] <= occStart) {
          assigned = t;
          trackEnds[t] = occEnd;
          break;
        }
      }
      if (assigned === -1) {
        assigned = trackEnds.length;
        trackEnds.push(occEnd);
      }
      staged.push({ c, x1, x2, track: assigned, labelLeft });
    }

    const trackCount = Math.max(1, trackEnds.length);
    const laneH = LANE_PAD_TOP + trackCount * TRACK_H + LANE_PAD_BOT;
    lanes.push({
      key: ld.key,
      title: ld[lang],
      sub: ld.sub,
      yTop: curY,
      height: laneH,
    });

    for (const st of staged) {
      const y = +(curY + LANE_PAD_TOP + st.track * TRACK_H + TRACK_H * 0.5).toFixed(1);
      nodes.push({
        concept: st.c,
        laneKey: ld.key,
        xOrigin: st.x1,
        xInflect: st.x2,
        y,
        labelLeft: st.labelLeft,
      });
    }
    curY += laneH;
  }

  const posMap = new Map(nodes.map((n) => [n.concept.slug, n]));
  const edges: HorizonEdge[] = [];
  for (const n of nodes) {
    for (const targetSlug of n.concept.lineage.into) {
      const target = posMap.get(targetSlug);
      if (!target) continue;
      const sx = n.xInflect;
      const sy = n.y;
      const tx = target.xInflect;
      const ty = target.y;
      const dx = Math.max(36, Math.abs(tx - sx) * 0.48);
      const cyOffset = Math.abs(ty - sy) < 6 ? -18 : 0;
      const d = `M ${sx},${sy} C ${+(sx + dx).toFixed(1)},${+(sy + cyOffset).toFixed(1)} ${+(tx - dx).toFixed(1)},${+(ty + cyOffset).toFixed(1)} ${tx},${ty}`;
      edges.push({ from: n.concept.slug, to: targetSlug, d });
    }
  }

  const axisTicks = [
    { label: "2017", q: "2017 Q1" },
    { label: "2020", q: "2020 Q1" },
    { label: "2022", q: "2022 Q1" },
    { label: "2023", q: "2023 Q1" },
    { label: "2024", q: "2024 Q1" },
    { label: "2025", q: "2025 Q1" },
    { label: "2026", q: "2026 Q1" },
  ].map((tk) => ({ label: tk.label, x: toX(tk.q) }));

  return {
    width: SVG_W,
    height: curY + 12,
    leftGutter: LEFT_GUTTER,
    axisTicks,
    lanes,
    nodes,
    edges,
  };
}

export type InlineToken = { type: "text"; value: string } | { type: "op"; value: string };

export function tokenizeInlineOps(text: string): InlineToken[] {
  const parts = text.split(/(`[^`]+`)/g);
  const out: InlineToken[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      out.push({ type: "op", value: part.slice(1, -1) });
    } else {
      out.push({ type: "text", value: part });
    }
  }
  return out;
}

export function getTotalHoursSaved(): number {
  return Math.round(NODES.reduce((acc, n) => acc + (n.source.hoursSaved || 0), 0));
}

export function splitParadigmShift(raw: string): { before: string; after: string } {
  const parts = raw.split(/\s*→\s*/);
  if (parts.length >= 2) {
    return { before: parts[0].trim(), after: parts.slice(1).join(" → ").trim() };
  }
  return { before: "", after: raw };
}
