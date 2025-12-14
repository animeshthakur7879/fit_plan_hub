import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import planReducer from "./planSlice";
import trainerReducer from "./trainerSlice";
import mauth from "./auth/mauthSlice";
// import mplans from "./plans/mplansSlice";
import mplans from "./plan/mplanSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    trainers: trainerReducer,
    mauth , 
    mplans
  },
});

export default store;
