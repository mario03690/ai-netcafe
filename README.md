# ai-netcafe

Hosted open-source AI apps, callable by your agent over MCP — and from your terminal.

```bash
npx ai-netcafe compare "dedupe a JS array preserving order"
```

```
MODEL              COST       LATENCY
deepseek-v4-flash  $0.00012    7.6s
gemini-3.5-flash   $0.000341   10.0s
GLM5.2             $0.001828   9.0s

cheapest: deepseek-v4-flash   fastest: deepseek-v4-flash
15.2× between cheapest and priciest
```

## The point: costs are metered, not quoted

Every number above is read from the upstream `usage` response, not derived from a
published price list. That distinction matters more than it sounds — while building
this we found the obvious conversion formula was wrong for several models
(one was off by ~9×, another by ~3×), and only billing-delta measurement matched
reality. [Full method and data.](https://ainetcafe.com/lab/llm-real-cost-comparison)

## Connect it to an agent

```bash
npx ai-netcafe install     # prints config for Claude Code / Desktop / Cursor
```

Or directly:

```bash
claude mcp add --transport http ai-netcafe https://ainetcafe.com/mcp
```

## Skills the agent gets

| Skill | What it does |
|---|---|
| `compare_models` | One prompt across many LLMs, with real metered cost + latency |
| `translate_pdf` | Translate a PDF keeping formulas, figures and two-column layout intact |
| `deep_research` | Plans sub-questions, searches, reads sources, writes a cited report |
| `make_slides` | Generates a real downloadable `.pptx` |
| `list_apps` / `get_app` | Catalogue of the hosted open-source apps, with source repos |
| `ask_model` / `list_models` | Single model call; model list with prices |

Backed by open-source projects — PDFMathTranslate, GPT Academic, GPT Researcher,
NextChat, LobeChat — hosted pre-configured so you can try them without installing
Docker, Python, or supplying an API key.

## CLI commands

```bash
npx ai-netcafe compare "<prompt>"   # multi-model comparison with real costs
npx ai-netcafe ask "<prompt>"       # single model
npx ai-netcafe apps                 # hosted apps + source repos
npx ai-netcafe models               # models with per-million prices
npx ai-netcafe install              # MCP config for your agent
```

## Quota

Anonymous calls get a small free quota — enough to try. Heavy skills (whole-PDF
translation, deep research, slide generation) need an account or your own key,
because one of those runs costs dozens to hundreds of model calls.

```bash
export ALLROUTER_API_KEY=sk-...   # unlimited, billed to you
```

## Links

- Docs: <https://ainetcafe.com/mcp.html>
- Live cost comparison (updated daily): <https://ainetcafe.com/lab/llm-real-cost-comparison>
- A2A agent card: <https://ainetcafe.com/.well-known/agent-card.json>

MIT
