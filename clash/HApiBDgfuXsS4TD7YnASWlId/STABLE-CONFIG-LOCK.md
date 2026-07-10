# Stable proxy configuration lock

## Canonical mobile subscription

URL:
https://cdn.jsdelivr.net/gh/ArloZheng/graphic-design-portfolio-site@main/clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml

Source file:
clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml

Mobile constraints:
- This is the confirmed low-latency mobile baseline.
- Do not generate replacement mobile URLs.
- Do not replace mobile.yaml with desktop.yaml or provider-split experiments.
- Preserve all non-Final-Exit mobile configuration unless explicitly requested.
- Final Exit must be type select and expose exactly these three residential exits:
  1. Oregon / 205.214.55.251
  2. Arizona Flagstaff / 47.215.192.185
  3. New York City / 168.158.76.54
- Residential exits chain through Airport Front.

## Canonical desktop subscription

Stable pinned URL:
https://cdn.jsdelivr.net/gh/ArloZheng/graphic-design-portfolio-site@0a4607d78f71c346e9e4ea46e20a117926d375ba/clash/HApiBDgfuXsS4TD7YnASWlId/desktop.yaml

Source file:
clash/HApiBDgfuXsS4TD7YnASWlId/desktop.yaml

Desktop constraints:
- Desktop configuration is stable and independent from mobile.
- Do not modify desktop.yaml when fixing mobile unless explicitly requested.
- Do not change the desktop subscription URL during mobile work.

## Maintenance rule

Only mobile.yaml and desktop.yaml are active canonical client profiles for this workflow.
Historical provider-split profiles, CDN test profiles, generated status reports, and one-shot repair workflows are obsolete and should not be reused.
