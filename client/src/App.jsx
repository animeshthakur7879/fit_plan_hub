import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchCurrentUser } from "./redux/authSlice";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import TrainerDashboard from "./pages/TrainerDashboard";
import TrainerProfile from "./pages/TrainerProfile";
import Feed from "./pages/Feed";
import MySubscriptions from "./pages/MySubscriptions";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  // const { muser } = useSelector((state) => state.auth);
  const {muser} = useSelector((state) => state.mauth);

  // useEffect(() => {
  //   if (token && !user) {
  //     dispatch(fetchCurrentUser());
  //   }
  // }, [dispatch, token, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/:id" element={<PlanDetails />} />
        <Route path="/trainer/:id" element={<TrainerProfile />} />
        
        {/* Protected User Routes */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MySubscriptions />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Trainer Routes */}
        <Route
          path="/trainer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
