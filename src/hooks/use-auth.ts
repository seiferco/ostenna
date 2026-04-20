"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabaseRef = useRef(createClient());

  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    try {
      const { data } = await supabaseRef.current
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      return data as Profile | null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const supabase = supabaseRef.current;
    let mounted = true;

    const timeout = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 3000);

    // Use getUser() to verify with Supabase server, not just local JWT
    supabase.auth.getUser().then(async ({ data: { user: verifiedUser }, error }) => {
      if (!mounted) return;

      // If the user was deleted server-side, clear the stale session
      if (error || !verifiedUser) {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setUser(verifiedUser);
      const p = await fetchProfile(verifiedUser.id);
      if (mounted) setProfile(p);
      if (mounted) setIsLoading(false);
    }).catch(async () => {
      if (!mounted) return;
      await supabaseRef.current.auth.signOut();
      setUser(null);
      setProfile(null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const p = await fetchProfile(currentUser.id);
        if (mounted) setProfile(p);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    await supabaseRef.current.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  return { user, profile, isLoading, signOut };
}
