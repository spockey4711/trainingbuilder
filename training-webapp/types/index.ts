// Sport Types
export type SportType = 'swim' | 'bike' | 'run' | 'hockey' | 'gym';

// Training Cycle Types
export type CycleType = 'macro' | 'meso' | 'micro';
export type PhaseType = 'base' | 'build' | 'peak' | 'taper' | 'recovery';

// Database Types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingCycle {
  id: string;
  user_id: string;
  type: CycleType;
  name: string;
  phase: PhaseType;
  start_date: string;
  end_date: string;
  goal: string;
  parent_cycle_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  sport_type: SportType;
  date: string;
  workout_time?: string; // HH:MM format, optional for ordering multiple workouts per day
  duration: number; // in minutes
  distance?: number; // in km
  metrics?: WorkoutMetrics;
  cycle_id?: string;
  planned: boolean;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutMetrics {
  // Triathlon metrics
  pace?: number;
  speed?: number;
  heart_rate?: number;
  avg_heart_rate?: number;
  max_heart_rate?: number;
  tss?: number; // Training Stress Score
  power?: number;

  // Hockey metrics
  field_time?: number;
  drill_types?: string[];
  sprint_count?: number;

  // Gym metrics
  exercises?: GymExercise[];
}

export interface GymExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest_interval?: number;
}

export interface WorkoutNote {
  id: string;
  user_id: string;
  workout_id: string;
  rpe: number; // Rate of Perceived Exertion (1-10)
  feeling: string;
  what_went_well: string;
  what_to_adjust: string;
  physical_sensations: string;
  mental_notes: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface TrainingPlan {
  id: string;
  user_id: string;
  name: string;
  description: string;
  cycle_id?: string;
  structure: WeeklyStructure[];
  created_at: string;
  updated_at: string;
}

export interface WeeklyStructure {
  week: number;
  days: DayPlan[];
}

export interface DayPlan {
  day: number;
  sport_type?: SportType;
  workout_type: string;
  target_duration?: number;
  target_distance?: number;
  intensity?: string;
  is_rest_day: boolean;
}

export interface Metric {
  id: string;
  user_id: string;
  date: string;
  hrv?: number;
  resting_heart_rate?: number;
  weight?: number;
  sleep_hours?: number;
  sleep_quality?: number;
  stress_level?: number;
  readiness?: number;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  planned_workout_id?: string;
  actual_workout_id?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

// Training Zones
export interface TrainingZones {
  id: string;
  user_id: string;
  sport_type: SportType;
  zone_type: 'heart_rate' | 'power' | 'pace';
  zones: Zone[];
  created_at: string;
  updated_at: string;
}

export interface Zone {
  number: number;
  name: string;
  min: number;
  max: number;
  description?: string;
}

export interface ZoneDistribution {
  zone: number;
  time: number; // minutes
  percentage: number;
}

// Enhanced Workout Metrics with Zones
export interface EnhancedWorkoutMetrics extends WorkoutMetrics {
  zone_distribution?: ZoneDistribution[];
  normalized_power?: number; // For cycling
  intensity_factor?: number; // IF = NP / FTP
  variability_index?: number; // VI = NP / Average Power
  training_load?: number;
  acute_load?: number;
  chronic_load?: number;
  fitness?: number;
  fatigue?: number;
  form?: number;
}

// Volume Analytics
export interface VolumeAnalytics {
  totalDuration: number;
  totalDistance: number;
  totalWorkouts: number;
  bySport: SportVolumeBreakdown[];
  byWeek: WeeklyVolume[];
  byZone?: ZoneVolumeBreakdown[];
}

export interface SportVolumeBreakdown {
  sport: SportType;
  duration: number;
  distance: number;
  workouts: number;
  avgDuration: number;
  percentage: number;
}

export interface WeeklyVolume {
  week: string; // ISO week string
  duration: number;
  distance: number;
  workouts: number;
  tss?: number;
}

export interface ZoneVolumeBreakdown {
  zone: number;
  zoneName: string;
  duration: number;
  percentage: number;
  workouts: number;
}
