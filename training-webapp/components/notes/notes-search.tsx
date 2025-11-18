"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface NotesSearchProps {
  tags: string[];
}

export function NotesSearch({ tags }: NotesSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sport, setSport] = useState(searchParams.get("sport") || "all");
  const [tag, setTag] = useState(searchParams.get("tag") || "all");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sport !== "all") params.set("sport", sport);
    if (tag !== "all") params.set("tag", tag);

    router.push(`/notes?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    setSport("all");
    setTag("all");
    router.push("/notes");
  };

  const hasFilters = query || sport !== "all" || tag !== "all";

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        {hasFilters && (
          <Button variant="outline" onClick={handleClear}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Select value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="all">All Sports</option>
            <option value="swim">Swim</option>
            <option value="bike">Bike</option>
            <option value="run">Run</option>
            <option value="hockey">Hockey</option>
            <option value="gym">Gym</option>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="all">All Tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
