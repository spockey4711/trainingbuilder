import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { searchNotes, getAllTags } from "@/lib/actions/notes";
import { format } from "date-fns";
import { NotesSearch } from "@/components/notes/notes-search";

const SPORT_COLORS: Record<string, string> = {
  swim: "bg-swim",
  bike: "bg-bike",
  run: "bg-run",
  hockey: "bg-hockey",
  gym: "bg-gym",
};

const SPORT_LABELS: Record<string, string> = {
  swim: "Swim",
  bike: "Bike",
  run: "Run",
  hockey: "Hockey",
  gym: "Gym",
};

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sport?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const { notes } = await searchNotes(
    params.q,
    params.sport,
    params.tag
  );
  const { tags } = await getAllTags();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training Notes</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Search and review your training reflections
        </p>
      </div>

      <NotesSearch tags={tags} />

      {notes.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>All Notes</CardTitle>
            <CardDescription>Your training reflections and learnings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              {params.q || params.sport || params.tag
                ? "No notes found matching your search"
                : "No training notes yet. Notes are automatically created when you log workouts!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notes.map((note: any) => (
            <Card key={note.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {note.workouts && (
                    <div className={`w-3 h-3 mt-1 rounded-full ${SPORT_COLORS[note.workouts.sport_type]}`} />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {note.workouts && (
                        <>
                          <h3 className="text-lg font-semibold">
                            {SPORT_LABELS[note.workouts.sport_type]}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {format(new Date(note.workouts.date), "MMM d, yyyy")}
                          </span>
                          <span className="text-sm text-gray-500">
                            {note.workouts.duration} min
                            {note.workouts.distance && ` • ${note.workouts.distance} km`}
                          </span>
                        </>
                      )}
                      {note.rpe && (
                        <span className="ml-auto text-sm font-medium">
                          RPE: {note.rpe}/10
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {note.feeling && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            How it felt
                          </div>
                          <p className="text-sm">{note.feeling}</p>
                        </div>
                      )}

                      {note.what_went_well && (
                        <div>
                          <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                            What went well
                          </div>
                          <p className="text-sm">{note.what_went_well}</p>
                        </div>
                      )}

                      {note.what_to_adjust && (
                        <div>
                          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                            What to adjust
                          </div>
                          <p className="text-sm">{note.what_to_adjust}</p>
                        </div>
                      )}

                      {note.physical_sensations && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            Physical sensations
                          </div>
                          <p className="text-sm">{note.physical_sensations}</p>
                        </div>
                      )}

                      {note.mental_notes && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            Mental notes
                          </div>
                          <p className="text-sm">{note.mental_notes}</p>
                        </div>
                      )}

                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {note.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {notes.length} {notes.length === 1 ? "note" : "notes"}
        </div>
      )}
    </div>
  );
}
