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
  return { points, polyline, area };
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
