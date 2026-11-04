function clean(value, max = 1200) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max) : "";
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = req.body || {};
  // Honeypot field: silently reject automated submissions.
  if (clean(body.website, 200)) return res.status(200).json({ success: true });

  const lead = {
    source: "AXIROVA Website AI Assistant",
    submittedAt: new Date().toISOString(),
    language: body.language === "ar" ? "ar" : "en",
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 180).toLowerCase(),
    phone: clean(body.phone, 60),
    service: clean(body.service, 120),
    budget: clean(body.budget, 100),
    timeline: clean(body.timeline, 100),
    details: clean(body.details, 3000),
    consent: body.consent === true,
  };

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  if (!lead.name || !emailIsValid || !lead.service || lead.details.length < 15 || !lead.consent) {
    return res.status(400).json({ error: "Please complete the required fields and accept the privacy notice." });
  }

  const webhookUrl = process.env.AXIROVA_LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(503).json({ error: "The enquiry form is not connected yet. Please email info@axirova.ae or contact us on WhatsApp." });
  }

  const token = process.env.AXIROVA_LEADS_WEBHOOK_TOKEN || "";
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}`, "X-Webhook-Token": token } : {}),
      },
      body: JSON.stringify({ ...lead, token: token || undefined }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      console.error("AXIROVA lead webhook returned:", response.status);
      return res.status(502).json({ error: "We could not submit your enquiry right now. Please contact our team directly." });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("AXIROVA lead submission failed:", error?.message || error);
    return res.status(502).json({ error: "We could not submit your enquiry right now. Please try again later." });
  }
}
