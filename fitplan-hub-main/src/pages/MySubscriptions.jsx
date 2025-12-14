import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../redux/planSlice";
import Navbar from "../components/Navbar";
import { CheckCircle, Clock, ArrowRight, ShoppingBag } from "lucide-react";

const MySubscriptions = () => {
  const dispatch = useDispatch();
  const { plans, subscribedPlanIds, isLoading } = useSelector((state) => state.plans);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const subscribedPlans = plans.filter((plan) => subscribedPlanIds.includes(plan.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl lg:text-5xl mb-2">
            MY <span className="gradient-energy-text">SUBSCRIPTIONS</span>
          </h1>
          <p className="text-muted-foreground">
            Access your purchased fitness plans
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : subscribedPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscribedPlans.map((plan, i) => (
              <div
                key={plan.id}
                className="group p-5 rounded-xl border border-border bg-card hover:border-primary transition-all animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex gap-4">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {plan.title}
                      </h3>
                      <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        Owned
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      by {plan.trainerName}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                      <Clock className="h-4 w-4" />
                      {plan.duration} days
                    </div>
                  </div>
                </div>

                <Link
                  to={`/plans/${plan.id}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                >
                  View Full Plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl border border-border bg-card">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-2xl mb-2">No Subscriptions Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Browse our collection of fitness plans and find the perfect one for your goals
            </p>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-energy text-primary-foreground font-semibold hover:shadow-energy transition-all"
            >
              Browse Plans
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MySubscriptions;
