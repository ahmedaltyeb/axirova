import { z } from "zod";
export function createLeadSchema(
  messages = {
    invalid: "Invalid field",
    contactRequired: "Valid email or WhatsApp required",
  },
) {
  const text = (min, max) =>
    z.string().trim().min(min, messages.invalid).max(max, messages.invalid);
  return z
    .object({
      name: text(2, 100),
      company: text(2, 150),
      email: z.union([
        z.literal(""),
        z.string().trim().email(messages.contactRequired).max(254),
      ]),
      whatsapp: z.union([
        z.literal(""),
        z
          .string()
          .trim()
          .regex(/^\+?[\d\s()-]{7,25}$/, messages.contactRequired),
      ]),
      service: text(1, 100),
      budget: text(1, 100),
      message: text(10, 4000),
      website: z.string().max(200).default(""),
      consent: z.literal(true, { error: messages.invalid }),
      lang: z.enum(["en", "ar"]).optional(),
      type: z.enum(["project", "demo"]).optional(),
      submissionId: z.string().uuid().optional(),
    })
    .refine((v) => v.email || v.whatsapp, {
      message: messages.contactRequired,
      path: ["email"],
    });
}
