-- Create scholarships table
CREATE TABLE public.scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  deadline DATE NOT NULL,
  eligibility TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  education_level TEXT NOT NULL,
  country TEXT NOT NULL,
  gpa_requirement NUMERIC,
  application_url TEXT,
  provider TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Scholarships are publicly viewable" 
ON public.scholarships 
FOR SELECT 
USING (true);

-- Create indexes for common search fields
CREATE INDEX idx_scholarships_field_of_study ON public.scholarships(field_of_study);
CREATE INDEX idx_scholarships_education_level ON public.scholarships(education_level);
CREATE INDEX idx_scholarships_country ON public.scholarships(country);
CREATE INDEX idx_scholarships_deadline ON public.scholarships(deadline);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_scholarships_updated_at
BEFORE UPDATE ON public.scholarships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();