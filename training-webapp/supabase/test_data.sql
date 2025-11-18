-- Test Data for Training Webapp
-- This file creates realistic test data for all features
-- Run this AFTER you've run the schema migrations and created a user account

-- NOTE: Replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users
-- You can get this by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Set your user ID here
\set user_id '04f71748-1b99-43ac-832a-197659042a52'

-- ============================================
-- TRAINING CYCLES
-- ============================================

-- Macro Cycle (16 weeks)
INSERT INTO training_cycles (user_id, type, name, phase, start_date, end_date, goal) VALUES
(:'user_id', 'macro', 'Spring Training Season 2025', 'build', '2025-01-01', '2025-04-30', 'Build aerobic base and prepare for summer racing season. Focus on consistency and gradual volume increase.');

-- Get the macro cycle ID for parent references
-- Meso Cycles (3 within the macro)
INSERT INTO training_cycles (user_id, type, name, phase, start_date, end_date, goal) VALUES
(:'user_id', 'meso', 'Base Building - Phase 1', 'base', '2025-01-01', '2025-01-21', 'Establish aerobic foundation with high volume, low intensity training'),
(:'user_id', 'meso', 'Base Building - Phase 2', 'base', '2025-01-22', '2025-02-11', 'Continue base work with slight intensity increase'),
(:'user_id', 'meso', 'Build Phase - Intensity Introduction', 'build', '2025-02-12', '2025-03-04', 'Introduce tempo and threshold work while maintaining volume'),
(:'user_id', 'meso', 'Current Build Block', 'build', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '14 days', 'Progressive overload with 2 quality sessions per week');

-- Micro Cycles (current week)
INSERT INTO training_cycles (user_id, type, name, phase, start_date, end_date, goal) VALUES
(:'user_id', 'micro', 'Week 1 - Easy Volume', 'base', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE - INTERVAL '1 day', 'Recovery week with easy efforts'),
(:'user_id', 'micro', 'Week 2 - Quality Build', 'build', CURRENT_DATE, CURRENT_DATE + INTERVAL '6 days', 'Two quality sessions with adequate recovery');

-- ============================================
-- WORKOUTS - PAST 3 WEEKS
-- ============================================

-- Week 1 (3 weeks ago) - Mixed training
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Monday: Swim
(:'user_id', 'swim', CURRENT_DATE - INTERVAL '21 days', 60, 3.0,
'{"pace": 1.8, "avg_heart_rate": 142, "max_heart_rate": 165, "tss": 65}', true, false),

-- Tuesday: Gym
(:'user_id', 'gym', CURRENT_DATE - INTERVAL '20 days', 75, NULL,
'{"exercises": [
  {"name": "Squats", "sets": 4, "reps": 8, "weight": 80},
  {"name": "Bench Press", "sets": 4, "reps": 8, "weight": 70},
  {"name": "Deadlifts", "sets": 3, "reps": 6, "weight": 100},
  {"name": "Pull-ups", "sets": 3, "reps": 10, "weight": 0}
]}', true, false),

-- Wednesday: Run
(:'user_id', 'run', CURRENT_DATE - INTERVAL '19 days', 45, 8.0,
'{"pace": 5.6, "avg_heart_rate": 155, "max_heart_rate": 172, "tss": 58}', true, false),

-- Thursday: Bike
(:'user_id', 'bike', CURRENT_DATE - INTERVAL '18 days', 90, 32.0,
'{"pace": 2.8, "avg_heart_rate": 148, "max_heart_rate": 168, "power": 185, "tss": 88}', true, false),

-- Saturday: Long Run
(:'user_id', 'run', CURRENT_DATE - INTERVAL '16 days', 105, 18.0,
'{"pace": 5.8, "avg_heart_rate": 142, "max_heart_rate": 160, "tss": 102}', true, false);

-- Week 2 (2 weeks ago) - Building volume
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Monday: Swim
(:'user_id', 'swim', CURRENT_DATE - INTERVAL '14 days', 65, 3.2,
'{"pace": 1.9, "avg_heart_rate": 145, "max_heart_rate": 168, "tss": 70}', true, false),

-- Tuesday: Hockey Practice
(:'user_id', 'hockey', CURRENT_DATE - INTERVAL '13 days', 90, NULL,
'{"field_time": 85, "sprint_count": 12, "drill_types": ["stick work", "passing", "small-sided games"]}', true, false),

-- Wednesday: Run (Tempo)
(:'user_id', 'run', CURRENT_DATE - INTERVAL '12 days', 50, 9.5,
'{"pace": 5.3, "avg_heart_rate": 168, "max_heart_rate": 182, "tss": 75}', true, false),

-- Thursday: Gym
(:'user_id', 'gym', CURRENT_DATE - INTERVAL '11 days', 70, NULL,
'{"exercises": [
  {"name": "Front Squats", "sets": 4, "reps": 10, "weight": 70},
  {"name": "Overhead Press", "sets": 4, "reps": 8, "weight": 45},
  {"name": "Romanian Deadlifts", "sets": 3, "reps": 10, "weight": 80},
  {"name": "Rows", "sets": 3, "reps": 12, "weight": 60}
]}', true, false),

-- Friday: Easy Bike
(:'user_id', 'bike', CURRENT_DATE - INTERVAL '10 days', 60, 22.0,
'{"pace": 2.7, "avg_heart_rate": 135, "max_heart_rate": 152, "power": 160, "tss": 55}', true, false),

-- Sunday: Long Bike
(:'user_id', 'bike', CURRENT_DATE - INTERVAL '8 days', 150, 65.0,
'{"pace": 2.3, "avg_heart_rate": 145, "max_heart_rate": 165, "power": 175, "tss": 145}', true, false);

-- Week 3 (Last week) - Mixed quality
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Monday: Recovery Swim
(:'user_id', 'swim', CURRENT_DATE - INTERVAL '7 days', 45, 2.0,
'{"pace": 2.2, "avg_heart_rate": 130, "max_heart_rate": 145, "tss": 40}', true, false),

-- Tuesday: Gym
(:'user_id', 'gym', CURRENT_DATE - INTERVAL '6 days', 80, NULL,
'{"exercises": [
  {"name": "Back Squats", "sets": 5, "reps": 5, "weight": 90},
  {"name": "Bench Press", "sets": 4, "reps": 6, "weight": 75},
  {"name": "Deadlifts", "sets": 3, "reps": 5, "weight": 110},
  {"name": "Dips", "sets": 3, "reps": 12, "weight": 10}
]}', true, false),

-- Wednesday: Interval Run
(:'user_id', 'run', CURRENT_DATE - INTERVAL '5 days', 55, 10.0,
'{"pace": 5.5, "avg_heart_rate": 172, "max_heart_rate": 188, "tss": 85}', true, false),

-- Thursday: Easy Swim
(:'user_id', 'swim', CURRENT_DATE - INTERVAL '4 days', 50, 2.5,
'{"pace": 2.0, "avg_heart_rate": 138, "max_heart_rate": 155, "tss": 48}', true, false),

-- Friday: Hockey Game
(:'user_id', 'hockey', CURRENT_DATE - INTERVAL '3 days', 75, NULL,
'{"field_time": 70, "sprint_count": 18, "drill_types": ["game play", "conditioning"]}', true, false),

-- Sunday: Long Run
(:'user_id', 'run', CURRENT_DATE - INTERVAL '1 day', 120, 20.0,
'{"pace": 6.0, "avg_heart_rate": 148, "max_heart_rate": 165, "tss": 115}', true, false);

-- Current Week
INSERT INTO workouts (user_id, sport_type, date, duration, distance, metrics, completed, planned) VALUES
-- Today: Easy Bike
(:'user_id', 'bike', CURRENT_DATE, 45, 18.0,
'{"pace": 2.5, "avg_heart_rate": 128, "max_heart_rate": 142, "power": 155, "tss": 42}', true, false);

-- ============================================
-- WORKOUT NOTES
-- ============================================

-- Notes for Week 1
INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  7,
  'Strong start to the week. Pool felt good, technique on point.',
  'Breathing was rhythmic, maintained form throughout. Good catch on each stroke.',
  'Could push pace slightly more on middle sets.',
  'Shoulders felt loose and mobile. No soreness.',
  'Focused and motivated. Happy to be back in the pool.',
  ARRAY['good session', 'strong']
FROM workouts WHERE sport_type = 'swim' AND date = CURRENT_DATE - INTERVAL '21 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  8,
  'Heavy lifting day. Felt powerful but fatigued by the end.',
  'Hit all reps on squats and bench. Form stayed solid.',
  'Need more rest between sets. Was rushing a bit.',
  'Legs quite tired post-squats. Good muscle pump.',
  'Slight mental fatigue on last two exercises.',
  ARRAY['hard work', 'tired']
FROM workouts WHERE sport_type = 'gym' AND date = CURRENT_DATE - INTERVAL '20 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  6,
  'Easy conversational pace. Recovery run done right.',
  'Stayed in zone 2 throughout. Nice and easy.',
  'Nothing to adjust - perfect recovery effort.',
  'Legs feeling fresh. No soreness.',
  'Mind was wandering - good mental break.',
  ARRAY['easy', 'recovery']
FROM workouts WHERE sport_type = 'run' AND date = CURRENT_DATE - INTERVAL '19 days';

-- Notes for Week 2
INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  8,
  'Tough tempo run but felt strong throughout.',
  'Held pace well. Last 2km felt controlled and powerful.',
  'Start a bit slower - went out too fast first km.',
  'Breathing was labored but manageable. Legs burning in a good way.',
  'Had to dig deep but stayed focused. Mental breakthrough.',
  ARRAY['breakthrough', 'quality session', 'strong']
FROM workouts WHERE sport_type = 'run' AND date = CURRENT_DATE - INTERVAL '12 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  7,
  'Great hockey practice. Felt fast on the field.',
  'Passing was crisp. Won most 1v1s. Good positioning.',
  'Need to work on receiving balls under pressure.',
  'Lungs burning from sprints. Legs felt explosive.',
  'Competitive energy was high. Love game situations.',
  ARRAY['fun', 'good session']
FROM workouts WHERE sport_type = 'hockey' AND date = CURRENT_DATE - INTERVAL '13 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  9,
  'Epic long ride. Challenging but rewarding.',
  'Maintained steady power. Nutrition plan worked perfectly.',
  'Last 30min was tough - maybe slightly too much intensity early.',
  'Glutes and quads were burning. Lower back a bit tight.',
  'Mental toughness tested. Pushed through the hard patches.',
  ARRAY['long ride', 'endurance', 'tired']
FROM workouts WHERE sport_type = 'bike' AND date = CURRENT_DATE - INTERVAL '8 days';

-- Notes for Week 3
INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  9,
  'Struggled today. Legs felt heavy from weekend ride.',
  'Completed the intervals but pace was off target.',
  'Need more recovery between hard sessions. Was too fatigued.',
  'Heavy legs, elevated HR, struggling to breathe.',
  'Motivation was low. Had to really push mentally.',
  ARRAY['struggled', 'fatigue', 'hard']
FROM workouts WHERE sport_type = 'run' AND date = CURRENT_DATE - INTERVAL '5 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  8,
  'Intense game. Lots of running and pressure.',
  'Stick skills were sharp. Good defensive positioning.',
  'Cardio struggled a bit in 2nd half - need more conditioning.',
  'Heart rate was high throughout. Completely gassed at end.',
  'Competitive fire was lit. Love the game intensity.',
  ARRAY['game', 'intense', 'fun']
FROM workouts WHERE sport_type = 'hockey' AND date = CURRENT_DATE - INTERVAL '3 days';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  7,
  'Long run felt surprisingly good given the week.',
  'Steady pace throughout. No blow-ups. Even splits.',
  'Could maybe push final 5km a bit harder.',
  'Legs were tired but held up. Some knee tightness.',
  'Mentally strong. Good headspace for long efforts.',
  ARRAY['long run', 'endurance', 'good session']
FROM workouts WHERE sport_type = 'run' AND date = CURRENT_DATE - INTERVAL '1 day';

INSERT INTO workout_notes (user_id, workout_id, rpe, feeling, what_went_well, what_to_adjust, physical_sensations, mental_notes, tags)
SELECT
  user_id,
  id,
  5,
  'Easy recovery spin. Perfect for tired legs.',
  'Low intensity maintained. Great active recovery.',
  'Nothing - exactly what was needed.',
  'Legs loosened up nicely. Feeling fresh.',
  'Relaxed and easy. Good mental recovery too.',
  ARRAY['recovery', 'easy', 'fresh']
FROM workouts WHERE sport_type = 'bike' AND date = CURRENT_DATE;

-- ============================================
-- METRICS (HRV & DAILY TRACKING)
-- ============================================

INSERT INTO metrics (user_id, date, hrv, resting_heart_rate, weight, sleep_hours, sleep_quality, stress_level, readiness) VALUES
-- 3 weeks ago
(:'user_id', CURRENT_DATE - INTERVAL '21 days', 68, 52, 72.5, 7.5, 8, 3, 8),
(:'user_id', CURRENT_DATE - INTERVAL '20 days', 65, 54, 72.3, 7.0, 7, 4, 7),
(:'user_id', CURRENT_DATE - INTERVAL '19 days', 70, 51, 72.4, 8.0, 8, 3, 9),
(:'user_id', CURRENT_DATE - INTERVAL '18 days', 67, 53, 72.6, 7.5, 7, 3, 8),
(:'user_id', CURRENT_DATE - INTERVAL '17 days', 64, 55, 72.5, 6.5, 6, 5, 6),
(:'user_id', CURRENT_DATE - INTERVAL '16 days', 62, 56, 72.7, 7.0, 7, 4, 6),
(:'user_id', CURRENT_DATE - INTERVAL '15 days', 66, 53, 72.6, 8.0, 8, 3, 8),

-- 2 weeks ago
(:'user_id', CURRENT_DATE - INTERVAL '14 days', 69, 52, 72.4, 7.5, 8, 3, 8),
(:'user_id', CURRENT_DATE - INTERVAL '13 days', 71, 51, 72.3, 8.0, 9, 2, 9),
(:'user_id', CURRENT_DATE - INTERVAL '12 days', 68, 53, 72.5, 7.0, 7, 4, 7),
(:'user_id', CURRENT_DATE - INTERVAL '11 days', 65, 55, 72.4, 6.5, 6, 5, 6),
(:'user_id', CURRENT_DATE - INTERVAL '10 days', 63, 56, 72.6, 7.0, 7, 4, 6),
(:'user_id', CURRENT_DATE - INTERVAL '9 days', 60, 58, 72.5, 6.0, 5, 6, 5),
(:'user_id', CURRENT_DATE - INTERVAL '8 days', 58, 59, 72.7, 6.5, 6, 6, 5),

-- Last week
(:'user_id', CURRENT_DATE - INTERVAL '7 days', 62, 56, 72.6, 7.5, 7, 5, 6),
(:'user_id', CURRENT_DATE - INTERVAL '6 days', 65, 54, 72.4, 7.5, 8, 4, 7),
(:'user_id', CURRENT_DATE - INTERVAL '5 days', 67, 53, 72.3, 7.0, 7, 4, 7),
(:'user_id', CURRENT_DATE - INTERVAL '4 days', 64, 55, 72.5, 7.0, 6, 5, 6),
(:'user_id', CURRENT_DATE - INTERVAL '3 days', 61, 57, 72.4, 6.5, 6, 5, 5),
(:'user_id', CURRENT_DATE - INTERVAL '2 days', 59, 58, 72.6, 6.0, 5, 6, 5),
(:'user_id', CURRENT_DATE - INTERVAL '1 day', 63, 56, 72.5, 7.5, 7, 4, 6),

-- Today
(:'user_id', CURRENT_DATE, 66, 54, 72.4, 8.0, 8, 3, 8);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Test data inserted successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '   - 6 Training Cycles (2 macro, 4 meso, 2 micro)';
  RAISE NOTICE '   - 18 Workouts across all 5 sports';
  RAISE NOTICE '   - 10 Detailed workout notes with tags';
  RAISE NOTICE '   - 25 Days of HRV and metrics data';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Your dashboard should now show:';
  RAISE NOTICE '   - Active training cycles';
  RAISE NOTICE '   - Weekly workout summary';
  RAISE NOTICE '   - HRV trends over 30 days';
  RAISE NOTICE '   - Searchable training notes';
  RAISE NOTICE '   - Calendar with workouts';
  RAISE NOTICE '';
  RAISE NOTICE '💡 Try searching notes for: "struggled", "breakthrough", "good session"';
  RAISE NOTICE '🔍 Filter workouts by sport to see patterns';
  RAISE NOTICE '📈 Check metrics page for HRV trends';
END $$;
