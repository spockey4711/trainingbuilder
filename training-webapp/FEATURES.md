# Training Webapp - Features Documentation

## ✅ Completed Features

### 1. Authentication & Security
- ✅ Email/password signup and login
- ✅ Protected routes with middleware
- ✅ Row Level Security (RLS) on all database tables
- ✅ Automatic redirects based on auth state
- ✅ Secure logout functionality

### 2. Workout Logging System
**Location:** `/workouts/new`

Complete multi-sport workout tracking with sport-specific fields:

#### Triathlon Sports (Swim, Bike, Run)
- Duration, distance, pace
- Average and max heart rate
- Training Stress Score (TSS)
- Power (for cycling)

#### Field Hockey
- Field time (minutes)
- Sprint count
- Drill types (comma-separated)

#### Gym
- Multiple exercises
- Sets, reps, weight for each exercise
- Add/remove exercises dynamically

#### Post-Training Notes (All Sports)
Every workout includes comprehensive reflection:
- **RPE** (Rate of Perceived Exertion, 1-10)
- **How it felt** - General feeling during the session
- **What went well** - Positive aspects
- **What to adjust** - Areas for improvement
- **Physical sensations** - Fatigue, soreness, energy levels
- **Mental notes** - Focus, motivation, mindset
- **Tags** - Searchable tags (e.g., "good session", "struggled", "breakthrough")

### 3. Dashboard
**Location:** `/dashboard`

Real-time training overview:
- **This Week's Stats**
  - Total workouts completed
  - Keep-it-up encouragement

- **Current Training Cycle**
  - Active meso cycle name
  - Current phase (base/build/peak/taper/recovery)

- **Today's HRV**
  - Heart Rate Variability
  - Training readiness score

- **Recent Workouts**
  - Last 5 workouts with sport indicators
  - Quick view of duration, distance, RPE
  - Color-coded by sport

- **Weekly Volume**
  - Training minutes by sport
  - Visual progress bars
  - Color-coded by sport type

### 4. Workouts List
**Location:** `/workouts`

- Chronological list of all workouts
- Sport-specific color indicators
- Full workout details (duration, distance, metrics)
- Notes preview with tags
- Delete functionality
- Gym workouts show exercise list

### 5. HRV & Metrics Tracking
**Location:** `/metrics` and `/metrics/log`

#### Daily Metric Entry
- HRV (Heart Rate Variability)
- Resting heart rate
- Sleep hours and quality (1-10)
- Body weight
- Stress level (1-10)
- Training readiness (1-10)

#### Metrics Dashboard
- **30-day Averages**
  - Average HRV
  - Average readiness
  - Days tracked

- **Interactive Charts**
  - HRV & Readiness trend (dual-line chart)
  - Sleep Quality & Stress levels (dual-line chart)
  - 30-day history visualization

- **Recent Entries**
  - Last 10 metric logs
  - Color-coded readiness (green/yellow/red)
  - Quick overview of all metrics

### 6. Training Notes Search & Review
**Location:** `/notes`

Powerful search and filter system for training reflections:

#### Search Features
- **Text Search** - Search across all note fields
  - Feelings
  - What went well
  - What to adjust
  - Physical sensations
  - Mental notes

- **Sport Filter** - Filter by specific sport
  - Swim, Bike, Run, Hockey, Gym
  - View notes for specific training types

- **Tag Filter** - Filter by tags
  - Dynamically populated from your tags
  - Find patterns (e.g., all "struggled" sessions)

#### Notes Display
- Full workout context (sport, date, duration, distance)
- Complete note details with color-coded sections
- RPE display
- All tags shown
- Sport color indicators

### 7. Sport Color System

Consistent visual language throughout the app:
- **Swim**: Blue (#3B82F6)
- **Bike**: Orange (#F97316)
- **Run**: Green (#10B981)
- **Hockey**: Red (#EF4444)
- **Gym**: Purple (#8B5CF6)

## 🎯 How to Use

### Logging a Workout
1. Navigate to **Workouts** → **New Workout**
2. Select your sport type
3. Fill in workout details (duration, distance, etc.)
4. Add sport-specific metrics
5. Complete post-training notes (RPE, reflections)
6. Add tags for easy searching
7. Save

### Tracking Metrics
1. Go to **Metrics** → **Log Metrics**
2. Select date (defaults to today)
3. Enter your daily markers:
   - HRV from your tracking device
   - Resting heart rate
   - Sleep quality and hours
   - Stress level
   - Training readiness
4. Save (updates if entry exists for that date)

### Searching Notes
1. Go to **Notes**
2. Enter search term in text box
3. Filter by sport or tag
4. View detailed notes with full context

### Viewing Progress
1. Check **Dashboard** for weekly summary
2. Visit **Metrics** for HRV trends
3. Review **Workouts** for training history
4. Use **Notes** to find patterns in training

## 📊 Database Schema

### Tables
- `workouts` - Training sessions
- `workout_notes` - Post-training reflections
- `metrics` - Daily HRV and recovery data
- `training_cycles` - Periodization (planned, not yet UI)
- `training_plans` - Templates (planned, not yet UI)
- `sessions` - Planned vs actual (planned, not yet UI)

### Key Features
- All data protected by Row Level Security
- Users can only see their own data
- Automatic timestamps (created_at, updated_at)
- Proper indexes for performance
- JSONB for flexible metrics storage

## 🚧 Planned Features (Not Yet Implemented)

### Calendar View
- Weekly/monthly calendar grid
- Workouts displayed on dates
- Cycle phase visualization
- Quick workout entry from calendar

### Periodization System
- Macro cycle management (12-24 weeks)
- Meso cycle blocks (3-6 weeks)
- Micro cycle planning (weekly)
- Phase indicators (base/build/peak/taper)
- Progress tracking by cycle

### Training Plans
- Reusable weekly templates
- Phase-specific structures
- Apply plans to cycles
- Planned vs actual comparison

## 💡 Tips for Best Results

### Workout Logging
- Log workouts within 30 minutes for best recall
- Be detailed in "what to adjust" notes
- Use consistent tags for pattern recognition
- Include RPE even if you have HR data

### HRV Tracking
- Log HRV same time each morning
- Track before getting out of bed
- Be consistent with readiness assessments
- Look for trends over weeks, not days

### Notes & Tags
- Use descriptive tags: "breakthrough", "struggled", "perfect"
- Add "tired", "fresh", "stressed" for pattern detection
- Review notes monthly to spot trends
- Reference past notes when planning

### Search & Review
- Search for "struggled" to identify problem areas
- Filter by sport to see sport-specific patterns
- Review same week from last year for "memories"
- Look for tags clustering in certain phases

## 🔄 Data Flow

1. **Workout Entry** → Creates workout + notes
2. **Dashboard** → Shows aggregated stats from workouts + metrics
3. **Metrics Entry** → Updates HRV charts and readiness
4. **Notes Search** → Queries across workout notes
5. **All Views** → Real-time from Supabase

## 🎨 UI/UX Highlights

- **Mobile-first design** - Works on all devices
- **Color-coded sports** - Visual sport identification
- **Inline forms** - No unnecessary navigation
- **Progress indicators** - Visual volume bars
- **Interactive charts** - Recharts visualization
- **Searchable history** - Find any workout/note
- **Tags for organization** - Custom categorization

## 🔐 Security

- JWT-based authentication via Supabase
- Row Level Security on all tables
- Server-side validation
- Protected API routes
- Secure environment variables

## 📱 Mobile Experience

All features fully functional on mobile:
- Responsive layouts
- Touch-friendly buttons
- Mobile-optimized forms
- Scrollable charts
- Quick workout logging

---

**Ready to train smarter! 🏃‍♂️🚴‍♂️🏊‍♂️🏒💪**
