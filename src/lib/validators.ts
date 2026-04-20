import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be 30 characters or less")
      .regex(
        /^[a-z0-9][a-z0-9_-]*$/,
        "Username must start with a letter or number and contain only lowercase letters, numbers, hyphens, and underscores"
      ),
    displayName: z
      .string()
      .min(1, "Display name is required")
      .max(50, "Display name must be 50 characters or less"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const listingSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be 150 characters or less"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description must be 5000 characters or less"),
  price: z
    .number()
    .positive("Price must be greater than zero")
    .max(100000, "Price must be less than $100,000"),
  condition: z.enum(["new", "like_new", "excellent", "good", "fair", "parts"]),
  category: z.enum([
    "espresso_machines",
    "grinders",
    "kettles",
    "accessories",
    "knives",
    "cookware",
    "bakeware",
    "kitchen_tools",
    "other",
  ]),
  location: z.string().max(100).optional(),
  shippingOffered: z.boolean().default(false),
});

export const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z
    .string()
    .max(1000, "Comment must be 1000 characters or less")
    .optional(),
  role: z.enum(["buyer", "seller"]),
});

export const threadSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be 200 characters or less"),
  body: z
    .string()
    .min(10, "Post must be at least 10 characters")
    .max(10000, "Post must be 10000 characters or less"),
});

export const postSchema = z.object({
  body: z
    .string()
    .min(1, "Post cannot be empty")
    .max(10000, "Post must be 10000 characters or less"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ListingInput = z.infer<typeof listingSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type ThreadInput = z.infer<typeof threadSchema>;
export type PostInput = z.infer<typeof postSchema>;
