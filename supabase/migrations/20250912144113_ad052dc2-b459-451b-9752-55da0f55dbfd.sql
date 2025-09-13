-- Update existing listings from 'homemade' to 'handmade'
UPDATE public.listings 
SET listing_type = 'handmade' 
WHERE listing_type = 'homemade';