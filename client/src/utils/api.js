import { mockPlans, mockTrainers, mockUsers } from "./mockData";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (email, password) => {
    await delay(500);
    const user = Object.values(mockUsers).find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));
      return { user: { ...user, password: undefined }, token };
    }
    throw new Error("Invalid credentials");
  },

  signup: async (userData) => {
    await delay(500);
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      password: undefined,
    };
    const token = btoa(JSON.stringify({ userId: newUser.id, role: userData.role }));
    return { user: newUser, token };
  },

  getCurrentUser: async (token) => {
    await delay(200);
    if (!token) throw new Error("No token provided");
    try {
      const decoded = JSON.parse(atob(token));
      const user = Object.values(mockUsers).find((u) => u.id === decoded.userId);
      if (user) return { ...user, password: undefined };
      throw new Error("User not found");
    } catch {
      throw new Error("Invalid token");
    }
  },
};

// Plans API
export const plansAPI = {
  getAll: async () => {
    await delay(300);
    return [...mockPlans];
  },

  getById: async (id) => {
    await delay(200);
    const plan = mockPlans.find((p) => p.id === id);
    if (!plan) throw new Error("Plan not found");
    return plan;
  },

  getByTrainer: async (trainerId) => {
    await delay(200);
    return mockPlans.filter((p) => p.trainerId === trainerId);
  },

  create: async (planData) => {
    await delay(500);
    const newPlan = {
      id: `plan-${Date.now()}`,
      ...planData,
    };
    return newPlan;
  },

  update: async (id, planData) => {
    await delay(500);
    return { id, ...planData };
  },

  delete: async (id) => {
    await delay(300);
    return { success: true, id };
  },

  subscribe: async (planId, userId) => {
    await delay(500);
    return { success: true, planId, userId };
  },
};

// Trainers API
export const trainersAPI = {
  getAll: async () => {
    await delay(300);
    return [...mockTrainers];
  },

  getById: async (id) => {
    await delay(200);
    const trainer = mockTrainers.find((t) => t.id === id);
    if (!trainer) throw new Error("Trainer not found");
    return trainer;
  },

  follow: async (trainerId, userId) => {
    await delay(300);
    return { success: true, trainerId, userId };
  },

  unfollow: async (trainerId, userId) => {
    await delay(300);
    return { success: true, trainerId, userId };
  },
};
