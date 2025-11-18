# Training Webapp 🏃‍♂️🏊‍♂️🚴‍♂️

A comprehensive multi-sport training platform for tracking and optimizing your athletic performance across Triathlon (Swim, Bike, Run), Field Hockey, and Gym training.

## ✨ Features

### 🏋️ Multi-Sport Workout Logging
- **5 Sport Types**: Swim, Bike, Run, Field Hockey, Gym
- **Sport-Specific Metrics**: Pace, power, TSS, HR for endurance sports; drills and sprints for hockey; sets/reps/weight for gym
- **Comprehensive Post-Training Notes**: RPE tracking, reflection prompts, tagging system for pattern recognition

### 📊 HRV & Recovery Tracking
- Daily metrics entry (HRV, resting HR, sleep quality, stress, readiness, weight)
- Interactive trend charts showing 30-day patterns
- Recovery insights to optimize training load

### 🔍 Training Notes Search
- Full-text search across all reflection fields
- Filter by sport type and tags
- Pattern recognition to identify what works and what doesn't

### 📅 Periodization System
- **Macro Cycles**: Long-term seasonal planning (12-24 weeks)
- **Meso Cycles**: Training blocks with specific focus (3-6 weeks)
- **Micro Cycles**: Weekly training structures
- Progress tracking with visual indicators
- Phase-based training (Base, Build, Peak, Taper, Recovery)

### 📆 Calendar View
- Weekly calendar layout (Monday-Sunday)
- Color-coded workouts by sport
- Active training cycle display
- Week navigation and summary statistics

### 📈 Dashboard
- Real-time training overview
- Weekly workout count and volume by sport
- Current training cycle status
- Recent workouts with notes
- Today's HRV and readiness

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **UI Components**: Custom shadcn/ui components
- **Charts**: Recharts (ready to use)
- **Icons**: Lucide React

## Project Structure

```
training-webapp/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── dashboard/
│   │   ├── workouts/
│   │   ├── calendar/
│   │   ├── periodization/
│   │   ├── metrics/
│   │   ├── notes/
│   │   └── plans/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── navigation.tsx       # Main nav component
│   └── sidebar.tsx          # Sidebar component
├── lib/
│   ├── supabase/           # Supabase client configs
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── supabase/
│   └── migrations/         # Database migrations
│       ├── 001_initial_schema.sql
│       └── 002_rls_policies.sql
├── middleware.ts           # Auth middleware
└── SUPABASE_SETUP.md      # Supabase setup guide
```

## Database Schema

The following tables are created by the migrations:

- `training_cycles` - Macro, meso, and micro training cycles
- `workouts` - Individual workout sessions
- `workout_notes` - Post-training reflections and notes
- `training_plans` - Weekly/monthly training templates
- `metrics` - Daily HRV, heart rate, sleep, readiness data
- `sessions` - Planned vs. actual workout comparisons

All tables have Row Level Security enabled to ensure data isolation.

## Sport Color Coding

- **Swim**: Blue (#3B82F6)
- **Bike**: Orange (#F97316)
- **Run**: Green (#10B981)
- **Hockey**: Red (#EF4444)
- **Gym**: Purple (#8B5CF6)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)

### 1. Clone and Install

```bash
cd training-webapp
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** → **API** and copy:
   - Project URL
   - Anon/Public Key

3. Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create Database Schema

Run these migrations in order in your Supabase SQL Editor:

1. `supabase/migrations/001_initial_schema.sql` - Creates all tables
2. `supabase/migrations/002_rls_policies.sql` - Enables Row Level Security

See [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) for detailed instructions.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create Your Account

1. Navigate to `/signup`
2. Create an account with email and password
3. You'll be automatically logged in and redirected to the dashboard

### 6. (Optional) Load Test Data

Want to explore the app with realistic data? Follow the guide in [`LOAD_TEST_DATA.md`](./LOAD_TEST_DATA.md) to populate your database with:
- 18 workouts across all sports
- 10 detailed training notes
- 25 days of HRV/metrics data
- 6 training cycles

## 📖 Documentation

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete Supabase configuration guide
- **[LOAD_TEST_DATA.md](./LOAD_TEST_DATA.md)** - How to load and customize test data
- **[COMPLETED.md](./COMPLETED.md)** - Full list of implemented features

## 📝 Usage Guide

### Daily Workflow

1. **Morning**: Log your HRV and daily metrics at `/metrics/log`
2. **After Training**: Log your workout at `/workouts/new`
   - Add detailed post-training notes
   - Tag your session for easy searching
3. **Evening**: Review your progress on the dashboard

### Weekly Workflow

1. Check calendar view at `/calendar` to see your week layout
2. Review notes from the past week at `/notes`
3. Adjust next week's training based on patterns
4. Update training cycles as needed at `/periodization`

### Monthly Workflow

1. Review HRV trends over 30 days at `/metrics`
2. Search notes for patterns (e.g., search "struggled" or "breakthrough")
3. Check cycle progress and completion
4. Plan your next meso cycle

## 🛠️ Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🎯 Database Schema

### Tables

- **`training_cycles`**: Macro, meso, and micro periodization
- **`workouts`**: Training sessions with sport-specific metrics
- **`workout_notes`**: Post-training reflections and tags
- **`metrics`**: Daily HRV and recovery markers
- **`training_plans`**: Weekly templates (schema ready, UI pending)
- **`sessions`**: Planned vs actual workouts (schema ready, UI pending)

All tables have:
- Row Level Security enabled
- Automatic `created_at` and `updated_at` timestamps
- Foreign key relationships
- Proper indexes for performance

## 🔧 Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

### Database Connection Issues

1. Verify `.env.local` has correct Supabase credentials
2. Check that migrations have been run
3. Ensure RLS policies are enabled
4. Check browser console for detailed errors

### No Data Showing

1. Ensure you're logged in
2. Check that the database schema was created successfully
3. Try loading test data (see `LOAD_TEST_DATA.md`)
4. Verify RLS policies in Supabase dashboard

### Authentication Issues

1. Verify Supabase project URL and anon key
2. Check that email confirmation is disabled in Supabase Auth settings
3. Clear browser cookies and try again
4. Check Supabase Auth logs for detailed error messages

## 🚧 Future Enhancements

Potential features for future development:

- **Training Plans UI**: Create and apply weekly templates
- **Strava/Garmin Integration**: Auto-import workouts
- **Equipment Tracking**: Monitor gear mileage
- **Nutrition Logging**: Track meals and hydration
- **Advanced Analytics**: Fatigue/fitness curves, CTL/ATL/TSB
- **Weather Integration**: Correlate conditions with performance
- **AI Insights**: Pattern recognition and training suggestions
- **Mobile App**: React Native companion app
- **Coach Sharing**: Share data with coaches
- **Export**: Download training data (CSV, PDF)

## 🔒 Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- JWT authentication via Supabase
- Protected routes with middleware
- Secure environment variables

## 🤝 Contributing

This is a personal training platform, but feel free to fork and customize for your own needs!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts by [Recharts](https://recharts.org/)

## 📞 Support

Having issues? Check these resources:

1. **Setup Guide**: [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
2. **Test Data**: [`LOAD_TEST_DATA.md`](./LOAD_TEST_DATA.md)
3. **Features List**: [`COMPLETED.md`](./COMPLETED.md)
4. **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
5. **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

---

**Start tracking your training, monitor your recovery, and train smarter!** 🚀
