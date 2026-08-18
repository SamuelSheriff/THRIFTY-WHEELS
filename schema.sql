-- ═══════════════════════════════════════════════════════════════
-- 3FTYWHLS — Neon Serverless PostgreSQL Database Schema
-- Paste this script into your Neon Console SQL Editor (https://console.neon.tech)
-- ═══════════════════════════════════════════════════════════════

-- 1. Create Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  price TEXT NOT NULL,
  price_num BIGINT NOT NULL DEFAULT 0,
  negotiable BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available', -- 'available' | 'reserved' | 'sold'
  tags TEXT[],
  specs JSONB DEFAULT '[]'::jsonb,
  features TEXT[],
  location TEXT DEFAULT 'Nairobi',
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Index for faster queries
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_price_num ON vehicles(price_num);

-- 3. Seed Initial Inventory (If Table is Empty)
INSERT INTO vehicles (id, name, subtitle, price, price_num, negotiable, status, tags, specs, features, location, images)
VALUES 
(
  'mercedes-e300',
  '2010 Mercedes Benz E300',
  'Luxury Executive Sedan',
  'KSh 1.9M',
  1900000,
  false,
  'available',
  ARRAY['sedan', 'luxury'],
  '[{"label":"Engine","value":"3.0L V6 CGI N/A"},{"label":"Horsepower","value":"231 HP"},{"label":"Gearbox","value":"7G-Tronic Auto"},{"label":"Year","value":"2010"},{"label":"Fuel","value":"Petrol"}]'::jsonb,
  ARRAY['Electric Seats', 'Sunroof', 'Dual Climate Control'],
  'Nairobi',
  ARRAY[
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.44 PM.jpeg',
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.45 PM.jpeg',
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.48 PM.jpeg',
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.49 PM.jpeg',
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.51 PM.jpeg',
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.58 PM.jpeg',
    '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.11.03 PM.jpeg'
  ]
),
(
  'bmw-x1',
  '2016 BMW X1',
  'Compact Luxury SUV — New Shape',
  'KSh 2.08M',
  2080000,
  false,
  'available',
  ARRAY['suv', 'luxury'],
  '[{"label":"Engine","value":"1500cc Petrol"},{"label":"Drive Type","value":"All-Wheel Drive"},{"label":"Turbo","value":"Twin Turbo"},{"label":"Year","value":"2016"}]'::jsonb,
  ARRAY['Twin Turbo', 'Si Drive Mode', 'New Shape'],
  'Nairobi',
  ARRAY[
    '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.18 PM.jpeg',
    '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.25 PM.jpeg',
    '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.27 PM.jpeg',
    '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.28 PM.jpeg',
    '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.29 PM.jpeg',
    '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.30 PM.jpeg'
  ]
),
(
  'honda-insight',
  'Honda Insight Hybrid',
  'Fuel-Efficient Hybrid — Fully Black',
  'KSh 750K',
  750000,
  true,
  'available',
  ARRAY['sedan', 'hybrid'],
  '[{"label":"Engine","value":"1300cc Hybrid"},{"label":"Drive Type","value":"2WD"},{"label":"Year","value":"2012"},{"label":"Fuel","value":"Hybrid"}]'::jsonb,
  ARRAY['Hybrid Engine', 'Full Black Interior', 'Eco Drive Mode'],
  'Nairobi',
  ARRAY[
    'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.46 PM.jpeg',
    'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.47 PM.jpeg',
    'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.48 PM.jpeg',
    'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.49 PM.jpeg',
    'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.50 PM.jpeg'
  ]
),
(
  'hyundai-santafe',
  'Hyundai Santa Fe',
  '7-Seater Family SUV — Local 2015',
  'KSh 2.4M',
  2400000,
  true,
  'available',
  ARRAY['suv'],
  '[{"label":"Engine","value":"2000cc Petrol"},{"label":"Drive Type","value":"4WD (opt)"},{"label":"Seats","value":"7 Seater"},{"label":"Year","value":"2015 Local"}]'::jsonb,
  ARRAY['Panoramic Sunroof', '4WD Option', '7 Seater', 'Local 2015'],
  'Nairobi',
  ARRAY[
    'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.02 PM.jpeg',
    'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.08 PM.jpeg',
    'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.18 PM.jpeg',
    'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.29 PM.jpeg',
    'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.34 PM.jpeg'
  ]
),
(
  'landrover-discovery',
  'Land Rover Discovery IV XS',
  'SDV6 Turbo Diesel — Duty Paid · Clean Logbook',
  'KSh 4.5M',
  4500000,
  false,
  'available',
  ARRAY['suv', 'luxury'],
  '[{"label":"Engine","value":"2993cc Turbo Diesel"},{"label":"Gearbox","value":"Automatic"},{"label":"Seats","value":"7 Seater"},{"label":"Year","value":"2016"}]'::jsonb,
  ARRAY['Turbo Diesel', '7 Seater', 'Duty Paid', 'Clean Logbook', 'Santorini Black'],
  'Nairobi',
  ARRAY[
    'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.07 PM.jpeg',
    'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.10 PM.jpeg',
    'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.14 PM.jpeg',
    'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.20 PM.jpeg',
    'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.29 PM.jpeg'
  ]
),
(
  'toyota-vanguard',
  '2009 Toyota Vanguard',
  '7-Seater Utility SUV — Sunroof & Heated Seats',
  'KSh 1.15M',
  1150000,
  true,
  'available',
  ARRAY['suv'],
  '[{"label":"Engine","value":"2500cc Petrol"},{"label":"Seats","value":"7 Seater"},{"label":"Year","value":"2009"},{"label":"Sunroof","value":"Sunroof"}]'::jsonb,
  ARRAY['7 Seater', 'Sunroof', 'Electric Heated Seats', '2500cc Engine'],
  'Nairobi',
  ARRAY[
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.50 PM.jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.50 PM (1).jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.51 PM.jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.51 PM (1).jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.51 PM (2).jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.52 PM.jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.52 PM (1).jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.53 PM.jpeg',
    'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.55 PM.jpeg'
  ]
)
ON CONFLICT (id) DO NOTHING;
