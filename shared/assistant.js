import { z } from "zod";

export const intents = ["sales", "quotation", "support", "lead"];
export const assistantRequestSchema = z
  .object({
    lang: z.enum(["en", "ar"]),
    path: z
      .string()
      .max(180)
      .regex(/^\/[a-z0-9/-]*$/),
    messages: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().trim().min(1).max(3500),
        }),
      )
      .min(1)
      .max(12),
  })
  .refine((value) => value.messages.at(-1)?.role === "user")
  .refine((value) =>
    value.messages.every((m) => m.role !== "user" || m.content.length <= 1800),
  );
export const assistantReplySchema = z.object({
  reply: z.string().trim().min(1).max(3500),
  intent: z.enum(intents),
  links: z.array(z.string().max(180)).max(3),
});
export const responseJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    intent: { type: "string", enum: intents },
    links: { type: "array", items: { type: "string" } },
  },
  required: ["reply", "intent", "links"],
};
