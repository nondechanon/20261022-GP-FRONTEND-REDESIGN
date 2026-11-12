import { z } from "zod";

const consent = z.literal(true, { errorMap: () => ({ message: "Consent is required" }) });

/** Quotation request: name, company name, email, phone (required) + additional notes (optional). */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  company: z.string().trim().min(2, "Please enter your company name").max(150),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter a phone number").max(30),
  notes: z.string().trim().max(1000).optional(),
  consent,
});
