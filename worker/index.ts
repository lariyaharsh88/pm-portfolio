// Sends www.harshlariya.in to the apex with a permanent redirect; everything else is the static site.
export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (r: Request) => Promise<Response> } }) {
    const url = new URL(request.url)
    if (url.hostname === "www.harshlariya.in") {
      url.hostname = "harshlariya.in"
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
