-- Enable Row Level Security on all tables
ALTER TABLE training_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Training Cycles Policies
CREATE POLICY "Users can view their own training cycles"
  ON training_cycles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own training cycles"
  ON training_cycles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training cycles"
  ON training_cycles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own training cycles"
  ON training_cycles FOR DELETE
  USING (auth.uid() = user_id);

-- Workouts Policies
CREATE POLICY "Users can view their own workouts"
  ON workouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workouts"
  ON workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts"
  ON workouts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workouts"
  ON workouts FOR DELETE
  USING (auth.uid() = user_id);

-- Workout Notes Policies
CREATE POLICY "Users can view their own workout notes"
  ON workout_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout notes"
  ON workout_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout notes"
  ON workout_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout notes"
  ON workout_notes FOR DELETE
  USING (auth.uid() = user_id);

-- Training Plans Policies
CREATE POLICY "Users can view their own training plans"
  ON training_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own training plans"
  ON training_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training plans"
  ON training_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own training plans"
  ON training_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Metrics Policies
CREATE POLICY "Users can view their own metrics"
  ON metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own metrics"
  ON metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics"
  ON metrics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metrics"
  ON metrics FOR DELETE
  USING (auth.uid() = user_id);

-- Sessions Policies
CREATE POLICY "Users can view their own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON sessions FOR DELETE
  USING (auth.uid() = user_id);
