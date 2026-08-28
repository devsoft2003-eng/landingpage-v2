import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter a full name.")
  .max(160)
  .regex(/^[\p{L}\s.'-]+$/u, "Use letters, spaces, and common name punctuation only.");

const orgSchema = z.string().trim().min(2, "Enter an organisation or department.").max(180);
const citySchema = z.string().trim().min(2).max(100);
const purposeSchema = z.string().trim().min(8, "Please describe the purpose of the download.").max(500);

export const indianMobileSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .refine((value) => /^(\+91)?[6-9]\d{9}$/.test(value) || /^\+[1-9]\d{7,14}$/.test(value), {
    message: "Enter a valid mobile number.",
  });

export const downloadRegistrationSchema = z.object({
  productSlug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  fullName: nameSchema,
  organization: orgSchema,
  designation: z.string().trim().min(2).max(120),
  email: z.string().trim().email("Enter a valid email address.").max(190),
  mobile: indianMobileSchema,
  city: citySchema,
  state: z.string().trim().min(2).max(100),
  country: z.string().trim().min(2).max(100),
  purpose: purposeSchema,
  consent: z.boolean().refine((value) => value === true, "Consent is required before downloading."),
  captchaToken: z.string().min(1, "Complete the verification challenge."),
});

export const contactSchema = z.object({
  fullName: nameSchema,
  email: z.string().trim().email().max(190),
  organization: z.string().trim().max(180).optional().or(z.literal("")),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  enquiryType: z.enum(["business", "product", "support", "other"]),
  product: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please provide a short message.").max(4000),
  captchaToken: z.string().min(1, "Complete the verification challenge."),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(190),
  password: z.string().min(10, "Invalid credentials.").max(200),
});

export const downloadTokenSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/, "Invalid download token."),
  productSlug: z.string().regex(/^[a-z0-9-]+$/),
});

export type DownloadRegistration = z.infer<typeof downloadRegistrationSchema>;
export type ContactPayload = z.infer<typeof contactSchema>;
