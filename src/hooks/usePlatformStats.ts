import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlatformStats {
  totalScholarships: number;
  totalFunding: number;
  countriesCovered: number;
}

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: async (): Promise<PlatformStats> => {
      const { data, error } = await supabase.rpc("get_platform_stats");

      if (error) {
        console.error("Error fetching stats:", error);
        // Return fallback values
        return {
          totalScholarships: 0,
          totalFunding: 0,
          countriesCovered: 0,
        };
      }

      const stats = data?.[0];
      return {
        totalScholarships: stats?.total_scholarships ?? 0,
        totalFunding: stats?.total_funding ?? 0,
        countriesCovered: stats?.countries_covered ?? 0,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
