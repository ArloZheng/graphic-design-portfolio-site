const DESKTOP_CONFIG_URL = 'https://raw.githubusercontent.com/ArloZheng/graphic-design-portfolio-site/main/clash/HApiBDgfuXsS4TD7YnASWlId/desktop.yaml';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/' && url.pathname !== '/desktop.yaml') {
      return new Response('Not Found', { status: 404 });
    }

    if (!env.AIRPORT_SUB_URL) {
      return new Response('AIRPORT_SUB_URL is not configured', { status: 500 });
    }

    const [desktopResp, airportResp] = await Promise.all([
      fetch(DESKTOP_CONFIG_URL, {
        cf: { cacheTtl: 60, cacheEverything: true },
      }),
      fetch(env.AIRPORT_SUB_URL, {
        headers: {
          'User-Agent': 'clash.meta',
        },
        cf: { cacheTtl: 60, cacheEverything: false },
      }),
    ]);

    if (!desktopResp.ok) {
      return new Response(`Failed to fetch desktop config: ${desktopResp.status}`, { status: 502 });
    }

    const body = await desktopResp.text();
    const headers = new Headers({
      'content-type': 'text/yaml; charset=utf-8',
      'cache-control': 'no-store',
      'content-disposition': 'attachment; filename="desktop.yaml"',
    });

    if (airportResp.ok) {
      const passthroughHeaders = [
        'subscription-userinfo',
        'profile-update-interval',
        'profile-web-page-url',
      ];

      for (const name of passthroughHeaders) {
        const value = airportResp.headers.get(name);
        if (value) headers.set(name, value);
      }
    }

    return new Response(body, {
      status: 200,
      headers,
    });
  },
};
