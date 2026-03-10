import { z } from "zod/v4";

// --- Content schemas ---

export const whitepaperSchema = z.object({
  title: z.string(),
  description: z.string(),
  readLink: z.string().optional(),
  btnTitle: z.string().optional(),
  btnLink: z.string().optional(),
});

export type Whitepaper = z.infer<typeof whitepaperSchema> & { slug: string };

export const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  status: z.enum(["filled", "open"]).optional().default("open"),
});

export type Job = z.infer<typeof jobSchema> & { slug: string; content: string };

// --- Contact form schema ---

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .max(100, { error: "Name must be under 100 characters" }),
  email: z.email({ error: "Please enter a valid email address" }),
  message: z
    .string()
    .min(1, { error: "Message is required" })
    .max(5000, { error: "Message must be under 5000 characters" }),
  subject: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type FormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined>;
  message?: string;
};
