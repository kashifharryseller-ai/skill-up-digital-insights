-- Fix security definer view by making it invoker instead
DROP VIEW IF EXISTS public.platform_stats;

-- Create a simple function to get stats instead (more secure)
CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS TABLE (
  total_scholarships INTEGER,
  total_funding BIGINT,
  countries_covered INTEGER
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    COUNT(*)::INTEGER as total_scholarships,
    COALESCE(SUM(amount), 0)::BIGINT as total_funding,
    COUNT(DISTINCT country)::INTEGER as countries_covered
  FROM public.scholarships;
$$;