# Stable rollback baseline - 2026-07-11

This file records the known-good mobile/desktop Clash/Mihomo configuration baseline.

## Rollback branch

`rollback/mobile-desktop-stable-20260711`

## Baseline commit

`d3358edef94a1b0a3033cece8900f4ecf2069bbd`

## Stable subscription URLs

### Mobile

```text
https://arlozheng.github.io/graphic-design-portfolio-site/clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml
```

### Desktop

```text
https://cdn.jsdelivr.net/gh/ArloZheng/graphic-design-portfolio-site@main/clash/HApiBDgfuXsS4TD7YnASWlId/desktop.yaml
```

## Known-good Final Exit baseline

### Mobile Final Exit

1. `俄勒冈州 205.214.55.251`
2. `亚利桑那州弗拉格斯塔夫 47.215.192.185`
3. `纽约州纽约市 168.158.76.54`
4. `Residential 198.65.47.221`

### Desktop Final Exit

1. `纽约州纽约市 168.158.76.54`
2. `俄勒冈州 205.214.55.251`
3. `亚利桑那州弗拉格斯塔夫 47.215.192.185`
4. `Residential 198.65.47.221`

## Rollback instruction

If future edits break the config, restore these two files from branch `rollback/mobile-desktop-stable-20260711`:

- `clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml`
- `clash/HApiBDgfuXsS4TD7YnASWlId/desktop.yaml`

Do not change the subscription URLs unless the user explicitly asks.
