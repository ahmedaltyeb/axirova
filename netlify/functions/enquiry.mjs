import handleEnquiry from "../../api/enquiry.js";

// Keep validation and delivery behavior shared with the Vercel deployment.
export default async function enquiry(request, context) {
  const headers = Object.fromEntries(request.headers);
  headers.host = new URL(request.url).host;
  // Only trust the platform's connection IP for rate limiting.
  delete headers["x-vercel-forwarded-for"];
  const responseHeaders = new Headers();
  let statusCode = 200;
  const response = {
    setHeader(name, value) {
      responseHeaders.set(name, String(value));
    },
    status(value) {
      statusCode = value;
      return this;
    },
    json(value) {
      responseHeaders.set("Content-Type", "application/json");
      return new Response(JSON.stringify(value), {
        status: statusCode,
        headers: responseHeaders,
      });
    },
  };
  if (Number(headers["content-length"]) > 16000) {
    response.setHeader("Cache-Control", "no-store");
    return response.status(413).json({ error: "Payload too large" });
  }
  return handleEnquiry(
    {
      method: request.method,
      headers,
      body: request.method === "POST" ? await request.text() : undefined,
      socket: { remoteAddress: context.ip || "unknown" },
    },
    response,
  );
}
