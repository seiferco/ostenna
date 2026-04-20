export const SITE_NAME = "Ostenna";
export const SITE_DESCRIPTION =
  "The marketplace for quality used kitchen and espresso equipment. Zero fees. Trusted community.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ostenna.com";

export const LISTING_CATEGORIES = [
  { value: "espresso_machines", label: "Espresso Machines" },
  { value: "grinders", label: "Grinders" },
  { value: "kettles", label: "Kettles" },
  { value: "accessories", label: "Accessories" },
  { value: "knives", label: "Knives" },
  { value: "cookware", label: "Cookware" },
  { value: "bakeware", label: "Bakeware" },
  { value: "kitchen_tools", label: "Kitchen Tools" },
  { value: "other", label: "Other" },
] as const;

export const LISTING_CONDITIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "parts", label: "For Parts" },
] as const;

export const LISTING_SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
] as const;

export const FORUM_CATEGORIES = [
  {
    slug: "espresso",
    name: "Espresso",
    description: "Machines, techniques, and troubleshooting",
    color: "#6B5744",
    members: 342,
  },
  {
    slug: "grinders",
    name: "Grinders",
    description: "Burr sets, alignment, and recommendations",
    color: "#4FA99B",
    members: 218,
  },
  {
    slug: "knives",
    name: "Knives",
    description: "Kitchen knives, sharpening, and care",
    color: "#B8A99A",
    members: 156,
  },
  {
    slug: "cookware",
    name: "Cookware",
    description: "Pots, pans, and kitchen equipment",
    color: "#C4943A",
    members: 189,
  },
  {
    slug: "deals",
    name: "Deals & Steals",
    description: "Share deals you've found",
    color: "#5B8C5A",
    members: 412,
  },
  {
    slug: "general",
    name: "General Discussion",
    description: "Off-topic and community chat",
    color: "#B85C5C",
    members: 567,
  },
] as const;

export type ListingCategory = (typeof LISTING_CATEGORIES)[number]["value"];
export type ListingCondition = (typeof LISTING_CONDITIONS)[number]["value"];
export type ListingSortOption = (typeof LISTING_SORT_OPTIONS)[number]["value"];

// ============================================
// Demo / Placeholder Content
// ============================================

export type DemoSeller = {
  username: string;
  displayName: string;
  rating: number;
  sales: number;
};

export type DemoListing = {
  id: string;
  title: string;
  price: number;
  condition: ListingCondition;
  category: ListingCategory;
  image: string;
  seller: DemoSeller;
  createdAt: string;
};

export const DEMO_LISTINGS: DemoListing[] = [
  {
    id: "demo-1",
    title: "Rancilio Silvia Pro X — Dual Boiler",
    price: 89500,
    condition: "excellent",
    category: "espresso_machines",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&h=1000&fit=crop",
    seller: { username: "baristajoe", displayName: "Joe M.", rating: 4.8, sales: 12 },
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "demo-2",
    title: "Niche Zero Grinder — White",
    price: 54900,
    condition: "like_new",
    category: "grinders",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=1000&fit=crop",
    seller: { username: "coffeenerd", displayName: "Alex R.", rating: 5.0, sales: 8 },
    createdAt: "2026-04-12T14:00:00Z",
  },
  {
    id: "demo-3",
    title: "Fellow Stagg EKG Electric Kettle",
    price: 11900,
    condition: "good",
    category: "kettles",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop",
    seller: { username: "pourover_pro", displayName: "Sam T.", rating: 4.5, sales: 3 },
    createdAt: "2026-04-14T09:00:00Z",
  },
  {
    id: "demo-4",
    title: "Acaia Lunar Scale — Black",
    price: 18500,
    condition: "excellent",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop",
    seller: { username: "precisionbrew", displayName: "Dana K.", rating: 4.9, sales: 21 },
    createdAt: "2026-04-15T11:00:00Z",
  },
  {
    id: "demo-5",
    title: "Misono UX10 Gyutou 240mm",
    price: 24500,
    condition: "like_new",
    category: "knives",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&h=1000&fit=crop",
    seller: { username: "sharpchef", displayName: "Marcus T.", rating: 5.0, sales: 15 },
    createdAt: "2026-04-16T08:00:00Z",
  },
  {
    id: "demo-6",
    title: "Mauviel M'150s Copper Saucepan 1.9qt",
    price: 19900,
    condition: "good",
    category: "cookware",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop",
    seller: { username: "copperkitchen", displayName: "Sarah K.", rating: 4.7, sales: 9 },
    createdAt: "2026-04-17T16:00:00Z",
  },
  {
    id: "demo-7",
    title: "Emile Henry Bread Cloche — Burgundy",
    price: 6500,
    condition: "new",
    category: "bakeware",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=1000&fit=crop",
    seller: { username: "sourdoughlife", displayName: "Devon R.", rating: 4.6, sales: 5 },
    createdAt: "2026-04-18T12:00:00Z",
  },
  {
    id: "demo-8",
    title: "KitchenAid Pro 600 Stand Mixer — Silver",
    price: 32000,
    condition: "excellent",
    category: "kitchen_tools",
    image: "https://images.unsplash.com/photo-1574269909862-7e3d7bc38e4b?w=800&h=1000&fit=crop",
    seller: { username: "bakerboss", displayName: "Lin W.", rating: 4.8, sales: 7 },
    createdAt: "2026-04-18T15:00:00Z",
  },
  {
    id: "demo-9",
    title: "La Marzocco Linea Mini — Stainless",
    price: 345000,
    condition: "like_new",
    category: "espresso_machines",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=1000&fit=crop",
    seller: { username: "espressolab", displayName: "Chris P.", rating: 5.0, sales: 31 },
    createdAt: "2026-04-19T10:00:00Z",
  },
];

export const HERO_IMAGES = {
  main: "/images/hero.jpg",
  espresso: "/images/espresso.jpg",
  grinders: "/images/grinders.jpg",
  knives: "/images/knives.jpg",
  cookware: "/images/cookware.jpg",
};

export const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Home Barista",
    quote: "Sold my Silvia in 48 hours. The community here knows what they're looking at — no lowball offers, just fair deals.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Line Cook",
    quote: "Found a Misono UX10 for half retail. Seller had detailed photos of the edge. This is how buying used gear should work.",
    rating: 5,
  },
  {
    name: "Devon R.",
    role: "Cafe Owner",
    quote: "We've outfitted our entire bar with second-hand gear from Ostenna. Zero fees means we saved thousands.",
    rating: 5,
  },
];
