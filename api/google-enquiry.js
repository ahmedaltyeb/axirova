import { randomUUID } from "node:crypto";

export async function deliverGoogleEnquiry(lead) {
  const budgets = {
    0: "To be discussed",
    1: "Budget not yet defined",
    2: "Budget approved — discuss privately",
  };
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
  const token = process.env.GOOGLE_APPS_SCRIPT_TOKEN;
  if (!endpoint || !token)
    return { status: 503, error: "Google enquiry delivery is not configured" };
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
  ) {
    return { status: 503, error: "Google enquiry endpoint is invalid" };
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      budget: budgets[lead.budget] || lead.budget,
      submissionId: lead.submissionId || randomUUID(),
      token,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok)
    return { status: 502, error: "Google enquiry delivery failed" };
  const result = await response.json();
  if (
    result.ok !== true ||
    result.saved !== true ||
    result.emailSent !== true
  ) {
    return { status: 502, error: "Google enquiry delivery is incomplete" };
  }
  return { status: 200 };
}
