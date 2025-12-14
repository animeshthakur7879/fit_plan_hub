import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import planReducer from "./planSlice";
import trainerReducer from "./trainerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    trainers: trainerReducer,
  },
});

export default store;
