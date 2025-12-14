import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainerById, followTrainer, unfollowTrainer, clearCurrentTrainer } from "../redux/trainerSlice";
import { fetchPlans } from "../redux/planSlice";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import { ArrowLeft, Users, Award, UserPlus, UserMinus, Mail } from "lucide-react";

const TrainerProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentTrainer: trainer, isLoading, followedTrainerIds } = useSelector((state) => state.trainers);
  const { plans } = useSelector((state) => state.plans);
  const { user } = useSelector((state) => state.auth);

  const isFollowing = followedTrainerIds.includes(id);
  const trainerPlans = plans.filter((p) => p.trainerId === id);

  useEffect(() => {
    dispatch(fetchTrainerById(id));
    dispatch(fetchPlans());
    return () => dispatch(clearCurrentTrainer());
  }, [dispatch, id]);

  const handleFollow = () => {
    if (!user) return;
    if (isFollowing) {
      dispatch(unfollowTrainer({ trainerId: id, userId: user.id }));
    } else {
      dispatch(followTrainer({ trainerId: id, userId: user.id }));
    }
  };

  if (isLoading || !trainer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-muted rounded mb-6" />
            <div className="h-40 bg-muted rounded-xl mb-6" />
          </div>
        </div>
      </div>
    );
  }

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
          Back
        </Link>

        {/* Trainer Header */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 gradient-energy opacity-90" />
          <div className="relative p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Avatar */}
              <img
                src={trainer.avatar}
                alt={trainer.name}
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl object-cover border-4 border-primary-foreground/20"
              />
              
              {/* Info */}
              <div className="flex-1 text-primary-foreground">
                <h1 className="font-display text-4xl lg:text-5xl mb-2">{trainer.name}</h1>
                <p className="text-primary-foreground/80 max-w-xl mb-4">
                  {trainer.bio}
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-semibold">{trainer.followers}</span>
                    <span className="text-primary-foreground/70">followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">{trainerPlans.length}</span>
                    <span className="text-primary-foreground/70">plans</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {user && user.role === "user" && (
                <div className="flex gap-3">
                  <button
                    onClick={handleFollow}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                      isFollowing
                        ? "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
                        : "bg-primary-foreground text-foreground hover:shadow-lg"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="h-5 w-5" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-8">
          <h2 className="font-display text-2xl mb-4">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {trainer.specialties.map((specialty, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div>
          <h2 className="font-display text-3xl mb-6">
            {trainer.name.split(" ")[0]}'s <span className="gradient-energy-text">PLANS</span>
          </h2>
          
          {trainerPlans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainerPlans.map((plan, i) => (
                <div
                  key={plan.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <PlanCard plan={plan} showTrainerLink={false} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl border border-border bg-card">
              <p className="text-muted-foreground">No plans available yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrainerProfile;
