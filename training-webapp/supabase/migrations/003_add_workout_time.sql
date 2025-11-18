-- Add time field to workouts table for ordering multiple workouts per day
ALTER TABLE workouts ADD COLUMN workout_time TIME;

-- Create index for better query performance when ordering by date and time
CREATE INDEX idx_workouts_date_time ON workouts(date, workout_time);

-- Add comment to explain the field
COMMENT ON COLUMN workouts.workout_time IS 'Time of day when workout was performed (optional, for ordering multiple workouts per day)';
