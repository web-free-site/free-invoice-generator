export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    let response = await env.ASSETS.fetch(request)

    if (response.status === 404 && !url.pathname.includes('.')) {
      const slashPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`
      const nested = await env.ASSETS.fetch(new Request(new URL(`${slashPath}index.html`, url.origin), request))
      if (nested.status !== 404) return nested
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request))
    }
    return response
  },
}
