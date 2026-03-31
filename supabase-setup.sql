-- VDOT Coach Tool — Supabase tabellen
-- Plak dit in de Supabase SQL Editor en klik "Run"

CREATE TABLE athletes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
  test_date DATE NOT NULL,
  distance_meters INTEGER NOT NULL,
  time_minutes DECIMAL(10,4) NOT NULL,
  vdot DECIMAL(6,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index voor snelle opzoekingen per atleet
CREATE INDEX idx_test_results_athlete ON test_results(athlete_id);
CREATE INDEX idx_test_results_date ON test_results(athlete_id, test_date DESC);
