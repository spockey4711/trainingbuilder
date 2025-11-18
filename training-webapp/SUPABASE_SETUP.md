# Supabase Setup Guide

This guide will help you set up your Supabase project for the Training Webapp.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: Training Webapp (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to you
5. Click "Create new project" and wait for it to initialize

## Step 2: Run Database Migrations

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to create all tables and indexes
6. Repeat for `supabase/migrations/002_rls_policies.sql` to set up Row Level Security

## Step 3: Configure Authentication

1. In your Supabase project, go to **Authentication** > **Providers** (left sidebar)
2. Enable **Email** provider:
   - Toggle "Enable Email provider" ON
   - Configure email settings as needed
   - You can enable "Confirm email" for production
3. Optionally, enable other providers (Google, GitHub, etc.)

## Step 4: Get Your API Credentials

1. Go to **Project Settings** > **API** (gear icon in left sidebar)
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 5: Configure Environment Variables

1. In the root of the project, create a `.env.local` file
2. Add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the placeholder values with your actual credentials
4. **Never commit this file to git** (it's already in .gitignore)

## Step 6: Verify Setup

1. Start your development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)
3. You should be able to access the app without errors

## Database Schema Overview

Your Supabase database now has the following tables:

- **training_cycles**: Macro, meso, and micro training cycles
- **workouts**: Individual workout sessions
- **workout_notes**: Post-training reflections and notes
- **training_plans**: Weekly/monthly training templates
- **metrics**: Daily HRV, heart rate, sleep, and readiness data
- **sessions**: Planned vs. actual workout comparisons

All tables have Row Level Security (RLS) enabled, ensuring users can only access their own data.

## Next Steps

- Test the authentication flow by signing up a new user
- Start logging workouts through the app interface
- Set up your first training cycle

## Troubleshooting

### Can't connect to Supabase?
- Verify your environment variables are correct
- Make sure `.env.local` is in the project root
- Restart your development server after changing environment variables

### SQL migrations failing?
- Make sure to run migrations in order (001, then 002)
- Check for any syntax errors in the SQL editor
- Verify you have the uuid-ossp extension enabled

### Authentication not working?
- Check that email provider is enabled in Supabase Auth settings
- Verify your environment variables are set correctly
- Check browser console for error messages

## Security Notes

- The **anon key** is safe to use in client-side code
- Row Level Security ensures data isolation between users
- Never share your **service_role** key publicly
- Keep your `.env.local` file secure and never commit it to version control
