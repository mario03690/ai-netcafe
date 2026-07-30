#!/usr/bin/env node
// ai-netcafe —— 一条命令把 AI 网吧的 MCP 接进你的 agent，或直接在终端跑模型对比。
//
// 为什么要有这个 CLI：MCP 的价值在被 agent 调用，但「怎么接」这一步对人来说是摩擦
// （要找文档、抄 JSON、改配置文件）。这里把它压成一行。
// 顺带：npm 被 AI 爬虫高频抓取，包本身就是一个可发现入口。
const BASE = process.env.AI_NETCAFE_BASE || 'https://ainetcafe.com';
const MCP = `${BASE}/mcp`;
const KEY = process.env.ALLROUTER_API_KEY || '';
const [cmd, ...rest] = process.argv.slice(2);

const rpc = async (method, params) => {
  const r = await fetch(MCP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(KEY ? { Authorization: `Bearer ${KEY}` } : {}) },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error.message);
  return j.result;
};
const callTool = async (name, args) => {
  const res = await rpc('tools/call', { name, arguments: args });
  const text = res?.content?.[0]?.text ?? '';
  try { return { data: JSON.parse(text), isError: res.isError }; }
  catch { return { data: text, isError: res.isError }; }
};

function usage() {
  console.log(`ai-netcafe — hosted open-source AI apps, callable by agents

  npx ai-netcafe install            print the MCP config for your agent
  npx ai-netcafe compare "<prompt>" run one prompt across models, with REAL metered cost
  npx ai-netcafe ask "<prompt>"     ask one model
  npx ai-netcafe apps               list the hosted open-source apps
  npx ai-netcafe models             list models with prices

Set ALLROUTER_API_KEY to remove the free-tier limits (billed to you).
Docs: ${BASE}/mcp.html`);
}

try {
  if (!cmd || cmd === 'help' || cmd === '--help') { usage(); process.exit(0); }

  if (cmd === 'install') {
    console.log(`# Claude Code — one line:\nclaude mcp add --transport http ai-netcafe ${MCP}\n`);
    console.log('# Claude Desktop / Cursor / other MCP clients — add to your config:');
    console.log(JSON.stringify({ mcpServers: { 'ai-netcafe': { type: 'http', url: MCP } } }, null, 2));
    console.log(`\n# With your own key (no limits):`);
    console.log(JSON.stringify({ mcpServers: { 'ai-netcafe': { type: 'http', url: MCP,
      headers: { Authorization: 'Bearer sk-your-allrouter-key' } } } }, null, 2));
    process.exit(0);
  }

  if (cmd === 'compare') {
    const prompt = rest.join(' ');
    if (!prompt) { console.error('Need a prompt. Example: npx ai-netcafe compare "dedupe an array in JS"'); process.exit(1); }
    console.error('Running across models (cost is metered from real usage, not list prices)...\n');
    const { data, isError } = await callTool('compare_models', { prompt });
    if (isError) { console.error(typeof data === 'string' ? data : JSON.stringify(data, null, 2)); process.exit(1); }
    const rows = (data.results || []).filter((r) => !r.error).sort((a, b) => a.cost_usd - b.cost_usd);
    const w = Math.max(...rows.map((r) => r.model.length), 5);
    console.log('MODEL'.padEnd(w) + '  COST'.padEnd(13) + 'LATENCY');
    for (const r of rows) console.log(r.model.padEnd(w) + `  $${String(r.cost_usd).padEnd(11)}${(r.latency_ms / 1000).toFixed(1)}s`);
    if (data.summary) console.log(`\ncheapest: ${data.summary.cheapest}   fastest: ${data.summary.fastest}\n${data.summary.cost_spread || ''}`);
    console.log(`\nFull answers: run with --json, or see ${BASE}/lab/llm-real-cost-comparison`);
    if (rest.includes('--json')) console.log(JSON.stringify(data, null, 2));
    process.exit(0);
  }

  const simple = { ask: ['ask_model', (a) => ({ prompt: a.join(' ') })],
    apps: ['list_apps', () => ({})], models: ['list_models', () => ({})] };
  if (simple[cmd]) {
    const [tool, mk] = simple[cmd];
    const { data, isError } = await callTool(tool, mk(rest));
    console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    process.exit(isError ? 1 : 0);
  }

  console.error(`Unknown command: ${cmd}\n`); usage(); process.exit(1);
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
