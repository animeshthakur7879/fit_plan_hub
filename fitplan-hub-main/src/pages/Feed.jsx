import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../redux/planSlice";
import { fetchTrainers } from "../redux/trainerSlice";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import { Sparkles, UserPlus } from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const { plans, subscribedPlanIds, isLoading } = useSelector((state) => state.plans);
  const { trainers, followedTrainerIds } = useSelector((state) => state.trainers);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchTrainers());
  }, [dispatch]);

  // Get plans from followed trainers
  const feedPlans = plans.filter((plan) => followedTrainerIds.includes(plan.trainerId));
  const followedTrainers = trainers.filter((t) => followedTrainerIds.includes(t.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl lg:text-5xl mb-2">
            YOUR <span className="gradient-energy-text">FEED</span>
          </h1>
          <p className="text-muted-foreground">
            Plans from trainers you follow
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-96 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : feedPlans.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {feedPlans.map((plan, i) => (
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
              <div className="text-center py-16 rounded-xl border border-border bg-card">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-energy flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl mb-2">Your Feed is Empty</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Follow trainers to see their latest plans in your personalized feed
                </p>
                <Link
                  to="/plans"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-energy text-primary-foreground font-semibold hover:shadow-energy transition-all"
                >
                  <UserPlus className="h-5 w-5" />
                  Discover Trainers
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Following */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-4">Following ({followedTrainers.length})</h3>
                
                {followedTrainers.length > 0 ? (
                  <div className="space-y-3">
                    {followedTrainers.map((trainer) => (
                      <Link
                        key={trainer.id}
                        to={`/trainer/${trainer.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <img
                          src={trainer.avatar}
                          alt={trainer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{trainer.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {plans.filter((p) => p.trainerId === trainer.id).length} plans
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    You're not following any trainers yet
                  </p>
                )}

                <Link
                  to="/plans"
                  className="block mt-4 text-center text-sm text-primary hover:underline"
                >
                  Find more trainers
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subscribed Plans</span>
                    <span className="font-semibold">{subscribedPlanIds.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Following</span>
                    <span className="font-semibold">{followedTrainerIds.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
