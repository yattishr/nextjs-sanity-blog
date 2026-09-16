// Stop selected bulk crawlers before they reach the Next.js server handler.
// User-agent matching is a targeted mitigation, not bot authentication.
const blockedAgent = /(?:GPTBot|ClaudeBot|CCBot|Bytespider|PetalBot|Factset_spyderbot|Liner\s?Bot|Timpibot)/i;

export default function blockBulkCrawlers(request) {
  if (blockedAgent.test(request.headers.get("user-agent") || "")) {
    return new Response("Forbidden\n", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "private, no-store",
        "Vary": "User-Agent",
      },
    });
  }
  // Returning nothing continues the request to the next handler.
}

export const config = { path: "/*" };
