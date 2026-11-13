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
  return lang === "zh" ? `只看 ${mins} 分钟` : `${mins}m highlight`;
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
  surging: { icon: "▲", en: "Hot in 2026", zh: "正在大火" },
  mainstream: { icon: "●", en: "Widely Used", zh: "主流常用" },
  foundational: { icon: "◆", en: "Core Basics", zh: "必懂基础" },
  evolved: { icon: "↻", en: "Has Better Way", zh: "已有更好做法" },
};

export const ROLE_META: Record<"origin" | "practice" | "frontier", { en: string; zh: string }> = {
  origin: { en: "Plain-English Why", zh: "通俗讲原理" },
  practice: { en: "Hands-On Guide", zh: "手把手实操" },
  frontier: { en: "Latest Playbook", zh: "最新进阶玩法" },
};

export const DIFFICULTY_META: Record<string, { en: string; zh: string }> = {
  intro: { en: "Beginner Friendly", zh: "零基础友好" },
  builder: { en: "Hands-On", zh: "动手实操" },
  advanced: { en: "Deep Dive", zh: "深入底层" },
};

export const OPENNESS_META: Record<string, { en: string; zh: string }> = {
  free: { en: "Free to Use", zh: "免费直接用" },
  open: { en: "Free & Open Source", zh: "免费开源" },
  hybrid: { en: "Open Tools + API", zh: "开源工具 + 模型接口" },
  proprietary: { en: "Commercial App", zh: "商业软件" },
};

export const UI = {
  zh: {
    siteName: "AITube",
    tagline: "用大白话讲透 AI 怎么工作、怎么用好 · 22 个核心概念 × 280 支精选视频片段",
    navHome: "首页选方向",
    navRoadmap: "分步学习单",
    navTimeline: "概念时间线",
    navDirectory: "精选视频库",
    navVault: "现成模板箱",
    searchBtn: "搜大白话问题",
    searchPlaceholder: "直接输入你想问的话（比如：AI 到底怎么思考、怎么喂私有资料、怎么让主角不换脸）…",
    langLabel: "EN",
    themeToggle: "切换深色 / 浅色背景",
    readProgressTitle: "我已看完的进度",
    heroKicker: "不讲黑话 · 替你从上千小时视频里挑出最值得看的那几分钟",
    heroTitle: "学 AI 不用啃天书。先选你是哪种需求，马上有重点。",
    heroSubtitle:
      "不管你是纯小白想听人话科普、想直接拿 AI 帮工作提效、想系统转行做开发，还是想看今年最新风向——这里都帮你整理好了。",
    ctaTimeline: "查看 2017–2026 概念时间线 →",
    ctaDirectory: "逛逛全部 280 支精选视频",
    surgingHeading: "今年最火、大家都在讨论的 6 个新方向",
    eraStripHeading: "一张表看清：哪些老办法已经过时，现在聪明人怎么干",
    flagshipHeading: "口碑最好、最值得先看的精选视频",
    roadmapHeading: "按顺序慢慢看：从零基础扫盲到做出靠谱产品的 4 个台阶",
    viewConceptHub: "看这个概念的完整讲解",
    paradigmShiftLabel: "做法怎么变了",
    lineageFrom: "它的前身",
    lineageInto: "后来带火了",
    allEras: "全部阶段",
    allLifecycles: "全部热度",
    allDomains: "全部方向",
    allSources: "全部来源",
    clearFilters: "清空筛选条件",
    showingCount: "共找到",
    loadMore: "再加载更多视频片段",
    watchSlice: "直接看精华片段",
    readDigest: "读通俗拆解长文",
    markRead: "标记为已看完",
    markedRead: "✓ 已看完",
    copyToast: "已复制到剪贴板",
    versionPatchTitle: "2026 最新补充提醒",
    checklistTitle: "看完顺手试一下（小练习）",
    toolsTitle: "视频里提到的免费工具与链接",
    sameConceptTitle: "同一个概念下的其他好视频",
    fullArchiveSummary: "展开这个主题下的全部视频清单",
    faqHeading: "大家最常问的两个问题",
    footerNote: "AITube · 只挑讲得最明白的一手好视频与实用长文 · 不推营销课、不堆专业黑话",
    horizonTitle: "一张图看懂 2017–2026：这 22 个 AI 概念是怎么一步步长出来的",
    horizonHint: "鼠标移到或点击任意词条，就能看清「它从哪演变来 ↖ · 后来又带火了谁 ↘」",
    scrollToCard: "↓ 往下看详细解释",
    editorialView: "图文卡片详解",
    matrixView: "一张大表对比",
    beforeLabel: "以前的老办法",
    afterLabel: "现在的聪明做法",
    sortEditorial: "推荐必看优先",
    sortSaved: "帮我省时最多",
    sortShortest: "时间最短优先",
    mobileFiltersBtn: "按条件细筛",
    theaterToggle: "大屏观看",
    exitTheater: "恢复正常宽度",
  },
  en: {
    siteName: "AITube",
    tagline: "AI Explained in Plain Language · 22 Core Concepts × 280 Hand-Picked Video Highlights",
    navHome: "Start Here",
    navRoadmap: "Step-by-Step Path",
    navTimeline: "Concept Timeline",
    navDirectory: "Video Library",
    navVault: "Templates",
    searchBtn: "Ask Anything",
    searchPlaceholder: "Search in plain English (e.g. How ChatGPT works, private docs Q&A, consistent characters)...",
    langLabel: "中文",
    themeToggle: "Switch light / dark theme",
    readProgressTitle: "Watched Progress",
    heroKicker: "ZERO JARGON · 280 HAND-PICKED HIGHLIGHTS · 700+ HOURS OF FLUFF SKIPPED",
    heroTitle: "Don't drown in AI buzzwords. Pick your goal and see what matters right away.",
    heroSubtitle:
      "Whether you're starting from zero, applying AI to real work today, moving into AI engineering, or tracking 2026 breakthroughs — jump straight to the best minutes.",
    ctaTimeline: "Explore 2017–2026 Concept Timeline →",
    ctaDirectory: "Browse All 280 Video Highlights",
    surgingHeading: "6 Fast-Rising Shifts Everyone Is Talking About in 2026",
    eraStripHeading: "Old Habits vs. Smarter 2026 Practices (At a Glance)",
    flagshipHeading: "Most-Loved Essential Highlights",
    roadmapHeading: "4 Clear Steps: From Zero Background to Shipping Reliable AI Apps",
    viewConceptHub: "Read Full Plain-English Guide",
    paradigmShiftLabel: "What Changed",
    lineageFrom: "Grew out of",
    lineageInto: "Led to",
    allEras: "All Stages",
    allLifecycles: "All Statuses",
    allDomains: "All Topics",
    allSources: "All Sources",
    clearFilters: "Clear Filters",
    showingCount: "Showing",
    loadMore: "Show More Highlights",
    watchSlice: "Watch Best Part",
    readDigest: "Read Plain Summary",
    markRead: "Mark as Watched",
    markedRead: "✓ Watched",
    copyToast: "Copied to clipboard",
    versionPatchTitle: "What's New in 2026",
    checklistTitle: "Try It Yourself (Quick Check)",
    toolsTitle: "Free Tools & Links Mentioned",
    sameConceptTitle: "More Highlights on This Topic",
    fullArchiveSummary: "Show all highlights under this topic",
    faqHeading: "Common Questions in Plain English",
    footerNote: "AITube · Hand-picked primary talks, tutorials & guides explained simply · Zero hype",
    horizonTitle: "How All 22 AI Concepts Connected from 2017 to 2026",
    horizonHint: "Hover or tap any topic pill to trace what inspired it (↖) and what it unlocked next (↘)",
    scrollToCard: "↓ Read Details Below",
    editorialView: "Detailed Cards",
    matrixView: "One-Table Comparison",
    beforeLabel: "OLD WAY",
    afterLabel: "SMARTER WAY NOW",
    sortEditorial: "Recommended First",
    sortSaved: "Most Time Saved",
    sortShortest: "Shortest First",
    mobileFiltersBtn: "More Filters",
    theaterToggle: "Wide Player",
    exitTheater: "Standard Width",
  },
} as const;
