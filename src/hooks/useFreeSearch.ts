import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type ToolType = "scholarships" | "faculty" | "accreditation" | "reviewer";

interface FreeSearchState {
  hasUsedFreeSearch: boolean;
  isLoading: boolean;
  canUseFreeTrial: boolean;
}

export function useFreeSearch(toolType: ToolType) {
  const { user, isPremium } = useAuth();
  const [state, setState] = useState<FreeSearchState>({
    hasUsedFreeSearch: false,
    isLoading: true,
    canUseFreeTrial: false,
  });

  // Check if user has used their free search for this tool
  const checkFreeSearchUsage = useCallback(async () => {
    if (!user) {
      setState({
        hasUsedFreeSearch: false,
        isLoading: false,
        canUseFreeTrial: false,
      });
      return;
    }

    // Premium users don't need free trial
    if (isPremium) {
      setState({
        hasUsedFreeSearch: false,
        isLoading: false,
        canUseFreeTrial: true, // They have full access
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("ai_search_usage")
        .select("id")
        .eq("user_id", user.id)
        .eq("tool_type", toolType)
        .maybeSingle();

      if (error) {
        console.error("Error checking free search usage:", error);
        setState({
          hasUsedFreeSearch: false,
          isLoading: false,
          canUseFreeTrial: true, // Allow on error to not block users
        });
        return;
      }

      const hasUsed = !!data;
      setState({
        hasUsedFreeSearch: hasUsed,
        isLoading: false,
        canUseFreeTrial: !hasUsed,
      });
    } catch (err) {
      console.error("Error in checkFreeSearchUsage:", err);
      setState({
        hasUsedFreeSearch: false,
        isLoading: false,
        canUseFreeTrial: true,
      });
    }
  }, [user, isPremium, toolType]);

  // Record that user has used their free search
  const recordFreeSearchUsage = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    if (isPremium) return true; // Premium users don't consume free searches

    try {
      const { error } = await supabase.from("ai_search_usage").insert({
        user_id: user.id,
        tool_type: toolType,
      });

      if (error) {
        // If it's a unique constraint violation, they've already used it
        if (error.code === "23505") {
          setState((prev) => ({
            ...prev,
            hasUsedFreeSearch: true,
            canUseFreeTrial: false,
          }));
          return false;
        }
        console.error("Error recording free search usage:", error);
        return true; // Don't block on other errors
      }

      setState((prev) => ({
        ...prev,
        hasUsedFreeSearch: true,
        canUseFreeTrial: false,
      }));
      return true;
    } catch (err) {
      console.error("Error in recordFreeSearchUsage:", err);
      return true;
    }
  }, [user, isPremium, toolType]);

  useEffect(() => {
    checkFreeSearchUsage();
  }, [checkFreeSearchUsage]);

  return {
    ...state,
    recordFreeSearchUsage,
    refreshUsage: checkFreeSearchUsage,
  };
}
