export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname
    const looksLikeFile = /\.[a-zA-Z0-9]{1,8}$/.test(path)

    const asset = (pathname) => env.ASSETS.fetch(new Request(new URL(pathname, url.origin), request))

    if (!looksLikeFile) {
      const candidates = path.endsWith('/')
        ? [`${path}index.html`]
        : [`${path}/index.html`, `${path}.html`]

      for (const candidate of candidates) {
        const res = await asset(candidate)
        if (res.status === 200) return res
      }

      const spa = await asset('/index.html')
      if (spa.status === 200) return spa
    }

    return asset(path)
  },
}
