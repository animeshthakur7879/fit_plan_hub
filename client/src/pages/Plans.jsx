import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../redux/planSlice";
import { fetchTrainers } from "../redux/trainerSlice";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import SearchFilters from "../components/SearchFilters";

const Plans = () => {
  const dispatch = useDispatch();
  const { plans, isLoading, searchQuery, filters } = useSelector((state) => state.plans);
  const { trainers } = useSelector((state) => state.trainers);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchTrainers());
  }, [dispatch]);

  // Filter plans based on search and filters
  const filteredPlans = plans.filter((plan) => {
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        plan.title.toLowerCase().includes(query) ||
        plan.trainerName.toLowerCase().includes(query) ||
        plan.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Difficulty filter
    if (filters.difficulty && plan.difficulty !== filters.difficulty) {
      return false;
    }

    // Duration filter
    if (filters.duration) {
      const [min, max] = filters.duration;
      if (plan.duration < min || plan.duration > max) {
        return false;
      }
    }

    // Trainer filter
    if (filters.trainerId && plan.trainerId !== filters.trainerId) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl lg:text-5xl mb-2">
            BROWSE <span className="gradient-energy-text">PLANS</span>
          </h1>
          <p className="text-muted-foreground">
            Discover fitness plans from expert trainers
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* Results Count */}
        <div className="mb-6 text-muted-foreground">
          {filteredPlans.length} {filteredPlans.length === 1 ? "plan" : "plans"} found
        </div>

        {/* Plans Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, i) => (
              <div
                key={plan.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="font-display text-2xl mb-2">No Plans Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Plans;
