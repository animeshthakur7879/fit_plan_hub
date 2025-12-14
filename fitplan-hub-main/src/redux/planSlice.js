import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { plansAPI } from "../utils/api";

const initialState = {
  plans: [],
  subscribedPlanIds: [],
  currentPlan: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  filters: {
    priceRange: [0, 100],
    duration: null,
    trainerId: null,
    difficulty: null,
  },
};

export const fetchPlans = createAsyncThunk(
  "plans/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await plansAPI.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlanById = createAsyncThunk(
  "plans/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await plansAPI.getById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPlan = createAsyncThunk(
  "plans/create",
  async (planData, { rejectWithValue }) => {
    try {
      return await plansAPI.create(planData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plans/update",
  async ({ id, planData }, { rejectWithValue }) => {
    try {
      return await plansAPI.update(id, planData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plans/delete",
  async (id, { rejectWithValue }) => {
    try {
      await plansAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const subscribeToPlan = createAsyncThunk(
  "plans/subscribe",
  async ({ planId, userId }, { rejectWithValue }) => {
    try {
      await plansAPI.subscribe(planId, userId);
      return planId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = "";
    },
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlanById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchPlanById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter((p) => p.id !== action.payload);
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        if (!state.subscribedPlanIds.includes(action.payload)) {
          state.subscribedPlanIds.push(action.payload);
        }
      });
  },
});

export const { setSearchQuery, setFilters, clearFilters, clearCurrentPlan } = planSlice.actions;
export default planSlice.reducer;
