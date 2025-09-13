-- Insert sample marketplace data for testing with correct condition values

-- First, let's add some sample categories
INSERT INTO marketplace_categories (name, icon_url, sustainability_focus) VALUES
('Electronics', '📱', true),
('Furniture', '🪑', true),
('Clothing', '👕', true),
('Books & Media', '📚', false),
('Kitchen & Home', '🏠', true),
('Garden & Plants', '🌱', true);

-- Add sample vendors (sustainable brands)
INSERT INTO marketplace_vendors (business_name, email, phone, address, is_verified, is_active, sustainability_score, certifications) VALUES
('EcoTech Solutions', 'info@ecotech.com', '+91-9876543210', 'Green Valley, Bangalore', true, true, 9.2, '["Carbon Neutral", "Fair Trade", "B-Corp"]'),
('Sustainable Living Co', 'hello@sustainableliving.in', '+91-9876543211', 'Eco Park, Mumbai', true, true, 8.7, '["Organic Certified", "Zero Waste"]'),
('Green Furniture Works', 'contact@greenfurniture.com', '+91-9876543212', 'Timber Lane, Delhi', true, true, 8.9, '["FSC Certified", "Recycled Materials"]'),
('Local Artisan Collective', 'artisans@local.co.in', '+91-9876543213', 'Craft Corner, Pune', true, true, 9.5, '["Fair Trade", "Handmade", "Local Sourcing"]');

-- Add sample products with correct condition values (new, used, refurbished)
INSERT INTO marketplace_products (name, description, price_inr, vendor_id, category_id, condition, is_eco_friendly, is_second_hand, sustainability_score, carbon_footprint, stock_quantity, images) VALUES
('Vintage Wooden Bookshelf', 'Beautiful teak wood bookshelf in excellent condition. Perfect for any home library.', 3500, 3, 2, 'used', true, true, 8.5, 2.3, 1, '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"]'),
('Refurbished Laptop - Dell XPS', 'Professionally refurbished laptop with new SSD and battery. Great for students and professionals.', 25000, 1, 1, 'refurbished', true, true, 7.8, 45.2, 3, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"]'),
('Handwoven Cotton Kurta', 'Organic cotton kurta handwoven by local artisans. Comfortable and sustainable fashion choice.', 1200, 4, 3, 'new', true, false, 9.2, 0.8, 15, '["https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400"]'),
('Bamboo Dining Table', 'Eco-friendly bamboo dining table seats 4 people. Lightweight yet durable construction.', 8500, 3, 2, 'new', true, false, 9.1, 12.5, 2, '["https://images.unsplash.com/photo-1549497538-303791108f95?w=400"]'),
('Second-hand iPhone 12', 'Well-maintained iPhone 12 with original box and accessories. Battery health 89%.', 35000, 1, 1, 'used', true, true, 6.5, 78.3, 1, '["https://images.unsplash.com/photo-1592910147811-e52f7915bb3f?w=400"]'),
('Upcycled Denim Jacket', 'Vintage denim jacket upcycled with sustainable patches and organic thread.', 2200, 4, 3, 'refurbished', true, true, 8.7, 1.2, 8, '["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"]'),
('Solar-Powered Garden Lights', 'Set of 6 solar garden lights made from recycled materials. Weather-resistant and bright.', 1800, 2, 6, 'new', true, false, 9.4, 3.2, 20, '["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400"]'),
('Reclaimed Wood Coffee Table', 'Beautiful coffee table made from reclaimed teak wood. Each piece has unique character.', 6500, 3, 2, 'new', true, false, 8.8, 8.7, 3, '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"]'),
('Organic Cotton Bed Sheets', 'Soft organic cotton bed sheets in natural colors. GOTS certified and fair trade.', 2800, 2, 5, 'new', true, false, 9.0, 2.1, 12, '["https://images.unsplash.com/photo-1586047844026-d1b61b8c6c4c?w=400"]'),
('Vintage Ceramic Planters', 'Set of 3 vintage ceramic planters in excellent condition. Perfect for indoor plants.', 1500, 4, 6, 'used', true, true, 8.0, 1.8, 5, '["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"]');