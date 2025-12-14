import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setFilters, clearFilters } from "../redux/planSlice";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const SearchFilters = () => {
  const dispatch = useDispatch();
  const { searchQuery, filters } = useSelector((state) => state.plans);
  const { trainers } = useSelector((state) => state.trainers);
  const [showFilters, setShowFilters] = useState(false);

  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const durations = [
    { label: "1-2 weeks", value: [1, 14] },
    { label: "3-4 weeks", value: [15, 28] },
    { label: "5+ weeks", value: [29, 100] },
  ];

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = filters.difficulty || filters.trainerId || filters.duration;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search fitness plans..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all
            ${showFilters || hasActiveFilters
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary"
            }`}
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-5 rounded-xl border border-border bg-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filter Plans</h3>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      dispatch(
                        setFilters({
                          difficulty: filters.difficulty === diff ? null : diff,
                        })
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${filters.difficulty === diff
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                      }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {durations.map((dur) => (
                  <button
                    key={dur.label}
                    onClick={() =>
                      dispatch(
                        setFilters({
                          duration:
                            JSON.stringify(filters.duration) === JSON.stringify(dur.value)
                              ? null
                              : dur.value,
                        })
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${JSON.stringify(filters.duration) === JSON.stringify(dur.value)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                      }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trainer Filter */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Trainer
              </label>
              <select
                value={filters.trainerId || ""}
                onChange={(e) =>
                  dispatch(setFilters({ trainerId: e.target.value || null }))
                }
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:border-primary outline-none transition-colors"
              >
                <option value="">All Trainers</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
