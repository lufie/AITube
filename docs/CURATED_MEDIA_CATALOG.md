# AITube Curated Media & Concept Trend Catalog

- **Total Verified Nodes**: `280` (`52` Flagship Spine Cuts + `228` Curated Pool Cuts)
- **Source Mix**: `267` YouTube (`oEmbed HTTP 200`) · `5` Bilibili (`API code=0`) · `8` Primary Technical Monographs
- **Concept Trend Index**: `22` Concepts across `5` Chronological Eras (`2017–2026`)
- **Cumulative Research Hours Saved**: `742.8h`

## 1. Concept Trend Index Summary (22 Concepts)

| # | Concept | Era | Origin → Inflection | Lifecycle | Primary Cuts |
|---:|---|---|---|---|---:|
| 1 | **Transformer 注意力** / Transformer (`transformer-attention`) | `era-2017-2022` | `2017 Q2 → 2022 Q4` | `foundational` | 15 |
| 2 | **分词与向量** / Tokens & Vectors (`tokenization-embeddings`) | `era-2017-2022` | `2018 Q4 → 2023 Q1` | `foundational` | 13 |
| 3 | **预训练与算力法则** / Pre-Training (`scaling-pretraining`) | `era-2017-2022` | `2020 Q1 → 2023 Q2` | `foundational` | 6 |
| 4 | **对齐训练 RLHF** / SFT & RLHF (`rlhf-post-training`) | `era-2017-2022` | `2022 Q1 → 2023 Q1` | `evolved` | 13 |
| 5 | **提示词技巧** / Prompting (`prompt-cot`) | `era-2023` | `2022 Q2 → 2023 Q2` | `evolved` | 12 |
| 6 | **RAG 知识库** / Basic RAG (`rag-grounding`) | `era-2023` | `2020 Q2 → 2023 Q3` | `mainstream` | 13 |
| 7 | **微调与本地运行** / LoRA & Local AI (`lora-local-open-weights`) | `era-2023` | `2023 Q1 → 2023 Q4` | `mainstream` | 13 |
| 8 | **可控 AI 生图** / Controllable Art (`diffusion-controllable-image`) | `era-2023` | `2022 Q3 → 2023 Q3` | `mainstream` | 13 |
| 9 | **结构化与调工具** / Tool Calling (`structured-tool-calling`) | `era-2024` | `2023 Q2 → 2024 Q1` | `mainstream` | 13 |
| 10 | **工作流与智能体** / Workflows vs Agents (`agent-workflows-graphs`) | `era-2024` | `2023 Q4 → 2024 Q2` | `evolved` | 14 |
| 11 | **超长窗口与多模态** / Long Context & Omni (`long-context-multimodal`) | `era-2024` | `2024 Q1 → 2024 Q3` | `mainstream` | 12 |
| 12 | **自动测准确率 Evals** / AI Quality Evals (`llm-evals-observability`) | `era-2024` | `2023 Q4 → 2024 Q3` | `mainstream` | 13 |
| 13 | **ComfyUI 与做视频** / ComfyUI & AI Video (`comfyui-video-audio`) | `era-2024` | `2024 Q1 → 2024 Q4` | `mainstream` | 13 |
| 14 | **MCP 万能接口** / MCP Protocol (`mcp-protocol`) | `era-2025` | `2024 Q4 → 2025 Q1` | `surging` | 14 |
| 15 | **慢思考推理模型** / Reasoning & RLVR (`rlvr-reasoning-models`) | `era-2025` | `2024 Q3 → 2025 Q1` | `surging` | 13 |
| 16 | **Vibe Coding** / Vibe Coding (`vibe-coding`) | `era-2025` | `2025 Q1 → 2025 Q2` | `evolved` | 12 |
| 17 | **浏览器操作 AI** / Browser Agents (`computer-use-browser-agents`) | `era-2025` | `2024 Q4 → 2025 Q2` | `mainstream` | 11 |
| 18 | **混合与多轮知识库** / Hybrid & Agentic RAG (`hybrid-agentic-rag`) | `era-2025` | `2024 Q4 → 2025 Q2` | `mainstream` | 12 |
| 19 | **上下文工程** / Context Engineering (`context-engineering`) | `era-2026` | `2025 Q2 → 2025 Q3` | `surging` | 14 |
| 20 | **终端自动编程** / AI Coding Agents (`agentic-coding-cli`) | `era-2026` | `2025 Q1 → 2025 Q4` | `surging` | 14 |
| 21 | **SKILL.md 与子助手** / SKILL.md & Subagents (`agent-skills-subagents`) | `era-2026` | `2025 Q4 → 2026 Q1` | `surging` | 14 |
| 22 | **世界模型与机器人** / World Models & Robots (`world-models-embodied-multimodal`) | `era-2026` | `2025 Q3 → 2026 Q2` | `surging` | 13 |

## 2. Flagship Spine Cuts (Nodes 01–52)

| # | Slug | Concept | Platform | Creator | Window | ZH Title |
|---:|---|---|---|---|---|---|
| 1 | `3b1b-transformer-overview` | `transformer-attention` | `youtube` | 3Blue1Brown | `3:10–16:00` | 3Blue1Brown 神级动画：不背公式，看懂大模型是怎么猜出下一个词的 |
| 2 | `3b1b-qkv-attention-mechanics` | `transformer-attention` | `youtube` | 3Blue1Brown | `2:00–15:40` | 动画慢放拆解「注意力机制」：AI 是怎么在一大段话里抓准重点关系的？ |
| 3 | `karpathy-nano-gpt-from-scratch` | `transformer-attention` | `youtube` | Andrej Karpathy | `70:10–87:20` | 跟着大神 Karpathy 敲 80 行代码：从空白文件亲手写出一个迷你 GPT |
| 4 | `limu-transformer-paper-bili` | `transformer-attention` | `bilibili` | 跟李沐学AI | `19:40–36:30` | 跟李沐读开山论文《Attention Is All You Need》：为什么它能淘汰旧架构？ |
| 5 | `karpathy-gpt-tokenizer-bpe` | `tokenization-embeddings` | `youtube` | Andrej Karpathy | `5:10–22:20` | 为什么早期 AI 数不对单词里有几个字母 r？揭秘「分词器」背后的真相 |
| 6 | `embeddings-vector-geometry-explained` | `tokenization-embeddings` | `youtube` | AssemblyAI | `0:18–4:05` | 4 分钟零门槛看懂「向量数据库」：AI 怎么做到不靠同义词也能按意思搜东西？ |
| 7 | `stanford-cs336-pretraining-scaling` | `scaling-pretraining` | `youtube` | Stanford Online | `6:50–24:40` | 斯坦福王牌课 CS336：花几千万训练大模型前，顶尖团队怎么在草稿纸上算清账？ |
| 8 | `karpathy-three-stage-llm-pipeline` | `rlhf-post-training` | `youtube` | Andrej Karpathy | `57:00–78:00` | Karpathy 最火科普精选：像培养实习生一样，看懂炼成 ChatGPT 的「三大步」 |
| 9 | `dpo-vs-rlhf-alignment-mechanics` | `rlhf-post-training` | `youtube` | AI Coffee Break with Letitia | `0:45–8:10` | 7 分钟理清一堆英文缩写：RLHF、DPO 和 GRPO 到底各自在干嘛？ |
| 10 | `anthropic-prompt-engineering-deep-dive` | `prompt-cot` | `youtube` | Anthropic | `8:40–24:20` | Anthropic 官方大实话：别迷信“你是世界顶级大师”咒语了，像带聪明实习生一样把活交代清楚 |
| 11 | `every-rag-strategy-compared` | `rag-grounding` | `youtube` | Cole Medin | `0:35–12:15` | 12 分钟治好企业知识库“答非所问”：哪几招升级最立竿见影？ |
| 12 | `bili-17-rag-architectures-benchmark` | `rag-grounding` | `bilibili` | AI敲代码的阿Q | `3:00–19:00` | 真刀真枪实测 17 种知识库优化招式：哪些真管用、哪些纯属拖慢速度？ |
| 13 | `umar-jamil-lora-math-pytorch` | `lora-local-open-weights` | `youtube` | Umar Jamil | `1:50–17:00` | 一张图讲透 LoRA 微调：为什么不用重训整个大模型，贴一层“小补丁”就够了？ |
| 14 | `peft-qlora-distillation-workflow` | `lora-local-open-weights` | `youtube` | Sam Witteveen | `1:30–13:00` | 省下九成接口费的实用打法：拿顶尖大模型当老师，「带徒弟」训出极速 8B 小模型 |
| 15 | `latent-diffusion-visual-intuition` | `diffusion-controllable-image` | `youtube` | Computerphile | `2:25–14:40` | AI 是怎么把“雪花噪点”变成高清大图的？一次看懂 「种子」、「步数」 和 「重绘幅度」 |
| 16 | `flux-consistent-character-workflow` | `diffusion-controllable-image` | `youtube` | Mickmumpitz | `1:00–11:35` | 做漫剧、绘本和电商图不换脸：Flux + ComfyUI 锁死同一主角的实用套路 |
| 17 | `structured-outputs-schema-engineering` | `structured-tool-calling` | `youtube` | Dave Ebbelaar | `2:00–14:50` | 让 AI 乖乖填表永不报错：结构化输出与「上下换个位置就涨分」的隐藏窍门 |
| 18 | `cursor-tool-calling-loop-anatomy` | `structured-tool-calling` | `youtube` | Cursor | `0:15–5:40` | 5 分钟看穿智能体的真相：大模型根本不会自己跑代码，全靠一个简单循环 |
| 19 | `anthropic-building-effective-agents-digest` | `agent-workflows-graphs` | `web` | Anthropic Engineering (Erik Schluntz & Barry Zhang) | `12m read` | Anthropic 必读长文精读：能用简单「三步流水线」搞定的事，千万别硬搞复杂智能体 |
| 20 | `barry-zhang-effective-agents-talk` | `agent-workflows-graphs` | `youtube` | AI Engineer | `1:45–13:55` | Anthropic 实战复盘：改三天提示词没用，把工具改成「防呆设计」一秒就不犯错了 |
| 21 | `lilian-weng-autonomous-agents-digest` | `agent-workflows-graphs` | `web` | Lilian Weng | `14m read` | 翁荔（Lilian Weng）智能体开山长文精读：规划、记忆与工具，三年后哪些成了真标配？ |
| 22 | `notebooklm-grounded-research-workflow` | `long-context-multimodal` | `youtube` | Jeff Su | `0:45–11:30` | 零代码小白也能 5 分钟用起来：用 NotebookLM 读几十份资料，句句带原文角标不瞎编 |
| 23 | `hamel-husain-llm-evals-mistakes` | `llm-evals-observability` | `youtube` | Hamel Husain | `2:20–18:00` | 做 AI 产品千万别搞“1 到 5 分模糊打分”：Hamel 手把手教你搭真正管用的错题本 |
| 24 | `hamel-your-ai-product-needs-evals-digest` | `llm-evals-observability` | `web` | Hamel Husain | `15m read` | 《你的 AI 产品急需一套自动错题本》：告别“改一行提示词提心吊胆三天” |
| 25 | `comfyui-modular-node-pipeline` | `comfyui-video-audio` | `youtube` | Sebastian Kamph | `3:00–17:00` | 14 分钟治好 ComfyUI“连线密集恐惧症”：其实翻来覆去就那五根颜色线 |
| 26 | `comfyui-flux-keyframe-pipeline` | `comfyui-video-audio` | `youtube` | pixaroma | `4:50–18:00` | 家用显卡流畅跑 Flux 出海报级大图：说人话写提示词 + 避开新手头号参数坑 |
| 27 | `mcp-open-protocol-architecture` | `mcp-protocol` | `web` | Model Context Protocol (Anthropic) | `10m read` | 把 MCP 协议当成「AI 界的 Type-C 万能插头」：10 分钟看懂它到底省了什么事 |
| 28 | `anthropic-mcp-workshop-mahesh` | `mcp-protocol` | `youtube` | AI Engineer | `7:00–23:00` | MCP 创始人手把手带敲：16 分钟写出第一个插件，并避开新手必踩的「断连坑」 |
| 29 | `bili-claude-code-mcp-workflow` | `mcp-protocol` | `bilibili` | 创哥的AI实验室 | `0:30–8:30` | 8 分钟搞定在 Claude Code 里装 MCP 插件：团队共享配置还不泄密 |
| 30 | `deepseek-r1-rlvr-paper-digest` | `rlvr-reasoning-models` | `web` | DeepSeek-AI | `16m read` | DeepSeek-R1 爆火论文人话精读：不用人类手把手教，AI 是怎么靠刷题自己悟出「回头检查」的？ |
| 31 | `yannic-kilcher-grpo-math-derivation` | `rlvr-reasoning-models` | `youtube` | Yannic Kilcher | `14:40–29:50` | 白板拆解 GRPO 算法：为什么让模型“同一题做十遍自己比高低”能省一半显卡？ |
| 32 | `bili-deepseek-r1-infra-rl-teardown` | `rlvr-reasoning-models` | `bilibili` | ZOMI酱 | `3:30–18:00` | 算清慢思考背后的「省钱经济账」：为什么总参数 671B，每次说话只动用 37B？ |
| 33 | `karpathy-how-i-use-llms-workflows` | `vibe-coding` | `youtube` | Andrej Karpathy | `49:00–68:00` | 大神 Karpathy 晒出自己的日常用法：平时怎么选模型、怎么喂资料、怎么随手造小工具？ |
| 34 | `yc-disciplined-vibe-coding` | `vibe-coding` | `youtube` | Y Combinator | `1:15–14:00` | 为什么别人用 AI 三天做出产品，你改到第三天全崩了？YC 合伙人的 6 条防翻车铁律 |
| 35 | `computer-use-sandboxed-browser-agents` | `computer-use-browser-agents` | `youtube` | Y Combinator | `0:25–7:25` | 7 分钟看懂「AI 自己操作电脑和网页」：怎么点得又快又准，还不怕账号被盗？ |
| 36 | `stanford-bm25-to-agentic-rag` | `hybrid-agentic-rag` | `youtube` | Stanford Online | `10:40–28:00` | 斯坦福公开课（杨笛一）：为什么纯向量搜不准产品型号？怎么升级成「会追问的混合搜索」 |
| 37 | `graphrag-when-knowledge-graphs-win` | `hybrid-agentic-rag` | `youtube` | AI Engineer | `2:10–14:20` | 别盲目跟风上 GraphRAG（知识图谱）：先看清哪两类问题非它不可、什么时候纯属花冤枉钱！ |
| 38 | `anthropic-context-engineering-digest` | `context-engineering` | `web` | Anthropic Applied AI | `13m read` | Anthropic 揭秘《上下文工程》：为什么跟 AI 聊得越久它越糊涂？学会这三招让它一直清醒 |
| 39 | `context-engineering-write-select-compress-isolate` | `context-engineering` | `youtube` | LangChain | `1:35–16:00` | 四个字记住「上下文工程」全部招式：写、选、压、隔 |
| 40 | `hung-yi-lee-context-engineering-lecture` | `context-engineering` | `youtube` | Hung-yi Lee | `3:00–18:40` | 李宏毅老师幽默拆解：为什么号称能读百万字，塞进五万字就开始漏看中间的条件？ |
| 41 | `bili-harness-engineering-context-teardown` | `context-engineering` | `bilibili` | 博文博文 | `0:12–3:48` | 4 分钟听懂今年大热的「Harness（运行支架）」：为什么同一款大模型换套工具壳，本事差一倍？ |
| 42 | `anthropic-mastering-claude-code` | `agentic-coding-cli` | `youtube` | Anthropic | `2:45–17:40` | Anthropic 官方 170 万播放必修课：用好编程智能体的「先看、再定方案、再动手、自检收尾」四步法 |
| 43 | `matt-pocock-ai-coding-typescript-workflow` | `agentic-coding-cli` | `youtube` | AI Engineer | `9:00–24:50` | 200 万播放现场实战：为什么「严格类型检查」就像给编程 AI 修了两条防撞护栏？ |
| 44 | `simon-willison-agentic-engineering-digest` | `agentic-coding-cli` | `web` | Simon Willison | `11m read` | 传奇程序员 Simon Willison 的实战忠告：怎么用 AI 高产写代码，并防住「致命三合一」泄密陷阱 |
| 45 | `dont-build-agents-build-skills` | `agent-skills-subagents` | `youtube` | AI Engineer | `1:10–14:55` | 今年最火的 150 万播放风向标演讲：《别再重复造一堆智能体了，去写 SKILL.md 技能说明书吧！》 |
| 46 | `anthropic-agent-skills-engineering-digest` | `agent-skills-subagents` | `web` | Anthropic Engineering | `11m read` | 手把手拆解一份好用的 SKILL.md 技能包长啥样：别把它写成又臭又长的裹脚布！ |
| 47 | `multi-agent-subagent-architecture-ships` | `agent-skills-subagents` | `youtube` | AI Engineer | `1:30–15:10` | 戳破花哨演示泡沫：为什么模拟“AI 产品经理跟 AI 程序员开会吵架”必翻车？真能干活的多助手该怎么配？ |
| 48 | `skills-vs-mcp-vs-rag-vs-memory` | `agent-skills-subagents` | `youtube` | IBM Technology | `0:25–8:35` | 8 分钟一块白板彻底分清：RAG、MCP、Skills 和 「记忆」 到底各自管哪一摊事？ |
| 49 | `welch-labs-world-models-jepa` | `world-models-embodied-multimodal` | `youtube` | Welch Labs | `4:00–19:40` | 电影级科普动画：为什么大模型能考过律师资格证，物理常识却不如四岁小孩？看懂「世界模型」之争 |
| 50 | `fei-fei-li-spatial-intelligence` | `world-models-embodied-multimodal` | `youtube` | Y Combinator | `5:10–19:50` | 李飞飞深度访谈：什么是「空间智能」？从一张平面照片走进能自由走动的 3D 世界 |
| 51 | `vla-embodied-robotics-physical-ai` | `world-models-embodied-multimodal` | `youtube` | Google DeepMind | `0:08–2:52` | 3 分钟实机演示看懂「具身智能（VLA）」：现在的机器人怎么听懂人话学会折纸、拉拉链的？ |
| 52 | `claude-code-parallel-worktrees-tdd` | `agentic-coding-cli` | `youtube` | Anthropic | `3:30–18:10` | Anthropic 自家程序员压箱底的三招：先出考卷防作弊、脚本批量改两百个旧文件、双窗口背靠背挑刺 |

## 3. Verified YouTube Expansion Cuts (Nodes 53–280)

| # | Slug | Concept | Video ID | Creator | Slice | Original Title |
|---:|---|---|---|---|---|---|
| 53 | `3blue1brown-large-language-models-explained-briefly` | `transformer-attention` | `LPZh9BOjkQs` | 3Blue1Brown | `0:47–6:12 / 7:58` | Large Language Models explained briefly |
| 54 | `fireship-vector-databases-are-so-hot-right` | `tokenization-embeddings` | `klTvEwg3oJ4` | Fireship | `0:20–2:37 / 3:22` | Vector databases are so hot right now. WTF are they? |
| 55 | `ibm-technology-large-language-models-work` | `scaling-pretraining` | `5sLYAQS9sWQ` | IBM Technology | `0:33–4:20 / 5:34` | How Large Language Models Work |
| 56 | `statquest-jos-reinforcement-learning-human-feedback` | `rlhf-post-training` | `qPN_XZcJf_s` | StatQuest with Josh Starmer | `2:09–11:09 / 18:02` | Reinforcement Learning with Human Feedback (RLHF), Clearly Explained!!! |
| 57 | `anthropic-prompting-101-code-w-claude` | `prompt-cot` | `ysPbXH0LpIE` | Anthropic | `2:30–11:30 / 24:53` | Prompting 101 \| Code w/ Claude |
| 58 | `ibm-technology-what-is-retrieval-augmented-generation` | `rag-grounding` | `T-D1OfcDW1M` | IBM Technology | `0:39–5:08 / 6:36` | What is Retrieval-Augmented Generation (RAG)? |
| 59 | `umar-jamil-bert-explained-training-inference-bert` | `lora-local-open-weights` | `90mGPxR2GgY` | Umar Jamil | `7:00–19:00 / 54:52` | BERT explained: Training, Inference,  BERT vs GPT/LLamA, Fine tuning, [CLS] token |
| 60 | `mickmumpitz-generate-endless-consistent-characters-fro` | `diffusion-controllable-image` | `grtmiWbmvv0` | Mickmumpitz | `2:30–11:30 / 24:12` | Generate endless CONSISTENT CHARACTERS from one input image! (ComfyUI Tutorial + Installation Guide) |
| 61 | `dave-ebbelaar-openai-function-calling-full-beginner` | `structured-tool-calling` | `aqdWSYWC_LI` | Dave Ebbelaar | `2:30–11:30 / 28:24` | OpenAI Function Calling - Full Beginner Tutorial |
| 62 | `anthropic-tips-building-ai-agents` | `agent-workflows-graphs` | `LP5OCa20Zpg` | Anthropic | `2:12–11:12 / 18:20` | Tips for building AI agents |
| 63 | `jeff-su-notebooklm-changed-completely-here-s` | `long-context-multimodal` | `_uXnyhrqmsU` | Jeff Su | `2:27–11:27 / 20:31` | NotebookLM Changed Completely: Here's What Matters (in 2026) |
| 64 | `dave-ebbelaar-systematically-setup-llm-evals-met` | `llm-evals-observability` | `a3SMraZWNNs` | Dave Ebbelaar | `7:00–19:00 / 55:02` | How to Systematically Setup LLM Evals (Metrics, Unit Tests, LLM-as-a-Judge) |
| 65 | `pixaroma-comfyui-tutorial-series-ep02-nodes` | `comfyui-video-audio` | `JE5eykLuTXI` | pixaroma | `2:30–11:30 / 23:28` | ComfyUI Tutorial Series: Ep02 - Nodes and Workflow Basics |
| 66 | `ibm-technology-mcp-vs-api-simplifying-ai` | `mcp-protocol` | `7j1t3UZA1TY` | IBM Technology | `1:34–8:25 / 13:11` | MCP vs API: Simplifying AI Agent Integration with External Data |
| 67 | `fireship-this-free-chinese-ai-just-crushed` | `rlvr-reasoning-models` | `-2k1rcRzsLA` | Fireship | `0:28–3:39 / 4:41` | This free Chinese AI just crushed OpenAI's $200 o1 model... |
| 68 | `fireship-make-vibe-coding-not-suck` | `vibe-coding` | `PLKrSVuT-Dg` | Fireship | `0:34–4:27 / 5:44` | How to make vibe coding not suck… |
| 69 | `anthropic-claude-computer-use-automating-opera` | `computer-use-browser-agents` | `ODaHJzOyVCQ` | Anthropic | `0:00–2:03 / 2:03` | Claude \| Computer use for automating operations |
| 70 | `dave-ebbelaar-complete-guide-hybrid-search-in` | `hybrid-agentic-rag` | `XvKiTfd6Xvo` | Dave Ebbelaar | `7:00–19:00 / 59:18` | The Complete Guide to Hybrid Search in RAG (BM25 + Embeddings + Reranker) |
| 71 | `ibm-technology-context-engineering-ai-agents-4` | `context-engineering` | `BwXremQ-i6I` | IBM Technology | `1:14–6:36 / 10:21` | Context Engineering for AI Agents: 4 Failure Modes to Avoid |
| 72 | `fireship-cursor-2-0-is-here-5` | `agentic-coding-cli` | `HIp8sFB2GGw` | Fireship | `0:27–3:34 / 4:36` | Cursor 2.0 is here... 5 things you didn't know it can do |
| 73 | `ai-engineer-is-agent-harness-dead-jediah` | `agent-skills-subagents` | `7Y4sbZgBdnc` | AI Engineer | `2:11–11:11 / 18:15` | Is the Agent Harness Dead? — Jediah Katz, SpaceXAI |
| 74 | `latent-space-after-llms-spatial-intelligence-world` | `world-models-embodied-multimodal` | `60iW8FZ7MJU` | Latent Space | `7:00–19:00 / 60:39` | After LLMs: Spatial Intelligence and World Models — Fei-Fei Li & Justin Johnson, World Labs |
| 75 | `3blue1brown-might-llms-store-facts-deep-learning` | `transformer-attention` | `9-Jl0dxWQs8` | 3Blue1Brown | `2:30–11:30 / 22:43` | How might LLMs store facts \| Deep Learning Chapter 7 |
| 76 | `ibm-technology-what-is-a-vector-database` | `tokenization-embeddings` | `gl1r1XV0SLw` | IBM Technology | `0:58–7:38 / 9:49` | What is a Vector Database? Powering Semantic Search & AI Applications |
| 77 | `shaw-talebi-a-practical-introduction-large-language` | `scaling-pretraining` | `tFHeUSJAYbE` | Shaw Talebi | `1:47–9:33 / 14:57` | A Practical Introduction to Large Language Models (LLMs) |
| 78 | `nate-herk-ai-aut-andrej-karpathy-just` | `rlhf-post-training` | `sboNwYmH3AY` | Nate Herk | AI Automation | `2:08–11:08 / 17:47` | Andrej Karpathy Just 10x’d Everyone’s Claude Code |
| 79 | `ibm-technology-4-methods-of-prompt-engineering` | `prompt-cot` | `1c9iyoVIwDs` | IBM Technology | `1:31–8:07 / 12:42` | 4 Methods of Prompt Engineering |
| 80 | `ibm-technology-is-rag-still-needed-choosing` | `rag-grounding` | `UabBYexBD4k` | IBM Technology | `1:20–7:08 / 11:10` | Is RAG Still Needed? Choosing the Best Approach for LLMs |
| 81 | `umar-jamil-reinforcement-learning-from-human-feedback` | `lora-local-open-weights` | `qGyFrqc34yc` | Umar Jamil | `7:00–19:00 / 135:13` | Reinforcement Learning from Human Feedback explained with math derivations and the PyTorch code. |
| 82 | `ai-samson-this-one-prompt-fixes-ai` | `diffusion-controllable-image` | `G01kghX152g` | AI Samson | `1:37–8:38 / 13:30` | This One Prompt Fixes AI Character Consistency (Use This) |
| 83 | `langchain-fully-local-tool-calling-ollama` | `structured-tool-calling` | `Nfk99Fz8H9k` | LangChain | `1:31–8:06 / 12:41` | Fully local tool calling with Ollama |
| 84 | `langchain-building-effective-agents-langgraph` | `agent-workflows-graphs` | `aHCDrAbH_go` | LangChain | `4:27–16:27 / 31:50` | Building Effective Agents with LangGraph |
| 85 | `james-blue-study-anything-notebooklm-ful` | `long-context-multimodal` | `TBKjg9ObgY4` | James Blue | `0:55–7:14 / 9:18` | How to Study Anything with NotebookLM (Full System) |
| 86 | `braintrust-intro-braintrust-ai-observability` | `llm-evals-observability` | `qpmMxRwXzEQ` | Braintrust | `0:47–6:06 / 7:50` | Intro to Braintrust: AI Observability and Evals |
| 87 | `pixaroma-comfyui-tutorial-series-ep17-flux-lora` | `comfyui-video-audio` | `-aW1U8QEak0` | pixaroma | `2:30–11:30 / 21:33` | ComfyUI Tutorial Series Ep17   Flux LoRA Explained! Best Settings & New UI |
| 88 | `ibm-technology-what-is-mcp-integrate-ai` | `mcp-protocol` | `eur8dUO9mvE` | IBM Technology | `0:22–2:55 / 3:46` | What is MCP? Integrate AI Agents with Databases & APIs |
| 89 | `hung-yi-lee-openclaw-ai-agent` | `rlvr-reasoning-models` | `2rcJdFuNbZQ` | Hung-yi Lee | `7:00–19:00 / 83:17` | 解剖小龍蝦 — 以 OpenClaw 為例介紹 AI Agent 的運作原理 |
| 90 | `y-combinator-vibe-coding-is-future` | `vibe-coding` | `IACHfKmZMr8` | Y Combinator | `4:25–16:25 / 31:34` | Vibe Coding Is The Future |
| 91 | `anthropic-claude-agent-skills-explained` | `computer-use-browser-agents` | `fOxC44g8vig` | Anthropic | `0:19–2:31 / 3:15` | Claude Agent Skills Explained |
| 92 | `sam-witteveen-advanced-rag-03-hybrid-search` | `hybrid-agentic-rag` | `lYxGYXjfrNI` | Sam Witteveen | `0:40–5:16 / 6:47` | Advanced RAG 03 - Hybrid Search BM25 & Ensembles |
| 93 | `ibm-technology-context-engineering-vs-prompt-engineering` | `context-engineering` | `vD0E3EUb8-8` | IBM Technology | `0:47–6:07 / 7:52` | Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents |
| 94 | `openai-openai-codex-cli` | `agentic-coding-cli` | `FUq9qRwrDrI` | OpenAI | `0:38–4:56 / 6:20` | OpenAI Codex CLI |
| 95 | `latent-space-why-i-couldn-t-build` | `agent-skills-subagents` | `cFx9Z3ZXca0` | Latent Space | `7:00–19:00 / 142:22` | Why I couldn't build Jev at OpenAI — Diogo Almeida, TypeSafe Co-founder & CEO |
| 96 | `stanford-hai-hai-seminar-world-model-spatial` | `world-models-embodied-multimodal` | `Ef6k1d2Uq4Q` | Stanford HAI | `7:00–19:00 / 71:40` | HAI Seminar: The World Model and Spatial Intelligence Era: Governing AI Beyond Language |
| 97 | `3blue1brown-but-do-ai-images-videos-actually` | `transformer-attention` | `iv-5mZ_9CPY` | 3Blue1Brown | `5:13–17:13 / 37:20` | But how do AI images and videos actually work? \| Guest video by Welch Labs |
| 98 | `ibm-technology-what-are-word-embeddings` | `tokenization-embeddings` | `wgfSDrqYMJ4` | IBM Technology | `0:51–6:43 / 8:38` | What are Word Embeddings? |
| 99 | `lex-clips-scaling-laws-of-ai-explained` | `scaling-pretraining` | `GrloGdp5wdc` | Lex Clips | `2:09–11:09 / 17:55` | Scaling Laws of AI explained \| Dario Amodei and Lex Fridman |
| 100 | `techxops-this-1-hour-andrej-karpathy-lecture` | `rlhf-post-training` | `EsQ_bmXKA4A` | TechXOps | `7:00–19:00 / 68:31` | This 1-Hour Andrej Karpathy Lecture Explains Modern AI Better Than Most Courses |
| 101 | `anthropic-behind-prompt-prompting-tips-clau` | `prompt-cot` | `OfUn6HjwXhI` | Anthropic | `0:21–2:47 / 3:36` | Behind the prompt: Prompting tips for Claude.ai |
| 102 | `ibm-technology-rag-vs-fine-tuning-vs` | `rag-grounding` | `zYGDpG-pTho` | IBM Technology | `1:34–8:24 / 13:10` | RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models |
| 103 | `tech-tim-learn-ollama-in-15-minutes` | `lora-local-open-weights` | `UtSSMs6ObqY` | Tech With Tim | `1:41–8:58 / 14:02` | Learn Ollama in 15 Minutes - Run LLM Models Locally for FREE |
| 104 | `mickmumpitz-control-multiple-consistent-characters-c` | `diffusion-controllable-image` | `PZVs4lqG6LA` | Mickmumpitz | `2:30–11:30 / 26:31` | Control MULTIPLE CONSISTENT CHARACTERS + CAMERA with this FREE AI Workflow [Blender + ComfyUI] |
| 105 | `stanford-online-ai-agents-use-tools-function` | `structured-tool-calling` | `s0S38lz6O7M` | Stanford Online | `7:00–19:00 / 79:16` | How AI Agents Use Tools: Function Calling & MCP \| Stanford CS329Z Lecture 4 with Diyi Yang |
| 106 | `langchain-langgraph-multi-agent-workflows` | `agent-workflows-graphs` | `hvAPnpSfSGo` | LangChain | `2:30–11:30 / 24:02` | LangGraph: Multi-Agent Workflows |
| 107 | `grace-leung-this-notebooklm-perplexity-workflow-will` | `long-context-multimodal` | `27AxmEh3qEA` | Grace Leung | `2:08–11:08 / 17:48` | This NotebookLM + Perplexity Workflow Will Cut Your Research Time by 50% (or More) |
| 108 | `hamel-husain-automate-ai-evals-correctly` | `llm-evals-observability` | `tqUDjc1HzO4` | Hamel Husain | `2:30–11:30 / 27:19` | How to Automate AI Evals (Correctly) |
| 109 | `pixaroma-flux-3-klein-in-comfyui-generate` | `comfyui-video-audio` | `ntxxhO9H3bY` | pixaroma | `2:30–11:30 / 26:38` | Flux 3 Klein in ComfyUI \| Generate, Edit & Combine Images (Ep39) |
| 110 | `google-cloud-tech-model-context-protocol-mcp` | `mcp-protocol` | `cGuyrANVi4A` | Google Cloud Tech | `0:47–6:12 / 7:58` | How Model Context Protocol (MCP) actually works |
| 111 | `hung-yi-lee-ai-2025-ai-agent` | `rlvr-reasoning-models` | `M2Yg1kwPpts` | Hung-yi Lee | `7:00–19:00 / 102:00` | 【生成式AI時代下的機器學習(2025)】第二講：一堂課搞懂 AI Agent 的原理 (AI如何透過經驗調整行為、使用工具和做計劃) |
| 112 | `y-combinator-make-claude-code-your-ai` | `vibe-coding` | `wkv2ifxPpF8` | Y Combinator | `2:30–11:30 / 21:50` | How to Make Claude Code Your AI Engineering Team |
| 113 | `anthropic-claude-computer-use-orchestrating-ta` | `computer-use-browser-agents` | `jqx18KgIzAE` | Anthropic | `0:00–2:05 / 2:05` | Claude \| Computer use for orchestrating tasks |
| 114 | `llamaindex-multi-modal-rag-colpali-as-reranker` | `hybrid-agentic-rag` | `jxhvIoMqAxQ` | LlamaIndex | `0:52–6:51 / 8:49` | Multi-Modal RAG with ColPali as Reranker |
| 115 | `google-cloud-tech-context-engineering-explained-what` | `context-engineering` | `BBPQYtR7oUk` | Google Cloud Tech | `1:12–6:26 / 10:05` | Context engineering explained: What every AI developer should know |
| 116 | `ai-engineer-rethinking-claude-code-best-practices` | `agentic-coding-cli` | `vlfCjWuv4es` | AI Engineer | `2:06–11:06 / 17:32` | Rethinking Claude Code Best Practices — Lydia Hallie, Anthropic |
| 117 | `latent-space-recursive-self-improvement-from-auto` | `agent-skills-subagents` | `eDFXtSg3zB8` | Latent Space | `7:00–19:00 / 93:27` | Recursive Self-Improvement: from Auto Research to Superintelligence — Richard Socher, Recursive |
| 118 | `ted-spatial-intelligence-ai-will-underst` | `world-models-embodied-multimodal` | `y8NtMZ7VGmU` | TED | `1:49–9:43 / 15:12` | With Spatial Intelligence, AI Will Understand the Real World \| Fei-Fei Li \| TED |
| 119 | `statquest-jos-transformer-neural-networks-chatgpt-s` | `transformer-attention` | `zxQyTK8quyY` | StatQuest with Josh Starmer | `5:04–17:04 / 36:15` | Transformer Neural Networks, ChatGPT's foundation, Clearly Explained!!! |
| 120 | `computerphile-vectoring-words-word-embeddings-comput` | `tokenization-embeddings` | `gQddtTdmG_8` | Computerphile | `2:01–10:49 / 16:56` | Vectoring Words (Word Embeddings) - Computerphile |
| 121 | `machinematics-what-are-chinchilla-scaling-laws` | `scaling-pretraining` | `QAMjqpFGe_Y` | Machinematics | `2:30–11:30 / 21:27` | What are Chinchilla Scaling laws? |
| 122 | `luis-serrano-acade-direct-preference-optimization-dpo` | `rlhf-post-training` | `k2pD3k1485A` | Luis Serrano Academy | `2:30–11:30 / 21:15` | Direct Preference Optimization (DPO) - How to fine-tune LLMs directly without reinforcement learning |
| 123 | `matthew-berman-anthropic-researcher-explains-train` | `prompt-cot` | `Sjdvu4nHfDk` | Matthew Berman | `7:00–19:00 / 56:16` | Anthropic Researcher explains how to train LLMs |
| 124 | `ibm-technology-rag-vs-fine-tuning` | `rag-grounding` | `00Q0G84kq3M` | IBM Technology | `0:53–6:58 / 8:57` | RAG vs. Fine Tuning |
| 125 | `matt-williams-optimize-your-ai-quantization-explained` | `lora-local-open-weights` | `K75j8MkwgJ0` | Matt Williams | `1:27–7:46 / 12:10` | Optimize Your AI - Quantization Explained |
| 126 | `gonkee-stable-diffusion-works-ai-image-gener` | `diffusion-controllable-image` | `sFztPP9qPRc` | Gonkee | `4:14–16:14 / 30:21` | How Stable Diffusion Works (AI Image Generation) |
| 127 | `adam-lucek-llm-function-calling-ai-tools` | `structured-tool-calling` | `gMeTK6zzaO4` | Adam Lucek | `4:22–16:22 / 31:14` | LLM Function Calling - AI Tools Deep Dive |
| 128 | `google-cloud-tech-agentic-ai-workflows-vs` | `agent-workflows-graphs` | `Qd6anWv0mv0` | Google Cloud Tech | `0:33–4:17 / 5:30` | Agentic AI: Workflows vs. agents |
| 129 | `paul-j-lipsky-this-perplexity-notebooklm-workflow` | `long-context-multimodal` | `MxFcCHz1e7A` | Paul J Lipsky | `1:39–8:48 / 13:46` | This Perplexity + NotebookLM Workflow Is Incredible! |
| 130 | `braintrust-intro-evals-braintrust` | `llm-evals-observability` | `9uEay1jQM3w` | Braintrust | `1:44–9:17 / 14:33` | Intro to Evals with Braintrust |
| 131 | `pixaroma-comfyui-nodes-explained-basics-be` | `comfyui-video-audio` | `8l8nYfU81nA` | pixaroma | `1:27–7:44 / 12:05` | ComfyUI Nodes Explained: The Basics for Beginners |
| 132 | `anthropic-model-context-protocol-mcp` | `mcp-protocol` | `CQywdSdi5iA` | Anthropic | `2:21–11:21 / 19:35` | The Model Context Protocol (MCP) |
| 133 | `hung-yi-lee-2025-2-context-e` | `rlvr-reasoning-models` | `lVdajtNpaGI` | Hung-yi Lee | `7:00–19:00 / 110:08` | 【生成式人工智慧與機器學習導論2025】第 2 講：上下文工程 (Context Engineering) — AI Agent 背後的關鍵技術 |
| 134 | `y-combinator-cursor-head-of-design-roasts` | `vibe-coding` | `RynySryqM_0` | Y Combinator | `4:58–16:58 / 35:35` | Cursor Head of Design Roasts Startup Websites |
| 135 | `indydevdan-my-4-layer-claude-code-playwright` | `computer-use-browser-agents` | `efctPj6bjCY` | IndyDevDan | `2:30–11:30 / 27:16` | My 4-Layer Claude Code Playwright CLI Skill  (Agentic Browser Automation) |
| 136 | `professor-py-ai-e-colpali-multimodal-rag` | `hybrid-agentic-rag` | `wgjqDsdX9CE` | Professor Py: AI Engineering | `0:47–6:10 / 7:55` | ColPali Multimodal RAG in Python: Search PDF Tables and Charts Without OCR |
| 137 | `ai-engineer-architecting-agent-memory-principles-pat` | `context-engineering` | `W2HVdB4Jbjs` | AI Engineer | `2:06–11:06 / 17:37` | Architecting Agent Memory: Principles, Patterns, and Best Practices — Richmond Alake, MongoDB |
| 138 | `openai-getting-started-codex` | `agentic-coding-cli` | `px7XlbYgk7I` | OpenAI | `7:00–19:00 / 53:02` | Getting started with Codex |
| 139 | `cole-medin-claude-code-s-agent-teams` | `agent-skills-subagents` | `-1K_ZWDKpU0` | Cole Medin | `2:25–11:25 / 20:16` | Claude Code's Agent Teams Are Insane - Multiple AI Agents Coding Together in Real Time |
| 140 | `bloomberg-original-what-s-beyond-chatgpt-godmother` | `world-models-embodied-multimodal` | `ITxsc3mgqts` | Bloomberg Originals | `2:30–11:30 / 24:04` | What's Beyond ChatGPT? The 'Godmother of AI' Has a Plan \| The Circuit |
| 141 | `welch-labs-deepseek-rewrote-transformer-mla` | `transformer-attention` | `0VLAoVGf_74` | Welch Labs | `2:10–11:10 / 18:09` | How DeepSeek Rewrote the Transformer [MLA] |
| 142 | `freecodecamp-org-vector-embeddings-tutorial-code-your` | `tokenization-embeddings` | `yfHHvmaMkcA` | freeCodeCamp.org | `5:05–17:05 / 36:23` | Vector Embeddings Tutorial – Code Your Own AI Assistant with GPT-4 API + LangChain + NLP |
| 143 | `hyperautomation-la-karpathy-s-intro-llms-complete` | `scaling-pretraining` | `xTkkafyD0Q0` | Hyperautomation Labs | `1:41–9:00 / 14:05` | Karpathy's Intro to LLMs — The Complete Visual Breakdown (2026) |
| 144 | `martin-is-a-dad-llm-training-reinforcement` | `rlhf-post-training` | `aB7ddsbhhaU` | Martin Is A Dad | `2:30–11:30 / 22:44` | LLM Training & Reinforcement Learning from Google Engineer \| SFT + RLHF \| PPO vs GRPO vs DPO |
| 145 | `google-cloud-tech-prompt-engineering-developers` | `prompt-cot` | `I0DBxnTlaMw` | Google Cloud Tech | `0:47–6:07 / 7:51` | Prompt engineering for developers |
| 146 | `langchain-rag-from-scratch-part-1-overview` | `rag-grounding` | `wd7TZ4w1mSw` | LangChain | `0:31–4:03 / 5:13` | RAG From Scratch: Part 1 (Overview) |
| 147 | `alex-ziskind-your-local-llm-is-10x` | `lora-local-open-weights` | `L9QZ97y9Exg` | Alex Ziskind | `1:19–7:03 / 11:02` | Your local LLM is 10x slower than it should be |
| 148 | `assemblyai-diffusion-models-explained-in-4-difficulty` | `diffusion-controllable-image` | `yTAMrHVG1ew` | AssemblyAI | `0:42–5:33 / 7:08` | Diffusion models explained in 4-difficulty levels |
| 149 | `learn-data-ma-does-openai-function-calling` | `structured-tool-calling` | `Qor2VZoBib0` | Learn Data with Mark | `0:32–4:10 / 5:21` | How does OpenAI Function Calling work? |
| 150 | `ai-engineer-anthropic-workshop-build-agents-that` | `agent-workflows-graphs` | `mR-WAvEPRwE` | AI Engineer | `7:00–19:00 / 75:40` | Anthropic Workshop: Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson |
| 151 | `efficient-nlp-kv-cache-memory-usage-in` | `long-context-multimodal` | `80bIUggRJf4` | Efficient NLP | `0:51–6:39 / 8:33` | The KV Cache: Memory Usage in Transformers |
| 152 | `hamel-husain-inspect-a-llm-eval-framework` | `llm-evals-observability` | `_UY49Q_qFhs` | Hamel Husain | `5:59–17:59 / 42:45` | Inspect - A LLM Eval Framework Used by Anthropic, DeepMind, Grok and More. |
| 153 | `sebastian-kamph-11-comfyui-nodes-you-need` | `comfyui-video-audio` | `C0qOmlmA1wk` | Sebastian Kamph | `2:23–11:23 / 19:53` | 11 ComfyUI nodes you need. |
| 154 | `anthropic-why-we-built-donated-model-context` | `mcp-protocol` | `PLyCki2K0Lg` | Anthropic | `4:58–16:58 / 35:32` | Why we built—and donated—the Model Context Protocol (MCP) |
| 155 | `umar-jamil-variational-autoencoder-model-elbo-los` | `rlvr-reasoning-models` | `iwEzwTTalbg` | Umar Jamil | `2:30–11:30 / 27:12` | Variational Autoencoder - Model, ELBO, loss function and maths explained easily! |
| 156 | `y-combinator-we-re-all-addicted-claude` | `vibe-coding` | `qwmmWzPnhog` | Y Combinator | `6:26–18:26 / 46:00` | We're All Addicted To Claude Code |
| 157 | `sam-witteveen-anthropic-computer-use-hands-on` | `computer-use-browser-agents` | `Iabue7wtE4g` | Sam Witteveen | `0:55–7:09 / 9:11` | Anthropic Computer Use - Hands On Tutorial |
| 158 | `professor-py-ai-e-multimodal-pdf-rag` | `hybrid-agentic-rag` | `dVjdBvwxcSE` | Professor Py: AI Engineering | `0:53–6:58 / 8:58` | Multimodal PDF RAG with ColPali in Python: Search Pages by Image and Text |
| 159 | `ai-engineer-your-old-prompts-are-making` | `context-engineering` | `ys6YQ2yfBpM` | AI Engineer | `7:00–19:00 / 64:03` | Your Old Prompts Are Making Claude Worse - Lance Martin, Anthropic |
| 160 | `openai-meet-new-codex-cli` | `agentic-coding-cli` | `PUBc2G0Tj5E` | OpenAI | `0:19–2:31 / 3:15` | Meet the New Codex CLI |
| 161 | `latent-space-claude-code-s-bitter-lesson` | `agent-skills-subagents` | `IZAlq-V19U8` | Latent Space | `7:00–19:00 / 94:32` | Claude Code’s Bitter Lesson: Prompts, Harnesses, Mods, and Agents — Thariq Shihipar, Anthropic |
| 162 | `sequoia-capital-robotics-end-game-nvidia-s` | `world-models-embodied-multimodal` | `3Y8aq_ofEVs` | Sequoia Capital | `2:24–11:24 / 20:03` | Robotics' End Game: Nvidia's Jim Fan |
| 163 | `ibm-technology-what-are-transformers-machine-learning` | `transformer-attention` | `ZXiruGOCn9s` | IBM Technology | `0:35–4:33 / 5:51` | What are Transformers (Machine Learning Model)? |
| 164 | `codebasics-vector-database-explained-what-is-vector` | `tokenization-embeddings` | `72XgD322wZ8` | codebasics | `0:41–5:21 / 6:52` | Vector Database Explained \| What is Vector Database? |
| 165 | `scale-openai-s-instructgpt-aligning-language-mo` | `rlhf-post-training` | `QGpaBWOaHQI` | Scale | `5:46–17:46 / 41:18` | OpenAI's InstructGPT: Aligning Language Models with Human Intent |
| 166 | `tina-huang-google-s-9-hour-ai` | `prompt-cot` | `p09yRj47kNM` | Tina Huang | `2:26–11:26 / 20:17` | Google's 9 Hour AI Prompt Engineering Course In 20 Minutes |
| 167 | `langchain-rag-from-scratch-part-4-generation` | `rag-grounding` | `Vw52xyyFsB8` | LangChain | `0:38–4:59 / 6:25` | RAG From Scratch: Part 4 (Generation) |
| 168 | `krish-naik-steps-by-step-tutorial-fine` | `lora-local-open-weights` | `Vg3dS-NLUT4` | Krish Naik | `2:30–11:30 / 26:45` | Steps By Step Tutorial To Fine Tune LLAMA 2 With Custom Dataset Using LoRA And QLoRA Techniques |
| 169 | `deepia-diffusion-models-ddpm-generative-ai-ani` | `diffusion-controllable-image` | `EhndHhIvWWw` | Deepia | `4:29–16:29 / 32:06` | Diffusion Models: DDPM \| Generative AI Animated |
| 170 | `elvis-saravia-function-calling-openai-apis-a` | `structured-tool-calling` | `p0I-hwZSWMs` | Elvis Saravia | `2:13–11:13 / 18:29` | Function Calling with OpenAI APIs \| A Crash Course |
| 171 | `anthropic-building-more-effective-ai-agents` | `agent-workflows-graphs` | `uhJJgc-0iTQ` | Anthropic | `2:16–11:16 / 18:58` | Building more effective AI agents |
| 172 | `caleb-writes-code-world-models-explained-in` | `long-context-multimodal` | `ECWC-YlAk1o` | Caleb Writes Code | `0:59–7:41 / 9:52` | World Models explained in 10min.. |
| 173 | `hamel-husain-can-claude-build-your-evals` | `llm-evals-observability` | `5ykulgyB8kk` | Hamel Husain | `6:43–18:43 / 47:59` | Can Claude Build Your Evals? |
| 174 | `sebastian-kamph-10-essential-comfyui-nodes` | `comfyui-video-audio` | `rVj_rSSvPjs` | Sebastian Kamph | `2:30–11:30 / 22:45` | 10 essential ComfyUI nodes. |
| 175 | `kodekloud-model-context-protocol-mcp-explained` | `mcp-protocol` | `E2DEHOEbzks` | KodeKloud | `2:30–11:30 / 24:10` | Model Context Protocol (MCP) Explained for Beginners: AI Flight Booking Demo! |
| 176 | `umar-jamil-coding-llama-2-from-scratch` | `rlvr-reasoning-models` | `oM4VmoabDAI` | Umar Jamil | `7:00–19:00 / 184:11` | Coding LLaMA 2 from scratch in PyTorch - KV Cache, Grouped Query Attention, Rotary PE, RMSNorm |
| 177 | `y-combinator-build-future-paul-graham-amj` | `vibe-coding` | `Q78dJ0vkWe8` | Y Combinator | `6:11–18:11 / 44:15` | How To Build The Future: Paul Graham & Amjad Masad |
| 178 | `ai-master-build-an-ai-agent-claude` | `computer-use-browser-agents` | `bcM9dP_uXJU` | AI Master | `2:30–11:30 / 22:08` | How to Build an AI Agent with Claude Code (Claude AI Agent Tutorial) |
| 179 | `rag` | `hybrid-agentic-rag` | `WWdlme1EAGI` | 马克的技术工作坊 | `2:02–10:53 / 17:02` | RAG 工作机制详解——一个高质量知识库背后的技术全流程 |
| 180 | `langchain-context-engineering-ai-agents-lan` | `context-engineering` | `6_BcCthVvb8` | LangChain | `7:00–19:00 / 60:53` | Context Engineering for AI Agents with LangChain and Manus |
| 181 | `openai-using-openai-codex-cli-gpt-5` | `agentic-coding-cli` | `iqNzfK4_meQ` | OpenAI | `0:34–4:27 / 5:43` | Using OpenAI Codex CLI with GPT-5-Codex |
| 182 | `ai-engineer-building-closed-loop-evals-a` | `agent-skills-subagents` | `31GUkCBD-Uc` | AI Engineer | `2:30–11:30 / 21:39` | Building Closed-Loop Evals for a Multimodal Agent at Scale — Soumya Gupta & Jai Chopra, Uber |
| 183 | `computer-vision-an-yann-lecun-world-models` | `world-models-embodied-multimodal` | `72Xj8k5WQX4` | Computer Vision and Geometry Group, ETH Zurich | `7:00–19:00 / 58:54` | Yann LeCun: World Models: Enabling the next AI revolution |
| 184 | `yannic-kilcher-attention-is-all-you-need` | `transformer-attention` | `iDulhoQ2pro` | Yannic Kilcher | `2:30–11:30 / 27:07` | Attention Is All You Need |
| 185 | `codebasics-converting-words-numbers-word-embeddin` | `tokenization-embeddings` | `sZGuyTLjsco` | codebasics | `1:23–7:22 / 11:32` | Converting words to numbers, Word Embeddings \| Deep Learning Tutorial 39 (Tensorflow & Python) |
| 186 | `data-science-in-yo-andrej-karpathy-deep` | `rlhf-post-training` | `PHMpTkoyorc` | Data Science in your pocket | `1:50–9:47 / 15:19` | Andrej Karpathy Deep Dive into LLMs like ChatGPT summarized |
| 187 | `deeplearningai-full-ai-prompting-course-andrew-ng` | `prompt-cot` | `8ib4Qnh2HFE` | DeepLearningAI | `7:00–19:00 / 148:47` | Full AI Prompting Course with Andrew Ng |
| 188 | `freecodecamp-org-learn-rag-from-scratch-python` | `rag-grounding` | `sVcwVQRHIc8` | freeCodeCamp.org | `7:00–19:00 / 153:11` | Learn RAG From Scratch – Python AI Tutorial from a LangChain Engineer |
| 189 | `mark-hennings-lora-qlora-fine-tuning-explained` | `lora-local-open-weights` | `t1caDsMzWBk` | Mark Hennings | `1:45–9:22 / 14:39` | LoRA & QLoRA Fine-tuning Explained In-Depth |
| 190 | `render-realm-stable-diffusion-explained-in-less` | `diffusion-controllable-image` | `QdRP9pO89MY` | Render Realm | `0:59–7:44 / 9:56` | Stable Diffusion explained (in less than 10 minutes) |
| 191 | `telusko-getting-structured-output-in-json-format` | `structured-tool-calling` | `CllLqPwCjD4` | Telusko | `0:55–7:12 / 9:15` | Getting Structured Output in JSON format |
| 192 | `jeff-su-ai-agents-clearly-explained` | `agent-workflows-graphs` | `FwOTs4UxQS4` | Jeff Su | `1:13–6:29 / 10:09` | AI Agents, Clearly Explained |
| 193 | `ai-tech-ed-this-notebooklm-perplexity-workflow` | `long-context-multimodal` | `tiM8Bk_pOdg` | AI and Tech for Education | `0:41–5:25 / 6:58` | This NotebookLM + Perplexity Workflow Will Boost Your Research Output by 90% |
| 194 | `hamel-husain-ai-eval-concepts-explained-in` | `llm-evals-observability` | `3rlYBCDK0K4` | Hamel Husain | `1:43–9:12 / 14:24` | AI Eval Concepts Explained in 15 Minutes |
| 195 | `pixaroma-comfyui-ksampler-explained-seed-steps-c` | `comfyui-video-audio` | `A6G5IPR_BPY` | pixaroma | `2:11–11:11 / 18:15` | ComfyUI KSampler Explained: Seed, Steps, CFG and Denoise |
| 196 | `greg-isenberg-model-context-protocol-mcp-clearly` | `mcp-protocol` | `7j_NE6Pjv-E` | Greg Isenberg | `2:26–11:26 / 20:18` | Model Context Protocol (MCP), clearly explained (why it matters) |
| 197 | `hung-yi-lee-ai-2025-deepseek-r1` | `rlvr-reasoning-models` | `bJFtcwLSNxI` | Hung-yi Lee | `7:00–19:00 / 78:30` | 【生成式AI時代下的機器學習(2025)】第七講：DeepSeek-R1 這類大型語言模型是如何進行「深度思考」（Reasoning）的？ |
| 198 | `google-what-is-vibe-coding` | `vibe-coding` | `tYhgWRJeYzs` | Google | `0:00–1:35 / 1:35` | What is vibe coding? |
| 199 | `chase-ai-claude-code-playwright-insane-browser` | `computer-use-browser-agents` | `I9kO6-yPkfM` | Chase AI | `1:39–8:50 / 13:49` | Claude Code + Playwright = INSANE Browser Automations |
| 200 | `adam-lucek-knowledge-graph-or-vector-database` | `hybrid-agentic-rag` | `6vG_amAshTk` | Adam Lucek | `5:45–17:45 / 41:08` | Knowledge Graph or Vector Database… Which is Better? |
| 201 | `langchain-apply-context-engineering` | `context-engineering` | `nyKvyRrpbyY` | LangChain | `2:30–11:30 / 23:20` | How to apply context engineering |
| 202 | `cursor-next-era-of-ai-coding` | `agentic-coding-cli` | `8h9j2rskP14` | Cursor | `0:57–7:30 / 9:38` | The next era of AI coding |
| 203 | `latent-space-recursive-language-models-alex-zhang` | `agent-skills-subagents` | `kog7mwsDqnk` | Latent Space | `7:00–19:00 / 103:25` | Recursive Language Models — Alex Zhang, MIT PhD |
| 204 | `ai-shot-studio-mastering-ai-video-42` | `world-models-embodied-multimodal` | `HOjCT6TxlHM` | AI Shot Studio | `1:13–6:33 / 10:16` | Mastering AI Video: 42 Camera Movement Vocabulary for Prompts (Visual Guide) Motion Examples |
| 205 | `umar-jamil-attention-is-all-you-need` | `transformer-attention` | `bCz4OMemCcA` | Umar Jamil | `7:00–19:00 / 58:04` | Attention is all you need (Transformer) - Model explanation (including math), Inference and Training |
| 206 | `colin-talks-tech-a-beginner-s-guide` | `tokenization-embeddings` | `NEreO2zlXDk` | Colin Talks Tech | `0:50–6:36 / 8:29` | A Beginner's Guide to Vector Embeddings |
| 207 | `natural-language-p-rlhf-reinforcement-learning-from` | `rlhf-post-training` | `MKb4orC58-M` | Natural Language Processing Interest Group | `7:00–19:00 / 60:43` | RLHF(Reinforcement Learning from Human Feedback) and InstructGPT |
| 208 | `philia-why-andrew-ng-says-prompting-is` | `prompt-cot` | `9EuNUe-CJRM` | philia | `7:00–19:00 / 103:03` | Why Andrew Ng Says Prompting Is Dead |
| 209 | `kodekloud-rag-explained-beginners` | `rag-grounding` | `_HQ2H_0Ayy0` | KodeKloud | `1:13–6:29 / 10:09` | RAG Explained For Beginners |
| 210 | `edward-hu-what-is-low-rank-adaptation` | `lora-local-open-weights` | `DhRoTONcyZE` | Edward Hu | `0:44–5:49 / 7:29` | What is Low-Rank Adaptation (LoRA) \| explained by the inventor |
| 211 | `glibatree-consistent-characters-in-midjourney-final` | `diffusion-controllable-image` | `5ISpGjtDijk` | Glibatree | `4:23–16:23 / 31:20` | Consistent Characters in Midjourney, Finally Solved! |
| 212 | `efficient-nlp-structured-output-from-llms-grammars` | `structured-tool-calling` | `xpvFinvqRCA` | Efficient NLP | `2:04–11:04 / 17:20` | Structured Output from LLMs: Grammars, Regex, and State Machines |
| 213 | `freecodecamp-org-langgraph-complete-course-beginners` | `agent-workflows-graphs` | `jGg_1h0qzaM` | freeCodeCamp.org | `7:00–19:00 / 189:52` | LangGraph Complete Course for Beginners – Complex AI Agents with Python |
| 214 | `stewart-gauld-master-gemini-notebook-in-11` | `long-context-multimodal` | `ETBy8riF4Lo` | Stewart Gauld | `1:27–7:47 / 12:12` | Master Gemini Notebook in 11 Minutes \| Massive Updates |
| 215 | `hamel-husain-build-ai-evals` | `llm-evals-observability` | `mF4CaijvJos` | Hamel Husain | `4:42–16:42 / 33:39` | How To Build AI Evals |
| 216 | `jeff-geerling-elevenlabs-just-got-nuked-by` | `comfyui-video-audio` | `dQ841Pd6YvQ` | Jeff Geerling | `0:20–2:41 / 3:28` | ElevenLabs just got nuked by open source |
| 217 | `codebasics-model-context-protocol-clearly-explained` | `mcp-protocol` | `tzrwxLNHtRY` | codebasics | `1:48–9:38 / 15:04` | Model Context Protocol Clearly Explained \| MCP Beyond the Hype |
| 218 | `ai-alex-deepseek-r1-explained-your-grandma` | `rlvr-reasoning-models` | `kv8frWeKoeo` | AI with Alex | `0:51–6:39 / 8:33` | DeepSeek R1 Explained to your grandma |
| 219 | `austin-marchese-stop-prompting-claude-use-karpathy` | `vibe-coding` | `7zZy1QTvokM` | Austin Marchese | `1:35–8:30 / 13:19` | Stop Prompting Claude. Use Karpathy's Method Instead. |
| 220 | `nate-herk-ai-aut-claude-code-playwright` | `computer-use-browser-agents` | `J-6pnl5DQg8` | Nate Herk | AI Automation | `2:15–11:15 / 18:51` | Claude Code + Playwright Automates Literally Anything |
| 221 | `prompt-engineering-colpali-vision-based-rag-system` | `hybrid-agentic-rag` | `DI9Q60T_054` | Prompt Engineering | `1:54–10:11 / 15:56` | ColPali: Vision-Based RAG System For Complex Documents |
| 222 | `ai-engineer-we-solved-context-management-in` | `context-engineering` | `esY99nYXxR4` | AI Engineer | `1:57–10:25 / 16:17` | How we solved Context Management in Agents — Sally-Ann Delucia |
| 223 | `cole-medin-5-techniques-separating-top-agentic` | `agentic-coding-cli` | `ttdWPDmBN_4` | Cole Medin | `1:47–9:32 / 14:56` | The 5 Techniques Separating Top Agentic Engineers Right Now |
| 224 | `latent-space-robots-that-predict-future-dyna` | `agent-skills-subagents` | `BHiYomkfoGQ` | Latent Space | `7:00–19:00 / 81:06` | Robots That Predict the Future: Dyna-2 & Physical AI — Jason Ma, Dyna Robotics |
| 225 | `world-labs-introducing-atlas-a-foundation-model` | `world-models-embodied-multimodal` | `hzvXRHBInx0` | World Labs | `0:00–1:26 / 1:26` | Introducing Atlas; A Foundation Model for Spatial Intelligence |
| 226 | `statquest-jos-word-embedding-word2vec-clearly-expla` | `transformer-attention` | `viZrOnJclY0` | StatQuest with Josh Starmer | `1:56–10:21 / 16:12` | Word Embedding and Word2Vec, Clearly Explained!!! |
| 227 | `blackboard-ai-ai-turns-words-into-vectors` | `tokenization-embeddings` | `lPTcTh5sRug` | BlackBoard AI | `0:21–2:47 / 3:35` | How AI Turns Words Into Vectors: Embeddings |
| 228 | `snorkel-ai-4-ways-align-llms-rlhf` | `rlhf-post-training` | `lBzw9ku86dg` | Snorkel AI | `0:37–4:54 / 6:18` | 4 Ways to Align LLMs: RLHF, DPO, KTO, and ORPO |
| 229 | `tech-tim-prompt-engineering-full-course` | `prompt-cot` | `2BpCk4d2Cc0` | Tech With Tim | `5:16–17:16 / 37:44` | Prompt Engineering Full Course |
| 230 | `krish-naik-complete-rag-crash-course-langchain` | `rag-grounding` | `o126p1QN_RI` | Krish Naik | `7:00–19:00 / 128:09` | Complete RAG Crash Course With Langchain In 2 Hours |
| 231 | `codebasics-llm-fine-tuning-crash-course-llm` | `lora-local-open-weights` | `IIvORO248Zs` | codebasics | `7:00–19:00 / 53:42` | LLM Fine Tuning Crash Course \| LLM Fine Tuning Tutorial |
| 232 | `ai-coffee-break-wi-does-stable-diffusion` | `diffusion-controllable-image` | `J87hffSMB60` | AI Coffee Break with Letitia | `1:35–8:28 / 13:16` | How does Stable Diffusion work? – Latent Diffusion Models EXPLAINED |
| 233 | `peace-of-code-claude-certified-architect-ep` | `structured-tool-calling` | `CaDaLn7DcQ0` | Peace Of Code | `5:09–17:09 / 36:51` | Claude Certified Architect: Ep 16 \| Structured Output & JSON Schema |
| 234 | `deeplearningai-learn-build-effective-agentic-ai-system` | `agent-workflows-graphs` | `w7vqXL4PWEE` | DeepLearningAI | `0:00–2:35 / 2:35` | Learn to build effective Agentic AI systems with Andrew Ng |
| 235 | `assemblyai-do-multimodal-ai-models-work-simple` | `long-context-multimodal` | `WkoytlA3MoQ` | AssemblyAI | `0:40–5:14 / 6:44` | How do Multimodal AI models work? Simple explanation |
| 236 | `hamel-husain-8-claude-code-skills-i` | `llm-evals-observability` | `c5Ur73GosR4` | Hamel Husain | `1:24–7:28 / 11:41` | 8 Claude Code skills I use for building better AI evals |
| 237 | `billy-s-aviation-elevenlabs-voice-cloning-tutorial` | `comfyui-video-audio` | `afBsAQAUkq0` | Billy’s Aviation | `0:19–2:30 / 3:13` | ElevenLabs Voice Cloning Tutorial \| How to make an AI Clone of Your Voice |
| 238 | `techworld-nan-mcp-explained-simply-what-it` | `mcp-protocol` | `oblaHqULUHk` | TechWorld with Nana | `4:12–16:12 / 30:06` | MCP Explained Simply — What It Is and Why It Exists |
| 239 | `andrew-ethan-zeng-deepseek-r1-explained-mind` | `rlvr-reasoning-models` | `rWky1japtJ8` | Andrew Ethan Zeng | `0:45–5:55 / 7:37` | DeepSeek R1 Explained – The Mind-Blowing AI Model. |
| 240 | `metics-media-ultimate-beginner-s-guide-vibe` | `vibe-coding` | `-VuZmoc-Sq8` | Metics Media | `4:41–16:41 / 33:33` | The Ultimate Beginner’s Guide to Vibe Coding |
| 241 | `naveen-automationl-create-your-own-browser-ai` | `computer-use-browser-agents` | `AK9mRsXdr4w` | Naveen AutomationLabs | `2:30–11:30 / 23:34` | How to create your own Browser AI Agent using any LLM Model + Playwright + Browser-Use + Web-UI |
| 242 | `code-agent-skills-rag` | `hybrid-agentic-rag` | `YL-BgiruIe0` | code秘密花园 | `1:37–8:41 / 13:36` | Agent Skills 做知识库检索，能比传统 RAG 效果更好吗？ |
| 243 | `latent-space-context-engineering-agents-lance-mar` | `context-engineering` | `_IlTcWciEC4` | Latent Space | `7:00–19:00 / 63:18` | Context Engineering for Agents - Lance Martin, LangChain |
| 244 | `cole-medin-anthropic-just-dropped-a-masterclass` | `agentic-coding-cli` | `efRIrLXoOVA` | Cole Medin | `2:30–11:30 / 28:10` | Anthropic Just Dropped a Masterclass on Building Agent Harnesses (for Large Codebases) |
| 245 | `latent-space-ai-in-nyc-tenex-builds` | `agent-skills-subagents` | `Vki6cklFqxo` | Latent Space | `6:05–18:05 / 43:33` | AI in NYC: How Tenex Builds an AI-Native Engineering Team — Alex Lieberman & CJ Hess |
| 246 | `lenny-s-podcast-godmother-of-ai-on` | `world-models-embodied-multimodal` | `Ctjiatnd6Xk` | Lenny's Podcast | `7:00–19:00 / 79:34` | The Godmother of AI on jobs, robots & why world models are next \| Dr. Fei-Fei Li |
| 247 | `ai-transformer` | `transformer-attention` | `nzqlFIcCSWQ` | 跟李沐学AI | `7:00–19:00 / 87:05` | Transformer论文逐段精读 |
| 248 | `annie-sexton-tokens-vs-embeddings-what-are` | `tokenization-embeddings` | `izbifbq3-eI` | Annie Sexton | `0:41–5:21 / 6:52` | Tokens vs Embeddings – what are they + how are they different? |
| 249 | `arize-ai-deep-papers-episode-1-chatgpt` | `rlhf-post-training` | `RkFS6-GwCxE` | Arize AI | `6:40–18:40 / 47:40` | Deep Papers Episode 1 - ChatGPT and InstructGPT: Aligning Language Models to Human Intention |
| 250 | `deeplearningai-chatgpt-prompt-engineering-developers` | `prompt-cot` | `H4YK_7MAckk` | DeepLearningAI | `0:00–1:58 / 1:58` | ChatGPT Prompt Engineering for Developers: A short course from OpenAI and DeepLearning.AI |
| 251 | `tech-tim-build-a-local-ai-agent` | `rag-grounding` | `E4l91XKQSgw` | Tech With Tim | `2:30–11:30 / 28:09` | How to Build a Local AI Agent With Python (Ollama, LangChain & RAG) |
| 252 | `python-simplified-teach-llm-something-new-lora` | `lora-local-open-weights` | `uikZs6y0qgI` | Python Simplified | `2:30–11:30 / 23:34` | Teach LLM Something New 💡 LoRA Fine Tuning on Custom Data |
| 253 | `data-leveling-comfyui-ipadapter-sdxl-sd1-5` | `diffusion-controllable-image` | `oYjEFHb--RA` | Data Leveling | `2:19–11:19 / 19:26` | ComfyUI IPAdapter (SDXL/SD1.5): Create a Consistent AI Instagram Model |
| 254 | `developers-digest-ollama-structured-outputs-in-5` | `structured-tool-calling` | `KXQU3mJTvuw` | Developers Digest | `0:30–3:54 / 5:01` | Ollama Structured Outputs in 5 Minutes |
| 255 | `nate-herk-ai-aut-anthropic-engineer-explains` | `agent-workflows-graphs` | `HIRDzMtuWFk` | Nate Herk | AI Automation | `0:58–7:37 / 9:48` | Anthropic Engineer Explains: What to Build Instead of AI Agents |
| 256 | `wiseup-communicati-master-notebooklm-researchers-full-t` | `long-context-multimodal` | `B7sYOUse-DQ` | WiseUp Communications | `1:25–7:34 / 11:50` | Master NotebookLM for Researchers \| Full Tutorial 2026 |
| 257 | `hamel-husain-llm-eval-tools-compared-langsmith` | `llm-evals-observability` | `y0vm_fjkejo` | Hamel Husain | `6:28–18:28 / 46:15` | LLM Eval Tools Compared: LangSmith |
| 258 | `dan-kieft-use-elevenlabs-master-this-ai` | `comfyui-video-audio` | `s7p6OLwV_50` | Dan Kieft | `2:30–11:30 / 23:47` | How To Use Elevenlabs - Master This AI Voice Generator in 23 minutes! |
| 259 | `bytebytego-why-everyone-s-talking-about-mcp` | `mcp-protocol` | `_d0duu3dED4` | ByteByteGo | `0:30–3:56 / 5:03` | Why Everyone’s Talking About MCP? |
| 260 | `leon-van-zyl-run-deepseek-r1-on` | `rlvr-reasoning-models` | `rzMEieMXYFA` | Leon van Zyl | `0:32–4:11 / 5:23` | How to Run DeepSeek R1 on Your Computer (100% FREE) |
| 261 | `devforge-vibe-coding-is-a-trap-what` | `vibe-coding` | `ya6520zh4pQ` | DevForge | `0:36–4:42 / 6:02` | Vibe Coding is a Trap (What Senior Devs See That You Don't) |
| 262 | `simon-scrapes-anthropic-just-built-it-s` | `computer-use-browser-agents` | `afVpjeoQF2I` | Simon Scrapes | `0:50–6:32 / 8:24` | Anthropic Just Built It’s Own Agentic OS |
| 263 | `ctrl-alt-explain-vector-db-vs-graph` | `hybrid-agentic-rag` | `W-_OBmwrNk4` | Ctrl Alt Explain | `0:39–5:09 / 6:38` | Vector DB vs Graph DB: Which One Do You Actually Need? |
| 264 | `langchain-agents-use-context-engineering` | `context-engineering` | `XFCkrYHHfpQ` | LangChain | `2:05–11:05 / 17:24` | How Agents Use Context Engineering |
| 265 | `cole-medin-my-complete-agentic-coding-workflow` | `agentic-coding-cli` | `goOZSXmrYQ4` | Cole Medin | `5:56–17:56 / 42:24` | My COMPLETE Agentic Coding Workflow to Build Anything (No Fluff or Overengineering) |
| 266 | `latent-space-ai-frontier-from-gemini-3` | `agent-skills-subagents` | `F_1oDPWxpFQ` | Latent Space | `7:00–19:00 / 83:31` | The AI Frontier: from Gemini 3 Deep Think distilling to Flash — Jeff Dean |
| 267 | `harvard-cmsa-yann-lecun-self-supervised-learning` | `world-models-embodied-multimodal` | `yUmDRxV0krg` | Harvard CMSA | `7:00–19:00 / 68:37` | Yann LeCun \| Self-Supervised Learning, JEPA, World Models, and the future of AI |
| 268 | `statquest-jos-attention-neural-networks-clearly-exp` | `transformer-attention` | `PSs6nxngL6k` | StatQuest with Josh Starmer | `1:54–10:08 / 15:51` | Attention for Neural Networks, Clearly Explained!!! |
| 269 | `elastic-what-are-vector-embeddings-explained-in` | `tokenization-embeddings` | `bGNYyK1L41g` | Elastic | `0:00–1:49 / 1:49` | What Are Vector Embeddings? (Explained in 2 Minutes) [Quick Question Ep. 6] |
| 270 | `h-seyin-babal-birlikte-ogreniyoruz-1-deep` | `rlhf-post-training` | `THbvuh2WT7o` | Hüseyin BABAL | `7:00–19:00 / 89:05` | Birlikte Ogreniyoruz #1 - "Deep Dive into LLMs like ChatGPT by Andrej Karpathy" |
| 271 | `paul-j-lipsky-anthropic-just-revealed-prompt` | `prompt-cot` | `Z8CtXdQExek` | Paul J Lipsky | `1:28–7:52 / 12:19` | Anthropic Just Revealed How to Prompt Opus 5 |
| 272 | `pixegami-rag-langchain-python-project-easy-ai` | `rag-grounding` | `tcqEUSNCn8I` | pixegami | `2:00–10:41 / 16:42` | RAG + Langchain Python Project: Easy AI/Chat For Your Docs |
| 273 | `ai-coffee-break-wi-what-is-lora` | `lora-local-open-weights` | `KEv-F5UkhxU` | AI Coffee Break with Letitia | `0:50–6:31 / 8:22` | What is LoRA? Low-Rank Adaptation for finetuning LLMs EXPLAINED |
| 274 | `what-s-ai-by-louis-what-is` | `diffusion-controllable-image` | `RGBNdD3Wn-g` | What's AI by Louis-François Bouchard | `0:40–5:12 / 6:40` | What is Stable Diffusion? (Latent Diffusion Models Explained) |
| 275 | `tommy-eberle-llm-tool-calling-works` | `structured-tool-calling` | `QiRdYCNXAxk` | Tommy Eberle | `1:55–10:14 / 16:01` | How LLM Tool Calling Works |
| 276 | `kodekloud-langgraph-explained-beginners` | `agent-workflows-graphs` | `cUfLrn3TM3M` | KodeKloud | `1:36–8:32 / 13:21` | LangGraph Explained for Beginners |
| 277 | `andy-stapleton-notebooklm-academics-full-setup-use` | `long-context-multimodal` | `iAlBN5bKDd8` | Andy Stapleton | `1:45–9:24 / 14:43` | NotebookLM for Academics: Full Setup & Use Cases |
| 278 | `braintrust-evals-course-what-is-an-eval` | `llm-evals-observability` | `44rL1Xi88UA` | Braintrust | `0:39–5:08 / 6:37` | Evals Course: What is an eval? |
| 279 | `kevin-stratvert-use-comfyui-step-by-step` | `comfyui-video-audio` | `hl7kwMwkLJU` | Kevin Stratvert | `0:55–7:09 / 9:10` | How to Use ComfyUI (Step-by-Step Tutorial) |
| 280 | `salesforce-model-context-protocol-mcp-explained-in` | `mcp-protocol` | `mMWWU4PambM` | Salesforce | `0:00–1:51 / 1:51` | Model Context Protocol (MCP) Explained in 90 Seconds |
