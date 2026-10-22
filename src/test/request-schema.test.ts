import { describe, expect, it } from "vitest";
import { hotelSchema } from "@/components/gp/request-schema";

const request = {
  fullName: "Test Guest",
  hotel: "Test Hotel",
  email: "guest@example.com",
  phone: "0994246141",
  products: ["amenity", "slippers", "chaona"],
  need: "quotation",
  consent: true,
};

describe("Hotel request options", () => {
  it("rejects all sample requests while allowing quotations", () => {
    expect(hotelSchema.safeParse({ ...request, need: "sample" }).success).toBe(false);
    expect(hotelSchema.safeParse(request).success).toBe(true);
  });

  it("rejects export products while retaining hotel amenities", () => {
    expect(hotelSchema.safeParse({ ...request, products: ["export"] }).success).toBe(false);
    expect(hotelSchema.safeParse(request).success).toBe(true);
  });
});