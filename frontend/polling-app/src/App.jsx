import React from "react";
import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import HomePage from "./pages/Dashboard/HomePage";
import CreatePollPage from "./pages/Dashboard/CreatePollPage";
import MyPollsPage from "./pages/Dashboard/MyPollsPage";
import VotedPollsPage from "./pages/Dashboard/VotedPolls";
import BookMarksPage from "./pages/Dashboard/BookmarksPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/create-poll" element={<CreatePollPage />} />
        <Route path="/my-polls" element={<MyPollsPage />} />
        <Route path="/voted-polls" element={<VotedPollsPage />} />
        <Route path="/bookmarks" element={<BookMarksPage />} />
      </Routes>
    </div>
  );
};

export default App;

// Define the Root component to handle the initial redirect
const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/signin" />;
};
