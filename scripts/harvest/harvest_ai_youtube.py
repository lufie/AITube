#!/usr/bin/env python3
"""
AITube YouTube Practitioner & Educator Library Harvester (220+ Verified Cuts).

Searches YouTube's official JSON InnerTube endpoint across AITube's 22 chronological AI Concepts
and 4 full-spectrum tracks (Foundations, Frontier Models, AI Engineering & Agents, Agentic Coding & Multimodal),
applies strict anti-hype / anti-spam relevance gates, and verifies 100% public embeddability
via official YouTube oEmbed API (HTTP 200).
"""
from __future__ import annotations

import concurrent.futures
import json
import random
import re
import time
import urllib.request
from pathlib import Path

OUT_JSON = Path(__file__).parent / "verified_ai_youtube_pool.json"

SHORT_PARAMS = "EgIYAQ=="  # < 4 minutes filter for 1-3m tactical cuts / Shorts

# Tuple:
# (query, primary_concept, extra_concepts, domains, tasks, stacks, stage_id, params_or_none, hl, gl)
SEARCH_SPECS = [
    # --- ERA 1: 2017-2022 Foundations (Transformer, Tokenization, Scaling, RLHF) ---
    ("3blue1brown transformer attention neural networks", "transformer-attention", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("andrej karpathy let's build gpt from scratch", "transformer-attention", ["scaling-pretraining"], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("welch labs transformer attention mechanism", "transformer-attention", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("umar jamil attention is all you need", "transformer-attention", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("statquest transformer neural networks explained", "transformer-attention", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("transformer self attention explained visually", "transformer-attention", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", SHORT_PARAMS, "en", "US"),
    ("andrej karpathy let's build the gpt tokenizer", "tokenization-embeddings", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("vector embeddings explained visually", "tokenization-embeddings", ["rag-grounding"], ["foundations"], ["architecture-intuition", "rag-knowledge"], ["rag-eval-infra"], "stage-0", None, "en", "US"),
    ("3blue1brown word embeddings llm", "tokenization-embeddings", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("bpe tokenization llm explained", "tokenization-embeddings", [], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", SHORT_PARAMS, "en", "US"),
    ("andrej karpathy intro to large language models", "scaling-pretraining", ["rlhf-post-training"], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("stanford cs336 language modeling from scratch", "scaling-pretraining", [], ["foundations", "frontier-models"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("chinchilla scaling laws llm pretraining explained", "scaling-pretraining", [], ["foundations", "frontier-models"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("andrej karpathy deep dive into llms like chatgpt", "rlhf-post-training", ["scaling-pretraining", "rlvr-reasoning-models"], ["foundations", "frontier-models"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("rlhf vs dpo post training llm explained", "rlhf-post-training", [], ["frontier-models"], ["evals-finetuning"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("instructgpt rlhf alignment explained", "rlhf-post-training", [], ["foundations", "frontier-models"], ["architecture-intuition"], ["openai-codex"], "stage-0", None, "en", "US"),

    # --- ERA 2: 2023 Generative Breakout (Prompt/CoT, Classic RAG, LoRA/Local, Diffusion) ---
    ("anthropic prompt engineering interactive tutorial", "prompt-cot", ["context-engineering"], ["ai-engineering"], ["context-prompting"], ["claude-anthropic"], "stage-1", None, "en", "US"),
    ("andrew ng prompt engineering for developers", "prompt-cot", [], ["ai-engineering"], ["context-prompting"], ["openai-codex"], "stage-1", None, "en", "US"),
    ("chain of thought prompting paper explained", "prompt-cot", ["rlvr-reasoning-models"], ["foundations", "ai-engineering"], ["context-prompting"], ["research-fundamentals"], "stage-1", None, "en", "US"),
    ("system prompt engineering best practices", "prompt-cot", ["context-engineering"], ["ai-engineering"], ["context-prompting"], ["claude-anthropic"], "stage-1", SHORT_PARAMS, "en", "US"),
    ("retrieval augmented generation rag from scratch langchain", "rag-grounding", [], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "en", "US"),
    ("rag vs fine tuning llm architecture", "rag-grounding", ["lora-local-open-weights"], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "en", "US"),
    ("chunking strategies for rag production", "rag-grounding", ["hybrid-agentic-rag"], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "en", "US"),
    ("rag retrieval augmented generation explained", "rag-grounding", [], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", SHORT_PARAMS, "en", "US"),
    ("qlora lora fine tuning llm tutorial", "lora-local-open-weights", [], ["frontier-models", "ai-engineering"], ["evals-finetuning"], ["open-weights-local"], "stage-2", None, "en", "US"),
    ("umar jamil lora low rank adaptation explained", "lora-local-open-weights", [], ["foundations", "frontier-models"], ["evals-finetuning"], ["open-weights-local"], "stage-2", None, "en", "US"),
    ("unsloth fine tuning llama qwen tutorial", "lora-local-open-weights", [], ["frontier-models"], ["evals-finetuning"], ["open-weights-local"], "stage-2", None, "en", "US"),
    ("ollama local llm setup quantization gguf", "lora-local-open-weights", [], ["frontier-models"], ["evals-finetuning"], ["open-weights-local"], "stage-1", None, "en", "US"),
    ("vllm vs ollama serving open source llm", "lora-local-open-weights", [], ["ai-engineering"], ["evals-finetuning"], ["open-weights-local"], "stage-3", None, "en", "US"),
    ("latent diffusion models explained welch labs", "diffusion-controllable-image", [], ["foundations", "coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-0", None, "en", "US"),
    ("how stable diffusion works visually explained", "diffusion-controllable-image", [], ["foundations", "coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-0", None, "en", "US"),
    ("controlnet consistent character workflow", "diffusion-controllable-image", ["comfyui-video-audio"], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "en", "US"),

    # --- ERA 3: 2024 Structured Tools, Workflows, Long Context & Evals ---
    ("structured outputs json schema llm engineering", "structured-tool-calling", [], ["ai-engineering"], ["tool-mcp-skills"], ["openai-codex", "claude-anthropic"], "stage-2", None, "en", "US"),
    ("function calling tool use llm tutorial", "structured-tool-calling", ["mcp-protocol"], ["ai-engineering"], ["tool-mcp-skills"], ["openai-codex", "claude-anthropic"], "stage-2", None, "en", "US"),
    ("pydantic structured outputs llm", "structured-tool-calling", [], ["ai-engineering"], ["tool-mcp-skills"], ["agent-frameworks"], "stage-2", None, "en", "US"),
    ("anthropic building effective agents workflows vs agents", "agent-workflows-graphs", ["agent-skills-subagents"], ["ai-engineering"], ["agent-orchestration"], ["claude-anthropic", "agent-frameworks"], "stage-3", None, "en", "US"),
    ("langgraph agent workflow tutorial", "agent-workflows-graphs", [], ["ai-engineering"], ["agent-orchestration"], ["agent-frameworks"], "stage-3", None, "en", "US"),
    ("ai workflows vs ai agents architecture", "agent-workflows-graphs", [], ["ai-engineering"], ["agent-orchestration"], ["agent-frameworks"], "stage-3", SHORT_PARAMS, "en", "US"),
    ("kv cache flash attention long context explained", "long-context-multimodal", ["transformer-attention"], ["foundations", "frontier-models"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("vision language models multimodal llm explained", "long-context-multimodal", [], ["frontier-models", "coding-multimodal"], ["architecture-intuition"], ["research-fundamentals"], "stage-1", None, "en", "US"),
    ("notebooklm research workflow study guide", "long-context-multimodal", [], ["coding-multimodal"], ["multimodal-creation", "rag-knowledge"], ["rag-eval-infra"], "stage-1", None, "en", "US"),
    ("hamel husain llm evals", "llm-evals-observability", [], ["ai-engineering"], ["evals-finetuning"], ["rag-eval-infra"], "stage-3", None, "en", "US"),
    ("shreya shankar hamel husain ai evals", "llm-evals-observability", [], ["ai-engineering"], ["evals-finetuning"], ["rag-eval-infra"], "stage-3", None, "en", "US"),
    ("llm as a judge evaluation pipeline", "llm-evals-observability", [], ["ai-engineering"], ["evals-finetuning"], ["rag-eval-infra"], "stage-3", None, "en", "US"),
    ("braintrust llm evals production", "llm-evals-observability", [], ["ai-engineering"], ["evals-finetuning"], ["rag-eval-infra"], "stage-3", None, "en", "US"),
    ("comfyui flux workflow tutorial", "comfyui-video-audio", ["diffusion-controllable-image"], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "en", "US"),
    ("comfyui beginner node workflow", "comfyui-video-audio", [], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "en", "US"),
    ("consistent character ai video storyboard workflow", "comfyui-video-audio", ["world-models-embodied-multimodal"], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "en", "US"),
    ("ai voice cloning elevenlabs audio workflow", "comfyui-video-audio", [], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "en", "US"),

    # --- ERA 4: 2025 MCP, RLVR Reasoning, Vibe Coding, Computer Use & Agentic RAG ---
    ("model context protocol mcp anthropic explained", "mcp-protocol", ["structured-tool-calling"], ["ai-engineering"], ["tool-mcp-skills"], ["claude-anthropic"], "stage-2", None, "en", "US"),
    ("build an mcp server python typescript tutorial", "mcp-protocol", [], ["ai-engineering"], ["tool-mcp-skills"], ["claude-anthropic", "cursor-ai-ide"], "stage-2", None, "en", "US"),
    ("mcp model context protocol architecture", "mcp-protocol", [], ["ai-engineering"], ["tool-mcp-skills"], ["claude-anthropic"], "stage-2", SHORT_PARAMS, "en", "US"),
    ("deepseek r1 grpo reinforcement learning explained", "rlvr-reasoning-models", ["rlhf-post-training"], ["frontier-models", "foundations"], ["architecture-intuition"], ["open-weights-local", "research-fundamentals"], "stage-0", None, "en", "US"),
    ("test time compute reasoning models o1 o3 explained", "rlvr-reasoning-models", [], ["frontier-models"], ["architecture-intuition"], ["openai-codex", "research-fundamentals"], "stage-0", None, "en", "US"),
    ("umar jamil deepseek r1", "rlvr-reasoning-models", [], ["frontier-models", "foundations"], ["architecture-intuition"], ["open-weights-local"], "stage-0", None, "en", "US"),
    ("mixture of experts moe deepseek v3 architecture", "rlvr-reasoning-models", ["scaling-pretraining"], ["frontier-models", "foundations"], ["architecture-intuition"], ["open-weights-local"], "stage-0", None, "en", "US"),
    ("andrej karpathy how i use llms", "vibe-coding", ["context-engineering"], ["coding-multimodal"], ["context-prompting", "agentic-coding"], ["claude-anthropic", "openai-codex"], "stage-1", None, "en", "US"),
    ("vibe coding y combinator", "vibe-coding", ["agentic-coding-cli"], ["coding-multimodal"], ["agentic-coding"], ["cursor-ai-ide"], "stage-2", None, "en", "US"),
    ("vibe coding architecture mistakes security", "vibe-coding", ["agentic-coding-cli"], ["coding-multimodal"], ["agentic-coding"], ["cursor-ai-ide"], "stage-2", None, "en", "US"),
    ("browser use playwright ai agent automation", "computer-use-browser-agents", [], ["ai-engineering"], ["agent-orchestration", "tool-mcp-skills"], ["agent-frameworks"], "stage-3", None, "en", "US"),
    ("anthropic computer use agent demo architecture", "computer-use-browser-agents", [], ["ai-engineering"], ["agent-orchestration"], ["claude-anthropic"], "stage-3", None, "en", "US"),
    ("agentic rag hybrid search bm25 reranking", "hybrid-agentic-rag", ["rag-grounding"], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "en", "US"),
    ("graphrag vs vector rag knowledge graph", "hybrid-agentic-rag", ["rag-grounding"], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "en", "US"),
    ("colpali multimodal document rag pdf", "hybrid-agentic-rag", ["long-context-multimodal"], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "en", "US"),

    # --- ERA 5: 2025 Q3 - 2026 Context Engineering, Agentic Coding Harnesses, Skills & World Models ---
    ("context engineering vs prompt engineering ai agents", "context-engineering", ["prompt-cot"], ["ai-engineering"], ["context-prompting", "agent-orchestration"], ["claude-anthropic", "agent-frameworks"], "stage-1", None, "en", "US"),
    ("context engineering lance martin langchain anthropic", "context-engineering", [], ["ai-engineering"], ["context-prompting", "agent-orchestration"], ["claude-anthropic", "agent-frameworks"], "stage-3", None, "en", "US"),
    ("agent memory compaction context window management", "context-engineering", [], ["ai-engineering"], ["context-prompting", "agent-orchestration"], ["claude-anthropic", "agent-frameworks"], "stage-3", None, "en", "US"),
    ("context engineering tips llm", "context-engineering", [], ["ai-engineering"], ["context-prompting"], ["claude-anthropic"], "stage-1", SHORT_PARAMS, "en", "US"),
    ("claude code best practices anthropic workflow", "agentic-coding-cli", ["context-engineering"], ["coding-multimodal", "ai-engineering"], ["agentic-coding"], ["claude-anthropic", "cursor-ai-ide"], "stage-2", None, "en", "US"),
    ("claude md cursor rules codebase context", "agentic-coding-cli", ["context-engineering"], ["coding-multimodal"], ["agentic-coding", "context-prompting"], ["claude-anthropic", "cursor-ai-ide"], "stage-2", None, "en", "US"),
    ("cursor agentic coding workflow large codebase", "agentic-coding-cli", ["vibe-coding"], ["coding-multimodal"], ["agentic-coding"], ["cursor-ai-ide"], "stage-2", None, "en", "US"),
    ("openai codex cli agent software engineering", "agentic-coding-cli", [], ["coding-multimodal"], ["agentic-coding"], ["openai-codex"], "stage-2", None, "en", "US"),
    ("git worktrees parallel claude code agents", "agentic-coding-cli", ["agent-skills-subagents"], ["coding-multimodal"], ["agentic-coding", "agent-orchestration"], ["claude-anthropic", "cursor-ai-ide"], "stage-3", None, "en", "US"),
    ("claude code tips tricks", "agentic-coding-cli", [], ["coding-multimodal"], ["agentic-coding"], ["claude-anthropic"], "stage-2", SHORT_PARAMS, "en", "US"),
    ("claude agent skills anthropic skill md", "agent-skills-subagents", ["mcp-protocol", "context-engineering"], ["ai-engineering", "coding-multimodal"], ["tool-mcp-skills", "agent-orchestration"], ["claude-anthropic"], "stage-3", None, "en", "US"),
    ("mcp vs claude skills when to use", "agent-skills-subagents", ["mcp-protocol"], ["ai-engineering"], ["tool-mcp-skills"], ["claude-anthropic"], "stage-3", None, "en", "US"),
    ("subagents multi agent harness claude code", "agent-skills-subagents", ["agentic-coding-cli"], ["ai-engineering", "coding-multimodal"], ["agent-orchestration", "agentic-coding"], ["claude-anthropic"], "stage-3", None, "en", "US"),
    ("ai engineer summit building agents production", "agent-skills-subagents", ["agent-workflows-graphs", "llm-evals-observability"], ["ai-engineering"], ["agent-orchestration"], ["agent-frameworks", "claude-anthropic"], "stage-3", None, "en", "US"),
    ("latent space podcast ai engineering agents", "agent-skills-subagents", ["context-engineering"], ["ai-engineering"], ["agent-orchestration"], ["agent-frameworks"], "stage-3", None, "en", "US"),
    ("simon willison llm tools agents", "agentic-coding-cli", ["structured-tool-calling"], ["ai-engineering", "coding-multimodal"], ["agentic-coding", "tool-mcp-skills"], ["open-weights-local", "claude-anthropic"], "stage-2", None, "en", "US"),
    ("world models ai yann lecun fei fei li spatial intelligence", "world-models-embodied-multimodal", [], ["frontier-models"], ["architecture-intuition", "multimodal-creation"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("vision language action vla robotics ai models", "world-models-embodied-multimodal", ["long-context-multimodal"], ["frontier-models"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "en", "US"),
    ("controllable video generation camera motion dit", "world-models-embodied-multimodal", ["comfyui-video-audio"], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "en", "US"),

    # --- High-Signal Chinese Technical & Workflow Queries on YouTube ---
    ("李沐 论文精读 Transformer Attention", "transformer-attention", ["scaling-pretraining"], ["foundations"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "zh-CN", "HK"),
    ("李宏毅 生成式AI Agent 强化学习", "rlvr-reasoning-models", ["agent-workflows-graphs"], ["foundations", "frontier-models"], ["architecture-intuition"], ["research-fundamentals"], "stage-0", None, "zh-CN", "TW"),
    ("DeepSeek R1 GRPO 强化学习 原理拆解", "rlvr-reasoning-models", [], ["frontier-models"], ["architecture-intuition"], ["open-weights-local"], "stage-0", None, "zh-CN", "HK"),
    ("MCP 协议 实战 教程 Claude", "mcp-protocol", [], ["ai-engineering"], ["tool-mcp-skills"], ["claude-anthropic"], "stage-2", None, "zh-CN", "HK"),
    ("Claude Code 实战 工作流", "agentic-coding-cli", ["agent-skills-subagents"], ["coding-multimodal"], ["agentic-coding"], ["claude-anthropic"], "stage-2", None, "zh-CN", "HK"),
    ("上下文工程 Context Engineering Agent", "context-engineering", [], ["ai-engineering"], ["context-prompting"], ["claude-anthropic"], "stage-1", None, "zh-CN", "HK"),
    ("ComfyUI Flux 工作流 进阶教程", "comfyui-video-audio", [], ["coding-multimodal"], ["multimodal-creation"], ["comfy-visual-gen"], "stage-1", None, "zh-CN", "HK"),
    ("RAG 知识库 混合检索 实战", "hybrid-agentic-rag", ["rag-grounding"], ["ai-engineering"], ["rag-knowledge"], ["rag-eval-infra"], "stage-2", None, "zh-CN", "HK"),
]

TRUSTED_CHANNELS_RE = re.compile(
    r"("
    r"Andrej Karpathy|3Blue1Brown|Anthropic|OpenAI|Stanford|AI Engineer|Latent Space|"
    r"Welch Labs|Umar Jamil|StatQuest|Two Minute Papers|Yannic Kilcher|DeepLearning\.AI|"
    r"LangChain|LlamaIndex|Hamel Husain|Simon Willison|Cursor|Vercel|Y Combinator|"
    r"IndyDevDan|Cole Medin|Sam Witteveen|James Briggs|Aurelio AI|Dave Ebbelaar|"
    r"Matt Wolfe|Matthew Berman|Sebastian Kamph|Olivio Sarikas|Pixaroma|rundiffusion|"
    r"跟李沐学AI|Hung-yi Lee|李宏毅|HuggingFace|Weights & Biases|Braintrust|Pydantic|"
    r"IBM Technology|Google Cloud Tech|Google DeepMind|Microsoft Developer|Fireship"
    r")",
    re.I,
)

# Block crypto, get-rich-quick, generic lifestyle, non-AI spam, courses mills
BLOCK_RE = re.compile(
    r"("
    r"\bmake \$?[0-9,]+\b|\bpassive income\b|\bside hustle\b|\bget rich\b|\bmillionaire\b|"
    r"\bcrypto\b|\bbitcoin\b|\bforex\b|\btrading bot\b|\bnft\b|\bmemecoin\b|\bsolana\b|"
    r"\bdropshipping\b|\bsmma\b|\bonlyfans\b|\bfaceless cash cow\b|"
    r"\bsimplilearn\b|\bedureka\b|\bintellipaat\b|\bgreat learning\b|"
    r"\breaction\b|\bdrama\b|\bshocking\b|\bdestroyed\b|\bi quit\b|\blive stream\b|"
    r"\bfull movie\b|\bmusic video\b|\bgaming\b|\bminecraft\b|\broblox\b|"
    r"副业|撸钱|日入|月入十万|搞钱|搬运赚钱|算命|炒币|合约"
    r")",
    re.I,
)

REQUIRED_AI_SIGNAL_RE = re.compile(
    r"("
    r"llm|gpt|transformer|attention|tokeniz|embedding|vector|scaling law|pre-?train|post-?train|"
    r"rlhf|dpo|grpo|deepseek|qwen|llama|claude|openai|anthropic|codex|gemini|o1|o3|"
    r"prompt|chain of thought|context engineering|context window|kv cache|"
    r"\brag\b|retrieval|graphrag|rerank|hybrid search|chunking|"
    r"function calling|tool use|structured output|pydantic|\bmcp\b|model context protocol|"
    r"agent|subagent|langgraph|workflow|skill|claude code|cursor|vibe coding|computer use|browser|"
    r"eval|evals|benchmark|fine-?tun|lora|qlora|unsloth|ollama|vllm|quantiz|gguf|"
    r"diffusion|controlnet|comfyui|flux|stable diffusion|storyboard|elevenlabs|notebooklm|"
    r"multimodal|vision language|world model|spatial intelligence|robotics|\bvla\b|"
    r"大模型|智能体|强化学习|微调|提示词|上下文|知识库|检索|工作流|论文精读|生成式"
    r")",
    re.I,
)


def parse_duration_sec(length_obj: dict | None) -> int:
    if not length_obj:
        return 0
    txt = (length_obj.get("simpleText") or "").strip()
    if not txt:
        runs = length_obj.get("runs") or []
        txt = "".join(r.get("text", "") for r in runs).strip()
    if not txt:
        return 0
    parts = [int(p) for p in re.findall(r"\d+", txt)]
    if len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    if len(parts) == 1:
        return parts[0]
    return 0


def parse_views(view_obj: dict | None) -> int:
    if not view_obj:
        return 0
    txt = (view_obj.get("simpleText") or "").strip()
    if not txt:
        runs = view_obj.get("runs") or []
        txt = "".join(r.get("text", "") for r in runs).strip()
    txt_clean = txt.replace(",", "")
    m = re.search(r"([\d.]+)\s*([KMB万]?)", txt_clean, re.I)
    if not m:
        return 0
    val = float(m.group(1))
    suf = m.group(2).upper()
    mult = {"K": 1_000, "M": 1_000_000, "B": 1_000_000_000, "万": 10_000}.get(suf, 1)
    return int(val * mult)


def passes_relevance(title: str, channel: str, snippet: str) -> bool:
    blob = f"{title} {channel} {snippet}"
    if BLOCK_RE.search(blob):
        return False
    if not REQUIRED_AI_SIGNAL_RE.search(blob):
        return False
    # Reject non-EN/non-CJK scripts (e.g. Hindi/Arabic/Russian/Spanish-only titles)
    if re.search(r"[\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u0E00-\u0E7F]", title):
        return False
    return True


def search_innertube(spec: tuple) -> list[dict]:
    query, p_concept, extra_concepts, domains, tasks, stacks, stage_id, params, hl, gl = spec
    payload: dict = {
        "context": {
            "client": {
                "hl": hl,
                "gl": gl,
                "clientName": "WEB",
                "clientVersion": "2.20250218.01.00",
            }
        },
        "query": query,
    }
    if params:
        payload["params"] = params

    req = urllib.request.Request(
        "https://www.youtube.com/youtubei/v1/search?prettyPrint=false",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
    )
    items: list[dict] = []
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8", "ignore"))

        def walk(o):
            if isinstance(o, dict):
                if "videoRenderer" in o:
                    vr = o["videoRenderer"]
                    vid = vr.get("videoId", "")
                    if not vid or len(vid) != 11:
                        return
                    title = "".join(r.get("text", "") for r in vr.get("title", {}).get("runs", [])).strip()
                    ch = "".join(r.get("text", "") for r in vr.get("ownerText", {}).get("runs", [])).strip()
                    if not ch:
                        ch = "".join(r.get("text", "") for r in vr.get("longBylineText", {}).get("runs", [])).strip()
                    dur = parse_duration_sec(vr.get("lengthText"))
                    views = parse_views(vr.get("viewCountText") or vr.get("shortViewCountText"))
                    pub = (vr.get("publishedTimeText") or {}).get("simpleText", "")
                    snippets = vr.get("detailedMetadataSnippets") or []
                    snippet = ""
                    if snippets:
                        snippet = "".join(
                            r.get("text", "") for r in snippets[0].get("snippetText", {}).get("runs", [])
                        ).strip()
                    items.append(
                        {
                            "videoId": vid,
                            "title": title,
                            "channelName": ch,
                            "totalDurationSec": dur,
                            "viewCount": views,
                            "publishedTimeText": pub,
                            "snippet": snippet,
                            "seedQuery": query,
                            "primaryConcept": p_concept,
                            "conceptIds": [p_concept] + list(extra_concepts),
                            "domains": list(domains),
                            "tasks": list(tasks),
                            "stacks": list(stacks),
                            "stageId": stage_id,
                        }
                    )
                else:
                    for v in o.values():
                        walk(v)
            elif isinstance(o, list):
                for x in o:
                    walk(x)

        walk(data)
    except Exception as e:
        print(f"  [warn] search failed for '{query}': {e}")
    return items


def check_oembed(cand: dict) -> dict | None:
    vid = cand["videoId"]
    time.sleep(random.uniform(0.02, 0.10))
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            if resp.status != 200:
                return None
            meta = json.loads(resp.read().decode("utf-8", "ignore"))
            oembed_title = (meta.get("title") or cand["title"]).strip()
            oembed_author = (meta.get("author_name") or cand["channelName"]).strip()
            if not passes_relevance(oembed_title, oembed_author, cand["snippet"]):
                return None
            cand["title"] = oembed_title
            cand["channelName"] = oembed_author
            cand["isShort"] = cand["totalDurationSec"] <= 180
            cand["isTrusted"] = bool(TRUSTED_CHANNELS_RE.search(oembed_author))
            return cand
    except Exception:
        return None


def main() -> None:
    t0 = time.time()
    print(f"1. Running {len(SEARCH_SPECS)} AI InnerTube queries...")
    pool: dict[str, dict] = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
        for idx, batch in enumerate(ex.map(search_innertube, SEARCH_SPECS), 1):
            for it in batch:
                vid = it["videoId"]
                dur = it["totalDurationSec"]
                # Allow up to 4 hours for iconic Karpathy / Stanford lectures, min 55s
                if dur < 55 or dur > 14400:
                    continue
                trusted = bool(TRUSTED_CHANNELS_RE.search(it["channelName"]))
                if it["viewCount"] < 800 and not trusted:
                    continue
                if not passes_relevance(it["title"], it["channelName"], it["snippet"]):
                    continue
                if vid not in pool:
                    pool[vid] = it
                else:
                    cur = pool[vid]
                    for field in ("conceptIds", "domains", "tasks", "stacks"):
                        for val in it[field]:
                            if val not in cur[field]:
                                cur[field].append(val)
            if idx % 25 == 0:
                print(f"   Searched {idx}/{len(SEARCH_SPECS)} -> {len(pool)} strict candidates")

    cands = list(pool.values())
    print(f"2. Collected {len(cands)} candidates in {time.time() - t0:.1f}s. Checking YouTube oEmbed HTTP 200...")

    verified: list[dict] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        for i, res in enumerate(ex.map(check_oembed, cands), 1):
            if res:
                verified.append(res)
            if i % 150 == 0:
                print(f"   oEmbed checked {i}/{len(cands)} -> {len(verified)} embeddable")

    verified.sort(key=lambda x: (1 if x["isTrusted"] else 0, x["viewCount"]), reverse=True)

    seen_titles: set[str] = set()
    ch_counts: dict[str, int] = {}
    final_pool: list[dict] = []
    for v in verified:
        norm = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "", v["title"].lower())[:46]
        if len(norm) < 6 or norm in seen_titles:
            continue
        ch_k = v["channelName"].lower().strip()
        cap = 14 if v["isTrusted"] else 5
        if ch_counts.get(ch_k, 0) >= cap:
            continue
        seen_titles.add(norm)
        ch_counts[ch_k] = ch_counts.get(ch_k, 0) + 1
        final_pool.append(v)

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(final_pool, ensure_ascii=False, indent=2), encoding="utf-8")
    shorts = sum(1 for x in final_pool if x["isShort"])
    by_concept: dict[str, int] = {}
    for x in final_pool:
        by_concept[x["primaryConcept"]] = by_concept.get(x["primaryConcept"], 0) + 1
    print(
        f"✅ Harvested & verified {len(final_pool)} embeddable AI YouTube videos "
        f"({len(final_pool) - shorts} full + {shorts} Shorts) across {len(by_concept)} concepts in {time.time() - t0:.1f}s!"
    )
    for c, n in sorted(by_concept.items(), key=lambda kv: kv[1], reverse=True):
        print(f"   - {c}: {n}")


if __name__ == "__main__":
    main()
