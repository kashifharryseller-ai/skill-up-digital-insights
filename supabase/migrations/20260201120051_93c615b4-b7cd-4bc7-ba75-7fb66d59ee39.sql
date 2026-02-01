-- Add subscription tier enum
CREATE TYPE public.subscription_tier AS ENUM ('free', 'premium', 'enterprise');

-- Add subscription columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN subscription_tier subscription_tier NOT NULL DEFAULT 'free',
ADD COLUMN subscription_approved_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN subscription_approved_by UUID DEFAULT NULL;

-- Comment for clarity
COMMENT ON COLUMN public.profiles.subscription_tier IS 'User subscription plan';
COMMENT ON COLUMN public.profiles.subscription_approved_at IS 'When admin approved the subscription';
COMMENT ON COLUMN public.profiles.subscription_approved_by IS 'Admin user who approved the subscription';

-- Create function to check if user has approved premium access
CREATE OR REPLACE FUNCTION public.has_premium_access(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND subscription_tier IN ('premium', 'enterprise')
      AND subscription_approved_at IS NOT NULL
  )
$$;