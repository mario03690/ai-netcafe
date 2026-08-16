# ai-netcafe

[![China: reachable](https://ainetcafe.com/badge/china/ainetcafe.com)](https://ainetcafe.com/watch-cn?s=badge-own)

Hosted tools your agent can call over MCP — and a claim you can check in one command:

```bash
curl "https://ainetcafe.com/t/china_reachability?url=https://github.com"
```

```json
{
  "url": "https://github.com",
  "tested_from": "mainland China (China Mobile backbone)",
  "verdict": "unreachable: timeout (common signature of blocking or a very slow route)"
}
```

That request was answered by a machine actually sitting on a Chinese backbone network. A monitor
hosted anywhere else can only tell you GitHub is up *where it is* — which is not the question you
were asking. That is the kind of thing we host: capabilities that are hard to get, rather than
wrappers around ones that aren't.

## Four focused servers

One agent profile rarely needs both spreadsheet cleanup and the Chinese lunar calendar, and every
tool description costs tokens on every session. So the catalogue is served as four focused MCP
endpoints — connect the one you need and pay the context cost of nothing else.

| Pack | URL | What it is |
|---|---|---|
| **Tables** | `https://ainetcafe.com/mcp/table` | Messy CSV in, clean checkable table out. Dedupe, merge, transpose, wide→long, find what differs between two tables, reconcile two ledgers. |
| **Dev kit** | `https://ainetcafe.com/mcp/dev` | JSON↔YAML, validate JSON, line diff, regex test, JWT decode, SQL dialect transpile, timezone and unit conversion. |
| **Doc flow** | `https://ainetcafe.com/mcp/paper` | Markdown → PDF / Word / PowerPoint / EPUB / HTML. PDFs merged, split, rotated, watermarked. |
| **China facts** | `https://ainetcafe.com/mcp/cn` | Mainland reachability from a real backbone, statutory holidays **including make-up workdays (调休)**, offline ID and mobile validation, lunar calendar. |

All four are in the [official MCP registry](https://registry.modelcontextprotocol.io) as
`com.ainetcafe/netcafe-tables`, `-devkit`, `-docflow` and `-china`.

**Nothing in these four calls a language model or a third-party API.** They compute on our own
servers, so results are deterministic and repeatable — and they cannot break because someone else
changed their API.

## Numbers come with their own proof

Anything involving counts or money returns an arithmetic check computed in code, not asserted by a
model:

```jsonc
// reconcile_ledger: your books vs the bank statement
{
  "total_a": 105.30, "total_b": 106.80, "gap": -1.50,
  "only_in_a":  [{ "key": "B",  "amount": 5.00 }],
  "only_in_b":  [{ "key": "C",  "amount": 7.00 }],
  "mismatched": [{ "key": "A3", "a": 100.00, "b": 99.50, "diff": 0.50 }],
  "arithmetic_check": {
    "formula": "A 105.3 − B 106.8 = -1.5; differences explain -1.5",
    "checks_out": true
  }
}
```

If `checks_out` is false, the response says the result is untrustworthy instead of handing back a
table that looks finished. Amounts are compared in integer cents, so `0.1 + 0.2` never invents a
difference for someone to go chase.

## Connect it

```bash
claude mcp add --transport http netcafe-tables https://ainetcafe.com/mcp/table
```

DeepSeek Harness:

```bash
dsh plugin --profile web add github:mario03690/dsh-netcafe
```

Everything is also a plain GET — no MCP client, no SDK, no key:

```bash
curl "https://ainetcafe.com/t/cn_holiday?date=2026-10-01"
curl "https://ainetcafe.com/t/diff_text?a=one%0Atwo&b=one%0Athree"
```

Charts come back as images you can paste straight into a README:

![live chart](https://ainetcafe.com/t/make_chart?labels=Jan,Feb,Mar&values=12,19,7&raw=1&s=github-readme)

That image is rendered on request, right now, by the same service this page describes.

## Model cost is measured, not quoted

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

Every number is read from the upstream `usage` response, not derived from a published price list.
That distinction matters more than it sounds — while building this we found the obvious conversion
formula was wrong for several models (one off by ~9×, another by ~3×), and only billing-delta
measurement matched reality.
[Full method and data.](https://ainetcafe.com/lab/llm-real-cost-comparison?s=github)

## Heavier skills

The main endpoint (`https://ainetcafe.com/mcp`) also carries tools that do call a model, and say so:

| Skill | What it does |
|---|---|
| `extract_invoices` | A batch of invoices → one ledger-ready table. Every row checked in code (net + tax = gross); the batch total re-added independently. Mixed currencies get no batch total on purpose — adding them would be an accounting error. |
| `extract_statement` | Bank statement PDF → transactions, with reconciliation (opening + credits − debits = closing). If it doesn't balance it says where the running total first breaks. |
| `transpile_sql` | SQL between dialects via a real parser, not a model — same input, same output, and syntax errors come back with line and column. |
| `check_resume` | Whether an ATS can actually parse a résumé. Rule-based and reproducible. |
| `remember` / `recall` | Cross-session memory, keyed to your AllRouter key or an anonymous workspace token. |
| `create_task` | Hand a recurring job to a hosted runner; it notifies you only when the result actually changes. |

Full catalogue: <https://ainetcafe.com/tools?s=github>

Backed by open-source projects — PDFMathTranslate, GPT Academic, GPT Researcher, NextChat, LobeChat
— hosted pre-configured so you can try them without installing Docker, Python, or supplying a key.

## CLI

```bash
npx ai-netcafe compare "<prompt>"   # multi-model comparison with real costs
npx ai-netcafe ask "<prompt>"       # single model
npx ai-netcafe apps                 # hosted apps + source repos
npx ai-netcafe models               # models with per-million prices
npx ai-netcafe install              # MCP config for your agent
```

## Quota

Anonymous calls get a free allowance — enough to try everything here, no signup. When it runs out
the response tells you how to continue; nothing fails silently. Bring your own
[AllRouter](https://allrouter.ai/register?aff=qjpC&utm_source=github) key and token cost is billed
to your own account at direct rates with no markup:

```bash
export ALLROUTER_API_KEY=sk-...
```

Failed calls are not charged. Documents are processed in memory and not retained.

## Links

- Docs and one-line configs: <https://ainetcafe.com/mcp.html?s=github>
- Reconcile two tables in your browser, no install: <https://ainetcafe.com/duizhang?s=github>
- What every call actually cost: <https://ainetcafe.com/spend?s=github>
- Live cost comparison, updated daily: <https://ainetcafe.com/lab/llm-real-cost-comparison?s=github>
- A2A agent card: <https://ainetcafe.com/.well-known/agent-card.json>

## Disclosure

Built and run by the people behind ainetcafe.com. It is our own service, with a free tier and paid
usage beyond it. Links here carry an `s=` tag so we can tell which channel produces real usage — it
identifies the channel, not you.

MIT
