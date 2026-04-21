import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { User, Star, ShoppingBag, Calendar, MapPin, Globe, Shield } from "lucide-react";
import { ProfileAvatar } from "@/components/profile-avatar";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username}`,
    description: `View ${username}'s profile, listings, and feedback on Ostenna.`,
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, price, condition, category, images, created_at")
    .eq("seller_id", profile.id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const { data: feedback } = await supabase
    .from("feedback")
    .select("id, rating, comment, role, created_at, from_user_id")
    .eq("to_user_id", profile.id)
    .order("created_at", { ascending: false });

  const totalReviews = feedback?.length ?? 0;
  const avgRating =
    totalReviews > 0
      ? (feedback!.reduce((sum, f) => sum + f.rating, 0) / totalReviews).toFixed(1)
      : null;

  const reviewerIds = feedback?.map((f) => f.from_user_id) ?? [];
  const { data: reviewers } = reviewerIds.length
    ? await supabase
        .from("profiles")
        .select("id, username, display_name")
        .in("id", reviewerIds)
    : { data: [] };

  const reviewerMap = new Map(reviewers?.map((r) => [r.id, r]) ?? []);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwner = user?.id === profile.id;

  const initials = (profile.display_name ?? profile.username)
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      {/* Cover gradient */}
      <div className="h-32 sm:h-40 bg-gradient-to-r from-patina-verdigris-500 via-patina-verdigris-400 to-patina-espresso" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Avatar overlapping cover */}
        <ProfileAvatar
          isOwner={isOwner}
          avatarUrl={profile.avatar_url}
          name={profile.display_name ?? profile.username}
          initials={initials}
        />

        {/* Name + username */}
        <div className="mt-4 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="font-heading text-2xl text-patina-espresso">
              {profile.display_name ?? profile.username}
            </h1>
            {totalReviews >= 10 && (
              <span title="Trusted member">
                <Shield className="h-5 w-5 text-patina-verdigris-500" />
              </span>
            )}
          </div>
          <p className="text-patina-clay">@{profile.username}</p>
        </div>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 border-b border-patina-sand/50 pb-6 text-sm text-patina-walnut sm:justify-start">
          {avgRating ? (
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-patina-warning text-patina-warning" />
              {avgRating} ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-patina-clay">
              <Star className="h-4 w-4" />
              No ratings yet
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <ShoppingBag className="h-4 w-4 text-patina-clay" />
            {listings?.length ?? 0} listing{(listings?.length ?? 0) !== 1 ? "s" : ""}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4 text-patina-clay" />
            Joined {formatDate(profile.created_at)}
          </span>
          {profile.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 text-patina-clay" />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-patina-verdigris-500 hover:text-patina-verdigris-600"
            >
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
        </div>

        {profile.bio && (
          <p className="mt-4 max-w-lg text-sm text-patina-walnut">{profile.bio}</p>
        )}

        {/* Listings */}
        <div className="mt-8 pb-12">
          <h2 className="font-heading text-xl text-patina-espresso">
            Active Listings
          </h2>
          {listings && listings.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <a
                  key={listing.id}
                  href={`/marketplace/${listing.id}`}
                  className="rounded-xl border border-patina-sand/50 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="font-medium text-patina-espresso">
                    {listing.title}
                  </h3>
                  <p className="mt-1 font-heading text-lg text-patina-verdigris-500">
                    ${(listing.price / 100).toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-patina-clay">
                    {listing.condition.replace("_", " ")} &middot;{" "}
                    {formatDate(listing.created_at)}
                  </p>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-patina-sand/50 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-patina-clay">No active listings</p>
            </div>
          )}

          {/* Feedback */}
          <h2 className="mt-10 font-heading text-xl text-patina-espresso">
            Feedback
          </h2>
          {feedback && feedback.length > 0 ? (
            <div className="mt-4 space-y-4">
              {feedback.map((fb) => {
                const reviewer = reviewerMap.get(fb.from_user_id);
                return (
                  <div
                    key={fb.id}
                    className="rounded-xl border border-patina-sand/50 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= fb.rating
                                  ? "fill-patina-warning text-patina-warning"
                                  : "text-patina-sand"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-patina-clay">
                          as {fb.role}
                        </span>
                      </div>
                      <span className="text-xs text-patina-clay">
                        {formatDate(fb.created_at)}
                      </span>
                    </div>
                    {fb.comment && (
                      <p className="mt-2 text-sm text-patina-walnut">
                        {fb.comment}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-patina-clay">
                      by{" "}
                      <a
                        href={`/u/${reviewer?.username ?? ""}`}
                        className="text-patina-verdigris-500 hover:text-patina-verdigris-600"
                      >
                        @{reviewer?.username ?? "unknown"}
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-patina-sand/50 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-patina-clay">No feedback yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
