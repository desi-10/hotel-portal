import { z } from "zod";

// Define the User schema (similar to Owner, but renamed for clarity)
const userSchema = z.object({
  id: z.number(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  joined_since: z.string(), // ISO date-time string
  bio: z.string().optional(),
  phone_number: z.string(),
  profile_picture: z.string().nullable(),
  role: z.string(),
});

// Define the Review schema
const reviewSchema = z.object({
  id: z.number(),
  user: userSchema,
  review: z.string(),
  price_rating: z.number(),
  service_rating: z.number(),
  quality_rating: z.number(),
  location_rating: z.number(),
  created_at: z.string(), // ISO date-time string
  updated_at: z.string(), // ISO date-time string
  hotel: z.number(),
});

// Define the rest of your schemas (as you already have)
const ownerSchema = z.object({
  id: z.number(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  joined_since: z.string(),
  bio: z.string().optional(),
  phone_number: z.string(),
  profile_picture: z.string().nullable(),
  role: z.string(),
});

const facilitiesSchema = z.object({
  has_wifi: z.boolean(),
  has_swimming_pool: z.boolean(),
  has_conference_room: z.boolean(),
  has_tennis_court: z.boolean(),
  has_breakfast_in_bed: z.boolean(),
});

const avgRatingsSchema = z.object({
  average_price_rating: z.number(),
  average_location_rating: z.number(),
  average_quality_rating: z.number(),
  average_service_rating: z.number(),
});

const workHourSchema = z.object({
  day: z.string(),
  period: z.string(),
});

const workHoursSchema = z.object({
  id: z.number(),
  workhours: z.array(workHourSchema),
  created_at: z.string(),
  updated_at: z.string(),
  hotel: z.number(),
});

const gallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  hotel: z.number(),
});

const bookingSchema = z.object({
  id: z.number(),
  booking_number: z.string(),
  checkin: z.string(),
  checkout: z.string(),
  created_at: z.string(),
  status: z.string(),
  total_cost: z.number(),
});

const roomSchema = z.object({
  id: z.number(),
  has_booking: z.boolean(),
  booking_list: z.array(bookingSchema),
  room_number: z.string(),
  room_type: z.string(),
  image: z.string(),
  description: z.string(),
  price_per_night: z.string(),
  is_available: z.boolean(),
  hotel: z.number(),
});

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
  website: z.string().optional(),
  facilities: facilitiesSchema.optional(),
  avg_ratings: avgRatingsSchema.optional(),
  workhours: workHoursSchema.optional(),
  gallery: z.array(gallerySchema).optional(),
  rooms: z.array(roomSchema).optional(),
  reviews: z.array(reviewSchema).optional(), // Adding reviews to hotel schema
});

// Define TypeScript types
export type UserType = z.infer<typeof userSchema>;
export type ReviewType = z.infer<typeof reviewSchema>;
export type OwnerType = z.infer<typeof ownerSchema>;
export type FacilitiesType = z.infer<typeof facilitiesSchema>;
export type AvgRatingsType = z.infer<typeof avgRatingsSchema>;
export type WorkHourType = z.infer<typeof workHourSchema>;
export type WorkHoursType = z.infer<typeof workHoursSchema>;
export type GalleryType = z.infer<typeof gallerySchema>;
export type BookingType = z.infer<typeof bookingSchema>;
export type RoomType = z.infer<typeof roomSchema>;
export type HotelType = z.infer<typeof hotelSchema>;
