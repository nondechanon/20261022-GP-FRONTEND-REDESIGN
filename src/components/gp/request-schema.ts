import { z } from "zod";

const consent = z.literal(true, { errorMap: () => ({ message: "Consent is required" }) });

export const hotelSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  hotel: z.string().trim().min(2, "Please enter your hotel").max(150),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter a phone number").max(30),
  rooms: z.string().trim().max(10).optional(),
  products: z.array(z.enum(["amenity", "slippers", "chaona"])),
  need: z.enum(["quotation", "callback"], { errorMap: () => ({ message: "Please choose one" }) }),
  notes: z.string().trim().max(1000).optional(),
  consent,
});

