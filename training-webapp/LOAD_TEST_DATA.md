# Loading Test Data

This guide will help you populate your Training Webapp with realistic test data.

## Prerequisites

1. You must have already run the schema migrations (`001_initial_schema.sql` and `002_rls_policies.sql`)
2. You must have created a user account (signed up through the app)

## Step 1: Get Your User ID

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** (left sidebar)
3. Run this query to find your user ID:

```sql
SELECT id, email FROM auth.users;
```

4. Copy your user ID (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

## Step 2: Update the Test Data File

1. Open `supabase/test_data.sql`
2. Find line 7 where it says:
   ```sql
   \set user_id 'YOUR_USER_ID_HERE'
   ```
3. Replace `YOUR_USER_ID_HERE` with your actual user ID

**Example:**
```sql
\set user_id 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
```

## Step 3: Run the Test Data Script

### Option A: Using Supabase SQL Editor

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the **entire contents** of `supabase/test_data.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

### Option B: Using psql Command Line

```bash
psql "your-supabase-connection-string" -f supabase/test_data.sql
```

## Step 4: Verify the Data

After running the script, you should see a success message with statistics.

### Check Your Dashboard

Navigate to your app and verify:

1. **Dashboard** (`/dashboard`)
   - Should show "This week: X workouts"
   - Weekly volume bars should have data
   - Recent workouts should be visible

2. **Workouts** (`/workouts`)
   - Should list 18 workouts
   - Mix of all 5 sports (Swim, Bike, Run, Hockey, Gym)
   - Past 3 weeks of training

3. **Metrics** (`/metrics`)
   - Should show HRV trends
   - 25 days of data
   - Charts should be populated

4. **Notes** (`/notes`)
   - Should show 10 detailed workout notes
   - Try searching for "struggled" or "breakthrough"
   - Filter by tags

5. **Periodization** (`/periodization`)
   - Should show active cycles
   - Progress bars should display
   - Multiple meso cycles listed

6. **Calendar** (`/calendar`)
   - Workouts should appear on dates
   - Current week should show active cycle
   - Navigate between weeks

## What Test Data Includes

### Training Cycles
- **2 Macro Cycles**: Long-term seasonal planning
- **4 Meso Cycles**: 3-6 week training blocks
- **2 Micro Cycles**: Weekly structures
- **1 Active cycle**: Currently in progress

### Workouts (18 total)
- **Swim**: 4 sessions (technique, recovery, quality)
- **Bike**: 4 sessions (easy, tempo, long ride)
- **Run**: 5 sessions (easy, tempo, intervals, long run)
- **Hockey**: 2 sessions (practice and game)
- **Gym**: 3 sessions (strength training)

Workouts span 3 weeks with realistic progression.

### Workout Notes (10 detailed entries)
Tagged with keywords like:
- "good session", "breakthrough", "strong"
- "struggled", "fatigue", "tired"
- "recovery", "easy", "fresh"
- "long ride", "endurance", "quality session"

Each note includes:
- RPE (Rate of Perceived Exertion)
- Feelings and reflections
- What went well
- What to adjust
- Physical sensations
- Mental notes

### Metrics (25 days)
- **HRV**: Ranging from 58-71
- **Resting HR**: 51-59 bpm
- **Weight**: ~72.5 kg
- **Sleep**: 6-8 hours with quality scores
- **Stress**: Varying levels 2-6
- **Readiness**: Scores 5-9

Data shows realistic patterns:
- HRV drops after hard training
- Recovery trends visible
- Fatigue accumulation and recovery

## Testing Scenarios

### Scenario 1: Pattern Recognition
1. Go to **Notes** (`/notes`)
2. Search for "struggled"
3. Notice the workout after long ride shows fatigue
4. Filter by "fatigue" tag

### Scenario 2: HRV Correlation
1. Go to **Metrics** (`/metrics`)
2. Notice HRV drop after hard training blocks
3. See recovery in HRV after easier days

### Scenario 3: Training Progression
1. Go to **Workouts** (`/workouts`)
2. Filter by "run" if you add filters (or just scroll)
3. Notice volume and intensity progression

### Scenario 4: Cycle Management
1. Go to **Periodization** (`/periodization`)
2. See active "Current Build Block"
3. Check progress bars
4. View different cycle types

### Scenario 5: Calendar Visualization
1. Go to **Calendar** (`/calendar`)
2. See workouts plotted on dates
3. Notice active cycle display
4. Navigate to different weeks

## Customizing Test Data

Want to modify the test data? Edit `supabase/test_data.sql`:

- **More workouts**: Copy and paste workout INSERT blocks with new dates
- **Different sports**: Change `sport_type` values
- **More notes**: Add more `workout_notes` entries
- **Different dates**: Adjust `CURRENT_DATE - INTERVAL 'X days'`
- **Your metrics**: Change HRV, sleep, weight values

## Troubleshooting

### "No data showing"
- Verify you replaced YOUR_USER_ID_HERE
- Check that migrations ran successfully first
- Refresh the page (Cmd/Ctrl + R)

### "Cannot insert" errors
- Make sure schema is created first
- Verify user exists in auth.users
- Check RLS policies are enabled

### "Dates not showing"
- PostgreSQL should handle CURRENT_DATE automatically
- If issues, replace with explicit dates like '2025-11-18'

### Still not working?
1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Check RLS policies in Supabase dashboard
4. Ensure environment variables are correct

## Clean Up Test Data

To remove all test data and start fresh:

```sql
-- WARNING: This deletes ALL your data!
DELETE FROM workout_notes WHERE user_id = 'your-user-id';
DELETE FROM workouts WHERE user_id = 'your-user-id';
DELETE FROM metrics WHERE user_id = 'your-user-id';
DELETE FROM training_cycles WHERE user_id = 'your-user-id';
```

Then you can re-run the test data script.

## Next Steps

After loading test data:

1. **Explore the dashboard** - See how data visualizes
2. **Try searching notes** - Test the search functionality
3. **Check HRV trends** - See the charts in action
4. **Navigate calendar** - View workouts by date
5. **Add your own workouts** - Start logging real training!

## Support

Having issues? Check:
- `SUPABASE_SETUP.md` for database setup
- `README.md` for general setup
- `FEATURES.md` for feature documentation

Enjoy exploring your Training Webapp with realistic data!
