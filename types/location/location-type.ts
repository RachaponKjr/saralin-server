import { z } from "zod";

const LocationSchema = z.object({
  user_id: z.string(),
  location: z.object({
    address: z.string(),
    subdistrict: z.string(),
    district: z.string(),
    state: z.string(),
    postal_code: z.string(),
    country: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export type Location = z.infer<typeof LocationSchema>;
