# AITube 视频查找、质量准入、黄金切片与打标签标准规范（Video Sourcing & Ingestion SOP）

> **适用范围**：每当为 AITube 查找新视频、扩充新 AI 概念节点、更新过时教程或批量抓取候选库时，**必须严格按本规范执行**。本规范同时被根级 [`AGENTS.md`](../AGENTS.md) 与 [`.agent/rules/01-video-discovery-and-ingestion.md`](../.agent/rules/01-video-discovery-and-ingestion.md) 强制引用。

---

## 1. 查找新视频的前置原则：先定「真实问题与范式坐标」，再找视频

严禁漫无目的地在 YouTube 搜泛词（如 `AI tutorial`、`LLM course`）后随意搬运。每次查找新视频必须遵循 **「需求倒推四步法」**：

1. **先查趋势与真实原问句（Search-First）**：
   - 先查阅 [`research/`](../research/) 下的关键词趋势与下拉联想库，确认目标主题在中英文世界里**用户真正在敲的具体问句**（例如不搜泛词 `prompt tutorial`，而是针对 `prompt engineering vs context engineering`、`mcp vs claude skills`、`claude code git worktrees` 查找）。
2. **明确范式生命周期坐标（Lifecycle-Aware）**：
   - 确认该视频讲解的做法在 2026 年属于 `surging`（爆发新范式）、`mainstream`（生产标配）、`foundational`（常青原理）还是 `evolved`（已被新范式演进替代的历史跳板）。
   - 若录制于 2023–2024 年，必须评估其核心机制是否依然成立，并在 `versionPatch` 字段写明 **2026 演进补丁**（以前怎么折腾 → 现在怎么收敛）。
3. **坚持「单节点打透单一具体问题」（Atomic Problem Cut）**：
   - 1 支收录节点只解决 **1 个高确定性的原理直觉或工程实操问题**。如果一部 2 小时公开课里讲了 3 个独立核心机制（如 Karpathy 长课里的分词器、三阶段训练流、推理模型认知），应分别定位各自的黄金 10–20 分钟窗口（注意：**同一 `platform:videoId` 在 `nodes.json` 内全局唯一，绝不重复占用同一 `videoId` 水数量**；挑选最不可替代的那一段作为主窗口，其余知识点在 `steps` 中凝练吸收）。

---

## 2. 三级信源白名单与硬性黑名单（Source Authority Tiers）

### 2.1 优先采信的三级创作者/机构白名单

| 优先级 | 信源层级 | 代表创作者 / 实验室 / 频道 | 典型适用角色 (`conceptRole`) |
| :---: | :--- | :--- | :--- |
| **Tier 1** | **一手实验室、论文原作者与殿堂级视觉科普** | `Anthropic`、`OpenAI`、`Google DeepMind`、`Stanford Online (CS336/CS229/CS25)`、`Andrej Karpathy`、`3Blue1Brown`、`Welch Labs`、`StatQuest`、`Hamel Husain`、`Simon Willison`、`Lilian Weng`、`DeepSeek`、`跟李沐学AI`、`李宏毅 Hung-yi Lee` | `origin`（概念起源 / 殿堂直觉）· 主干 `isSpine: true` 首选 |
| **Tier 2** | **经实战检验的一线 AI 工程师与顶级技术峰会** | `AI Engineer`、`Latent Space`、`Y Combinator`、`Umar Jamil`、`Sebastian Raschka`、`AI Coffee Break with Letitia`、`AssemblyAI`、`Chroma`、`LangChain`（限客观架构拆解）、`HuggingFace`、`Unsloth`、`Dave Ebbelaar`、`Sam Witteveen`、`Cole Medin` | `practice`（工程落地 / 架构实操）· `frontier`（最新工作流） |
| **Tier 3** | **高信噪比垂直工作流实测与战术短片（Shorts）** | 专注 `ComfyUI / Flux / DiT` 可控分镜、`Claude Code / Cursor` 真实仓库重构、`Ollama / vLLM` 本地压测的实操演示者（必须画面直出终端/节点图/代码，无空谈口播） | `practice`（垂直场景补齐）· `isShort: true`（1–3 分钟战术演示） |

### 2.2 一票否决红线黑名单（Zero-Tolerance Blocklist）

出现以下任一特征的视频，**严禁入库**：
1. **焦虑贩卖与灰产噱头**：标题或内容含“普通人躺赚 / 日入 $1,000 / 不用写代码暴富 / 震惊全球 AI 彻底杀死程序员 / 币圈 Web3 AI 代币”。
2. **低质培训机构流水线灌水课（Course Mills）**：如 `Simplilearn`、`Edureka`、`Great Learning` 等长达数小时念 PPT、无一线工程洞察的拼凑录播课。
3. **纯新闻搬运与口水反应视频（Reaction / Drama）**：照念官方发布博客却无实测对比、无原理拆解、无代码/工作流演示的资讯快评号。
4. **锁死嵌入权限或地区封锁**：关闭了第三方网页 `embed` 权限、设为私享/会员专享、或返回 `oEmbed 401/403/404` 的视频。
5. **纯软广恰饭视频**：通篇推广某个付费闭源套壳 SaaS 且无通用方法论迁移价值的商业恰饭片。

---

## 3. 技术合规与机器核验硬门槛（Technical & Compliance Gate）

每一条拟引入的视频在写入 [`content/nodes.json`](../content/nodes.json) 前，**必须 100% 通过以下机器核验**：

1. **YouTube 视频（`platform: "youtube"`）**：
   - 必须请求官方接口 `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={videoId}&format=json` 并返回 **`HTTP 200`**（证明视频公开存在且允许第三方 `iframe` 嵌入）。
   - 必须核实真实总时长 `totalDurationSec`（通过 YouTube `playerResponse.videoDetails.lengthSeconds` 获取整数秒，严禁凭感觉编造总时长）。
   - 播放合规铁律：前端点击海报后必须 100% 移除遮罩 DOM，挂载纯净无遮挡的 `https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&start={startSec}&end={endSec}&rel=0`，**严禁下载、盗链、去水印重托管或在播放器上方叠加自定义控制条**。
2. **Bilibili 视频（`platform: "bilibili"`）**：
   - 必须请求官方公开接口 `https://api.bilibili.com/x/web-interface/view?bvid={bvid}` 返回 `code === 0`，核实 `bvid`、UP 主名称 `owner.name` 与总时长 `duration`（秒）。
   - 采用官方带时间戳深链 `https://www.bilibili.com/video/{bvid}/?t={startSec}` 礼貌外跳并显著署名原作者。
3. **一手研究/工程长文精粹（`kind: "article-digest"`）**：
   - `articleUrl` 必须为实验室或作者一手原文 HTTPS 地址（`HTTP 200`），明确署名实验室与作者姓名，仅提炼客观方法论与架构洞察，引导读者阅读原文。
4. **全局去重守卫**：
   - `slug` 全库唯一；`{platform}:{videoId}` 全库唯一（[`scripts/validate-content.mjs`](../scripts/validate-content.mjs) 强制拦截重复视频）。

---

## 4. 黄金时间窗切片规范（Timestamp Slicing Rules）

AITube 的核心编辑价值是帮读者省去无效铺垫。切片窗口 `[startSec, endSec]` 必须满足：

- **数学边界合法性**：全部为整数秒，且严格满足 `0 <= startSec < endSec <= totalDurationSec`。
- **掐头去尾原则**：
  - **长视频切片（`isShort: false`）**：精准跳过片头寒暄、赞助商口播（Sponsor Read）、自我介绍与片尾求三连，直接切入**架构图出现、核心公式直觉展开或终端敲下第一行命令**的那一秒。黄金净时长控制在 **`3–22 分钟`（`180s–1320s`）**。
  - **Shorts 战术短切片（`isShort: true`）**：总时长通常 `<= 180s`，允许从 `0s` 或前 `3s` 切入，直击单一高频技巧。
- **诚实记录筛选成本**：
  - `videosReviewedCount`：为挑选出这支最佳片段，实际横向对比筛查了多少支同类视频。
  - `hoursSaved`：帮读者节省的无效检索与注水观看小时数（保留 1 位小数，如 `2.4`）。

---

## 5. 「讲人话」双语文案与结构化字段规范（Plain-Human Copy Rules）

所有入库节点必须同时具备高质量 `zh` 与 `en` 双语内容，且**严禁机翻腔与术语堆砌**：

1. **标题（`title`）**：先说「能帮你搞懂什么真问题 / 做出什么结果」，把生僻缩写放在从属位置或用大白话点破（例如写 *「8 分钟一块白板分清：RAG、MCP、Skills 和记忆到底各自管啥」*，而不是干巴巴的 *「RAG/MCP/Skills 架构综述」*）。
2. **一句话副标题（`subtitle`）**：用生活化类比或直白因果说明白核心看点，单行扫读无压力。
3. **为什么要看这段（`whyWatch`）**：点明这短短几分钟凭什么全网最值得看（主讲人段位 + 省掉多少弯路）。
4. **三步照做拆解（`steps`，严格固定 3 步）**：
   - 每一步包含简短行动标题 `title` + 具体操作说明 `detail`。
   - 可直接复制的参数、命令、文件名或配置项必须用反引号包裹（如 `` `temperature=0` ``、`` `AGENTS.md` ``、`` `git worktree add` ``），前端会自动将其渲染为**一键复制指令胶囊（`.at-op-chip`）**。
5. **2026 版本补丁（`versionPatch`）**：必须客观交代该视频的方法在 2026 年是否有更新换代、有哪些新坑或更轻量的替代方案。
6. **动手核对清单（`checklist`，至少 2 条）** 与 **配套工具链接（`tools`，至少 1 个真实 HTTPS 链接）**。
7. **真实搜索原问句（`searchQuestions`，中英文各 2–3 条）**：填入真实用户在 Google / YouTube / AI 搜索框里输入的口语问句，直接驱动站内自然语言直答与 `FAQPage` JSON-LD。

---

## 6. 多维打标签完整规范（Multi-Dimensional Tagging Taxonomy）

每新增一条视频节点，必须完整打齐以下 **7 组正交标签**，缺一不可：

### 6.1 主概念与关联概念（`primaryConcept` & `conceptIds`）
从 [`content/concepts.json`](../content/concepts.json) 的 **22 个标准概念 Slug** 中选定 1 个主概念 `primaryConcept`，并在 `conceptIds` 数组中包含主概念及最多 1–2 个强耦合上下游概念：
- **Era 1 (`era-2017-2022`)**：`transformer-attention` · `tokenization-embeddings` · `scaling-pretraining` · `rlhf-post-training`
- **Era 2 (`era-2023`)**：`prompt-cot` · `rag-grounding` · `lora-local-open-weights` · `diffusion-controllable-image`
- **Era 3 (`era-2024`)**：`structured-tool-calling` · `agent-workflows-graphs` · `long-context-multimodal` · `llm-evals-observability` · `comfyui-video-audio`
- **Era 4 (`era-2025`)**：`mcp-protocol` · `rlvr-reasoning-models` · `vibe-coding` · `computer-use-browser-agents` · `hybrid-agentic-rag`
- **Era 5 (`era-2026`)**：`context-engineering` · `agentic-coding-cli` · `agent-skills-subagents` · `world-models-embodied-multimodal`

> **人群分流自动映射**：`primaryConcept` 会自动映射至四类读者视角（`beginner` 小白扫盲 / `applied` 直接拿来用 / `career` 从业基本功 / `frontier` 2026 最新风向），映射表定义在 [`web/src/lib/personas.ts`](../web/src/lib/personas.ts) 与 [`scripts/sync_master_ledger.py`](../scripts/sync_master_ledger.py) 中。

### 6.2 概念内演进角色（`conceptRole`）
- `origin`：该概念的开山论文精读、提出者一手演讲或最经典的底层直觉动画。
- `practice`：生产环境可复现的工程搭建、避坑配置与工作流实操。
- `frontier`：该概念在 2025–2026 的最新边界突破、性能压测或下一代演进形态。

### 6.3 学习路线阶段（`stageId`）与是否主干（`isSpine`）
- `stage-0`（零基础底层直觉）· `stage-1`（提示词、上下文与多模态实操）· `stage-2`（私有知识库 RAG、MCP 与自主编程）· `stage-3`（生产级智能体、Skills 与评测闭环）。
- `isSpine`：仅限全库最核心的约 50–60 支殿堂级必修切片设为 `true`，普通拓展实操切片设为 `false`。

### 6.4 配套实战蓝图箱（`vaultId`）
绑定最匹配的开源模板 ID（定义于 [`content/vault.json`](../content/vault.json)）：
- `vault-repo-harness`（`AGENTS.md` / `CLAUDE.md` 仓库家规）
- `vault-skill-pack`（渐进式 `SKILL.md` 技能包规范）
- `vault-eval-rubric`（二元判分 LLM Judge 与错误追踪表）
- `vault-hybrid-rag`（上下文混合检索与重排清单）
- `vault-multimodal-storyboard`（锁脸首尾帧多模态分镜规范）

### 6.5 三维正交检索分面（`facets.domains` × `facets.tasks` × `facets.stacks`）
每个数组**至少填 1–2 个合法枚举值**（定义于 [`content/taxonomy.json`](../content/taxonomy.json)）：
- **`domains`（4 选 1–2）**：`foundations` · `frontier-models` · `ai-engineering` · `coding-multimodal`
- **`tasks`（8 选 1–2）**：`architecture-intuition` · `context-prompting` · `rag-knowledge` · `tool-mcp-skills` · `agent-orchestration` · `agentic-coding` · `evals-finetuning` · `multimodal-creation`
- **`stacks`（8 选 1–2）**：`claude-anthropic` · `openai-codex` · `open-weights-local` · `cursor-ai-ide` · `agent-frameworks` · `rag-eval-infra` · `comfy-visual-gen` · `research-fundamentals`
- **`difficulty`**：`intro` | `intermediate` | `advanced`
- **`openness`**：`open` | `hybrid` | `proprietary`

---

## 7. 标准入库提交流水线（4-Command Ingestion Checklist）

每次完成新视频入库编辑后，必须按顺序执行并全部绿灯通过：

```bash
# 1. （批量扩充候选池时使用）抓取并做 YouTube oEmbed 200 预核验
python3 scripts/harvest/harvest_ai_youtube.py

# 2. 将 content/nodes.json 的最新链接与标签同步至 database/ 底稿三件套 (.md / .csv / .json)
python3 scripts/sync_master_ledger.py

# 3. 校验全部 JSON Schema、时间窗合法性、去重及底稿数据库 1:1 对账
node scripts/validate-content.mjs

# 4. 构建全站静态产物并通过死链、SEO/GEO 结构化数据与单 H1 守门员审计
npm --prefix web run build
```
