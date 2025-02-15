import { Moon, Sun, SunMoon, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <div className="navbar bg-base-200 fixed top-0 left-0">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Polling System
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/profile">
          <button className="btn btn-ghost btn-circle">
            <User />
          </button>
        </Link>
        <button
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
          className="btn btn-ghost btn-circle"
        >
          {theme == "dark" ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
