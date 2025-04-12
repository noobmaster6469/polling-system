import { LogOut, Moon, Sun, SunMoon, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore.js";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="navbar bg-base-200 fixed top-0 left-0">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Polling System
        </Link>
      </div>
      <div className="navbar-end">
        {authUser && (
          <button onClick={logout} className="btn btn-ghost btn-circle">
            <LogOut />
          </button>
        )}
        <button
          onClick={() => setTheme(theme == "dim" ? "light" : "dim")}
          className="btn btn-ghost btn-circle"
        >
          {theme == "dim" ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
