-- Create table to track free AI searches for users
CREATE TABLE public.ai_search_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tool_type TEXT NOT NULL, -- 'scholarships', 'faculty', 'accreditation', 'reviewer'
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, tool_type) -- Each user gets one free search per tool
);

-- Enable RLS
ALTER TABLE public.ai_search_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view their own usage"
  ON public.ai_search_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own usage (first free search)
CREATE POLICY "Users can insert their own usage"
  ON public.ai_search_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to check if user has used free search for a tool
CREATE OR REPLACE FUNCTION public.has_used_free_search(_user_id UUID, _tool_type TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.ai_search_usage
    WHERE user_id = _user_id
      AND tool_type = _tool_type
  )
$$;