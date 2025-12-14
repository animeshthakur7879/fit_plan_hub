import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans, createPlan, updatePlan, deletePlan } from "../redux/planSlice";
import Navbar from "../components/Navbar";
import { Plus, Edit2, Trash2, X, DollarSign, Clock, FileText } from "lucide-react";
import { showMyPlans , addPlan } from "../redux/plan/mplanSlice";

const TrainerDashboard = () => {
  const dispatch = useDispatch();
  const { plans, isLoading } = useSelector((state) => state.plans);
  const { muser } = useSelector((state) => state.mauth);
  // console.log(muser)
  
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    imgUrl: "",
  });

  useEffect(() => {
    dispatch(showMyPlans())
  }, []);

  // Filter plans by current trainer
  const myPlans = plans.filter((p) => p.trainerId === muser?.id);

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        title: plan.title,
        description: plan.description,
        price: plan.price.toString(),
        duration: plan.duration.toString(),
        imgUrl: plan.image || "",
      });
    } else {
      setEditingPlan(null);
      setFormData({ title: "", description: "", price: "", duration: "", imgUrl: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    setFormData({ title: "", description: "", price: "", duration: "", imgUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const planData = {
      ...formData,
      trainer: muser.id,
    };

    console.log(planData)

    // console.log(planData)

    if (editingPlan) {
      await dispatch(updatePlan({ id: editingPlan.id, planData }));
    } else {
      await dispatch(addPlan(planData))
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      await dispatch(deletePlan(id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl lg:text-5xl mb-2">
              TRAINER <span className="gradient-energy-text">DASHBOARD</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your fitness plans and track performance
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-energy text-primary-foreground font-semibold hover:shadow-energy transition-all"
          >
            <Plus className="h-5 w-5" />
            Create New Plan
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Plans", value: myPlans.length, icon: FileText },
            { label: "Total Revenue", value: `$${myPlans.reduce((sum, p) => sum + p.price, 0).toFixed(0)}`, icon: DollarSign },
            { label: "Avg Duration", value: `${Math.round(myPlans.reduce((sum, p) => sum + p.duration, 0) / (myPlans.length || 1))} days`, icon: Clock },
            { label: "Subscribers", value: "128", icon: Plus },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="font-display text-2xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Plans Table/Cards */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">My Plans</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 mx-auto border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : myPlans.length > 0 ? (
            <div className="divide-y divide-border">
              {myPlans.map((plan) => (
                <div key={plan.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full sm:w-20 h-32 sm:h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{plan.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>${plan.price}</span>
                      <span>{plan.duration} days</span>
                      <span className="px-2 py-0.5 rounded bg-muted text-xs">
                        {plan.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(plan)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2">No Plans Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first fitness plan to get started
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-energy text-primary-foreground font-medium"
              >
                <Plus className="h-4 w-4" />
                Create Plan
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-card shadow-lg animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-display text-2xl">
                {editingPlan ? "Edit Plan" : "Create New Plan"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Plan Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., 30-Day Strength Builder"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your fitness plan..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.imgUrl}
                  onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="49.99"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (days)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="30"
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl gradient-energy text-primary-foreground font-semibold hover:shadow-energy transition-all"
                >
                  {editingPlan ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;