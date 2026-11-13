import type { Lang } from "./i18n";

export type PersonaId = "beginner" | "applied" | "career" | "frontier";

export interface PersonaPick {
  slug: string;
  zhReason: string;
  enReason: string;
}

export interface PersonaStep {
  zhText: string;
  enText: string;
  href: (lang: Lang) => string;
}

export interface PersonaDef {
  id: PersonaId;
  accent: "teal" | "amber";
  zh: {
    label: string;
    shortLabel: string;
    sub: string;
    badge: string;
    headline: string;
    takeaway: string;
    primaryCta: string;
    secondaryCta: string;
  };
  en: {
    label: string;
    shortLabel: string;
    sub: string;
    badge: string;
    headline: string;
    takeaway: string;
    primaryCta: string;
    secondaryCta: string;
  };
  primaryHref: (lang: Lang) => string;
  secondaryHref: (lang: Lang) => string;
  steps: PersonaStep[];
  picks: PersonaPick[];
}

export const PERSONAS: PersonaDef[] = [
  {
    id: "beginner",
    accent: "teal",
    zh: {
      label: "我是 AI 小白",
      shortLabel: "小白入门",
      sub: "零基础 · 想听人话搞懂 AI 到底怎么回事",
      badge: "先看这 3 支 · 35 分钟彻底扫盲",
      headline: "别被满屏英文缩写吓住，花半小时看懂这 3 支动画就够了",
      takeaway:
        "完全不用懂写代码，也不用背任何数学公式。只要按顺序看完右边这 3 支全网口碑最好的白话科普片段，你就能明明白白搞懂：「AI 到底是怎么接话思考的」、「为什么它有时候会胡编」，以及大家常挂嘴边的「知识库、MCP、技能包」分别是什么。",
      primaryCta: "打开零基础第 0 阶学习单 →",
      secondaryCta: "只看小白必懂的 5 个基础词 →",
    },
    en: {
      label: "Complete Beginner",
      shortLabel: "Beginner",
      sub: "Zero background · Explain it in plain English",
      badge: "Start with 3 Videos · 35m Total",
      headline: "Ignore scary acronyms — get the whole picture in 35 minutes",
      takeaway:
        "Zero coding or math required. Watch the 3 visual explainers on the right in order and you'll genuinely understand how ChatGPT predicts words, why AI hallucinates, and what RAG, MCP, and Skills actually do.",
      primaryCta: "Open Step 0 Beginner Path →",
      secondaryCta: "See Only the 5 Core Basics →",
    },
    primaryHref: (lang) => `/${lang}/roadmap/?role=beginner#stage-0`,
    secondaryHref: (lang) => `/${lang}/timeline/?preset=beginner`,
    steps: [
      {
        zhText: "第 1 步：听大神用“带实习生”的比喻，讲明白训练 ChatGPT 的三大步",
        enText: "Step 1: How ChatGPT is trained in 3 plain-English stages (Karpathy)",
        href: (lang) => `/${lang}/nodes/karpathy-three-stage-llm-pipeline/`,
      },
      {
        zhText: "第 2 步：只看最基础的 5 个词（猜词 / 按意思搜索 / 提问技巧 / 查资料 / 调工具）",
        enText: "Step 2: See just the 5 foundational building blocks on one clean map",
        href: (lang) => `/${lang}/timeline/?preset=beginner`,
      },
      {
        zhText: "第 3 步：顺着零门槛「第 0 阶」推荐列表慢慢看，不踩卖课焦虑坑",
        enText: "Step 3: Follow the friendly Step 0 starter list at your own pace",
        href: (lang) => `/${lang}/roadmap/?role=beginner#stage-0`,
      },
    ],
    picks: [
      {
        slug: "karpathy-three-stage-llm-pipeline",
        zhReason: "不写一行代码，听懂大模型是怎么从“网文接话机”变成聪明助手的",
        enReason: "Zero-code explanation of how AI goes from reading web text to helping you",
      },
      {
        slug: "3b1b-transformer-overview",
        zhReason: "3Blue1Brown 招牌动画：不看公式，亲眼看见 AI 是怎么猜出下一个词的",
        enReason: "3Blue1Brown's visual animation showing how AI predicts the next word",
      },
      {
        slug: "skills-vs-mcp-vs-rag-vs-memory",
        zhReason: "8 分钟一块白板彻底分清：查资料、插插件、装技能包和记习惯各自管啥",
        enReason: "8-minute whiteboard untangling RAG, MCP, Skills, and Memory",
      },
    ],
  },
  {
    id: "applied",
    accent: "amber",
    zh: {
      label: "我想直接拿来用",
      shortLabel: "直接应用",
      sub: "提效办公 / 做小工具 / 读文档 / 画图做视频",
      badge: "4 类现成用法 · 今天就能上手",
      headline: "不用管底层怎么算的，直接挑你手头正想解决的那件事",
      takeaway:
        "用好 AI 就像开车不用先学会造发动机。直接从下面挑你今天想干的事——不管是动嘴做个网页小工具、让 AI 读几十份 PDF 不乱编，还是画连载漫画人物不换脸，照着步骤就能做出来。",
      primaryCta: "按你想做的事挑实操视频 →",
      secondaryCta: "去模板箱直接复制现成模板 →",
    },
    en: {
      label: "Use AI for Work",
      shortLabel: "Practical Use",
      sub: "Build tools, read PDFs & create visuals today",
      badge: "4 Everyday Workflows · Ready Today",
      headline: "Skip theory — pick the exact job you want to get done today",
      takeaway:
        "You don't need to build engines just to drive. Pick your goal below — spinning up a small web app, analyzing 30 PDFs with zero made-up quotes, or keeping character faces consistent across scenes.",
      primaryCta: "Pick a Practical Workflow →",
      secondaryCta: "Copy Ready-to-Use Templates →",
    },
    primaryHref: (lang) => `/${lang}/directory/?preset=coding`,
    secondaryHref: (lang) => `/${lang}/vault/`,
    steps: [
      {
        zhText: "💻 用法一：不会写代码也能动嘴做出实用小网页、小工具（Vibe Coding 防翻车）",
        enText: "💻 Goal 1: Turn plain-English ideas into working web tools without spaghetti code",
        href: (lang) => `/${lang}/directory/?preset=coding`,
      },
      {
        zhText: "📚 用法二：把几十份工作资料丢给 AI 整理问答，句句带原文出处不瞎编",
        enText: "📚 Goal 2: Query private PDFs & connect daily apps without made-up answers",
        href: (lang) => `/${lang}/directory/?preset=rag-agent`,
      },
      {
        zhText: "🎨 用法三：AI 画图换动作不换脸、分镜可控转视频（ComfyUI + Flux 实操）",
        enText: "🎨 Goal 3: Keep character faces & camera angles consistent in ComfyUI + Flux",
        href: (lang) => `/${lang}/directory/?preset=multimodal`,
      },
    ],
    picks: [
      {
        slug: "karpathy-how-i-use-llms-workflows",
        zhReason: "顶尖行家晒出自己每天怎么选模型、喂资料、花十分钟随手造小工具",
        enReason: "Karpathy's everyday habits for research, writing, and quick custom tools",
      },
      {
        slug: "notebooklm-grounded-research-workflow",
        zhReason: "零代码小白 5 分钟上手：传几十份报告进去，每个回答都能点开核对原话",
        enReason: "Zero-code 11m guide to analyzing dozens of PDFs with exact quote links",
      },
      {
        slug: "yc-disciplined-vibe-coding",
        zhReason: "做小产品必看：为什么别人三天上线，你改到第三天全乱套？6 条防崩铁律",
        enReason: "6 simple rules so your AI-built app doesn't fall apart on day three",
      },
    ],
  },
  {
    id: "career",
    accent: "teal",
    zh: {
      label: "我想转行做开发",
      shortLabel: "系统从业",
      sub: "转型 AI 应用开发 / 智能体工程师",
      badge: "4 阶通关路线 · 避开过时老套路",
      headline: "别学两年前已经淘汰的老套路，按今年企业真正招人的标准一步步练",
      takeaway:
        "死背各种花哨提示词模板、硬套几万行笨重黑盒框架的做法已经过时了。现在真正值钱的 AI 应用工程师，拼的是四样本事：写干净的工具调用循环 → 做搜得准的双路知识库 → 管好长对话不犯糊涂 → 建自动错题本（Evals）。",
      primaryCta: "打开 4 阶系统学习路线图 →",
      secondaryCta: "看看哪些旧做法已经过时了 →",
    },
    en: {
      label: "Build an AI Career",
      shortLabel: "AI Career",
      sub: "Become a production AI / Agent Engineer",
      badge: "4-Step Curriculum · Skip 2023 Habits",
      headline: "Learn what real AI engineering teams hire for in 2026 — skip outdated fluff",
      takeaway:
        "Memorizing magic prompt spells and heavy wrapper frameworks is outdated. Real-world AI engineers stand out with four practical skills: clean tool loops, hybrid search, tidy context management, and automated pass/fail evals.",
      primaryCta: "Open 4-Step Career Roadmap →",
      secondaryCta: "See Outdated vs. Modern Practices →",
    },
    primaryHref: (lang) => `/${lang}/roadmap/?role=career`,
    secondaryHref: (lang) => `/${lang}/timeline/?preset=evolved`,
    steps: [
      {
        zhText: "第 1 关（打底 + 搜得准）：搞懂分词与向量原理，做出不漏专有名词的双路知识库",
        enText: "Step 1 (Core & Search): Token mechanics + keyword/vector hybrid search",
        href: (lang) => `/${lang}/roadmap/?role=career#stage-2`,
      },
      {
        zhText: "第 2 关（连工具 + 写插件）：看穿智能体循环本质，亲手写出顺手的 MCP 插件与自动编程流",
        enText: "Step 2 (Tools & MCP): Clean tool loops, MCP plugins & terminal coding workflows",
        href: (lang) => `/${lang}/roadmap/?role=career#stage-2`,
      },
      {
        zhText: "第 3 关（拉开薪资差距）：搭起自动回归错题本（Evals），管好长任务与子助手分工",
        enText: "Step 3 (Senior Edge): Automated pass/fail evals & clean subagent isolation",
        href: (lang) => `/${lang}/roadmap/?role=career#stage-3`,
      },
    ],
    picks: [
      {
        slug: "cursor-tool-calling-loop-anatomy",
        zhReason: "5 分钟看穿所有智能体框架老底：里面其实就是一个简单的发纸条循环",
        enReason: "5-minute breakdown showing every AI agent is a simple message loop",
      },
      {
        slug: "anthropic-building-effective-agents-digest",
        zhReason: "面试常考必读：什么时候老老实实用固定三步流水线，什么时候才上智能体",
        enReason: "Anthropic's classic guide on simple pipelines vs. autonomous agents",
      },
      {
        slug: "hamel-husain-llm-evals-mistakes",
        zhReason: "区分业余玩具和正式产品的分水岭：怎么攒错题本，改版不再提心吊胆",
        enReason: "How real error analysis & pass/fail checks let teams ship with confidence",
      },
    ],
  },
  {
    id: "frontier",
    accent: "amber",
    zh: {
      label: "我想看最新趋势",
      shortLabel: "最新趋势",
      sub: "有一定基础 · 想看清 2026 最新的风向变化",
      badge: "6 个最火新方向 · 来龙去脉全景图",
      headline: "一张图看清 2025–2026 行业里正在发生的三个大转向",
      takeaway:
        "今年业内最明显的三个变化：① 从死抠单句「提示词」转向帮 AI 打理整套桌面资料的「上下文工程」；② 从一口气挂几十个插件把窗口塞爆，转向平时只看目录、用时再翻开的「SKILL.md 技能包」；③ 从单纯堆数据把模型做大，转向「靠做题自检练慢思考 + 走进三维物理空间」。",
      primaryCta: "打开 2026 最新风向全景图 →",
      secondaryCta: "一张大表对比全部 22 个概念 →",
    },
    en: {
      label: "Track 2026 Trends",
      shortLabel: "2026 Trends",
      sub: "Experienced · See what's shifting right now",
      badge: "6 Hot Shifts · Full Evolution Map",
      headline: "See the three big shifts reshaping how teams build with AI in 2025–2026",
      takeaway:
        "Three clear shifts stand out today: (1) from one-liner prompting to full Context Engineering; (2) from stuffing 50 MCP tool schemas upfront to loading SKILL.md manuals on demand; (3) from bigger text pre-training to self-checking reasoning (RLVR) and 3D spatial world models.",
      primaryCta: "Open 2026 Hot Trends Map →",
      secondaryCta: "Compare All 22 Concepts in One Table →",
    },
    primaryHref: (lang) => `/${lang}/timeline/?preset=surging`,
    secondaryHref: (lang) => `/${lang}/timeline/?view=matrix`,
    steps: [
      {
        zhText: "▲ 转向一（智能体怎么装能力）：从万能插头 MCP → 清理桌面的上下文工程 → 按需翻阅的 SKILL.md",
        enText: "▲ Shift 1 (Agent Stack): Universal MCP plugs → tidy Context Eng → on-demand SKILL.md",
        href: (lang) => `/${lang}/timeline/?preset=surging`,
      },
      {
        zhText: "▲ 转向二（模型怎么变聪明）：DeepSeek-R1 靠客观判题强化学习，自己悟出回头验算纠错",
        enText: "▲ Shift 2 (Reasoning): How DeepSeek-R1 learned to double-check itself via pass/fail RL",
        href: (lang) => `/${lang}/concepts/rlvr-reasoning-models/`,
      },
      {
        zhText: "▲ 转向三（走出纯文字聊天）：杨立昆 JEPA、李飞飞三维空间智能与会干家务的具身机器人",
        enText: "▲ Shift 3 (Physical AI): JEPA world models, walkable 3D worlds & VLA robot brains",
        href: (lang) => `/${lang}/concepts/world-models-embodied-multimodal/`,
      },
    ],
    picks: [
      {
        slug: "anthropic-context-engineering-digest",
        zhReason: "为什么跟 AI 聊得越久它越糊涂？Anthropic 揭秘连续干活几小时不乱的桌面整理术",
        enReason: "Why AI gets foggy in long chats — and the 3 habits that keep it sharp",
      },
      {
        slug: "dont-build-agents-build-skills",
        zhReason: "今年 150 万播放风向标演讲：别再造一堆专用机器人了，写好 SKILL.md 说明书就够了",
        enReason: "Why one general agent + reusable SKILL.md folders replaced custom vertical bots",
      },
      {
        slug: "deepseek-r1-rlvr-paper-digest",
        zhReason: "通俗读懂改写行业格局的论文：不用人教步骤，AI 是怎么靠刷题学会慢思考的",
        enReason: "Plain-English breakdown of how pass/fail practice sparked self-checking reasoning",
      },
    ],
  },
];

export const CONCEPT_AUDIENCE: Record<
  string,
  { role: PersonaId; zhBadge: string; enBadge: string }
> = {
  "transformer-attention": { role: "beginner", zhBadge: "🌱 小白先懂这个", enBadge: "🌱 Start Here" },
  "tokenization-embeddings": { role: "beginner", zhBadge: "🌱 小白先懂这个", enBadge: "🌱 Start Here" },
  "prompt-cot": { role: "beginner", zhBadge: "🌱 小白先懂这个", enBadge: "🌱 Start Here" },
  "rag-grounding": { role: "beginner", zhBadge: "🌱 小白先懂这个", enBadge: "🌱 Start Here" },
  "structured-tool-calling": { role: "beginner", zhBadge: "🌱 小白先懂这个", enBadge: "🌱 Start Here" },

  "diffusion-controllable-image": { role: "applied", zhBadge: "⚡ 干活最常用", enBadge: "⚡ Practical Use" },
  "long-context-multimodal": { role: "applied", zhBadge: "⚡ 干活最常用", enBadge: "⚡ Practical Use" },
  "comfyui-video-audio": { role: "applied", zhBadge: "⚡ 干活最常用", enBadge: "⚡ Practical Use" },
  "vibe-coding": { role: "applied", zhBadge: "⚡ 干活最常用", enBadge: "⚡ Practical Use" },
  "computer-use-browser-agents": { role: "applied", zhBadge: "⚡ 干活最常用", enBadge: "⚡ Practical Use" },
  "hybrid-agentic-rag": { role: "applied", zhBadge: "⚡ 干活最常用", enBadge: "⚡ Practical Use" },

  "scaling-pretraining": { role: "career", zhBadge: "🧭 转行必学基本功", enBadge: "🧭 Career Core" },
  "rlhf-post-training": { role: "career", zhBadge: "🧭 转行必学基本功", enBadge: "🧭 Career Core" },
  "lora-local-open-weights": { role: "career", zhBadge: "🧭 转行必学基本功", enBadge: "🧭 Career Core" },
  "agent-workflows-graphs": { role: "career", zhBadge: "🧭 转行必学基本功", enBadge: "🧭 Career Core" },
  "llm-evals-observability": { role: "career", zhBadge: "🧭 转行必学基本功", enBadge: "🧭 Career Core" },

  "mcp-protocol": { role: "frontier", zhBadge: "🔭 2026 最新风向", enBadge: "🔭 Hot in 2026" },
  "rlvr-reasoning-models": { role: "frontier", zhBadge: "🔭 2026 最新风向", enBadge: "🔭 Hot in 2026" },
  "context-engineering": { role: "frontier", zhBadge: "🔭 2026 最新风向", enBadge: "🔭 Hot in 2026" },
  "agentic-coding-cli": { role: "frontier", zhBadge: "🔭 2026 最新风向", enBadge: "🔭 Hot in 2026" },
  "agent-skills-subagents": { role: "frontier", zhBadge: "🔭 2026 最新风向", enBadge: "🔭 Hot in 2026" },
  "world-models-embodied-multimodal": { role: "frontier", zhBadge: "🔭 2026 最新风向", enBadge: "🔭 Hot in 2026" },
};

export const SHIFT_CHEATSHEET = [
  {
    conceptSlug: "context-engineering",
    zhOld: "到处收藏神神秘秘的“万能提示词咒语”",
    zhNew: "像收拾办公桌一样：用到哪份资料翻哪份、聊长了定期清杂物（上下文工程）",
    enOld: "Collecting 'magic one-liner prompt spells'",
    enNew: "Keeping a tidy workspace: load files on demand & clear old clutter (Context Eng)",
    tag: "今年最火",
  },
  {
    conceptSlug: "hybrid-agentic-rag",
    zhOld: "把公司文档硬切成碎块塞进向量库，经常搜丢型号和表头",
    zhNew: "「关键词字面搜 + 按意思搜」双保险，搜不全还能自己换词补搜（混合检索）",
    enOld: "Chopping docs blindly into vectors and missing exact part numbers",
    enNew: "Keyword + meaning search combined, with smart follow-up lookups (Hybrid RAG)",
    tag: "标配做法",
  },
  {
    conceptSlug: "agent-skills-subagents",
    zhOld: "一口气给 AI 挂三四十个外部插件，还没说话窗口就塞满变笨了",
    zhNew: "平时只看一句话目录，真遇到对应活儿再翻开 SKILL.md 工作说明书",
    enOld: "Stuffing 40+ plugin descriptions into every chat upfront",
    enNew: "Keep a tiny menu idle; open full SKILL.md manuals only when needed",
    tag: "热度飙升",
  },
  {
    conceptSlug: "agentic-coding-cli",
    zhOld: "让 AI 一口气盲写几百行代码不检查，改到第三天全崩盘",
    zhNew: "立好 AGENTS.md 家规，每改一小步自动跑测试检查、错了读档重来",
    enOld: "Generating hundreds of lines blind until the app collapses",
    enNew: "Short AGENTS.md house rules + automatic sub-second test checks",
    tag: "开发标配",
  },
];

export const DIRECTORY_SCENARIOS = [
  {
    id: "all",
    zhTitle: "全部精选视频",
    zhSub: "共 280 支精华片段",
    enTitle: "All Highlights",
    enSub: "All 280 hand-picked cuts",
  },
  {
    id: "beginner",
    zhTitle: "🌱 零基础白话科普",
    zhSub: "不看公式懂原理",
    enTitle: "🌱 Plain-English Basics",
    enSub: "Zero-math visual intuition",
  },
  {
    id: "coding",
    zhTitle: "💻 用 AI 写代码做小产品",
    zhSub: "动嘴做工具 · 自动改代码",
    enTitle: "💻 Build Apps with AI",
    enSub: "Vibe Coding · Claude Code",
  },
  {
    id: "rag-agent",
    zhTitle: "🤖 查私有资料与做智能体",
    zhSub: "知识库 · 万能插头 · 技能包",
    enTitle: "🤖 Private Docs & Agents",
    enSub: "RAG · MCP Plugs · Skills",
  },
  {
    id: "multimodal",
    zhTitle: "🎨 AI 画图、控脸与做视频",
    zhSub: "主角不换脸 · 连线工作台",
    enTitle: "🎨 Images, Video & Voice",
    enSub: "Consistent Characters · ComfyUI",
  },
  {
    id: "frontier",
    zhTitle: "🔭 2026 最新风向与防翻车",
    zhSub: "慢思考 · 管窗口 · 自动测错",
    enTitle: "🔭 2026 Trends & Quality",
    enSub: "Reasoning · Context · Evals",
  },
];
