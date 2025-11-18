-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE sport_type AS ENUM ('swim', 'bike', 'run', 'hockey', 'gym');
CREATE TYPE cycle_type AS ENUM ('macro', 'meso', 'micro');
CREATE TYPE phase_type AS ENUM ('base', 'build', 'peak', 'taper', 'recovery');

-- Training Cycles Table
CREATE TABLE training_cycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type cycle_type NOT NULL,
  name TEXT NOT NULL,
  phase phase_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  goal TEXT,
  parent_cycle_id UUID REFERENCES training_cycles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workouts Table
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sport_type sport_type NOT NULL,
  date DATE NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  distance DECIMAL(10, 2), -- in km
  metrics JSONB, -- flexible metrics storage
  cycle_id UUID REFERENCES training_cycles(id) ON DELETE SET NULL,
  planned BOOLEAN DEFAULT false,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout Notes Table
CREATE TABLE workout_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  rpe INTEGER CHECK (rpe >= 1 AND rpe <= 10), -- Rate of Perceived Exertion
  feeling TEXT,
  what_went_well TEXT,
  what_to_adjust TEXT,
  physical_sensations TEXT,
  mental_notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training Plans Table
CREATE TABLE training_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cycle_id UUID REFERENCES training_cycles(id) ON DELETE SET NULL,
  structure JSONB NOT NULL, -- weekly structure as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Metrics Table (for HRV, heart rate, etc.)
CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  hrv INTEGER,
  resting_heart_rate INTEGER,
  weight DECIMAL(5, 2),
  sleep_hours DECIMAL(3, 1),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  readiness INTEGER CHECK (readiness >= 1 AND readiness <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Sessions Table (planned vs actual)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  planned_workout_id UUID REFERENCES workouts(id) ON DELETE SET NULL,
  actual_workout_id UUID REFERENCES workouts(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_training_cycles_user_id ON training_cycles(user_id);
CREATE INDEX idx_training_cycles_dates ON training_cycles(start_date, end_date);
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_date ON workouts(date);
CREATE INDEX idx_workouts_sport_type ON workouts(sport_type);
CREATE INDEX idx_workout_notes_workout_id ON workout_notes(workout_id);
CREATE INDEX idx_workout_notes_tags ON workout_notes USING gin(tags);
CREATE INDEX idx_metrics_user_date ON metrics(user_id, date);
CREATE INDEX idx_sessions_user_date ON sessions(user_id, date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_training_cycles_updated_at BEFORE UPDATE ON training_cycles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_notes_updated_at BEFORE UPDATE ON workout_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_plans_updated_at BEFORE UPDATE ON training_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metrics_updated_at BEFORE UPDATE ON metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
