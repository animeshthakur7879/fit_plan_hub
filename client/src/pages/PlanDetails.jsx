import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlanById, subscribeToPlan, clearCurrentPlan } from "../redux/planSlice";
import Navbar from "../components/Navbar";
import { Clock, DollarSign, User, CheckCircle, Lock, ArrowLeft, Star, Zap } from "lucide-react";

const PlanDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPlan: plan, isLoading, subscribedPlanIds } = useSelector((state) => state.plans);
  const { user } = useSelector((state) => state.auth);
  const [subscribing, setSubscribing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const isSubscribed = subscribedPlanIds.includes(id);

  useEffect(() => {
    dispatch(fetchPlanById(id));
    return () => dispatch(clearCurrentPlan());
  }, [dispatch, id]);

  const handleSubscribe = async () => {
    if (!user) return;
    setShowPayment(true);
  };

  const handlePayment = async () => {
    setSubscribing(true);
    await dispatch(subscribeToPlan({ planId: id, userId: user.id }));
    setSubscribing(false);
    setShowPayment(false);
  };

  if (isLoading || !plan) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-muted rounded mb-6" />
            <div className="h-64 bg-muted rounded-xl mb-6" />
            <div className="h-10 w-64 bg-muted rounded mb-4" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: "bg-secondary/20 text-secondary",
    Intermediate: "bg-primary/20 text-primary",
    Advanced: "bg-destructive/20 text-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/plans"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img
                src={plan.image}
                alt={plan.title}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${difficultyColors[plan.difficulty]}`}>
                  {plan.difficulty}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-background/90">
                  {plan.category}
                </span>
              </div>

              {isSubscribed && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Subscribed
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <h1 className="font-display text-4xl lg:text-5xl mb-4">{plan.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                {plan.duration} days
              </div>
              <Link
                to={`/trainer/${plan.trainerId}`}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
                {plan.trainerName}
              </Link>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-primary fill-primary" />
                4.8 (120 reviews)
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display text-2xl mb-3">About This Plan</h2>
              <p className="text-muted-foreground leading-relaxed">
                {plan.description}
              </p>
            </div>

            {/* Exercises Preview */}
            <div className="relative">
              <h2 className="font-display text-2xl mb-4">What's Included</h2>
              
              <div className="space-y-3">
                {plan.exercises.map((exercise, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border border-border bg-card flex items-center gap-3 ${
                      !isSubscribed && i > 1 ? "blur-sm" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg gradient-energy flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {i + 1}
                    </div>
                    <span>{exercise}</span>
                  </div>
                ))}
              </div>

              {/* Locked Overlay */}
              {!isSubscribed && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none">
                  <div className="text-center pointer-events-auto">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Lock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Subscribe to unlock full plan content
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card shadow-card">
              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl gradient-energy-text">${plan.price}</span>
                <span className="text-muted-foreground">one-time</span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {[
                  `${plan.duration} days of guided workouts`,
                  "Detailed exercise instructions",
                  "Progress tracking",
                  "Lifetime access",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {isSubscribed ? (
                <button className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  You Own This Plan
                </button>
              ) : user ? (
                <button
                  onClick={handleSubscribe}
                  className="w-full py-3 rounded-xl gradient-energy text-primary-foreground font-semibold hover:shadow-energy transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="h-5 w-5" />
                  Get This Plan
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full py-3 rounded-xl gradient-energy text-primary-foreground font-semibold text-center hover:shadow-energy transition-all"
                >
                  Login to Subscribe
                </Link>
              )}

              {/* Trainer Card */}
              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  to={`/trainer/${plan.trainerId}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                    {plan.trainerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{plan.trainerName}</div>
                    <div className="text-sm text-muted-foreground">View Profile</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 p-6 rounded-2xl bg-card shadow-lg animate-fade-in">
            <h3 className="font-display text-2xl mb-4">Complete Purchase</h3>
            <p className="text-muted-foreground mb-6">
              You're about to purchase <strong>{plan.title}</strong> for <strong>${plan.price}</strong>
            </p>
            
            <div className="p-4 rounded-xl bg-muted mb-6">
              <p className="text-sm text-muted-foreground text-center">
                🎭 This is a simulated payment. No real transaction will occur.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={subscribing}
                className="flex-1 py-3 rounded-xl gradient-energy text-primary-foreground font-semibold disabled:opacity-50"
              >
                {subscribing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDetails;
