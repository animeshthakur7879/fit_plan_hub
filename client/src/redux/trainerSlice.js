import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { trainersAPI } from "../utils/api";

const initialState = {
  trainers: [],
  followedTrainerIds: [],
  currentTrainer: null,
  isLoading: false,
  error: null,
};

export const fetchTrainers = createAsyncThunk(
  "trainers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await trainersAPI.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrainerById = createAsyncThunk(
  "trainers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await trainersAPI.getById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const followTrainer = createAsyncThunk(
  "trainers/follow",
  async ({ trainerId, userId }, { rejectWithValue }) => {
    try {
      await trainersAPI.follow(trainerId, userId);
      return trainerId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollowTrainer = createAsyncThunk(
  "trainers/unfollow",
  async ({ trainerId, userId }, { rejectWithValue }) => {
    try {
      await trainersAPI.unfollow(trainerId, userId);
      return trainerId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const trainerSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {
    clearCurrentTrainer: (state) => {
      state.currentTrainer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainers = action.payload;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrainerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTrainer = action.payload;
      })
      .addCase(fetchTrainerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(followTrainer.fulfilled, (state, action) => {
        if (!state.followedTrainerIds.includes(action.payload)) {
          state.followedTrainerIds.push(action.payload);
        }
      })
      .addCase(unfollowTrainer.fulfilled, (state, action) => {
        state.followedTrainerIds = state.followedTrainerIds.filter(
          (id) => id !== action.payload
        );
      });
  },
});

export const { clearCurrentTrainer } = trainerSlice.actions;
export default trainerSlice.reducer;
