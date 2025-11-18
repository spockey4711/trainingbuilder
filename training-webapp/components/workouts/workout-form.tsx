"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createWorkout } from "@/lib/actions/workouts";
import type { SportType, TrainingCycle } from "@/types";
import { format } from "date-fns";

const SPORT_OPTIONS: { value: SportType; label: string; color: string }[] = [
  { value: "swim", label: "Schwimmen", color: "bg-swim" },
  { value: "bike", label: "Radfahren", color: "bg-bike" },
  { value: "run", label: "Laufen", color: "bg-run" },
  { value: "hockey", label: "Hockey", color: "bg-hockey" },
  { value: "gym", label: "Gym", color: "bg-gym" },
];

interface WorkoutFormProps {
  cycles?: TrainingCycle[];
}

export function WorkoutForm({ cycles = [] }: WorkoutFormProps) {
  const router = useRouter();
  const [sportType, setSportType] = useState<SportType>("run");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [exercises, setExercises] = useState([
    { name: "", sets: 0, reps: 0, weight: 0 }
  ]);

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, reps: 0, weight: 0 }]);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleExerciseChange = (index: number, field: string, value: any) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Add exercises as JSON for gym workouts
    if (sportType === "gym") {
      formData.set("exercises", JSON.stringify(exercises.filter(ex => ex.name)));
    }

    const result = await createWorkout(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/workouts");
      router.refresh();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Trainingsdetails</CardTitle>
          <CardDescription>Grundlegende Informationen zu deiner Trainingseinheit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sportType">Sportart</Label>
              <Select
                id="sportType"
                name="sportType"
                value={sportType}
                onChange={(e) => setSportType(e.target.value as SportType)}
                required
              >
                {SPORT_OPTIONS.map((sport) => (
                  <option key={sport.value} value={sport.value}>
                    {sport.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={today}
                max={today}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="workoutTime">Time (optional)</Label>
              <Input
                id="workoutTime"
                name="workoutTime"
                type="time"
                placeholder="HH:MM"
              />
              <p className="text-xs text-gray-500">
                For logging multiple workouts per day
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                placeholder="60"
                required
              />
            </div>

            {(sportType === "swim" || sportType === "bike" || sportType === "run") && (
              <div className="space-y-2">
                <Label htmlFor="distance">Distanz (km)</Label>
                <Input
                  id="distance"
                  name="distance"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="10.5"
                />
              </div>
            )}
          </div>

          {cycles.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="cycleId">Training Cycle (optional)</Label>
              <Select
                id="cycleId"
                name="cycleId"
              >
                <option value="">None - Not part of a specific cycle</option>
                {cycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.name} ({cycle.type}) - {format(new Date(cycle.start_date), "MMM d")} to {format(new Date(cycle.end_date), "MMM d")}
                  </option>
                ))}
              </Select>
              <p className="text-xs text-gray-500">
                Assign this workout to a macro, meso, or micro cycle for better tracking
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sport-Specific Metrics */}
      {(sportType === "swim" || sportType === "bike" || sportType === "run") && (
        <Card>
          <CardHeader>
            <CardTitle>Leistungsmetriken</CardTitle>
            <CardDescription>Erfasse dein Tempo, Herzfrequenz und Trainingsstress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="pace">Tempo (Min/km)</Label>
                <Input
                  id="pace"
                  name="pace"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="5.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgHeartRate">Ø Herzfrequenz</Label>
                <Input
                  id="avgHeartRate"
                  name="avgHeartRate"
                  type="number"
                  min="0"
                  max="220"
                  placeholder="150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxHeartRate">Max Herzfrequenz</Label>
                <Input
                  id="maxHeartRate"
                  name="maxHeartRate"
                  type="number"
                  min="0"
                  max="220"
                  placeholder="180"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sportType === "bike" && (
                <div className="space-y-2">
                  <Label htmlFor="power">Leistung (Watt)</Label>
                  <Input
                    id="power"
                    name="power"
                    type="number"
                    min="0"
                    placeholder="200"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="tss">TSS (Training Stress Score)</Label>
                <Input
                  id="tss"
                  name="tss"
                  type="number"
                  min="0"
                  placeholder="75"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {sportType === "hockey" && (
        <Card>
          <CardHeader>
            <CardTitle>Hockey Metriken</CardTitle>
            <CardDescription>Spielfeldzeit, Übungen und Konditionierung</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fieldTime">Spielfeldzeit (Minuten)</Label>
                <Input
                  id="fieldTime"
                  name="fieldTime"
                  type="number"
                  min="0"
                  placeholder="90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sprintCount">Sprint-Anzahl</Label>
                <Input
                  id="sprintCount"
                  name="sprintCount"
                  type="number"
                  min="0"
                  placeholder="15"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drillTypes">Übungstypen (durch Komma getrennt)</Label>
              <Input
                id="drillTypes"
                name="drillTypes"
                placeholder="Schlägerarbeit, Passen, Schießen"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {sportType === "gym" && (
        <Card>
          <CardHeader>
            <CardTitle>Übungen</CardTitle>
            <CardDescription>Protokolliere deine Krafttrainingsübungen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Übung {index + 1}</h4>
                  {exercises.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveExercise(index)}
                    >
                      Entfernen
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Übungsname</Label>
                    <Input
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                      placeholder="Bankdrücken"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sätze</Label>
                    <Input
                      type="number"
                      min="0"
                      value={exercise.sets || ""}
                      onChange={(e) => handleExerciseChange(index, "sets", parseInt(e.target.value) || 0)}
                      placeholder="3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Wiederholungen</Label>
                    <Input
                      type="number"
                      min="0"
                      value={exercise.reps || ""}
                      onChange={(e) => handleExerciseChange(index, "reps", parseInt(e.target.value) || 0)}
                      placeholder="10"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Gewicht (kg)</Label>
                    <Input
                      type="number"
                      step="0.5"
                      min="0"
                      value={exercise.weight || ""}
                      onChange={(e) => handleExerciseChange(index, "weight", parseFloat(e.target.value) || 0)}
                      placeholder="60"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={handleAddExercise} className="w-full">
              + Übung hinzufügen
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Post-Training Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Trainingsnotizen</CardTitle>
          <CardDescription>Reflektiere deine Einheit und halte deine Erkenntnisse fest</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rpe">RPE - Wahrgenommene Anstrengung (1-10)</Label>
            <Input
              id="rpe"
              name="rpe"
              type="number"
              min="1"
              max="10"
              placeholder="7"
            />
            <p className="text-xs text-gray-500">1 = Sehr leicht, 10 = Maximale Anstrengung</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feeling">Wie hat es sich angefühlt?</Label>
            <Textarea
              id="feeling"
              name="feeling"
              placeholder="Fühlte mich stark, gute Energie..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatWentWell">Was lief gut?</Label>
            <Textarea
              id="whatWentWell"
              name="whatWentWell"
              placeholder="Tempo gehalten, gute Form..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatToAdjust">Was beim nächsten Mal anpassen?</Label>
            <Textarea
              id="whatToAdjust"
              name="whatToAdjust"
              placeholder="Langsamer starten, auf Atmung achten..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="physicalSensations">Körperliche Empfindungen (Müdigkeit, Muskelkater, Energie)</Label>
            <Textarea
              id="physicalSensations"
              name="physicalSensations"
              placeholder="Leichte Beinmüdigkeit, fühlte mich energiegeladen..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mentalNotes">Mentale Notizen (Fokus, Motivation)</Label>
            <Textarea
              id="mentalNotes"
              name="mentalNotes"
              placeholder="Guter Fokus, durchgehend motiviert..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (durch Komma getrennt)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="gute Einheit, Durchbruch, anstrengend"
            />
            <p className="text-xs text-gray-500">Beispiele: gute Einheit, anstrengend, Durchbruch, müde</p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Speichern..." : "Training speichern"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Abbrechen
        </Button>
      </div>
    </form>
  );
}
