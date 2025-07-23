import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";

const Navbar = () => {
  const { theme, toggleMode } = useTheme();
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <div className="mode-switch">
        <label>
          <input
            type="checkbox"
            onChange={toggleMode}
            checked={theme === "dark"}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
