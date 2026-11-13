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
      sub: "零基础 · 想听人话看懂底层逻辑",
      badge: "先看 3 支神作 · 35 分钟扫盲",
      headline: "别被满屏英文缩写劝退，先花 35 分钟建立全景直觉",
      takeaway:
        "不需要任何代码或数学背景。按顺序看完右侧这 3 支全球最通俗的动画与白板切片，你就能彻底搞懂「大模型到底怎么思考」「日常怎么提问最有效」以及「RAG / MCP / Skills 分别是什么」。",
      primaryCta: "进入零基础入门路线 (Stage 00) →",
      secondaryCta: "只看 5 个小白必懂基础词 →",
    },
    en: {
      label: "AI Beginner",
      shortLabel: "Beginner",
      sub: "Zero background · Plain-English intuition",
      badge: "3 Visual Cuts · 35m Crash Course",
      headline: "Skip intimidating jargon — build visual intuition in 35 minutes",
      takeaway:
        "No math or coding setup required. Watch these 3 visual masterpieces in order to grasp how LLMs actually predict tokens, how training works, and how RAG, MCP, and Skills fit together.",
      primaryCta: "Start Beginner Path (Stage 00) →",
      secondaryCta: "5 Core Concepts Glossary →",
    },
    primaryHref: (lang) => `/${lang}/roadmap/?role=beginner#stage-0`,
    secondaryHref: (lang) => `/${lang}/timeline/?preset=beginner`,
    steps: [
      {
        zhText: "第一步：听 Karpathy 用大白话拆解 ChatGPT / DeepSeek 诞生的三个阶段",
        enText: "Step 1: Understand Pretraining, SFT & RL in plain language with Karpathy",
        href: (lang) => `/${lang}/nodes/karpathy-three-stage-llm-pipeline/`,
      },
      {
        zhText: "第二步：用 5 个基础词串联现代 AI（Transformer / 向量 / 提示词 / 知识库 / 工具）",
        enText: "Step 2: Connect the 5 core building blocks on a simplified visual map",
        href: (lang) => `/${lang}/timeline/?preset=beginner`,
      },
      {
        zhText: "第三步：沿着零门槛 Stage 00 课表循序往下看，不踩营销号坑",
        enText: "Step 3: Follow the curated Stage 00 starter sequence at your own pace",
        href: (lang) => `/${lang}/roadmap/?role=beginner#stage-0`,
      },
    ],
    picks: [
      {
        slug: "karpathy-three-stage-llm-pipeline",
        zhReason: "零代码听懂大模型到底是怎么炼出来的，治好一切玄学想象",
        enReason: "Zero-code mental model of how modern LLMs are actually trained",
      },
      {
        slug: "3b1b-transformer-overview",
        zhReason: "3Blue1Brown 封神 3D 几何动画，不推公式直观看见注意力机制",
        enReason: "3Blue1Brown's iconic 3D visual intuition for Transformer attention",
      },
      {
        slug: "skills-vs-mcp-vs-rag-vs-memory",
        zhReason: "8 分钟一张白板彻底分清：RAG、MCP、Skills 与记忆各自管什么",
        enReason: "8-minute whiteboard untangling RAG, MCP, Skills, and Memory",
      },
    ],
  },
  {
    id: "applied",
    accent: "amber",
    zh: {
      label: "我想直接应用",
      shortLabel: "场景应用",
      sub: "做产品 / 搭知识库 / 创作与办公提效",
      badge: "4 大实战场景 · 拿来即用",
      headline: "跳过底层推导，直接按你想解决的问题挑现成工作流",
      takeaway:
        "做应用不需要自己训练模型。选准一个具体场景（AI 辅助做产品、零幻觉私有知识库、可控图像音视频、自动化技能），照着切片里的操作步骤今天就能跑通。",
      primaryCta: "按应用场景挑选实战切片 →",
      secondaryCta: "复制现成提示词与 SKILL 模板 →",
    },
    en: {
      label: "Hands-On User",
      shortLabel: "Applied",
      sub: "Ship apps, knowledge bases & media workflows",
      badge: "4 Real Scenarios · Ready Workflows",
      headline: "Skip academic theory — jump straight into workflows that ship today",
      takeaway:
        "You don't need to train models to build high-leverage workflows. Pick your immediate goal — coding an app, grounding private docs, or consistent visual generation — and follow step-by-step cuts.",
      primaryCta: "Browse Practical Scenario Cuts →",
      secondaryCta: "Copy Ready-Made Templates →",
    },
    primaryHref: (lang) => `/${lang}/directory/?preset=coding`,
    secondaryHref: (lang) => `/${lang}/vault/`,
    steps: [
      {
        zhText: "💻 场景一：用 AI 写代码、快速做出可用网页与小产品（Vibe Coding 实战）",
        enText: "💻 Scenario 1: Ship web apps & tools fast with disciplined Vibe Coding",
        href: (lang) => `/${lang}/directory/?preset=coding`,
      },
      {
        zhText: "📚 场景二：把私有文档变成不胡说八道的知识库与自动化助手（RAG / MCP）",
        enText: "📚 Scenario 2: Ground private documents & connect daily tools via MCP",
        href: (lang) => `/${lang}/directory/?preset=rag-agent`,
      },
      {
        zhText: "🎨 场景三：角色不崩脸的可控生图、分镜与音视频工作流（ComfyUI + Flux）",
        enText: "🎨 Scenario 3: Consistent character & video pipelines in ComfyUI + Flux",
        href: (lang) => `/${lang}/directory/?preset=multimodal`,
      },
    ],
    picks: [
      {
        slug: "karpathy-how-i-use-llms-workflows",
        zhReason: "顶尖研究者日常怎么用大模型查资料、写代码、审文档的私藏习惯",
        enReason: "Karpathy's daily practical toolkit for research, writing, and coding",
      },
      {
        slug: "notebooklm-grounded-research-workflow",
        zhReason: "11 分钟零代码跑通「绝不瞎编」的个人文献与业务资料库",
        enReason: "Zero-code workflow for citation-grounded document synthesis in 11m",
      },
      {
        slug: "yc-disciplined-vibe-coding",
        zhReason: "产品与独立开发者必看：用 AI 快速做应用且不写成烂尾楼的 6 条军规",
        enReason: "YC's 6 practical rules for shipping real apps with AI without tech debt",
      },
    ],
  },
  {
    id: "career",
    accent: "teal",
    zh: {
      label: "我想入行从业",
      shortLabel: "系统从业",
      sub: "转型 AI 应用工程师 / 智能体架构",
      badge: "4 阶通关课表 · 学新不学旧",
      headline: "拒绝收藏夹吃灰，按 2026 企业真实招聘与工程标准系统进阶",
      takeaway:
        "2023 年死磕复杂长提示词和重型黑盒框架的做法已经过时。2026 从业者拉开差距的四大硬核支柱是：原生结构化工具循环 → 混合检索 → 上下文工程 → 自动化评测飞轮（Evals）。",
      primaryCta: "打开 4 阶系统从业课表 →",
      secondaryCta: "查看已被淘汰的旧做法避坑单 →",
    },
    en: {
      label: "Career Builder",
      shortLabel: "AI Career",
      sub: "Become a production AI / Agent Engineer",
      badge: "4-Stage Syllabus · 52 Spine Cuts",
      headline: "Master the 2026 production AI engineering stack — skip outdated 2023 habits",
      takeaway:
        "Memorizing brittle prompt templates and heavy wrapper chains is obsolete. Stand out in interviews and production by mastering clean tool loops, hybrid retrieval, context engineering, and LLM Evals.",
      primaryCta: "Open 4-Stage Engineering Syllabus →",
      secondaryCta: "See Outdated vs. Modern Patterns →",
    },
    primaryHref: (lang) => `/${lang}/roadmap/?role=career`,
    secondaryHref: (lang) => `/${lang}/timeline/?preset=evolved`,
    steps: [
      {
        zhText: "台阶一（基础与检索）：吃透分词/注意力底座 + BM25 与向量混合检索管线",
        enText: "Phase 1 (Core & RAG): Token/attention mechanics + Hybrid BM25/Vector RAG",
        href: (lang) => `/${lang}/roadmap/?role=career#stage-2`,
      },
      {
        zhText: "台阶二（智能体与协议）：手写干净的工具调用循环、MCP Server 与 Claude Code 工作流",
        enText: "Phase 2 (Agents & MCP): Clean tool-calling loops, MCP servers & CLI harnesses",
        href: (lang) => `/${lang}/roadmap/?role=career#stage-2`,
      },
      {
        zhText: "台阶三（高薪分水岭）：建立二值化 LLM 评测集（Evals）与子智能体上下文隔离",
        enText: "Phase 3 (Production Edge): Binary LLM Evals, error analysis & subagent isolation",
        href: (lang) => `/${lang}/roadmap/?role=career#stage-3`,
      },
    ],
    picks: [
      {
        slug: "cursor-tool-calling-loop-anatomy",
        zhReason: "5 分钟看透智能体底层代码本质，彻底祛魅黑盒框架",
        enReason: "5-minute code anatomy showing every agent is a clean while-loop",
      },
      {
        slug: "anthropic-building-effective-agents-digest",
        zhReason: "Anthropic 工程圣经：面试必问的 Workflows 与 Agents 五大设计模式",
        enReason: "Anthropic's canonical blueprint on composable workflows vs. autonomous agents",
      },
      {
        slug: "hamel-husain-llm-evals-mistakes",
        zhReason: "AI 工程师核心护城河：如何用坏例归因与评测飞轮把准确率做到可上线",
        enReason: "Why error-driven Evals separate senior AI engineers from demo builders",
      },
    ],
  },
  {
    id: "frontier",
    accent: "amber",
    zh: {
      label: "我在追踪趋势",
      shortLabel: "前沿趋势",
      sub: "相对专业 · 聚焦 2026 范式拐点与血缘",
      badge: "6 大飙升方向 · 演进全景图",
      headline: "一图洞察 2025–2026 正在发生的三大技术权力交接",
      takeaway:
        "当前最核心的架构转向：① 单句 Prompt 让位于动态『上下文工程』；② 塞爆窗口的全量 MCP 工具定义让位于按需渐进加载的『SKILL.md』；③ 预训练堆算力转向『RLVR 可验证推理 + 终端自治 Harness』。",
      primaryCta: "打开 2026 前沿爆发趋势图谱 →",
      secondaryCta: "横向对比 22 个概念演进矩阵 →",
    },
    en: {
      label: "Trend Tracker",
      shortLabel: "Frontier",
      sub: "Practitioner · 2026 inflection & causal lineage",
      badge: "6 Surging Shifts · Lineage Map",
      headline: "Track the three architectural handoffs reshaping AI in 2025–2026",
      takeaway:
        "Three shifts define the current frontier: (1) single-turn Prompting → dynamic Context Engineering; (2) monolithic MCP tool dumps → progressive SKILL.md bundles; (3) pure pretraining → RLVR test-time compute & CLI harnesses.",
      primaryCta: "Open 2026 Surging Lineage Map →",
      secondaryCta: "Compare All 22 Concepts Matrix →",
    },
    primaryHref: (lang) => `/${lang}/timeline/?preset=surging`,
    secondaryHref: (lang) => `/${lang}/timeline/?view=matrix`,
    steps: [
      {
        zhText: "▲ 智能体架构拐点：从 MCP (+310%) 到上下文工程 (+380%) 再到 SKILL.md (+420%)",
        enText: "▲ Agentic Stack Handoff: MCP (+310%) → Context Eng (+380%) → SKILL.md (+420%)",
        href: (lang) => `/${lang}/timeline/?preset=surging`,
      },
      {
        zhText: "▲ 后训练推理跃迁：DeepSeek-R1 可验证奖励强化学习（RLVR）与 GRPO 数学机制",
        enText: "▲ Post-Training Leap: DeepSeek-R1 RLVR & GRPO test-time reasoning emergence",
        href: (lang) => `/${lang}/concepts/rlvr-reasoning-models/`,
      },
      {
        zhText: "▲ 物理与空间前沿：JEPA 世界模型、空间智能（李飞飞）与具身 VLA 双系统",
        enText: "▲ Beyond Text: JEPA World Models, Spatial Intelligence & Embodied VLA",
        href: (lang) => `/${lang}/concepts/world-models-embodied-multimodal/`,
      },
    ],
    picks: [
      {
        slug: "anthropic-context-engineering-digest",
        zhReason: "为什么 Context Rot（注意力腐化）成了 2026 智能体系统设计的第一命题",
        enReason: "Anthropic's definitive treatise on Context Rot, compaction & isolation",
      },
      {
        slug: "dont-build-agents-build-skills",
        zhReason: "2026 现象级技术演讲：为什么通用执行外壳 + 领域 SKILL.md 正在胜出",
        enReason: "Why general agent harnesses + modular SKILL.md folders beat custom agents",
      },
      {
        slug: "deepseek-r1-rlvr-paper-digest",
        zhReason: "一手拆解 DeepSeek-R1 如何无需人工过程标注涌现自我反思与长链推理",
        enReason: "Primary breakdown of how RLVR unlocks self-verification without PRMs",
      },
    ],
  },
];

export const CONCEPT_AUDIENCE: Record<
  string,
  { role: PersonaId; zhBadge: string; enBadge: string }
> = {
  "transformer-attention": { role: "beginner", zhBadge: "🌱 小白必懂底座", enBadge: "🌱 Core Mental Model" },
  "tokenization-embeddings": { role: "beginner", zhBadge: "🌱 小白必懂底座", enBadge: "🌱 Core Mental Model" },
  "prompt-cot": { role: "beginner", zhBadge: "🌱 小白必懂底座", enBadge: "🌱 Core Mental Model" },
  "rag-grounding": { role: "beginner", zhBadge: "🌱 小白必懂底座", enBadge: "🌱 Core Mental Model" },
  "structured-tool-calling": { role: "beginner", zhBadge: "🌱 小白必懂底座", enBadge: "🌱 Core Mental Model" },

  "diffusion-controllable-image": { role: "applied", zhBadge: "⚡ 应用落地高频", enBadge: "⚡ Applied Workflow" },
  "long-context-multimodal": { role: "applied", zhBadge: "⚡ 应用落地高频", enBadge: "⚡ Applied Workflow" },
  "comfyui-video-audio": { role: "applied", zhBadge: "⚡ 应用落地高频", enBadge: "⚡ Applied Workflow" },
  "vibe-coding": { role: "applied", zhBadge: "⚡ 应用落地高频", enBadge: "⚡ Applied Workflow" },
  "computer-use-browser-agents": { role: "applied", zhBadge: "⚡ 应用落地高频", enBadge: "⚡ Applied Workflow" },
  "hybrid-agentic-rag": { role: "applied", zhBadge: "⚡ 应用落地高频", enBadge: "⚡ Applied Workflow" },

  "scaling-pretraining": { role: "career", zhBadge: "🧭 工程从业必修", enBadge: "🧭 Engineering Core" },
  "rlhf-post-training": { role: "career", zhBadge: "🧭 工程从业必修", enBadge: "🧭 Engineering Core" },
  "lora-local-open-weights": { role: "career", zhBadge: "🧭 工程从业必修", enBadge: "🧭 Engineering Core" },
  "agent-workflows-graphs": { role: "career", zhBadge: "🧭 工程从业必修", enBadge: "🧭 Engineering Core" },
  "llm-evals-observability": { role: "career", zhBadge: "🧭 工程从业必修", enBadge: "🧭 Engineering Core" },

  "mcp-protocol": { role: "frontier", zhBadge: "🔭 2026 前沿爆发", enBadge: "🔭 2026 Frontier" },
  "rlvr-reasoning-models": { role: "frontier", zhBadge: "🔭 2026 前沿爆发", enBadge: "🔭 2026 Frontier" },
  "context-engineering": { role: "frontier", zhBadge: "🔭 2026 前沿爆发", enBadge: "🔭 2026 Frontier" },
  "agentic-coding-cli": { role: "frontier", zhBadge: "🔭 2026 前沿爆发", enBadge: "🔭 2026 Frontier" },
  "agent-skills-subagents": { role: "frontier", zhBadge: "🔭 2026 前沿爆发", enBadge: "🔭 2026 Frontier" },
  "world-models-embodied-multimodal": { role: "frontier", zhBadge: "🔭 2026 前沿爆发", enBadge: "🔭 2026 Frontier" },
};

export const SHIFT_CHEATSHEET = [
  {
    conceptSlug: "context-engineering",
    zhOld: "死记硬背长串「提示词咒语」(Prompt 玄学)",
    zhNew: "按需动态组装背景资料、压缩历史与隔离子任务（上下文工程）",
    enOld: "Memorizing brittle magic prompt templates",
    enNew: "Curating, compacting & isolating context windows (Context Engineering)",
    tag: "+380% YoY",
  },
  {
    conceptSlug: "hybrid-agentic-rag",
    zhOld: "把文档固定切块塞进向量库一把搜（粗糙向量 RAG）",
    zhNew: "关键词 BM25 + 向量混合召回 + 智能体自主改写追问（Hybrid RAG）",
    enOld: "Naive fixed-chunk vector similarity search",
    enNew: "BM25 + Dense Hybrid Retrieval with iterative agentic query rewriting",
    tag: "生产主流",
  },
  {
    conceptSlug: "agent-skills-subagents",
    zhOld: "一次性挂载几十个 MCP 工具把上下文塞爆变蠢",
    zhNew: "只暴露轻量目录，用到时再按需读取 SKILL.md 技能包",
    enOld: "Dumping 50+ MCP tool schemas into system prompt",
    enNew: "Progressive disclosure via modular SKILL.md folders & subagents",
    tag: "+420% YoY",
  },
  {
    conceptSlug: "agentic-coding-cli",
    zhOld: "让 AI 盲写几百行代码不验证（失控 Vibe Coding）",
    zhNew: "AGENTS.md 强规范约束 + 终端自动跑类型检查与测试闭环",
    enOld: "Unverified multi-file AI code generation",
    enNew: "AGENTS.md repo contracts + automated CLI test/typecheck loops",
    tag: "+340% YoY",
  },
];

export const DIRECTORY_SCENARIOS = [
  {
    id: "all",
    zhTitle: "全部精选片单",
    zhSub: "280 支核验切片",
    enTitle: "All Verified Cuts",
    enSub: "Full 280-cut library",
  },
  {
    id: "beginner",
    zhTitle: "🌱 零基础通俗科普",
    zhSub: "不推公式看懂底层原理",
    enTitle: "🌱 Visual Intuition",
    enSub: "Zero-jargon fundamentals",
  },
  {
    id: "coding",
    zhTitle: "💻 AI 写代码与做产品",
    zhSub: "Vibe Coding · Claude Code",
    enTitle: "💻 AI Coding & Apps",
    enSub: "Vibe Coding · CLI Harnesses",
  },
  {
    id: "rag-agent",
    zhTitle: "🤖 知识库、MCP 与智能体",
    zhSub: "RAG · 工具协议 · Skills",
    enTitle: "🤖 RAG, MCP & Agents",
    enSub: "Knowledge & Skills",
  },
  {
    id: "multimodal",
    zhTitle: "🎨 图像与音视频工作流",
    zhSub: "ComfyUI · Flux · 多模态",
    enTitle: "🎨 Image & Video Flows",
    enSub: "ComfyUI · Flux · Audio",
  },
  {
    id: "frontier",
    zhTitle: "🔭 2026 前沿趋势与评测",
    zhSub: "RLVR · 上下文 · Evals",
    enTitle: "🔭 2026 Frontier & Evals",
    enSub: "RLVR · Context · Evals",
  },
];
