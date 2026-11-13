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
  const mins = Math.max(1, Math.round((endSec - startSec) / 60));
  return lang === "zh" ? `${mins} 分钟精华` : `${mins} min highlight`;
}

export function formatDurationBadge(startSec: number, endSec: number, lang: Lang): string {
  const diff = Math.max(30, endSec - startSec);
  if (diff < 90) {
    return lang === "zh" ? "1 分钟" : "1 min";
  }
  const mins = Math.round(diff / 60);
  return lang === "zh" ? `${mins} 分钟` : `${mins} min`;
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
  surging: { icon: "•", en: "Trending", zh: "正在大火" },
  mainstream: { icon: "•", en: "Widely Used", zh: "主流常用" },
  foundational: { icon: "•", en: "Core Basics", zh: "必懂基础" },
  evolved: { icon: "•", en: "Updated Way", zh: "已有新做法" },
};

export const ROLE_META: Record<"origin" | "practice" | "frontier", { en: string; zh: string }> = {
  origin: { en: "Core Idea", zh: "通俗原理" },
  practice: { en: "Hands-On", zh: "上手实操" },
  frontier: { en: "What's New", zh: "进阶玩法" },
};

export const DIFFICULTY_META: Record<string, { en: string; zh: string }> = {
  intro: { en: "Beginner", zh: "零基础友好" },
  builder: { en: "Hands-On", zh: "动手实操" },
  advanced: { en: "Deep Dive", zh: "深入底层" },
};

export const OPENNESS_META: Record<string, { en: string; zh: string }> = {
  free: { en: "Free", zh: "免费" },
  open: { en: "Open Source", zh: "免费开源" },
  hybrid: { en: "Open + API", zh: "开源工具" },
  proprietary: { en: "Commercial", zh: "商业软件" },
};

export const UI = {
  zh: {
    siteName: "AITube",
    tagline: "看懂 AI，只看最值得看的那几分钟 · 22 个核心概念 × 280 支精选片段",
    navHome: "首页",
    navRoadmap: "学习路线",
    navTimeline: "概念时间线",
    navDirectory: "视频库",
    navVault: "模板箱",
    searchBtn: "搜索",
    searchPlaceholder: "搜索问题或概念，例如：AI 怎么思考、喂私有资料、MCP、不换脸…",
    langLabel: "EN",
    themeToggle: "切换外观",
    readProgressTitle: "已看进度",
    heroKicker: "AI 精选视频与概念时间线",
    heroTitle: "看懂 AI，只看最值得看的那几分钟。",
    heroSubtitle:
      "替你从上千小时公开课与一手演讲里掐出精华片段，按时间线串起 22 个核心概念。",
    ctaTimeline: "查看完整时间线 ›",
    ctaDirectory: "浏览全部视频",
    surgingHeading: "2026 最受关注的 6 个方向",
    eraStripHeading: "从 2017 到 2026，AI 走过的五个阶段",
    flagshipHeading: "精选必看视频",
    roadmapHeading: "学习路线",
    viewConceptHub: "查看详情",
    paradigmShiftLabel: "关键变化",
    lineageFrom: "前身",
    lineageInto: "延伸出",
    allEras: "全部阶段",
    allLifecycles: "全部状态",
    allDomains: "全部方向",
    allSources: "全部来源",
    clearFilters: "重置",
    showingCount: "共",
    loadMore: "加载更多视频",
    watchSlice: "播放精华片段",
    readDigest: "阅读原文解读",
    markRead: "标记已看",
    markedRead: "✓ 已看完",
    copyToast: "已复制",
    versionPatchTitle: "2026 实用提醒",
    checklistTitle: "动手试一下",
    toolsTitle: "相关工具与链接",
    sameConceptTitle: "相关推荐",
    fullArchiveSummary: "查看本主题全部视频清单",
    faqHeading: "常见问题",
    footerNote: "精选一手公开课、技术演讲与深度好文，跳过冗长铺垫，直达核心片段。",
    horizonTitle: "2017–2026 核心概念演进图",
    horizonHint: "点击任意概念查看前后演变脉络",
    scrollToCard: "跳到卡片 ↓",
    editorialView: "时间线",
    matrixView: "总览表",
    beforeLabel: "过去做法",
    afterLabel: "现在做法",
    sortEditorial: "编辑精选",
    sortSaved: "最省时间",
    sortShortest: "时长最短",
    mobileFiltersBtn: "筛选条件",
    theaterToggle: "宽屏",
    exitTheater: "标准",
  },
  en: {
    siteName: "AITube",
    tagline: "Learn AI Through Its Best Minutes · 22 Core Concepts × 280 Highlights",
    navHome: "Home",
    navRoadmap: "Pathways",
    navTimeline: "Timeline",
    navDirectory: "Videos",
    navVault: "Templates",
    searchBtn: "Search",
    searchPlaceholder: "Search questions or topics (e.g. How LLMs work, private docs, MCP)...",
    langLabel: "中文",
    themeToggle: "Toggle appearance",
    readProgressTitle: "Watched progress",
    heroKicker: "CURATED AI VIDEO HIGHLIGHTS & TIMELINE",
    heroTitle: "Learn AI through its clearest minutes.",
    heroSubtitle:
      "Hand-picked segments from hundreds of hours of primary talks and courses, connected across 22 core concepts from 2017 to 2026.",
    ctaTimeline: "Explore full timeline ›",
    ctaDirectory: "Browse all videos",
    surgingHeading: "6 Fast-Moving Shifts in 2026",
    eraStripHeading: "Five Stages of AI (2017–2026)",
    flagshipHeading: "Essential Highlights",
    roadmapHeading: "Learning Pathways",
    viewConceptHub: "Explore topic",
    paradigmShiftLabel: "Key shift",
    lineageFrom: "Built on",
    lineageInto: "Unlocked",
    allEras: "All Periods",
    allLifecycles: "All Statuses",
    allDomains: "All Areas",
    allSources: "All Formats",
    clearFilters: "Reset",
    showingCount: "Showing",
    loadMore: "Show more videos",
    watchSlice: "Play Highlight",
    readDigest: "Read Primary Guide",
    markRead: "Mark Watched",
    markedRead: "✓ Watched",
    copyToast: "Copied",
    versionPatchTitle: "2026 Practical Note",
    checklistTitle: "Try It Yourself",
    toolsTitle: "Related Tools & Links",
    sameConceptTitle: "More in This Topic",
    fullArchiveSummary: "View complete list for this topic",
    faqHeading: "Common Questions",
    footerNote: "Curated primary talks, visual explainers, and engineering guides — straight to the minutes that matter.",
    horizonTitle: "2017–2026 Concept Evolution Map",
    horizonHint: "Select any topic to see what it built on and what it unlocked",
    scrollToCard: "Jump to card ↓",
    editorialView: "Timeline",
    matrixView: "Table",
    beforeLabel: "Before",
    afterLabel: "Now",
    sortEditorial: "Featured",
    sortSaved: "Most Time Saved",
    sortShortest: "Shortest",
    mobileFiltersBtn: "Filters",
    theaterToggle: "Wide",
    exitTheater: "Default",
  },
} as const;
