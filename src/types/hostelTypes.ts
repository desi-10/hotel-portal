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

// Define the Facilities schema
const facilitiesSchema = z.object({
  id: z.number(),
  has_wifi: z.boolean(),
  has_swimming_pool: z.boolean(),
  has_conference_room: z.boolean(),
  has_tennis_court: z.boolean(),
  has_breakfast_in_bed: z.boolean(),
  created_at: z.string(), // ISO date-time string
  updated_at: z.string(), // ISO date-time string
  hotel: z.number(),
});

// Define the WorkHour schema
const workHourSchema = z.object({
  day: z.string(), // Example: "Sunday"
  period: z.string(), // Example: "8:00am - 6:00pm"
});

// Define the WorkHours schema
const workHoursSchema = z.object({
  id: z.number(),
  workhours: z.array(workHourSchema),
  created_at: z.string(), // ISO date-time string
  updated_at: z.string(), // ISO date-time string
  hotel: z.number(),
});

// Define the Gallery schema
const gallerySchema = z.object({
  id: z.number(),
  image: z.string(), // URI for the image
  created_at: z.string(), // ISO date-time string
  updated_at: z.string(), // ISO date-time string
  hotel: z.number(),
});

// Define the Booking schema
const bookingSchema = z.object({
  id: z.number(),
  booking_number: z.string(),
  checkin: z.string(), // ISO date-time string
  checkout: z.string(), // ISO date-time string
  created_at: z.string(), // ISO date-time string
  status: z.string(),
  total_cost: z.number(),
});

// Define the Room schema
const roomSchema = z.object({
  id: z.number(),
  has_booking: z.boolean(),
  booking_list: z.array(bookingSchema),
  room_number: z.string(),
  room_type: z.string(),
  image: z.string(), // URI for the image
  description: z.string(),
  price_per_night: z.string(),
  is_available: z.boolean(),
  hotel: z.number(),
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
  facilities: facilitiesSchema.optional(),
  workhours: workHoursSchema.optional(),
  gallery: z.array(gallerySchema).optional(),
  rooms: z.array(roomSchema).optional(),
});

// Define TypeScript types
export type OwnerType = z.infer<typeof ownerSchema>;
export type FacilitiesType = z.infer<typeof facilitiesSchema>;
export type WorkHourType = z.infer<typeof workHourSchema>;
export type WorkHoursType = z.infer<typeof workHoursSchema>;
export type GalleryType = z.infer<typeof gallerySchema>;
export type BookingType = z.infer<typeof bookingSchema>;
export type RoomType = z.infer<typeof roomSchema>;
export type HotelType = z.infer<typeof hotelSchema>;
