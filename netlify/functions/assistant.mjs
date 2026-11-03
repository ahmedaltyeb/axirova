import handler from "../../api/assistant.js";
export default async function assistant(request, context) {
  const headers = Object.fromEntries(request.headers);
  headers.host = new URL(request.url).host;
  delete headers["x-vercel-forwarded-for"];
  const responseHeaders = new Headers();
  let status = 200;
  const response = {
    setHeader(key, value) {
      responseHeaders.set(key, String(value));
    },
    status(code) {
      status = code;
      return this;
    },
    json(value) {
      responseHeaders.set("Content-Type", "application/json");
      return new Response(JSON.stringify(value), {
        status,
        headers: responseHeaders,
      });
    },
  };
  if (Number(headers["content-length"]) > 24000)
    return response.status(413).json({ error: "Payload too large" });
  return handler(
    {
      method: request.method,
      headers,
      body: request.method === "POST" ? await request.text() : undefined,
      socket: { remoteAddress: context.ip || "unknown" },
    },
    response,
  );
}
