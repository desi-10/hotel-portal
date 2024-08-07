import { z } from "zod";

// Define the Owner schema
const ownerSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  joined_since: z.string(),
  bio: z.string(),
  phone_number: z.string(),
  profile_picture: z.string().nullable(),
  role: z.string(),
});

// Define the Hotel schema
const hotelSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  contact_number: z.string(),
  country: z.string(),
  created_at: z.string(),
  description: z.string(),
  hotel_number: z.string(),
  image: z.string().nullable(),
  owner: ownerSchema,
  region: z.string(),
  updated_at: z.string(),
  website: z.string(),
});

// Define TypeScript types
export type OwnerType = z.infer<typeof ownerSchema>;
export type HotelType = z.infer<typeof hotelSchema>;
