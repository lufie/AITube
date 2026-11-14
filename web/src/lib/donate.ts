import type { Lang } from "./i18n";

/**
 * Public PayPal Live Client ID (safe for static client-side JS SDK).
 * Never store any PayPal Secret key in this repository.
 */
export const PAYPAL_CLIENT_ID =
  "BAAY0NKSCefPSBFB4lISc11pcL8lZ7kEyaohIwVpRXIBfNSvd9l6A3Dj7NcD8gQgbKYhF8FZGeyi8Fs6Pw";

export const DONATE_CURRENCY = "USD";
export const DONATE_PRESETS = [5, 15, 50] as const;
export const DONATE_DEFAULT_AMOUNT = 5;

export const DONATE_COPY: Record<
  Lang,
  {
    footerNavLink: string;
    footerHeading: string;
    footerDesc: string;
    footerBtn: string;
    footerMethods: string;
    takeawayPrompt: string;
    takeawayCoffeeBtn: string;
    takeawayCustomBtn: string;
    watchBadge: string;
    watchTitle: string;
    watchDescFallback: string;
    watchCustom: string;
    watchBtn: string;
    watchReassure: string;
    modalKicker: string;
    modalTitle: string;
    modalSubtitle: string;
    presetLabels: [string, string, string];
    customPill: string;
    amountLabel: string;
    reassureItems: [string, string, string];
    loadingSdk: string;
    sdkBlockedHint: string;
    legalNote: string;
    thankTitle: string;
    thankBody: string;
    thankDoneBtn: string;
    invalidAmountMsg: string;
    paymentErrorMsg: string;
  }
> = {
  zh: {
    footerNavLink: "请喝杯咖啡",
    footerHeading: "请喝杯咖啡 · 支持人工筛片",
    footerDesc:
      "全站已人工对比筛掉 4,500+ 支冗长水片，只留掐好时间点的干货与人话笔记，零广告、零付费墙。如果帮你省下了时间，欢迎随手请杯咖啡。",
    footerBtn: "请喝杯咖啡",
    footerMethods: "单次随心 · 支持 PayPal 或国际卡直接付",
    takeawayPrompt: "看完这 3 条省下时间了？顺手请整理者喝杯咖啡吧",
    takeawayCoffeeBtn: "请杯咖啡 ($5)",
    takeawayCustomBtn: "其他金额 ›",
    watchBadge: "请杯咖啡 · Buy a Coffee",
    watchTitle: "这几分钟的人话整理，帮你省下时间了吗？",
    watchDescFallback:
      "每一支入选片段都经过多轮对比筛片、跳过片头寒暄并提炼成实操笔记。如果刚好帮到了你，不妨请整理者喝杯咖啡。",
    watchCustom: "随心填",
    watchBtn: "请整理者喝杯咖啡",
    watchReassure: "单次请客不续费 · 无 PayPal 账号也可直接刷卡",
    modalKicker: "BUY ME A COFFEE · 随心请客",
    modalTitle: "请整理笔记的人喝杯咖啡",
    modalSubtitle:
      "每一段几分钟的干货背后，都是数小时的人工对比筛片、精准掐点与白话拆解。感谢你帮 AITube 保持零广告与纯粹更新：",
    presetLabels: ["请杯手冲咖啡", "包顿扒片简餐", "深度支持更新"],
    customPill: "随心金额",
    amountLabel: "请客金额 (USD)",
    reassureItems: ["单次请客（绝不自动扣费）", "支持无账号直接刷卡", "免填收货地址"],
    loadingSdk: "正在连接安全收银台…",
    sdkBlockedHint: "未能加载支付组件，请检查网络环境或广告拦截插件后重试。",
    legalNote: "所有款项用于支持 AITube 人工筛片与笔记维护；全站原片版权归原作者所有且永久免费无遮挡播放。",
    thankTitle: "谢谢你的咖啡！",
    thankBody: "心意已收到！这杯咖啡会化作接下来更多掐好时间点、讲人话的高质量 AI 笔记。",
    thankDoneBtn: "完成并返回继续看",
    invalidAmountMsg: "请输入 $1 至 $9,999 之间的有效金额。",
    paymentErrorMsg: "支付窗口未能完成，请稍后再试或更换支付方式。",
  },
  en: {
    footerNavLink: "Buy a Coffee",
    footerHeading: "Buy a Coffee · Fuel Human Curation",
    footerDesc:
      "We manually screened 4,500+ talks down to pure highlights and plain-English notes — zero ads, zero paywalls. Saved you an hour? Buy us a coffee.",
    footerBtn: "Buy Us a Coffee",
    footerMethods: "One-time tip · PayPal or Card (no account needed)",
    takeawayPrompt: "Saved you some digging? Buy the note-taker a coffee",
    takeawayCoffeeBtn: "Buy a Coffee ($5)",
    takeawayCustomBtn: "Custom ›",
    watchBadge: "Buy a Coffee",
    watchTitle: "Did these distilled notes save you time?",
    watchDescFallback:
      "Every highlight is hand-picked from dozens of talks, trimmed of fluff, and rewritten into 3 clear takeaways. If it helped, buy the curator a coffee.",
    watchCustom: "Custom",
    watchBtn: "Buy the Curator a Coffee",
    watchReassure: "One-time tip · Pay with PayPal or Card (no login required)",
    modalKicker: "BUY ME A COFFEE · ONE-TIME TIP",
    modalTitle: "Buy the Curator a Coffee",
    modalSubtitle:
      "Behind every 10-minute cut are hours of screening candidate videos, trimming intros, and distilling plain-English notes. Thanks for keeping AITube ad-free:",
    presetLabels: ["Buy a Coffee", "Late-Night Fuel", "Backer Support"],
    customPill: "Custom",
    amountLabel: "Coffee Tip (USD)",
    reassureItems: ["One-time only", "PayPal or Debit/Credit Card", "No shipping address"],
    loadingSdk: "Connecting to secure checkout…",
    sdkBlockedHint: "Could not load PayPal checkout. Please check your connection or ad-blocker and try again.",
    legalNote: "100% of tips fund AITube's independent curation and notes. All embedded creator videos remain completely free.",
    thankTitle: "Thank you for the coffee!",
    thankBody: "Your tip just landed — thank you for fueling more zero-fluff, plain-English AI highlights.",
    thankDoneBtn: "Done & Back to Browsing",
    invalidAmountMsg: "Please enter a valid amount between $1 and $9,999.",
    paymentErrorMsg: "Checkout could not be completed. Please try again in a moment.",
  },
};

export function formatWatchDonateStory(
  lang: Lang,
  videosReviewedCount?: number,
  hoursSaved?: number
): string {
  const rev = Number(videosReviewedCount || 0);
  const hrs = Number(hoursSaved || 0);
  if (rev >= 3 && hrs > 0) {
    if (lang === "zh") {
      return `为挑出这段最透彻的讲解，我们对比筛掉了 ${rev} 支同题视频、掐掉寒暄铺垫并拆成 3 步人话笔记（约帮你省下 ${hrs} 小时翻找时间）。如果刚好有用，请整理笔记的人喝杯咖啡吧。`;
    }
    return `To pick this single cut, we screened ${rev} similar talks, trimmed the fluff, and distilled 3 plain-English notes (~${hrs}h saved). If it helped, buy the curator a coffee.`;
  }
  return DONATE_COPY[lang].watchDescFallback;
}
