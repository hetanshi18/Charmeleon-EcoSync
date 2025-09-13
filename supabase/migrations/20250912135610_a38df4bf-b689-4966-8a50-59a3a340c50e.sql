-- Create sequence for home_businesses
CREATE SEQUENCE public.home_businesses_id_seq;

-- Create home_businesses table for homemade product sellers
CREATE TABLE public.home_businesses (
  id BIGINT NOT NULL DEFAULT nextval('home_businesses_id_seq'::regclass) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  business_registration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add trigger for updated_at
CREATE TRIGGER update_home_businesses_updated_at
BEFORE UPDATE ON public.home_businesses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();