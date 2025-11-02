import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaUtensils } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-orange-300 text-[18px] font-semibold text-white shadow">
      
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <FaUtensils className="text-2xl" />
        <span className="text-xl font-bold">RecipeApp</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/home" className="hover:text-gray-200">Home</Link>
        <Link to="/about" className="hover:text-gray-200">About</Link>
        <Link to="/contact" className="hover:text-gray-200">Contact</Link>
      </div>

      {/* User Section */}
      {user ? (
        <div className="relative">
          {user.name ? (
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 bg-white text-indigo-500 font-bold flex items-center justify-center rounded-full cursor-pointer border-2 border-indigo-300"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg z-10">
              <p className="px-4 py-2 border-b text-sm text-gray-600">
                {user.name || "Profile"}
              </p>
              <Link
                to="/favorites"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                My Favorites ❤️
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      )}
    </nav>
  );
}