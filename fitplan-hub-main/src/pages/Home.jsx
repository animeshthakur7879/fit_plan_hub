import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../redux/planSlice";
import { fetchTrainers } from "../redux/trainerSlice";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import { Dumbbell, Users, Trophy, ArrowRight, Zap } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const { plans, isLoading } = useSelector((state) => state.plans);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchTrainers());
  }, [dispatch]);

  const featuredPlans = plans.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-energy opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Transform Your Fitness Journey</span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl leading-tight mb-6">
              <span className="gradient-energy-text">UNLEASH</span>
              <br />
              YOUR POTENTIAL
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              Connect with elite trainers, access premium fitness plans, and achieve your goals faster than ever before.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to={user ? "/plans" : "/signup"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-energy text-primary-foreground font-semibold hover:shadow-energy transition-all"
              >
                {user ? "Browse Plans" : "Start Free Trial"}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/plans"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary hover:text-primary font-semibold transition-all"
              >
                Explore Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Dumbbell, value: "500+", label: "Fitness Plans" },
              { icon: Users, value: "50+", label: "Expert Trainers" },
              { icon: Trophy, value: "10K+", label: "Active Members" },
              { icon: Zap, value: "95%", label: "Success Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-energy mb-3">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="font-display text-3xl lg:text-4xl gradient-energy-text">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl mb-2">
                FEATURED <span className="gradient-energy-text">PLANS</span>
              </h2>
              <p className="text-muted-foreground">
                Discover our most popular fitness programs
              </p>
            </div>
            <Link
              to="/plans"
              className="hidden md:inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View All Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlans.map((plan, i) => (
                <div
                  key={plan.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <PlanCard plan={plan} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View All Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-energy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.3),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="font-display text-4xl lg:text-6xl text-primary-foreground mb-4">
            READY TO TRANSFORM?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of members who have already transformed their lives with FitPlanHub.
          </p>
          <Link
            to={user ? "/plans" : "/signup"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-background text-foreground font-semibold hover:shadow-lg transition-all"
          >
            {user ? "Find Your Plan" : "Get Started Free"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 FitPlanHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
