# Installing the AI NetCafé MCP server

This is a **remote MCP server** (Streamable HTTP). There is nothing to build or run locally — you only add its URL to your MCP configuration.

## Cline / Claude Desktop / any JSON-config MCP client

Add to your MCP settings:

```json
{
  "mcpServers": {
    "ai-netcafe": {
      "type": "http",
      "url": "https://ainetcafe.com/mcp"
    }
  }
}
```

## Claude Code (one line)

```bash
claude mcp add --transport http ai-netcafe https://ainetcafe.com/mcp
```

## Auth (optional)

Anonymous calls draw on a free quota — no signup needed to try. For unlimited use, add your AllRouter key:

```json
{
  "mcpServers": {
    "ai-netcafe": {
      "type": "http",
      "url": "https://ainetcafe.com/mcp",
      "headers": { "Authorization": "Bearer sk-your-allrouter-key" }
    }
  }
}
```

## Verify

Ask your agent: *"List the apps available on ai-netcafe"* → the `list_apps` tool should return the hosted application catalog. Or try: *"Use ai-netcafe to compare model costs for: dedupe an array in JS"*.

## What you get (11 tools)

- `submit_project` / `project_status` — publish a web app (repo or static site) to managed hosting with one call; public listing or private (unlisted + password)
- `compare_models` / `ask_model` / `list_models` — run prompts across 20+ LLMs with actually-metered USD cost
- `translate_pdf` — full-PDF translation preserving formulas and layout (async)
- `deep_research` — autonomous cited research (async)
- `make_slides` — real downloadable .pptx (async)
- `list_apps` / `get_app` / `check_job`
