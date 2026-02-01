-- Add SELECT policy to prevent public reads of subscriber emails
CREATE POLICY "Subscriber emails are private"
ON public.newsletter_subscribers
FOR SELECT
USING (false);

-- Add UPDATE policy to prevent modifications
CREATE POLICY "Subscribers cannot be updated"
ON public.newsletter_subscribers
FOR UPDATE
USING (false);

-- Add DELETE policy to prevent deletions
CREATE POLICY "Subscribers cannot be deleted"
ON public.newsletter_subscribers
FOR DELETE
USING (false);