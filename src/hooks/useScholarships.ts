import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Scholarship, ScholarshipFilters } from "@/types/scholarship";

export function useScholarships(filters: ScholarshipFilters) {
  return useQuery({
    queryKey: ["scholarships", filters],
    queryFn: async () => {
      let query = supabase
        .from("scholarships")
        .select("*")
        .order("deadline", { ascending: true });

      if (filters.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,provider.ilike.%${filters.search}%`
        );
      }

      if (filters.fieldOfStudy && filters.fieldOfStudy !== "all") {
        query = query.eq("field_of_study", filters.fieldOfStudy);
      }

      if (filters.educationLevel && filters.educationLevel !== "all") {
        query = query.eq("education_level", filters.educationLevel);
      }

      if (filters.country && filters.country !== "all") {
        query = query.eq("country", filters.country);
      }

      if (filters.minAmount !== null) {
        query = query.gte("amount", filters.minAmount);
      }

      if (filters.maxAmount !== null) {
        query = query.lte("amount", filters.maxAmount);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Scholarship[];
    },
  });
}

export function useScholarshipOptions() {
  return useQuery({
    queryKey: ["scholarship-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scholarships")
        .select("field_of_study, education_level, country");

      if (error) throw error;

      const fields = [...new Set(data.map((s) => s.field_of_study))].sort();
      const levels = [...new Set(data.map((s) => s.education_level))].sort();
      const countries = [...new Set(data.map((s) => s.country))].sort();

      return { fields, levels, countries };
    },
  });
}
