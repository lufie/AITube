# AITube 概念趋势实证与分类词表报告（Concept Trends & Bilingual Taxonomy）

**采集日期**：2026-11-12  
**实证脚本与原始数据**：[`scripts/research/collect_ai_trends.py`](../scripts/research/collect_ai_trends.py) · [`datasets/aitube_google_yt_suggest_104.json`](datasets/aitube_google_yt_suggest_104.json)  
**目标读者**：AI 应用工程师、Agent 构建者、技术产品经理、独立开发者与多模态高频创作者

---

## 1. 为什么 AITube 必须引入「概念趋势时间线索引视角」？

与出海获客（漏斗阶段相对稳定）不同，AI 领域的知识半衰期极短，且呈现鲜明的**「范式层叠与概念替代」**特征。我们对 Google Web 与 YouTube 中英双语实时下拉联想（`104` 组种子查询）的实测抓取揭示了 4 组关键的 **2023 → 2026 词形与范式迁移**：

| 演进脉络 | 早期高频词（2022–2024） | 2025–2026 实时下拉联想热词（实测原词） | 底层工程逻辑的变化（Before → After） |
| :--- | :--- | :--- | :--- |
| **提示词 → 上下文 → Harness** | `prompt engineering`、`chain of thought`、`magic system prompt` | `prompt engineering vs context engineering vs harness engineering` · `context engineering skill claude` · `context engineering vs loop engineering` · 中文 `上下文工程最佳实践` | 从“雕琢单轮咒语”转向**动态装配整个上下文窗口**（工具返回裁剪、Compaction 压缩、仓库 `AGENTS.md`/`CLAUDE.md` 约束与执行沙盒 Harness）。 |
| **函数调用 → MCP → Agent Skills** | `openai function calling`、`json mode`、`langchain tools` | `model context protocol` · `mcp server tutorial` · `agent skills with anthropic` · `agent skills codex` · `agent skills 市场 / github` | **MCP** 统一了外部工具连接协议，但全量挂载 MCP 会撑爆上下文；2025 Q4–2026 **Agent Skills（`SKILL.md` 渐进式按需加载）** 成为低 Token 损耗的能力封装标准。 |
| **RLHF 对齐 → DPO → RLVR 推理** | `instructgpt rlhf`、`ppo alignment` | `rlhf vs dpo vs ppo vs grpo` · `deepseek r1 rlvr` · `reasoning models ai` · 中文 `DeepSeek R1 原理` | 从“模仿人类偏好打分（RLHF）”跃迁至**可验证奖励强化学习（RLVR / GRPO）+ 测试时计算扩展（Test-Time Compute）**，模型自发涌现反思与长链推理。 |
| **Copilot 补全 → Vibe Coding → 自主编程 CLI** | `github copilot autocomplete`、`chat with codebase` | `vibe coding tutorial / codex` · `claude code 教程 吴恩达 / vscode` · `cursor rules workflow` · `git worktrees parallel agents` | 从“IDE 行级补全”经过 2025 初 `Vibe Coding`（自然语言直出原型），演进为 **终端级自主编程 Agent（Claude Code / Codex + 测试闭环 + 多 Worktree 并行子智能体）**。 |

> [!IMPORTANT]
> **核心产品启示**：如果像传统视频站一样把 2023 年的《Prompt 咒语大全》和 2026 年的《Context Engineering & Harness》混在同一个“提示词”文件夹里，学习者会被过时范式严重误导。**每一个概念节点都必须标明「诞生季度、爆发拐点、当前生命周期状态（爆发 / 稳态 / 奠基 / 已演进）与前后演进关系」。**

---

## 2. 中英双语检索词差（Vocabulary Gaps）实证

1. **硬核概念英文缩写在中美同时通行，但后缀意图不同**：
   - 中文开发者直接搜 `MCP协议是什么`、`Agent Skills 市场`、`GraphRAG 原理`、`Vibe Coding 是什么`、`ComfyUI 工作流`；
   - 英文检索高频带 `vs` 架构选型对比：`rag vs fine tuning vs prompt engineering`、`agentic rag vs rag`、`mcp vs claude skills`、`rlhf vs dpo vs ppo vs grpo`。
2. **多模态与本地部署的实操导向极强**：
   - 生图/生视频赛道用户极少搜泛词 `multimodal generation`，而是按可控节点流搜 `comfyui flux workflow`、`consistent character storyboard`、`AI 视频生成 工作流`；
   - 开源与微调赛道高度聚焦 `Ollama 本地部署`、`LoRA 微调 教程`、`unsloth`、`vllm` 与 `GGUF` 量化。

---

## 3. 五大演进纪元 × 22 个核心 AI 概念节点（`content/concepts.json`）

| 演进纪元 | 概念 Slug | 中文名称 / EN Name | 诞生 → 拐点 | 2026 趋势状态 | 演进谱系（From → Into） |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **Era 1 · 2017–2022 奠基纪元** | `transformer-attention` | Transformer 与自注意力机制 | `2017-Q2 → 2022-Q4` | 📐 奠基常青 | `RNN/Seq2Seq` → `Long Context / FlashAttention` |
| **Era 1 · 2017–2022 奠基纪元** | `tokenization-embeddings` | 分词器与向量嵌入空间 | `2018-Q4 → 2023-Q1` | 📐 奠基常青 | `Word2Vec` → `RAG Grounding` |
| **Era 1 · 2017–2022 奠基纪元** | `scaling-pretraining` | Scaling Laws 与预训练基座 | `2020-Q1 → 2023-Q2` | 📐 奠基常青 | `Task-Specific NNs` → `RLHF / MoE` |
| **Era 1 · 2017–2022 奠基纪元** | `rlhf-post-training` | 指令微调与 RLHF 对齐 | `2022-Q1 → 2023-Q1` | 🔄 已演进迭代 | `Scaling Pre-training` → `RLVR Reasoning & DPO` |
| **Era 2 · 2023 生成式爆发** | `prompt-cot` | 提示词工程与思维链 CoT | `2022-Q2 → 2023-Q2` | 🔄 已演进迭代 | `In-Context Learning` → `Context Engineering` |
| **Era 2 · 2023 生成式爆发** | `rag-grounding` | 经典 RAG 与向量检索增强 | `2020-Q2 → 2023-Q3` | 🏛️ 主流基建 | `Embeddings` → `Hybrid & Agentic RAG` |
| **Era 2 · 2023 生成式爆发** | `lora-local-open-weights` | LoRA 微调、量化与本地大模型 | `2023-Q1 → 2023-Q4` | 🏛️ 主流基建 | `Full Fine-Tuning` → `Distilled Small Reasoning` |
| **Era 2 · 2023 生成式爆发** | `diffusion-controllable-image` | 潜空间扩散与可控图像生成 | `2022-Q3 → 2023-Q3` | 🏛️ 主流基建 | `GAN / CLIP` → `ComfyUI & DiT Video` |
| **Era 3 · 2024 工具流与多模态** | `structured-tool-calling` | 结构化输出与 Function Calling | `2023-Q2 → 2024-Q1` | 🏛️ 主流基建 | `Regex Prompt Parsing` → `MCP Protocol` |
| **Era 3 · 2024 工具流与多模态** | `agent-workflows-graphs` | 确定性工作流与图编排 | `2023-Q4 → 2024-Q2` | 🔄 已演进迭代 | `Brittle AutoGPT` → `Agent Skills & Subagents` |
| **Era 3 · 2024 工具流与多模态** | `long-context-multimodal` | 百万长上下文与原生多模态 | `2024-Q1 → 2024-Q3` | 🏛️ 主流基建 | `Attention + KV Cache` → `World Models & Omni` |
| **Era 3 · 2024 工具流与多模态** | `llm-evals-observability` | 大模型评测体系与可观测性 | `2023-Q4 → 2024-Q3` | 🏛️ 主流基建 | `Vibe Checks` → `Trace Error Analysis + LLM Judge` |
| **Era 3 · 2024 工具流与多模态** | `comfyui-video-audio` | ComfyUI 节点流与音视频生成 | `2024-Q1 → 2024-Q4` | 🏛️ 主流基建 | `Diffusion + ControlNet` → `Controllable DiT Cinema` |
| **Era 4 · 2025 推理、协议与氛围编程** | `mcp-protocol` | MCP 模型上下文协议 | `2024-Q4 → 2025-Q1` | 🔥 持续爆发 | `Function Calling` → `Agent Skills + Remote MCP` |
| **Era 4 · 2025 推理、协议与氛围编程** | `rlvr-reasoning-models` | 测试时计算与 RLVR 推理模型 | `2024-Q3 → 2025-Q1` | 🔥 持续爆发 | `RLHF + CoT` → `Tool-Integrated Reasoning` |
| **Era 4 · 2025 推理、协议与氛围编程** | `vibe-coding` | Vibe Coding 自然语言原型构建 | `2025-Q1 → 2025-Q2` | 🔄 已演进迭代 | `IDE Autocomplete` → `Agentic Coding Harnesses` |
| **Era 4 · 2025 推理、协议与氛围编程** | `computer-use-browser-agents` | Computer Use 与浏览器操作智能体 | `2024-Q4 → 2025-Q2` | 🏛️ 主流基建 | `DOM Scrapers + VLMs` → `Sandboxed Action Agents` |
| **Era 4 · 2025 推理、协议与氛围编程** | `hybrid-agentic-rag` | 混合检索与 Agentic Search | `2024-Q4 → 2025-Q2` | 🏛️ 主流基建 | `Naive Chunk RAG` → `BM25/Grep + Iterative Search` |
| **Era 5 · 2025 Q3–2026 智能体工程化** | `context-engineering` | 上下文工程与记忆压缩架构 | `2025-Q2 → 2025-Q3` | 🔥 持续爆发 | `Prompt Engineering` → `Compaction + Harness Specs` |
| **Era 5 · 2025 Q3–2026 智能体工程化** | `agentic-coding-cli` | 自主编程终端与仓库 Harness | `2025-Q1 → 2025-Q4` | 🔥 持续爆发 | `Vibe Coding` → `Parallel Worktree Subagents` |
| **Era 5 · 2025 Q3–2026 智能体工程化** | `agent-skills-subagents` | Agent Skills 技能包与子智能体架构 | `2025-Q4 → 2026-Q1` | 🔥 持续爆发 | `MCP + Workflows` → `Progressive SKILL.md + Sandboxes` |
| **Era 5 · 2025 Q3–2026 智能体工程化** | `world-models-embodied-multimodal` | 世界模型、空间智能与具身多模态 | `2025-Q3 → 2026-Q2` | 🔥 持续爆发 | `Multimodal DiT` → `Interactive 3D & VLA Robotics` |

---

## 4. 三维正交检索分面（`content/taxonomy.json`）

为了支撑 `/[lang]/directory/` 的扁平两层交叉筛选与 20 个高权重 SEO/GEO 专题落地页，全站采用 **4 大技术层 × 8 大任务场景 × 8 大工具生态** 正交矩阵：

- **技术领域层（`domain`，4 项）**：`foundations` 底层原理与直觉 · `frontier-models` 前沿模型与训练 · `ai-engineering` Agent 与应用工程 · `coding-multimodal` AI 编程与多模态创作
- **核心任务场景（`task`，8 项）**：`architecture-intuition` 架构原理拆解 · `context-prompting` 提示词与上下文 · `rag-knowledge` RAG 与知识检索 · `tool-mcp-skills` 工具调用与 MCP/Skills · `agent-orchestration` 智能体循环与编排 · `agentic-coding` 自主与氛围编程 · `evals-finetuning` 评测、微调与本地化 · `multimodal-creation` 图像、音视频与研究流
- **生态与工具栈（`stack`，8 项）**：`claude-anthropic` Claude / MCP / Skills · `openai-codex` OpenAI / o3 / Codex · `open-weights-local` DeepSeek / Qwen / Ollama · `cursor-ai-ide` Cursor / AI IDE · `agent-frameworks` LangGraph / Agent SDKs · `rag-eval-infra` 检索与评测基建 · `comfy-visual-gen` ComfyUI / Flux / 视频流 · `research-fundamentals` PyTorch / 论文与公开课
