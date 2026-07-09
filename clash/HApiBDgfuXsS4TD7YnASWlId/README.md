# Mihomo subscription entry

Use only this canonical subscription file:

`unified.yaml`

Recommended phone/desktop subscription URL:

`https://arlozheng.github.io/graphic-design-portfolio-site/clash/HApiBDgfuXsS4TD7YnASWlId/unified.yaml`

Avoid using jsDelivr `@main` URLs for mutable subscriptions. During the 2026-07-09 repair, jsDelivr kept serving an older `mobile.yaml` even after GitHub had the fixed file and purge calls returned success. GitHub Pages has a shorter cache window and matched the verified profile.

Current verified topology:

- `Airport Front`: `url-test`
- `US Transit`: `fallback`
- `Final Exit`: `select`
- Residential exits use `dialer-proxy: US Transit`
- DNS includes `proxy-server-nameserver`
- Residential exits force `ip-version: ipv4`
