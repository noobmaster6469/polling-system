import React, { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Loginpage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import useThemeStore from "./store/useThemeStore.js";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, isAdmin } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  useEffect(() => {
    setTheme("dim");
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  console.log(authUser);
  return (
    <div data-theme={theme}>
      <Navbar />
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
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
