export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
};

export type ListingStatus = "active" | "sold" | "expired" | "removed";
export type ListingCondition =
  | "new"
  | "like_new"
  | "excellent"
  | "good"
  | "fair"
  | "parts";
export type ListingCategory =
  | "espresso_machines"
  | "grinders"
  | "kettles"
  | "accessories"
  | "knives"
  | "cookware"
  | "bakeware"
  | "kitchen_tools"
  | "other";

export type Listing = {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  condition: ListingCondition;
  category: ListingCategory;
  location: string | null;
  shipping_offered: boolean;
  images: string[];
  status: ListingStatus;
  views_count: number;
  created_at: string;
  updated_at: string;
};

export type ListingWithSeller = Listing & {
  seller: Profile;
  seller_rating?: UserRating;
};

export type ForumCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type ForumThread = {
  id: string;
  category_id: string;
  author_id: string;
  title: string;
  is_pinned: boolean;
  is_locked: boolean;
  post_count: number;
  last_post_at: string;
  created_at: string;
};

export type ForumThreadWithAuthor = ForumThread & {
  author: Profile;
};

export type ForumPost = {
  id: string;
  thread_id: string;
  author_id: string;
  body: string;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
};

export type ForumPostWithAuthor = ForumPost & {
  author: Profile;
};

export type FeedbackRole = "buyer" | "seller";

export type Feedback = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  listing_id: string | null;
  role: FeedbackRole;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type FeedbackWithUsers = Feedback & {
  from_user: Profile;
  listing?: { id: string; title: string } | null;
};

export type UserRating = {
  user_id: string;
  total_reviews: number;
  avg_rating: number;
  positive_count: number;
  negative_count: number;
};
