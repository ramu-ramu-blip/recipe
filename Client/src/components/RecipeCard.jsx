import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShareAlt, FaClock, FaUtensils, FaFire } from "react-icons/fa";
import api from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecipeCard({ recipe, onProcedure }) {
  const [isFav, setIsFav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if recipe is in favorites
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(favs.includes(recipe.id));
  }, [recipe.id]);

  const handleShare = (e) => {
    e.stopPropagation();
    const recipeUrl = `${window.location.origin}/procedure/${recipe.id}`;

    Swal.fire({
      title: `<h2 class="text-xl font-bold text-gray-800 mb-4">Share This Recipe</h2>`,
      html: `
        <div class="flex justify-center gap-6 text-3xl mb-4">
          <a href="https://api.whatsapp.com/send?text=Check out this delicious recipe: ${recipeUrl}" 
             target="_blank" 
             class="text-green-500 hover:scale-110 transition-transform duration-200 p-3 bg-green-50 rounded-full">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${recipeUrl}" 
             target="_blank" 
             class="text-blue-600 hover:scale-110 transition-transform duration-200 p-3 bg-blue-50 rounded-full">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com/intent/tweet?url=${recipeUrl}&text=Check out this amazing recipe!" 
             target="_blank" 
             class="text-sky-400 hover:scale-110 transition-transform duration-200 p-3 bg-sky-50 rounded-full">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="mailto:?subject=Amazing Recipe&body=Here's a great recipe you might like: ${recipeUrl}" 
             target="_blank" 
             class="text-amber-500 hover:scale-110 transition-transform duration-200 p-3 bg-amber-50 rounded-full">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
        <p class="text-gray-600 text-sm">Spread the culinary joy! 🍴</p>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      background: "#fefce8",
      width: 400,
      customClass: {
        popup: "rounded-3xl shadow-xl border border-amber-100",
      },
    });
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!token) {
      Swal.fire({
        title: "Login Required!",
        text: "Please login to save favorite recipes",
        icon: "warning",
        confirmButtonColor: "#d97706",
        confirmButtonText: "Go to Login",
        background: "#fefce8",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      if (isFav) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/api/favorites/${recipe.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add to favorites
        await axios.post(`http://localhost:5000/api/favorites/${recipe.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update local storage
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      const updatedFavs = isFav
        ? favs.filter((id) => id !== recipe.id)
        : [...favs, recipe.id];
      
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      setIsFav(!isFav);
      
      Swal.fire({
        title: isFav ? "Removed from Favorites" : "Added to Favorites!",
        text: isFav ? "Recipe removed from your favorites" : "Recipe added to your favorites collection",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#fefce8",
      });
    } catch (err) {
      console.error("❌ Favorite toggle error:", err.response?.data || err);
      
      // Show appropriate error message
      let errorMessage = "Failed to update favorites";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#d97706",
        background: "#fefce8",
      });
    }
  };

  const handleCardClick = () => {
    onProcedure(recipe.id);
  };

  return (
    <div 
      className="group from-amber-50 to-yellow-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-200 overflow-hidden cursor-pointer w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"}
          alt={recipe.title}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        
        <div className="absolute inset-0 from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

       
        <div className="absolute top-3 left-3">
          <span className="bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {recipe.cuisine || "Global"}
          </span>
        </div>

        
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-amber-600 font-semibold text-sm">View Recipe →</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
          {recipe.title}
        </h3>

        {/* Recipe Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <FaClock className="text-amber-500" />
            <span>{recipe.cook_time_min || 30} min</span>
          </div>
          <div className="flex items-center gap-1">
            <FaFire className="text-orange-500" />
            <span>{recipe.difficulty || "Medium"}</span>
          </div>
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <FaUtensils className="text-amber-500" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Action Buttons - Like and Share Side by Side */}
        <div className="flex items-center justify-evenly pt-3 border-t border-amber-200">
          {/* Like and Share Buttons Container */}
          <div className="flex items-center gap-3">
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-all duration-300 group/fav"
            >
              <div className={`p-2 rounded-full transition-colors ${
                isFav 
                  ? "bg-amber-500 text-white shadow-lg" 
                  : "bg-amber-100 group-hover/fav:bg-amber-200"
              }`}>
                {isFav ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
              </div>
              <span className="text-sm font-medium">
               
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-all duration-300 group/share"
            >
              <div className="p-2 bg-amber-100 rounded-full group-hover/share:bg-amber-200 transition-colors">
                <FaShareAlt size={14} />
              </div>
              
            </button>
          </div>

          {/* Cook Now Button */}
          <button
            onClick={handleCardClick}
            className="bg-gradient-to-r  from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            Cook Now
            <FaUtensils size={12} />
          </button>
        </div>
      </div>

      {/* Floating Animation */}
      <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-amber-200 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
    </div>
  );
}


