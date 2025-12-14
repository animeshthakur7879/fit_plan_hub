import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import planReducer from "./planSlice";
import trainerReducer from "./trainerSlice";
import mauth from "./auth/mauthSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    trainers: trainerReducer,
    mauth
  },
});

export default store;
