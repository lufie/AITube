import type { Lang } from "./i18n";

/**
 * Public PayPal Live Client ID (safe for static client-side JS SDK).
 * Never store any PayPal Secret key in this repository.
 */
export const PAYPAL_CLIENT_ID =
  "BAAY0NKSCefPSBFB4lISc11pcL8lZ7kEyaohIwVpRXIBfNSvd9l6A3Dj7NcD8gQgbKYhF8FZGeyi8Fs6Pw";

export const DONATE_CURRENCY = "USD";
export const DONATE_PRESETS = [5, 15, 50] as const;
export const DONATE_DEFAULT_AMOUNT = 15;

export const DONATE_COPY: Record<
  Lang,
  {
    footerHeading: string;
    footerDesc: string;
    footerBtn: string;
    footerMethods: string;
    watchBadge: string;
    watchTitle: string;
    watchDesc: string;
    watchCustom: string;
    watchBtn: string;
    modalKicker: string;
    modalTitle: string;
    modalSubtitle: string;
    presetLabels: [string, string, string];
    customPill: string;
    amountLabel: string;
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
    footerHeading: "支持独立策展 · Donate",
    footerDesc: "AITube 无广告、无付费墙。如果这些精选片段帮你省下了时间，欢迎通过 PayPal 赞赏支持本站持续更新。",
    footerBtn: "Donate · 请喝杯咖啡",
    footerMethods: "支持 PayPal 及 Visa / Mastercard 国际卡",
    watchBadge: "Donate · 支持本站",
    watchTitle: "这支精华切片帮你省下时间了吗？",
    watchDesc: "全站原片永久免费无遮挡播放。欢迎随手请杯咖啡，支持我们继续掐出更多高信噪比好片。",
    watchCustom: "自定义",
    watchBtn: "通过 PayPal 赞赏支持",
    modalKicker: "SUPPORT INDEPENDENT CURATION",
    modalTitle: "支持 AITube 持续无广告更新",
    modalSubtitle: "选择或输入任意美元金额，直接在下方通过 PayPal 或国际信用卡安全完成赞赏（无需填写收货地址）。",
    presetLabels: ["请喝杯咖啡", "支持周更策展", "深度赞助支持"],
    customPill: "其他金额",
    amountLabel: "赞赏金额 (USD)",
    loadingSdk: "正在连接 PayPal 安全收银台…",
    sdkBlockedHint: "未能加载 PayPal 组件，请检查网络环境或广告拦截插件后重试。",
    legalNote: "注：所有款项用于支持 AITube 开源检索与笔记维护；第三方视频版权归原作者所有且永久免费播放。",
    thankTitle: "感谢你的慷慨支持！",
    thankBody: "你的赞赏已确认到账，这将直接帮助 AITube 保持零广告、零废话的高质量更新。",
    thankDoneBtn: "完成并返回浏览",
    invalidAmountMsg: "请输入 $1 至 $9,999 之间的有效金额。",
    paymentErrorMsg: "支付窗口未能完成，请稍后再试或更换支付方式。",
  },
  en: {
    footerHeading: "Support AITube · Donate",
    footerDesc: "AITube is 100% free, open, and ad-free. If our hand-picked highlights saved you hours, consider tipping via PayPal.",
    footerBtn: "Donate via PayPal",
    footerMethods: "PayPal · Visa · Mastercard · AmEx",
    watchBadge: "Donate · Keep It Ad-Free",
    watchTitle: "Did this highlight save you time?",
    watchDesc: "All primary videos play 100% free. Chip in a coffee to support ongoing curation and 2026 notes.",
    watchCustom: "Custom",
    watchBtn: "Donate with PayPal",
    modalKicker: "SUPPORT INDEPENDENT CURATION",
    modalTitle: "Support AITube via PayPal",
    modalSubtitle: "Pick a preset or enter any USD amount below. Pay securely with PayPal or a debit/credit card — no shipping address needed.",
    presetLabels: ["Buy a Coffee", "Weekly Cuts", "Backer Support"],
    customPill: "Custom",
    amountLabel: "Contribution (USD)",
    loadingSdk: "Connecting to secure PayPal checkout…",
    sdkBlockedHint: "Could not reach PayPal checkout. Please check your connection or ad-blocker and try again.",
    legalNote: "100% of contributions fund AITube's independent editorial maintenance. All embedded creator videos remain completely free.",
    thankTitle: "Thank you for supporting AITube!",
    thankBody: "Your contribution has been received and helps keep this library fast, independent, and 100% ad-free.",
    thankDoneBtn: "Done",
    invalidAmountMsg: "Please enter a valid amount between $1 and $9,999.",
    paymentErrorMsg: "Checkout could not be completed. Please try again in a moment.",
  },
};
