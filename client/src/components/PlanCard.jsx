import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Clock, DollarSign, User, Star, CheckCircle } from "lucide-react";

const PlanCard = ({ plan, showTrainerLink = true }) => {
  const { subscribedPlanIds } = useSelector((state) => state.plans);
  const isSubscribed = subscribedPlanIds.includes(plan.id);

  const difficultyColors = {
    Beginner: "bg-secondary/20 text-secondary",
    Intermediate: "bg-primary/20 text-primary",
    Advanced: "bg-destructive/20 text-destructive",
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-energy transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[plan.difficulty]}`}>
            {plan.difficulty}
          </span>
        </div>
        
        {isSubscribed && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Subscribed
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm font-bold text-primary">
          <DollarSign className="h-4 w-4" />
          {plan.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">
          {plan.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {plan.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {plan.duration} days
          </div>
          {showTrainerLink && (
            <Link 
              to={`/trainer/${plan.trainerId}`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              {plan.trainerName}
            </Link>
          )}
        </div>

        {/* Action */}
        <Link
          to={`/plans/${plan.id}`}
          className="block w-full py-2.5 rounded-lg text-center font-medium transition-all
            bg-muted hover:bg-primary hover:text-primary-foreground"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;
