# Patina — Build Plan

## Phase 1: Foundation
- [x] Scaffold Next.js project
- [x] Install dependencies
- [x] Configure Tailwind with Patina theme (colors, fonts)
- [x] Build UI primitives (Button, Input, Card, Badge, Avatar, etc.)
- [x] Build layout components (Navbar, Footer, route group layouts)
- [x] Build motion wrappers (FadeIn, StaggerChildren, PageTransition)
- [x] Create landing page

## Phase 2: Database & Auth
- [x] Create Supabase migration (all tables, RLS, triggers)
- [x] Set up Supabase client utilities
- [x] Set up proxy for auth (middleware → proxy.ts for Next.js 16)
- [x] Build login/register pages
- [ ] Wire auth state into Navbar
- [ ] Run migration on Supabase

## Phase 3: Marketplace
- [ ] Build ImageUpload component
- [ ] Build ListingForm with validation
- [ ] Build ListingCard, ListingGrid
- [ ] Build marketplace browse page with filters/search
- [ ] Build listing detail page
- [ ] Mark as sold functionality

## Phase 4: User Profiles & Feedback
- [ ] Build user profile page
- [ ] Build FeedbackForm and FeedbackList
- [ ] Show ratings on cards and profiles

## Phase 5: Forums
- [ ] Seed forum categories
- [ ] Build forum pages (categories, threads, posts)
- [ ] Build new thread and reply forms

## Phase 6: Polish
- [ ] Loading states, error boundaries, empty states
- [ ] SEO (sitemap, robots, structured data)
- [ ] Accessibility and mobile polish
