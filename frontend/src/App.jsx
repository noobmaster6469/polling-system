import React from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Loginpage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

const App = () => {
  const { authUser } = useAuthStore();
  console.log(authUser);
  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!authUser ? <Loginpage /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
