# netcafe-live-data 实时数据

天气、汇率、股票行情、域名查询、SSL 证书、境内可达性检测——六个实时数据工具。免注册、免 API Key,有免费额度,服务器在境内(移动骨干),数据类查询直连低延迟。

```json
{
  "mcpServers": {
    "netcafe-live-data": {
      "type": "streamable_http",
      "url": "https://ainetcafe.com/mcp/data"
    }
  }
}
```

## 工具

| 工具 | 做什么 | 参数 |
|------|--------|------|
| `get_weather` | 全球城市实时天气 + 3 天预报(温度/湿度/风速/降雨概率) | `city`(中英文均可)或经纬度 |
| `exchange_rate` | 实时汇率,单币对换算或主要货币一览 | `from` / `to` / `amount` |
| `stock_quote` | A股/港股/美股实时行情:现价、涨跌幅、开盘、最高最低 | `symbol`(600519 / 00700.HK / AAPL) |
| `china_reachability` | **从真实境内网络**测任意 URL:HTTP 状态、延迟、境内 DNS 解析结果 | `url` |
| `domain_check` | 域名是否已注册(官方 RDAP):注册商、注册/到期时间、NS | `domain` |
| `ssl_check` | SSL 证书检查:颁发者、有效期、剩余天数、是否可信 | `domain` |

## 特色:china_reachability

出海站点/海外服务"在中国大陆能不能打开、多快"——探测点是一台真实的境内移动骨干服务器,不是海外机房模拟。返回 HTTP 状态、毫秒级延迟、境内公共 DNS(223.5.5.5 / 114)给出的解析结果。

```
china_reachability(url="https://your-site.com")
→ { verdict: "reachable", http_status: 200, latency_ms: 412, dns_from_china: [...] }
```

## 示例

```
get_weather(city="北京")      → 实时温湿度 + 3 天预报
stock_quote(symbol="600519")  → 贵州茅台现价与涨跌
exchange_rate(from="USD", to="CNY", amount=100) → 实时换算
domain_check(domain="my-idea.com") → 是否可注册、到期时间
```

行情与汇率为公开数据源,不构成投资建议。更多工具见 [ainetcafe.com/tools](https://ainetcafe.com/tools)。
