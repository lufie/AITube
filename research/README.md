# `research/` — AI 搜索趋势、Google 关键词实证与概念演进研究归档

本目录沉淀了 **Growthtube × AITube** 双站共享的 **AI 搜索（AI SEO / GEO / AEO / AI Overviews / AI Mode）趋势调研、Google 全球趋势锚点折算方法论、中英三端下拉联想原始数据集**，以及支撑 AITube 时间线与分面分类体系的实证报告。所有文档与原始 JSON 数据均可作为后续扩充新赛道、迭代信息架构或挖掘新视频选题的**一手基线数据**。

---

## 1. 目录结构与文档索引

| 文件路径 | 类型 | 核心内容说明 |
| :--- | :--- | :--- |
| [`GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md`](GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md) | **方法论规范** | **【必读】** Google Trends 跨批次统一锚点折算法、爬虫基线膨胀对照组去噪法、Google/YouTube/百度三端联想交叉验证、中英词差（Vocabulary Gap）双轨策略，以及 AI 搜索时代（GEO / AIO / Reddit 引用）的内容组织法则 |
| [`GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md`](GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md) | **实证研究报告** | 源自姊妹站 **Growthtube** 的完整实测报告：涵盖 21 组 Google Trends 5 年序列、`AI SEO vs GEO vs AEO` 词形之争、Semrush 1,000 万词 AIO 与 24.8 万条 Reddit 引用实证、Google AI Mode 查询变长 3 倍规律，以及「一主干 + 三分面 Hub + 问题颗粒度节点」三层架构原型 |
| [`AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md`](AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md) | **实证研究报告** | **AITube** 专属概念趋势报告：基于 104 组 AI 种子查询的 4 大 2023→2026 范式迁移（`Prompt → Context → Harness`、`Function Calling → MCP → Agent Skills`、`RLHF → RLVR`、`Copilot → Vibe Coding → Agentic CLI`）与 5 纪元 × 22 概念矩阵 |
| [`datasets/aitube_google_yt_suggest_104.json`](datasets/aitube_google_yt_suggest_104.json) | 原始数据集 | AITube 104 组中英文 Google Web + YouTube 实时下拉联想词原始抓取结果 |
| [`datasets/growthtube_google_trends_5y.json`](datasets/growthtube_google_trends_5y.json) | 原始数据集 | Growthtube 21 组 Google Trends 5 年全球周度序列（含 `cmp5y::ai_search`、`cmp5y::control_everyday` 日常词对照组、18 个核心词 Top/Rising 关联词及国家分布） |
| [`datasets/growthtube_google_yt_suggest_367.json`](datasets/growthtube_google_yt_suggest_367.json) | 原始数据集 | Growthtube 367 组中英文 Google Web + YouTube 搜索下拉联想词（含 AI 搜索、Reddit、矩阵/Faceless、SaaS/App/硬件出海真实原问句） |
| [`datasets/growthtube_baidu_suggest_69.json`](datasets/growthtube_baidu_suggest_69.json) | 原始数据集 | Growthtube 69 组中文百度实时下拉联想词（补齐中文互联网 `GEO优化`、`矩阵运营`、`独立开发` 等本土真实检索表达） |

---

## 2. 可复用采集脚本（`scripts/research/`）

```bash
# 1. 采集 AI 概念与工程问题中英双语 Google Web + YouTube 下拉联想证据
python3 scripts/research/collect_ai_trends.py

# 2. 采集跨批次统一锚点 Google Trends 5 年趋势 + 日常词去噪对照组 + Google/YT/百度三端下拉词
uv run --with pytrends python3 scripts/research/collect_google_trends_anchor.py --anchor "prompt engineering"
```
