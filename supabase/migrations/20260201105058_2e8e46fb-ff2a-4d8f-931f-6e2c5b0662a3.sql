-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert their email)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);

-- Create a view for public stats (scholarship count, total amount)
CREATE OR REPLACE VIEW public.platform_stats AS
SELECT 
  COUNT(*)::INTEGER as total_scholarships,
  COALESCE(SUM(amount), 0)::BIGINT as total_funding,
  COUNT(DISTINCT country)::INTEGER as countries_covered
FROM public.scholarships;