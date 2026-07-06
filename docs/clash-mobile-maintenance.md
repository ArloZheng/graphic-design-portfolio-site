# Clash/Mihomo 手机链式代理维护说明

## 1. 固定订阅地址

手机端远程配置 URL：

```text
https://raw.githubusercontent.com/ArloZheng/graphic-design-portfolio-site/main/clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml
```

手机 Clash/Mihomo 客户端通过 URL 导入此地址。以后配置更新后，手机端只需要刷新/更新远程配置，不需要重新导入文件。

## 2. GitHub 仓库与配置文件路径

仓库：

```text
ArloZheng/graphic-design-portfolio-site
```

配置文件：

```text
clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml
```

维护说明文件：

```text
docs/clash-mobile-maintenance.md
```

## 3. 当前设计目标

总体目标是兼顾：

- 手机日常国内应用可用性
- 国外网页与账号使用固定住宅出口
- 避免 WebRTC/STUN 暴露中国真实公网 IP
- 保留国外电话、视频、语音、游戏、QUIC 的 UDP 能力
- 尽量保持公网身份国家一致，避免网页是美国、WebRTC 是日本、DNS 又出现其他亚洲地区

## 4. 当前链路结构

### 国内流量

```text
国内域名/IP
→ DIRECT
```

规则核心：

```yaml
- GEOSITE,CN,DIRECT
- GEOIP,CN,DIRECT,no-resolve
```

### 国外 TCP / HTTPS

```text
手机
→ Airport Front
→ Oregon Residential
→ 网站
```

最终网页出口是住宅代理节点。

住宅节点依赖：

```yaml
dialer-proxy: "Airport Front"
```

### 国外 UDP / WebRTC / 游戏 / 语音

```text
国外 UDP
→ US UDP
→ 美国机场 UDP 节点
```

用途包括：

- WebRTC / STUN
- 国外电话/语音
- 视频通话
- 游戏 UDP
- QUIC / HTTP3

不要把这部分改成 DIRECT，否则可能再次暴露真实中国公网 IP。

当前 `US UDP` 组从机场 provider 中筛选美国节点，用户应选择一个已验证支持 UDP 的稳定美国节点，例如美国 HY2/Hysteria2 节点。

## 5. DNS 设计

当前 DNS 设计原则：

- `ipv6: false`
- `enhanced-mode: fake-ip`
- `respect-rules: true`
- 普通 DNS 使用 Cloudflare DoH
- `default-nameserver` 和 `proxy-server-nameserver` 仅作为启动/代理节点域名解析用途，避免 DNS 与代理依赖死循环

核心方向：

```yaml
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  respect-rules: true
  default-nameserver:
    - 223.5.5.5
  nameserver:
    - https://1.1.1.1/dns-query
  proxy-server-nameserver:
    - 223.5.5.5
```

注意：`223.5.5.5` 的作用是 bootstrap/代理服务器域名解析，不应把它误认为所有普通国外 DNS 查询都从中国 DNS 直接出去。

## 6. 换住宅 IP 时怎么改

用户说“换住宅 IP”时，默认只修改住宅节点这几个字段：

```yaml
server:
port:
username:
password:
```

如果住宅代理协议变化，再修改：

```yaml
type: socks5
```

或：

```yaml
type: http
```

不要改动以下结构，除非用户明确要求：

- `proxy-providers.airport`
- `Airport Front`
- `US UDP`
- `Final Exit`
- `dialer-proxy: "Airport Front"`
- 国内直连规则
- UDP/WebRTC 分流逻辑
- 固定订阅 URL 对应的 GitHub 路径

## 7. WebRTC 排障原则

已知历史问题：

- 普通网页 HTTPS 显示美国住宅 IP
- WebRTC/STUN 曾经暴露中国真实公网 IP
- 也曾出现 WebRTC 跑日本节点的情况

原因分别可能是：

- STUN/UDP 命中 DIRECT
- UDP 被送到任意国家的机场前置组，而不是固定美国 UDP 组

正确目标：

```text
网页 TCP/HTTPS → 美国住宅 IP
WebRTC/STUN → 美国 UDP 节点
真实中国公网 IP → 不出现
```

除非住宅代理已经被单独证实完整支持 SOCKS5 UDP ASSOCIATE，否则不要假设 `udp: true` 就等于服务端真的支持完整 UDP。

## 8. 维护时的最小改动原则

Codex 或其他自动化工具维护此配置时，必须遵循：

1. 先读取现有 `mobile.yaml`，不要凭空重建完整配置。
2. 保留已工作的 provider、DNS、proxy-group 和规则结构。
3. 修改前先备份或读取当前 blob SHA。
4. 只做用户明确要求的最小修改。
5. 修改后检查 YAML 语法。
6. 检查以下关键项仍然存在：
   - `mode: rule`
   - `Airport Front`
   - `US UDP`
   - `Final Exit`
   - 住宅节点 `dialer-proxy: "Airport Front"`
   - `GEOSITE,CN,DIRECT`
   - `GEOIP,CN,DIRECT,no-resolve`
   - WebRTC/STUN 规则指向 `US UDP`
   - `NETWORK,UDP,US UDP`
   - `MATCH,Final Exit`
7. 不要重新生成随机路径，不要改固定订阅 URL。
8. 更新完成后，告诉用户只需在手机 Clash 里刷新原 URL 配置。

## 9. Codex 维护提示词

```text
请维护当前 GitHub 仓库中的手机 Mihomo/Clash 链式代理配置。

仓库：ArloZheng/graphic-design-portfolio-site
主配置路径：clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml
维护说明：docs/clash-mobile-maintenance.md
固定订阅 URL：https://raw.githubusercontent.com/ArloZheng/graphic-design-portfolio-site/main/clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml

维护原则：
1. 先读取 docs/clash-mobile-maintenance.md 和现有 mobile.yaml。
2. 不要重建整份配置，只做最小修改。
3. 国内流量继续 DIRECT。
4. 国外 TCP/HTTPS 继续走 Final Exit，再通过 Oregon Residential，并由 dialer-proxy 指向 Airport Front。
5. 国外 WebRTC/STUN、电话、语音、游戏、QUIC 等 UDP 继续走 US UDP。
6. US UDP 只能使用美国节点，不要让 UDP 跑到日本、新加坡或 DIRECT。
7. 换住宅 IP 时默认只修改 server、port、username、password；协议变化时才修改 type。
8. 不要改固定 GitHub 路径和固定订阅 URL。
9. 修改后校验 YAML，并确认以下条目存在：Airport Front、US UDP、Final Exit、dialer-proxy、GEOSITE,CN,DIRECT、GEOIP,CN,DIRECT,no-resolve、NETWORK,UDP,US UDP、MATCH,Final Exit。
10. 完成后告诉用户：手机 Clash 只需要刷新原 URL 配置。
11. 不要在聊天输出中复述真实订阅 token、住宅代理用户名或密码。
```

## 10. 用户侧验证清单

每次配置更新后，依次测试：

1. 微信/支付宝/国内网站是否正常。
2. Google/ChatGPT 是否正常。
3. 普通公网 IP 是否仍是住宅出口。
4. WebRTC/STUN 是否不再出现中国真实公网 IP。
5. WebRTC/STUN 是否保持美国节点，不应跳到日本等其他国家。
6. DNS 泄漏测试是否没有持续出现中国本地运营商 DNS。
7. 国外语音、视频通话和游戏是否可用。

如果只有个别测试站报错，不要立刻大改；先区分是测试站超时、Anycast 地理识别差异，还是持续性真实泄漏。
