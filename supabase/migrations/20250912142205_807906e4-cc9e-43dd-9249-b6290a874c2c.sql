-- Add business_id column to listings table to link products to home businesses
ALTER TABLE public.listings 
ADD COLUMN business_id bigint REFERENCES public.home_businesses(id) ON DELETE SET NULL;

-- Add index for better performance
CREATE INDEX idx_listings_business_id ON public.listings(business_id);

-- Update existing homemade listings to link to the user's first business (if any)
UPDATE public.listings 
SET business_id = (
    SELECT id 
    FROM public.home_businesses 
    WHERE user_id = listings.seller_id 
    LIMIT 1
) 
WHERE listing_type = 'homemade' AND business_id IS NULL;