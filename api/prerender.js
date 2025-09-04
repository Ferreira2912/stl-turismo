export default async function handler(req, res) {
  try {
    const token = process.env.PRERENDER_TOKEN;
    if (!token) {
      res.status(500).send('PRERENDER_TOKEN not configured');
      return;
    }

    // Determine original URL to prerender
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    let path = req.query.path || '/';
    if (Array.isArray(path)) path = path[0] || '/';
    path = path.toString();
    if (!path.startsWith('/')) path = `/${path}`;
    const targetUrl = `${proto}://${host}${path}`;

    const prerenderUrl = `https://service.prerender.io/${targetUrl}`;
    const upstream = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': token,
        'User-Agent': req.headers['user-agent'] || ''
      },
      redirect: 'follow'
    });

    const html = await upstream.text();
    // Forward basic headers
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'text/html; charset=utf-8');
    const cache = upstream.headers.get('cache-control');
    if (cache) res.setHeader('Cache-Control', cache);
    res.status(upstream.status).send(html);
  } catch (err) {
    res.status(500).send('Error prerendering');
  }
}
