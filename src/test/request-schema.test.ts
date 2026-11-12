import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/components/gp/request-schema";

const request = {
  name: "Test Guest",
  company: "Test Hotel",
  email: "guest@example.com",
  phone: "0994246141",
  consent: true,
};

describe("Quotation request", () => {
  it("accepts name, company name, email and phone, with notes optional", () => {
    expect(quoteSchema.safeParse(request).success).toBe(true);
    expect(quoteSchema.safeParse({ ...request, notes: "Need 500 sets for 2027." }).success).toBe(true);
  });

  it("requires name, company name, email, phone and consent", () => {
    for (const key of ["name", "company", "email", "phone", "consent"] as const) {
      const { [key]: _omitted, ...rest } = request;
      expect(quoteSchema.safeParse(rest).success, key).toBe(false);
    }
    expect(quoteSchema.safeParse({ ...request, email: "not-an-email" }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...request, consent: false }).success).toBe(false);
  });
});
