# Google 搜索关键词与 AI 搜索（GEO / AIO / AI Mode）趋势调研标准规范

> **沉淀背景**：本规范提炼自我们在 **Growthtube**（[`GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md`](GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md)）与 **AITube**（[`AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md`](AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md)）两轮大规模实测中踩过的真实数据噪音坑与验证有效的黄金方法论。后续任何新主题扩充、新概念立项、SEO/GEO 落地页规划，**一律按本规范执行，严禁拍脑袋编造搜索量或机械直译中英文标签**。

---

## 1. 三条数据铁律（拒绝常见 SEO 伪科学）

### 铁律一：严禁采信或编造第三方工具的「绝对月搜索量」
- **实证依据**：Practical Ecommerce 对同一核心词在 Google Ads（`880,000`）、Semrush（`590,000`）与 Ahrefs（`100,000`）的交叉实测显示，不同商业工具估算值相差高达 **9 倍**。
- **执行规范**：所有趋势报告与站内概念图谱**一律使用 Google Trends 归一化相对指数（`0–100`）或相对于统一锚点词的折算指数**，绝不在文案或报告中写任何未经核实的“月搜 X 万”。

### 铁律二：必须配置「日常生活对照组」与「统一锚点词」，剔除 2025–2026 爬虫膨胀假象
- **实证依据**：我们在 [`datasets/growthtube_google_trends_5y.json`](datasets/growthtube_google_trends_5y.json) 中专门拉取了日常生活对照批次 `cmp5y::control_everyday`（`weather`、`recipe`、`calculator`、`translate`）。生活词 5 年涨幅仅为 **`0.57×–1.21×`**；而几乎所有科技、AI 与 B2B 词条自 2025 下半年起在 Google Trends 上同步出现 **`4×–12×`** 的基线抬升，且关联词中混入 `walmart near me` 等典型 AI/SEO 排名监控爬虫探针词。
- **执行规范**：
  1. **跨批次统一锚点（Anchor = 100）**：由于 Google Trends 单次最多对比 5 个词，所有批次必须固定放入 **同一个高频稳态锚点词**（如营销赛道用 `influencer marketing`，AI 赛道用 `prompt engineering` 或 `rag`），将各批次近 12 个月均值统一折算到 `Anchor = 100` 的同一把尺子上：
     $$\text{NormalizedScore}(w) = 100 \times \frac{\text{Mean}_{12m}(w)}{\text{Mean}_{12m}(\text{Anchor in same batch})}$$
  2. **只看跑赢大盘倍数（Share Gain vs Anchor）**：不看单条曲线涨了多少倍，而是计算该词首年与近 12 个月相对于同批锚点词的份额变化比值：
     $$\text{ShareGain}(w) = \frac{\text{Mean}_{\text{last12m}}(w) / \text{Mean}_{\text{first12m}}(w)}{\text{Mean}_{\text{last12m}}(\text{Anchor}) / \text{Mean}_{\text{first12m}}(\text{Anchor})}$$
     只有 `ShareGain > 1.0×`（或从 `0` 破土爆发的新词）才代表真实用户需求在扩张。
  3. **剔除微型样本地区污染**：分析国家/地区浓度时，忽略人口极少或代理节点集中的离岸极值地区（如 `St. Helena`）。

### 铁律三：三端下拉联想交叉验证 + 中英「词差（Vocabulary Gap）」双轨命名
- **实证依据**：
  - 中国大陆开发者与从业者一方面高频使用英文检索前沿概念（导致 `China` 在英文 `generative engine optimization` 全球浓度冲进前 5），另一方面在国内平台形成完全独立于英文直译的本土高频词：
    - 英文搜 **`ai seo`**（`57.7`，是 `generative engine optimization` `9.5` 的 **6 倍**） vs 中文压倒性搜 **`GEO优化`**（`37.2`）；
    - 英文搜 **`faceless youtube` / `multiple accounts on one device`** vs 中文搜 **`矩阵运营` / `指纹浏览器`**；
    - 英文开发者高频搜 **`vs` 架构选型对比**（`prompt engineering vs context engineering`、`mcp vs claude skills`、`rlhf vs dpo vs grpo`） vs 中文高频搜 **`是什么 / 原理 / 实战教程 / 最佳实践`**。
  - 同时，行业自嗨术语往往无人检索（例如做硬件的人几乎不搜 `consumer electronics marketing`，而是按具体动作搜 `product seeding`、`kickstarter pre launch`；做多模态的人不搜泛词 `multimodal generation`，而是搜 `comfyui flux workflow`、`consistent character`）。
- **执行规范**：
  1. 任何新主题必须同时跑完 **三端下拉联想**：`Google Web (en + zh-CN)` + `YouTube Search (ds=yt, en + zh-CN)` + `Baidu Suggest (zh)`（调用 [`scripts/research/collect_google_trends_anchor.py`](../scripts/research/collect_google_trends_anchor.py) 或 [`scripts/research/collect_ai_trends.py`](../scripts/research/collect_ai_trends.py)）。
  2. **中英标题与同义词禁止机械直译**：分别采用各自语种检索量最高、最口语化的本土表达，并将别名同步写入 [`content/taxonomy.json`](../content/taxonomy.json) 的同义词映射表。

---

## 2. AI 搜索时代（AIO / AI Mode / ChatGPT / Perplexity）四大结构性规律与产品落点

基于 Google 官方 AI Mode 年度数据与 Semrush 千万级样本实证（详见 [`GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md`](GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md) 第 2.5 节），AITube 的页面结构必须持续贴合以下四大底层变化：

| AI 搜索实证规律 | 一手数据证据 | 在 AITube 产品与内容上的强制设计落点 |
| :--- | :--- | :--- |
| **1. 查询长度变长 3 倍，从敲关键词变成「带背景提问 + 选型对比」** | Google 官方披露 AI Mode 平均查询长度为传统搜索 **3×**，最高频开场词为 `what / how / I / is / can`，`"which"` 决策对比词增速 **+40%** | - 每个概念页必须包含 **`Before → After` 范式对比** 与上下游 `vs` 边界辨析；<br/>- 每个视频节点必须沉淀 **2–3 条真实口语长尾问句（`searchQuestions`）** 并输出 `FAQPage` JSON-LD。 |
| **2. AI Overviews 高密度伴随 PAA 问答框与 YouTube 视频轮播** | Semrush 1,000 万词研究：商业意图 AIO 升至 **18.57%**（电脑电子类 **+107.62%**），**90%** 伴随 PAA 问答并同屏展示 YouTube 视频切片 | - 坚持 **「精确跳秒视频切片 + 首屏一句话直给结论 + 3 步编号行动 SOP」** 结构，天然契合 Google 视频关键时刻（Key Moments）与 AI 摘要抽取。 |
| **3. 精准回答长尾真问题的原子内容，远比泛泛爆款更容易被 AI 长期引用** | Semrush 24.8 万条 Reddit 引用研究：**80%** 被 ChatGPT / Perplexity 引用的帖子点赞不足 20，核心共性是**直接给出了可执行的细分问题答案与具体参数** | - 拒绝空洞综述；在 `steps` 中用反引号给出具体参数、命令与文件名（`.at-op-chip`），并在 `versionPatch` 给出 2026 实测避坑结论。 |
| **4. 专题聚合 Hub 页是承接中腰部对比词与规划类提问的最佳容器** | 单视频太窄、首页太泛；带直接结论摘要 + 结构化列表的专题页最受传统搜索与生成式引擎青睐，但空壳标签页会触发 Thin Content 惩罚 | - 严格执行 **「满 3 篇才生成独立静态专题页（`>= 3 nodes` Gate）」**；同步维护 `/llms.txt` 与 `/llms-full.txt` 供大模型爬虫零噪点读取。 |

---

## 3. 标准调研五步执行 SOP（每次新开方向或季度复盘时执行）

1. **列种子矩阵**：围绕拟拓展的 AI 技术概念或应用场景，列出「行业术语词 + 用户目标动作词 + `vs` 对比词 + 工具栈词」中英双语种子清单。
2. **跑三端联想与锚点趋势**：
   - 运行 [`scripts/research/collect_ai_trends.py`](../scripts/research/collect_ai_trends.py) 或 [`scripts/research/collect_google_trends_anchor.py`](../scripts/research/collect_google_trends_anchor.py)，将原始返回结果归档至 `research/datasets/`（命名带样本量或日期，绝不手改原始 JSON）。
3. **做去噪与词差诊断**：
   - 核对日常词对照组与统一锚点 `ShareGain`；识别「从业者黑话 vs 大众真搜词」以及「英文热词 vs 中文热词」的词差。
4. **更新分类词表与概念时间线**：
   - 若某新概念爆发且至少能筛选出 **5 支以上**通过 `oEmbed 200` 核验的高质量视频切片，方可正式纳入 [`content/concepts.json`](../content/concepts.json)；新增分面标签必须满足 **`>= 3` 支节点**门槛方可纳入 [`content/taxonomy.json`](../content/taxonomy.json)。
5. **反哺视频选题**：
   - 将抓取到的高频真实原问句直接作为 [`database/VIDEO_SOURCING_AND_INGESTION_SPEC.md`](../database/VIDEO_SOURCING_AND_INGESTION_SPEC.md) 的查找靶标，并填入对应节点的 `searchQuestions`。
