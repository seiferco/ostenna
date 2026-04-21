"use server";

import { createClient } from "@/lib/supabase/server";

async function getAuthUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, userId: user.id };
}

export async function updateIntent(intent: "buy" | "sell" | "both") {
  const { supabase, userId } = await getAuthUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ intent })
    .eq("id", userId);
  if (error) throw new Error("Failed to save intent");
}

export async function updateInterests(interests: string[]) {
  const { supabase, userId } = await getAuthUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ interests })
    .eq("id", userId);
  if (error) throw new Error("Failed to save interests");
}

export async function completeOnboarding() {
  const { supabase, userId } = await getAuthUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", userId);
  if (error) throw new Error("Failed to complete onboarding");
}
