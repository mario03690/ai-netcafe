# netcafe-almanac 中华万年历 · 八字黄历

农历、八字、黄历、择吉日,四个工具,纯计算,快且准。免注册、免 API Key,有免费额度,境内直连低延迟。

```json
{
  "mcpServers": {
    "netcafe-almanac": {
      "type": "streamable_http",
      "url": "https://ainetcafe.com/mcp/almanac"
    }
  }
}
```

## 工具

| 工具 | 做什么 | 参数 |
|------|--------|------|
| `lunar_calendar` | 公历转农历:农历日期、干支纪年、生肖、节气、节日、星座 | `date`(YYYY-MM-DD,默认今天) |
| `bazi_chart` | 生辰八字排盘:年月日时四柱、五行统计、纳音、日主 | `datetime`(YYYY-MM-DDTHH:mm) |
| `huangli` | 每日黄历:宜、忌、冲煞、彭祖百忌 | `date`(默认今天) |
| `pick_lucky_days` | 择吉日:按事件扫全月,列出吉日 | `month`(YYYY-MM)+ `event`(结婚/领证/搬家/开业/装修/出行/签约/订婚/安床/安葬…) |

## 为什么准

- 基于成熟的 lunar 历法算法,**八字按真太阳节气边界换月柱**,不是简单查表。
- 纯确定性计算,不经过大模型,毫秒级返回,不会"编"。

## 示例

问:"2000年5月20日上午10点半出生,八字是什么?"

```
bazi_chart(datetime="2000-05-20T10:30")
→ 庚辰 辛巳 戊寅 丁巳,属龙,日主戊土,五行齐全
```

问:"2026年9月哪天适合搬家?"

```
pick_lucky_days(month="2026-09", event="搬家")
→ 命中的日期列表,含星期、农历、所宜、冲煞
```

内容供文化参考。更多工具见 [ainetcafe.com/tools](https://ainetcafe.com/tools)。
