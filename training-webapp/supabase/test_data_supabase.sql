-- Test Data for Training Webapp - Supabase SQL Editor Version
-- This file creates realistic test data for all features
-- Run this AFTER you've run the schema migrations and created a user account

-- INSTRUCTIONS:
-- 1. Find your user ID by running: SELECT id, email FROM auth.users;
-- 2. Copy your user ID
-- 3. Use Find & Replace (Cmd/Ctrl + F) to replace '04f71748-1b99-43ac-832a-197659042a52' with your actual ID
-- 4. Run this entire script in the Supabase SQL Editor

-- ============================================
-- TRAINING CYCLES
-- ============================================

-- Macro Cycle (16 weeks)
INSERT INTO training_cycles (user_id, type, name, phase, start_date, end_date, goal) VALUES
('04f71748-1b99-43ac-832a-197659042a52', 'macro', 'Spring Training Season 2025', 'build', '2025-01-01', '2025-04-30', 'Build aerobic base and prepare for summer racing season. Focus on consistency and gradual volume increase.');

-- Meso Cycles (3 within the macro)
INSERT INTO training_cycles (user_id, type, name, phase, start_date, end_date, goal) VALUES
('04f71748-1b99-43ac-832a-197659042a52', 'meso', 'Base Building - Phase 1', 'base', '2025-01-01', '2025-01-21', 'Establish aerobic foundation with high volume, low intensity training'),
('04f71748-1b99-43ac-832a-197659042a52', 'meso', 'Base Building - Phase 2', 'base', '2025-01-22', '2025-02-11', 'Continue base work with slight intensity increase'),
('04f71748-1b99-43ac-832a-197659042a52', 'meso', 'Build Phase - Intensity Introduction', 'build', '2025-02-12', '2025-03-04', 'Introduce tempo and threshold work while maintaining volume'),
('04f71748-1b99-43ac-832a-197659042a52', 'meso', 'Current Build Block', 'build', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '14 days', 'Progressive overload with 2 quality sessions per week');

-- Micro Cycles (current week)
INSERT INTO training_cycles (user_id, type, name, phase, start_date, end_date, goal) VALUES
('04f71748-1b99-43ac-832a-197659042a52', 'micro', 'Week 1 - Easy Volume', 'base', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE - INTERVAL '1 day', 'Recovery week with easy efforts'),
('04f71748-1b99-43ac-832a-197659042a52', 'micro', 'Week 2 - Quality Build', 'build', CURRENT_DATE, CURRENT_DATE + INTERVAL '6 days', 'Two quality sessions with adequate recovery');

-- ============================================
-- WORKOUTS - PAST 3 WEEKS
-- ============================================

-- Week 1 (3 weeks ago) - Mixed training
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Monday: Swim
('04f71748-1b99-43ac-832a-197659042a52', 'swim', CURRENT_DATE - INTERVAL '21 days', 60, 3.0,
'{"pace": 1.8, "avg_heart_rate": 142, "max_heart_rate": 165, "tss": 65}', true, false),

-- Tuesday: Gym
('04f71748-1b99-43ac-832a-197659042a52', 'gym', CURRENT_DATE - INTERVAL '20 days', 75, NULL,
'{"exercises": [
  {"name": "Squats", "sets": 4, "reps": 8, "weight": 80},
  {"name": "Bench Press", "sets": 4, "reps": 8, "weight": 70},
  {"name": "Deadlifts", "sets": 3, "reps": 6, "weight": 100},
  {"name": "Pull-ups", "sets": 3, "reps": 10, "weight": 0}
]}', true, false),

-- Wednesday: Bike
('04f71748-1b99-43ac-832a-197659042a52', 'bike', CURRENT_DATE - INTERVAL '19 days', 90, 40.0,
'{"pace": 2.25, "avg_heart_rate": 148, "max_heart_rate": 172, "power": 185, "tss": 82}', true, false),

-- Thursday: Run
('04f71748-1b99-43ac-832a-197659042a52', 'run', CURRENT_DATE - INTERVAL '18 days', 45, 8.0,
'{"pace": 5.6, "avg_heart_rate": 152, "max_heart_rate": 168, "tss": 58}', true, false),

-- Friday: Rest day (no workout)

-- Saturday: Hockey
('04f71748-1b99-43ac-832a-197659042a52', 'hockey', CURRENT_DATE - INTERVAL '16 days', 120, NULL,
'{"field_time": 95, "sprint_count": 18, "drill_types": ["stick work", "passing", "shooting", "game play"]}', true, false),

-- Sunday: Long Run
('04f71748-1b99-43ac-832a-197659042a52', 'run', CURRENT_DATE - INTERVAL '15 days', 105, 18.0,
'{"pace": 6.1, "avg_heart_rate": 145, "max_heart_rate": 162, "tss": 118}', true, false);

-- Week 2 (2 weeks ago) - Building intensity
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Monday: Recovery Swim
('04f71748-1b99-43ac-832a-197659042a52', 'swim', CURRENT_DATE - INTERVAL '14 days', 45, 2.2,
'{"pace": 2.0, "avg_heart_rate": 135, "max_heart_rate": 155, "tss": 42}', true, false),

-- Tuesday: Gym - Strength Focus
('04f71748-1b99-43ac-832a-197659042a52', 'gym', CURRENT_DATE - INTERVAL '13 days', 80, NULL,
'{"exercises": [
  {"name": "Front Squats", "sets": 4, "reps": 6, "weight": 75},
  {"name": "Overhead Press", "sets": 4, "reps": 8, "weight": 50},
  {"name": "Romanian Deadlifts", "sets": 3, "reps": 8, "weight": 90},
  {"name": "Rows", "sets": 3, "reps": 10, "weight": 60}
]}', true, false),

-- Wednesday: Bike - Tempo
('04f71748-1b99-43ac-832a-197659042a52', 'bike', CURRENT_DATE - INTERVAL '12 days', 75, 32.0,
'{"pace": 2.3, "avg_heart_rate": 158, "max_heart_rate": 175, "power": 210, "tss": 95}', true, false),

-- Thursday: Run - Intervals
('04f71748-1b99-43ac-832a-197659042a52', 'run', CURRENT_DATE - INTERVAL '11 days', 50, 9.0,
'{"pace": 5.3, "avg_heart_rate": 165, "max_heart_rate": 182, "tss": 72}', true, false),

-- Friday: Recovery Swim
('04f71748-1b99-43ac-832a-197659042a52', 'swim', CURRENT_DATE - INTERVAL '10 days', 40, 2.0,
'{"pace": 2.1, "avg_heart_rate": 132, "max_heart_rate": 150, "tss": 35}', true, false),

-- Saturday: Long Bike
('04f71748-1b99-43ac-832a-197659042a52', 'bike', CURRENT_DATE - INTERVAL '9 days', 150, 68.0,
'{"pace": 2.2, "avg_heart_rate": 142, "max_heart_rate": 165, "power": 175, "tss": 135}', true, false),

-- Sunday: Easy Run
('04f71748-1b99-43ac-832a-197659042a52', 'run', CURRENT_DATE - INTERVAL '8 days', 50, 9.0,
'{"pace": 6.0, "avg_heart_rate": 140, "max_heart_rate": 158, "tss": 48}', true, false);

-- Week 3 (last week) - Quality work
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Monday: Swim - Quality
('04f71748-1b99-43ac-832a-197659042a52', 'swim', CURRENT_DATE - INTERVAL '7 days', 65, 3.2,
'{"pace": 1.7, "avg_heart_rate": 148, "max_heart_rate": 170, "tss": 78}', true, false),

-- Tuesday: Gym
('04f71748-1b99-43ac-832a-197659042a52', 'gym', CURRENT_DATE - INTERVAL '6 days', 70, NULL,
'{"exercises": [
  {"name": "Back Squats", "sets": 4, "reps": 5, "weight": 85},
  {"name": "Bench Press", "sets": 4, "reps": 6, "weight": 75},
  {"name": "Deadlifts", "sets": 3, "reps": 5, "weight": 105},
  {"name": "Chin-ups", "sets": 3, "reps": 8, "weight": 5}
]}', true, false),

-- Wednesday: Bike - Intervals
('04f71748-1b99-43ac-832a-197659042a52', 'bike', CURRENT_DATE - INTERVAL '5 days', 80, 35.0,
'{"pace": 2.3, "avg_heart_rate": 162, "max_heart_rate": 178, "power": 225, "tss": 102}', true, false),

-- Thursday: Run - Tempo
('04f71748-1b99-43ac-832a-197659042a52', 'run', CURRENT_DATE - INTERVAL '4 days', 55, 10.0,
'{"pace": 5.4, "avg_heart_rate": 160, "max_heart_rate": 175, "tss": 68}', true, false),

-- Friday: Hockey Practice
('04f71748-1b99-43ac-832a-197659042a52', 'hockey', CURRENT_DATE - INTERVAL '3 days', 90, NULL,
'{"field_time": 75, "sprint_count": 12, "drill_types": ["conditioning", "stick work", "passing"]}', true, false),

-- Saturday: Long Swim
('04f71748-1b99-43ac-832a-197659042a52', 'swim', CURRENT_DATE - INTERVAL '2 days', 75, 3.8,
'{"pace": 1.9, "avg_heart_rate": 145, "max_heart_rate": 168, "tss": 85}', true, false);

-- ============================================
-- WORKOUT NOTES - DETAILED REFLECTIONS
-- ============================================

-- We need to get workout IDs first, so we'll insert notes with a subquery
-- Note: This assumes workouts were just inserted above

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  7,
  'Felt strong throughout the swim. Good rhythm and technique focus.',
  'Maintained consistent pace, bilateral breathing felt natural',
  'Could push a bit harder on the main set',
  'Shoulders felt loose, no discomfort',
  'Focused and present. Good mental practice for race day.',
  ARRAY['good session', 'technique', 'strong']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'swim' AND w.date = CURRENT_DATE - INTERVAL '21 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  8,
  'Heavy weights today, felt challenging but manageable.',
  'Hit all prescribed reps, good form on squats',
  'Need to work on pull-up strength',
  'Legs felt heavy afterwards, expected DOMS tomorrow',
  'Good focus during lifts. Mind-muscle connection improving.',
  ARRAY['strength', 'progressive overload', 'quality session']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'gym' AND w.date = CURRENT_DATE - INTERVAL '20 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  6,
  'Nice easy ride, enjoyed being outside.',
  'Maintained power zones well, good cadence',
  'Maybe go a bit longer next time',
  'Legs felt fresh, no fatigue',
  'Relaxed and enjoyed the scenery. Good mental break.',
  ARRAY['easy', 'recovery', 'enjoyed']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'bike' AND w.date = CURRENT_DATE - INTERVAL '19 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  9,
  'Tough run, struggled with pace in the last 2km.',
  'First 6km felt great, good rhythm',
  'Need to work on pacing strategy, went out too fast',
  'Right knee felt a bit tight, should stretch more',
  'Mental toughness was tested. Pushed through the discomfort.',
  ARRAY['struggled', 'pacing issue', 'tough', 'breakthrough']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'run' AND w.date = CURRENT_DATE - INTERVAL '18 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  8,
  'Intense hockey practice with lots of game play.',
  'Stick work was sharp, passing accuracy improved',
  'Need to work on sprint recovery between plays',
  'Lots of leg fatigue, good workout overall',
  'Team chemistry building well. Enjoying the challenge.',
  ARRAY['hockey', 'game play', 'fatigue', 'team']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'hockey' AND w.date = CURRENT_DATE - INTERVAL '16 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  7,
  'Long run went surprisingly well! Felt strong throughout.',
  'Negative split! Last 5km faster than first 5km',
  'Nothing to change, this was a breakthrough run',
  'Legs felt tired but not destroyed. Good energy levels.',
  'This is what all the training is for. Felt confident and strong.',
  ARRAY['long run', 'breakthrough', 'strong', 'negative split', 'endurance']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'run' AND w.date = CURRENT_DATE - INTERVAL '15 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  8,
  'Tempo bike ride was tough but completed all intervals.',
  'Power targets hit consistently, good pacing',
  'Could improve cadence on the climbs',
  'Quads burning during intervals, but recovered well',
  'Intervals are getting easier mentally. Building confidence.',
  ARRAY['tempo', 'intervals', 'quality session', 'power']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'bike' AND w.date = CURRENT_DATE - INTERVAL '12 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  9,
  'Interval session was brutal. Legs still tired from yesterday.',
  'Hit all interval paces but recovery felt short',
  'Need a recovery day tomorrow, feeling fatigued',
  'Heavy legs, elevated HR throughout. Signs of fatigue accumulation.',
  'Pushed through but definitely feeling the training load.',
  ARRAY['intervals', 'struggled', 'fatigue', 'tired', 'overreaching']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'run' AND w.date = CURRENT_DATE - INTERVAL '11 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  5,
  'Perfect recovery ride. Beautiful day, legs felt great.',
  'Just what I needed after yesterday. Stayed in zone 1-2 entire time.',
  'Nothing - this was exactly what was needed',
  'Legs feel fresh and recovered. HRV should bounce back.',
  'Patience and discipline to keep it easy. Important lesson.',
  ARRAY['recovery', 'easy', 'fresh', 'long ride', 'enjoyed']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'bike' AND w.date = CURRENT_DATE - INTERVAL '9 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  '04f71748-1b99-43ac-832a-197659042a52',
  w.id,
  8,
  'Quality swim session with hard main set.',
  'Best pace this year! Technique improvements paying off',
  'Could extend the main set duration next time',
  'Shoulders and lats properly fatigued. Good training stress.',
  'Feeling confident in the water. Race fitness building.',
  ARRAY['quality session', 'best pace', 'breakthrough', 'race prep']
FROM workouts w
WHERE w.user_id = '04f71748-1b99-43ac-832a-197659042a52' AND w.sport_type = 'swim' AND w.date = CURRENT_DATE - INTERVAL '7 days';

-- ============================================
-- METRICS - DAILY TRACKING (PAST 25 DAYS)
-- ============================================

-- Generate realistic metrics with some variation
INSERT INTO metrics (user_id, date, hrv, resting_heart_rate, sleep_hours, sleep_quality, weight, stress_level, readiness) VALUES
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '24 days', 68, 54, 7.5, 8, 72.8, 3, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '23 days', 66, 55, 7.0, 7, 72.9, 4, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '22 days', 64, 57, 6.5, 6, 73.0, 5, 6),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '21 days', 62, 58, 7.0, 7, 72.7, 4, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '20 days', 63, 57, 7.5, 8, 72.6, 3, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '19 days', 65, 56, 7.0, 7, 72.5, 3, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '18 days', 67, 55, 8.0, 9, 72.4, 2, 9),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '17 days', 69, 54, 7.5, 8, 72.3, 2, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '16 days', 68, 54, 7.0, 7, 72.2, 3, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '15 days', 66, 55, 6.5, 6, 72.4, 4, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '14 days', 64, 56, 7.0, 7, 72.5, 4, 6),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '13 days', 62, 58, 7.5, 7, 72.6, 5, 6),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '12 days', 60, 59, 6.5, 6, 72.7, 6, 5),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '11 days', 58, 59, 6.0, 5, 72.8, 6, 5),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '10 days', 59, 58, 7.0, 6, 72.6, 5, 5),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '9 days', 61, 57, 7.5, 7, 72.5, 4, 6),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '8 days', 64, 56, 8.0, 8, 72.4, 3, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '7 days', 66, 55, 7.5, 8, 72.3, 3, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '6 days', 67, 54, 7.0, 7, 72.2, 3, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '5 days', 65, 55, 7.0, 7, 72.4, 4, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '4 days', 63, 56, 6.5, 6, 72.5, 5, 6),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '3 days', 64, 56, 7.0, 7, 72.4, 4, 7),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '2 days', 66, 55, 7.5, 8, 72.3, 3, 8),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE - INTERVAL '1 day', 68, 54, 8.0, 9, 72.2, 2, 9),
('04f71748-1b99-43ac-832a-197659042a52', CURRENT_DATE, 71, 52, 8.0, 9, 72.1, 2, 9);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Test data loaded successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '  - 6 training cycles (2 macro, 4 meso, 2 micro)';
  RAISE NOTICE '  - 18 workouts across all sports';
  RAISE NOTICE '  - 10 detailed workout notes';
  RAISE NOTICE '  - 25 days of HRV/metrics data';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Your Training Webapp is now populated with realistic data!';
  RAISE NOTICE 'Visit your dashboard to explore the features.';
END $$;
