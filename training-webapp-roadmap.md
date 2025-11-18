# Training Webapp Development Roadmap
**Multi-Sport Training Platform: Triathlon, Hockey & Gym**

---

## 🎯 Project Overview
A comprehensive training management webapp for tracking and planning workouts across three disciplines:
- **Triathlon** (swim, bike, run)
- **Field Hockey** (field training, conditioning, skills)
- **Gym** (strength training, conditioning)

**Timeline:** 1-2 weeks for MVP, casual maintenance afterward  
**Tech Stack:** Modern web stack (React/Next.js + Supabase recommended based on your previous projects)

---

## Week 1: Core Foundation (Days 1-7)

### Day 1-2: Database Schema & Setup
**Priority: HIGH**

- [ ] Set up Supabase project
- [ ] Design database schema:
  - `users` table
  - `training_cycles` table (macro, meso, micro cycles with goals)
  - `workouts` table (sport_type, date, duration, metrics, cycle_id)
  - `workout_notes` table (post-training reflections, learnings, adjustments)
  - `training_plans` table (weekly/monthly structures)
  - `metrics` table (HRV, heart rate zones, power/pace data)
  - `sessions` table (planned vs. actual)
- [ ] Set up authentication (Supabase Auth)
- [ ] Create initial RLS policies

**Key Metrics to Track:**
- Triathlon: distance, pace/speed, heart rate, TSS (Training Stress Score)
- Field Hockey: field time, drill types, sprint work, conditioning metrics
- Gym: sets, reps, weight, rest intervals

**Periodization Structure:**
- **Macro Cycle:** 12-24 weeks (season/year planning)
- **Meso Cycle:** 3-6 weeks (training blocks with specific focus)
- **Micro Cycle:** 1 week (daily workout structure)

### Day 3-4: Basic UI Structure
**Priority: HIGH**

- [ ] Set up Next.js project with Tailwind CSS
- [ ] Create main layout and navigation
  - Dashboard view
  - Calendar view (with cycle overlay)
  - Sport-specific views (tabs/pages)
  - Metrics overview
  - **Periodization view** (macro/meso/micro cycles)
- [ ] Build workout entry form (multi-sport)
- [ ] **Post-training notes section** (reflection, feelings, learnings)
- [ ] Create basic responsive design

### Day 5-7: Core Features - Part 1
**Priority: HIGH**

- [ ] **Workout Logging**
  - Quick entry form for completed workouts
  - Sport-specific fields (distance, duration, intensity)
  - **Post-training notes** (mandatory/prominent)
    - How did it feel? (RPE 1-10)
    - What went well?
    - What to adjust next time?
    - Physical sensations (fatigue, soreness, energy)
    - Mental notes (focus, motivation)
  - Perceived effort (RPE)
  
- [ ] **Calendar Integration**
  - Weekly calendar view
  - **Cycle visualization** (color-coded meso cycles)
  - Show which phase you're in (base/build/peak/taper/recovery)
  - Drag-and-drop for planning (optional, can defer)

- [ ] **Basic Dashboard**
  - Current cycle overview (where you are in meso/micro)
  - Weekly summary (volume by sport)
  - Recent workouts with notes preview
  - Simple charts (total time/distance per sport)

---

## Week 2: Enhanced Features & Polish (Days 8-14)

### Day 8-10: Planning & Periodization Structure
**Priority: HIGH**

- [ ] **Periodization System**
  - **Macro Cycle Setup**
    - Define season/annual goals
    - Set start/end dates (e.g., 16-week season prep)
    - Overall objective (competition prep, base building)
  
  - **Meso Cycle Management**
    - Create 3-6 week training blocks
    - Assign focus per block (endurance, strength, speed, taper)
    - Set volume/intensity targets
    - Link to macro cycle
  
  - **Micro Cycle View**
    - Weekly structure within meso cycle
    - Daily workout allocation
    - Rest day planning
    - Progressive overload tracking

- [ ] **Periodization Visualization**
  - Timeline view showing all cycles
  - Current phase indicator
  - Progress bars for each meso cycle
  - Transition warnings (upcoming phase changes)

- [ ] **Training Plan Templates**
  - Predefined weekly structures
  - Phase-specific workouts (base vs. peak)
  - Sport-specific periodization templates

### Day 11-12: Notes & Review System
**Priority: HIGH**

- [ ] **Post-Training Notes Features**
  - Rich text editor for detailed notes
  - Template prompts (What worked? What didn't?)
  - Tag system (good session, struggled, breakthrough)
  - Photo/video upload (form checks, technique)
  - Quick voice notes (optional, future)

- [ ] **Notes Review & Search**
  - Search through past notes by keyword
  - Filter by tags, sport, or cycle
  - "Memories" feature (notes from same week last year)
  - Pattern recognition (e.g., "struggled" notes clustering)

- [ ] **Workout Planning**
  - Schedule future workouts by cycle phase
  - Set planned metrics (target pace, duration)
  - Compare planned vs. actual
  - **Use past notes to inform future planning**

### Day 13-14: Metrics & Analytics
**Priority: MEDIUM**

- [ ] **HRV Tracking**
  - Daily HRV entry
  - Visual trend over time
  - Training readiness indicator
  - **Correlation with cycle phase** (fatigue in build phase)

- [ ] **Performance Metrics by Cycle**
  - Compare performance across meso cycles
  - Volume trends within current cycle
  - Intensity distribution (by training phase)
  - Adaptation markers (improved paces, weights)

- [ ] **Progress Tracking**
  - Personal bests by sport/distance
  - Volume totals (weekly/monthly/cycle/yearly)
  - **Cycle completion percentage**
  - Load management (acute:chronic workload ratio)

### Day 15-16: Polish & Testing
**Priority: MEDIUM**

- [ ] Mobile responsiveness check
- [ ] Add loading states and error handling
- [ ] Basic data validation
- [ ] Test all CRUD operations
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Quick user testing (yourself!)

---

## Post-Launch: Casual Maintenance

### Nice-to-Have Features (Add as Needed)
**Priority: LOW - Add when you have time**

- [ ] **Advanced Analytics**
  - Training zones analysis
  - Fatigue/fitness curves
  - Peak performance predictions

- [ ] **Social Features**
  - Share workouts (optional)
  - Training partners/groups

- [ ] **Equipment Tracking**
  - Bike maintenance
  - Skate sharpening schedule
  - Gear mileage

- [ ] **Nutrition Integration**
  - Pre/post-workout meals
  - Hydration tracking

- [ ] **Integration Ideas**
  - Import from Strava/Garmin
  - Export to calendar (iCal)
  - Weather data for outdoor workouts

### Monthly Maintenance Tasks
- Review and fix any bugs
- Add small quality-of-life improvements
- Backup database
- Check performance metrics

---

## 🔧 Technical Decisions

### Recommended Stack (Based on Your Experience)
- **Frontend:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Deployment:** Vercel
- **Charts:** Recharts or Chart.js

### File Structure
```
/app
  /(auth)
  /dashboard
  /workouts
    /[id]
  /calendar
  /periodization (macro/meso/micro cycle views)
  /metrics
  /plans
  /notes (training notes review & search)
/components
  /ui (shadcn/ui components)
  /workouts
  /charts
  /cycles (periodization components)
/lib
  /supabase
  /utils
/types
```

---

## 🎨 Design Considerations

### Sport Color Coding
- **Triathlon Sports:**
  - Swim: Blue (#3B82F6)
  - Bike: Orange (#F97316)
  - Run: Green (#10B981)
- **Field Hockey:** Red (#EF4444)
- **Gym:** Purple (#8B5CF6)

### Key UX Principles
- **Quick Entry:** Logging a workout should take <30 seconds
- **Mobile First:** You'll often log workouts on your phone
- **Visual Feedback:** Use charts and colors to show progress
- **Flexible:** Don't over-structure initially, allow freeform notes

---

## 📊 MVP Success Metrics

### Must Have (Week 1-2)
✅ Can log workouts for all three sport types  
✅ **Post-training notes system with reflection prompts**  
✅ Can view workout history in calendar  
✅ **Periodization view (macro/meso/micro cycles visible)**  
✅ Can track weekly volume by sport  
✅ Can record HRV daily  
✅ **Search and review past training notes**  
✅ Mobile responsive  

### Nice to Have (Future)
- Advanced analytics and trends
- Training plan automation
- Multi-device sync (covered by Supabase)
- Data export functionality
- AI-powered insights from training notes

---

## 🚀 Quick Start Commands

```bash
# Create Next.js project
npx create-next-app@latest training-webapp --typescript --tailwind --app

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install recharts date-fns lucide-react

# Optional: shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card calendar
```

---

## 💡 Tips from Your Previous Projects

1. **Start with database schema** - Like Recipe Vault, get this right first
2. **Use shadcn/ui** - Speeds up UI development significantly
3. **Keep it simple initially** - You can always add complexity later
4. **Test on mobile early** - You'll use this on-the-go
5. **Version control from day 1** - Commit often, especially database migrations

---

## ⚡ Priority Matrix

| Feature | Priority | Effort | Week |
|---------|----------|--------|------|
| Database setup | HIGH | Medium | 1 |
| Basic workout logging | HIGH | Medium | 1 |
| **Post-training notes** | HIGH | Low | 1 |
| Calendar view | HIGH | High | 1 |
| Dashboard | HIGH | Medium | 1 |
| **Periodization system** | HIGH | High | 2 |
| **Notes review & search** | HIGH | Medium | 2 |
| HRV tracking | MEDIUM | Low | 2 |
| Training plans | MEDIUM | High | 2 |
| Analytics charts | MEDIUM | Medium | 2 |
| Advanced metrics | LOW | High | Future |

---

**Good luck with the build! You've got this. 💪🏒🏊‍♂️🚴‍♂️🏃‍♂️**
