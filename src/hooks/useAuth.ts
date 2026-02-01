import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type SubscriptionTier = "free" | "premium" | "enterprise";

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  subscription_tier: SubscriptionTier;
  subscription_approved_at: string | null;
  subscription_approved_by: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  isPremium: boolean; // Has approved premium/enterprise access
  subscriptionTier: SubscriptionTier;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    isAdmin: false,
    isPremium: false,
    subscriptionTier: "free",
    isLoading: true,
  });

  const fetchProfile = useCallback(async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    const isAdmin = roles?.some((r) => r.role === "admin") ?? false;
    
    // Check if user has approved premium access
    const isPremium = 
      isAdmin || // Admins always have premium access
      (profile?.subscription_tier !== "free" && 
       profile?.subscription_approved_at !== null);

    const subscriptionTier = (profile?.subscription_tier as SubscriptionTier) || "free";

    return { profile, isAdmin, isPremium, subscriptionTier };
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Use setTimeout to prevent Supabase deadlock
          setTimeout(async () => {
            const { profile, isAdmin, isPremium, subscriptionTier } = await fetchProfile(session.user.id);
            setState({
              user: session.user,
              session,
              profile,
              isAdmin,
              isPremium,
              subscriptionTier,
              isLoading: false,
            });
          }, 0);
        } else {
          setState({
            user: null,
            session: null,
            profile: null,
            isAdmin: false,
            isPremium: false,
            subscriptionTier: "free",
            isLoading: false,
          });
        }
      }
    );

    // Then get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { profile, isAdmin, isPremium, subscriptionTier } = await fetchProfile(session.user.id);
        setState({
          user: session.user,
          session,
          profile,
          isAdmin,
          isPremium,
          subscriptionTier,
          isLoading: false,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: displayName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const refreshProfile = async () => {
    if (state.user) {
      const { profile, isAdmin, isPremium, subscriptionTier } = await fetchProfile(state.user.id);
      setState((prev) => ({
        ...prev,
        profile,
        isAdmin,
        isPremium,
        subscriptionTier,
      }));
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };
}
