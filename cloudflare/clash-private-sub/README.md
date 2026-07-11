# Private Clash Subscription Worker

This repository keeps its public Clash/Mihomo configurations as rollback bases. Private residential nodes must never be committed here.

## Boundaries

- Keep `clash/HApiBDgfuXsS4TD7YnASWlId/mobile.yaml` and `clash/HApiBDgfuXsS4TD7YnASWlId/desktop.yaml` unchanged unless the user explicitly changes that rule.
- Do not delete existing residential exits, alter rules, alter `Airport Front`, alter `US Transit`, or alter the `airport` proxy provider.
- Do not modify the `rollback/mobile-desktop-stable-20260711` rollback branch.
- Never commit subscription keys, proxy credentials, or `PRIVATE_NODES_JSON`.

## Private node workflow

Private nodes belong only in Cloudflare Worker Secrets: `SUB_KEY` and `PRIVATE_NODES_JSON`.

Future node changes must update only `PRIVATE_NODES_JSON`. The Worker injects those nodes into the generated configuration and adds them to `Final Exit`; all other configuration remains unchanged.

Before declaring a change successful, verify the private proxy's actual exit IP, validate generated mobile and desktop YAML with Mihomo, verify `Final Exit` membership and uniqueness, and confirm the public base configurations have not changed.

The deployed subscription URL and its key are intentionally not stored in Git.
