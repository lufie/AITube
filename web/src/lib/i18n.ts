export type Lang = "zh" | "en";
export const LANGS: readonly Lang[] = ["zh", "en"] as const;

export type Lifecycle = "surging" | "mainstream" | "foundational" | "evolved";

export function isLang(val: string | undefined): val is Lang {
  return val === "zh" || val === "en";
}

export function otherLang(lang: Lang): Lang {
  return lang === "zh" ? "en" : "zh";
}

export function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, "0")}`;
}

export function formatSliceMinutes(startSec: number, endSec: number, lang: Lang): string {
  const mins = Math.max(1, Math.round(((endSec - startSec) / 60) * 10) / 10);
  return lang === "zh" ? `${mins} 分钟精切` : `${mins}m cut`;
}

export const BASE_PREFIX = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export function withBase(path: string): string {
  if (!path || path === "/") return `${BASE_PREFIX}/`;
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (BASE_PREFIX && (clean === BASE_PREFIX || clean.startsWith(`${BASE_PREFIX}/`))) {
    return clean;
  }
  return `${BASE_PREFIX}${clean}`;
}

export function stripBase(pathname: string): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (BASE_PREFIX && clean === BASE_PREFIX) return "/";
  if (BASE_PREFIX && clean.startsWith(`${BASE_PREFIX}/`)) {
    return clean.slice(BASE_PREFIX.length) || "/";
  }
  return clean;
}

export function switchLangPath(pathname: string, target: Lang): string {
  const clean = stripBase(pathname);
  const replaced = clean.replace(/^\/(zh|en)(\/|$)/, `/${target}/`);
  const rel = replaced === clean ? `/${target}/` : replaced.endsWith("/") ? replaced : `${replaced}/`;
  return withBase(rel);
}

export const LIFECYCLE_META: Record<Lifecycle, { icon: string; en: string; zh: string }> = {
  surging: { icon: "▲", en: "Surging 2026", zh: "前沿爆发" },
  mainstream: { icon: "●", en: "Production Mainstream", zh: "生产主流" },
  foundational: { icon: "◆", en: "Evergreen Foundation", zh: "常青底座" },
  evolved: { icon: "↻", en: "Evolved Paradigm", zh: "范式已演进" },
};

export const ROLE_META: Record<"origin" | "practice" | "frontier", { en: string; zh: string }> = {
  origin: { en: "Origin & Intuition", zh: "奠基直觉" },
  practice: { en: "Production Build", zh: "工程实操" },
  frontier: { en: "2026 Frontier", zh: "前沿演进" },
};

export const DIFFICULTY_META: Record<string, { en: string; zh: string }> = {
  intro: { en: "Intuition", zh: "零门槛直觉" },
  builder: { en: "Builder", zh: "工程实操" },
  advanced: { en: "Deep Mech", zh: "底层硬核" },
};

export const OPENNESS_META: Record<string, { en: string; zh: string }> = {
  open: { en: "Open Source / Weights", zh: "开源权重与协议" },
  hybrid: { en: "Open + Frontier API", zh: "开源框架 + 前沿API" },
  proprietary: { en: "Commercial Stack", zh: "商业闭源栈" },
};

export const UI = {
  zh: {
    siteName: "AITube",
    tagline: "AI 概念演进脉络 × 高信噪比实战视频切片库",
    navTimeline: "概念趋势时间线",
    navDirectory: "多维检索库",
    navRoadmap: "进阶路线",
    navVault: "开源蓝图箱",
    searchBtn: "搜索概念 / 切片",
    searchPlaceholder: "搜索概念、问题或工具（如：Context Engineering、MCP、SKILL.md、RLVR、ComfyUI）…",
    langLabel: "EN",
    themeToggle: "切换深浅色",
    readProgressTitle: "已研读切片进度",
    heroKicker: "2017–2026 CONCEPT EVOLUTION × 280 VERIFIED SLICES",
    heroTitle: "顺着概念演进的时间轴，直达 AI 最值得看的那几分钟。",
    heroSubtitle:
      "拒绝噪音与标题党。我们用 5 大演进纪元、22 个核心概念趋势坐标，串联起 280 支核验可播的一手演讲、代码走读与多模态工作流精切。",
    ctaTimeline: "打开概念趋势时间线 →",
    ctaDirectory: "浏览全部 280 支切片",
    surgingHeading: "2025–2026 前沿爆发概念（Surging Concepts）",
    eraStripHeading: "五大演进纪元总览（2017–2026）",
    flagshipHeading: "编辑部精选主干切片（Flagship Cuts）",
    roadmapHeading: "从底层直觉到生产级智能体：四阶学习路线",
    viewConceptHub: "进入概念专题页",
    paradigmShiftLabel: "范式跃迁",
    lineageFrom: "演进自",
    lineageInto: "催生下游",
    allEras: "全部纪元",
    allLifecycles: "全部周期",
    allDomains: "全部技术层",
    allSources: "全部片源",
    clearFilters: "重置筛选",
    showingCount: "当前命中",
    loadMore: "继续加载更多核验切片",
    watchSlice: "放映核心切片",
    readDigest: "精读技术原典",
    markRead: "标记已研读",
    markedRead: "✓ 已加入研读记录",
    copyToast: "已复制指令",
    versionPatchTitle: "2026 演进补丁（Version Patch）",
    checklistTitle: "动手验收清单（Action Checklist）",
    toolsTitle: "配套开源工具与规范",
    sameConceptTitle: "同概念上下游精切",
    fullArchiveSummary: "展开该专题完整核验片单归档",
    faqHeading: "常见问题与选型边界（FAQ）",
    footerNote: "AITube · 收录经核验的一手 AI 原理、工程与多模态切片 · 零营销号水片",
    horizonTitle: "2017–2026 概念演进全景坐标与血缘图谱",
    horizonHint: "悬停或点击任意节点，点亮上下游因果血缘弧线（↖ 演进来源 · ↘ 催生下游）",
    scrollToCard: "↓ 定位至详卡",
    editorialView: "精读详卡",
    matrixView: "全景对比矩阵",
    beforeLabel: "旧范式 BEFORE",
    afterLabel: "新范式 AFTER",
    sortEditorial: "编辑主干优先",
    sortSaved: "省时最多优先",
    sortShortest: "精切最短优先",
    mobileFiltersBtn: "交叉筛选面板",
    theaterToggle: "宽屏放映",
    exitTheater: "标准视图",
  },
  en: {
    siteName: "AITube",
    tagline: "AI Concept Evolution Timeline × High-Signal Video Slice Index",
    navTimeline: "Concept Timeline",
    navDirectory: "Video Directory",
    navRoadmap: "Learning Path",
    navVault: "Open Vault",
    searchBtn: "Search Concepts / Cuts",
    searchPlaceholder: "Search concepts, questions, or stacks (e.g. Context Engineering, MCP, SKILL.md, RLVR)...",
    langLabel: "中文",
    themeToggle: "Toggle theme",
    readProgressTitle: "Slices Completed",
    heroKicker: "2017–2026 CONCEPT EVOLUTION × 280 VERIFIED SLICES",
    heroTitle: "Map AI through concept evolution — and watch only the minutes that matter.",
    heroSubtitle:
      "Zero hype, zero filler. Navigate 5 chronological eras and 22 concept momentum trajectories across 280 verified talks, code walkthroughs, and multimodal pipelines.",
    ctaTimeline: "Explore Concept Timeline →",
    ctaDirectory: "Browse All 280 Cuts",
    surgingHeading: "2025–2026 Surging Frontier Concepts",
    eraStripHeading: "Five Chronological Eras of Modern AI (2017–2026)",
    flagshipHeading: "Editorial Flagship Spine Cuts",
    roadmapHeading: "From Model Intuition to Production Agents: 4-Stage Path",
    viewConceptHub: "Open Concept Hub",
    paradigmShiftLabel: "Paradigm Shift",
    lineageFrom: "Evolved from",
    lineageInto: "Unlocks",
    allEras: "All Eras",
    allLifecycles: "All Lifecycles",
    allDomains: "All AI Layers",
    allSources: "All Sources",
    clearFilters: "Reset Filters",
    showingCount: "Showing",
    loadMore: "Load More Verified Cuts",
    watchSlice: "Screen Core Slice",
    readDigest: "Read Monograph Digest",
    markRead: "Mark Completed",
    markedRead: "✓ Completed",
    copyToast: "Copied operator",
    versionPatchTitle: "2026 Evolution Patch",
    checklistTitle: "Implementation Verification Checklist",
    toolsTitle: "Companion Open Tools & Specs",
    sameConceptTitle: "More Cuts in This Concept",
    fullArchiveSummary: "Expand complete verified archive ledger",
    faqHeading: "Frequently Asked Questions & Trade-offs",
    footerNote: "AITube · Verified primary lectures, agentic engineering & multimodal slices · Zero fluff",
    horizonTitle: "2017–2026 Concept Evolution Horizon & Lineage Map",
    horizonHint: "Hover or click any concept node to illuminate upstream & downstream causal arcs",
    scrollToCard: "↓ Jump to Card",
    editorialView: "Editorial Cards",
    matrixView: "Compact Matrix",
    beforeLabel: "BEFORE",
    afterLabel: "NEW PARADIGM",
    sortEditorial: "Editorial Order",
    sortSaved: "Most Time Saved",
    sortShortest: "Shortest Slice",
    mobileFiltersBtn: "Faceted Filters",
    theaterToggle: "Theater Mode",
    exitTheater: "Standard View",
  },
} as const;
