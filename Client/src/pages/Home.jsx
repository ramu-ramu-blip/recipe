import React, { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await api.get("http://localhost:5000/api/recipes");
      setAllRecipes(res.data);
      setFilteredRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  //  Search recipes
  const handleSearch = () => {
    const term = query.toLowerCase().trim();
    const filtered = allRecipes.filter((r) => {
      const title = r.title?.toLowerCase() || "";
      const cuisine = r.cuisine?.toLowerCase() || "";
      const ingredients = r.ingredients?.toLowerCase() || "";
      const cookTime = r.cook_time_min?.toString() || "";
      return (
        title.includes(term) ||
        cuisine.includes(term) ||
        ingredients.includes(term) ||
        cookTime.includes(term)
      );
    });
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  };

  //   filters
  const applyFilter = (filter) => {
    setActiveFilter(filter);
    let filtered = [...allRecipes];

    switch (filter) {
      case "quick":
        filtered = allRecipes.filter((r) => r.cook_time_min <= 20);
        break;
      case "medium":
        filtered = allRecipes.filter(
          (r) => r.cook_time_min > 20 && r.cook_time_min <= 45
        );
        break;
      case "long":
        filtered = allRecipes.filter((r) => r.cook_time_min > 45);
        break;
      case "veg":
        filtered = allRecipes.filter((r) =>
          r.ingredients?.toLowerCase().includes("vegetable")
        );
        break;
      case "nonveg":
        filtered = allRecipes.filter(
          (r) =>
            r.ingredients?.toLowerCase().includes("chicken") ||
            r.ingredients?.toLowerCase().includes("egg") ||
            r.ingredients?.toLowerCase().includes("fish")
        );
        break;
      default:
        filtered = allRecipes;
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  };

  const handleProcedure = (id) => {
    navigate(`/procedure/${id}`);
  };

  // next opage logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-6">
      <div className="flex mb-4">
        <input
          className="border p-2 flex-1 rounded-l-lg focus:outline-none"
          placeholder="Search by recipe, ingredient, cuisine, or time..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-orange-300 text-white px-4 rounded-r-lg hover:bg-orange-400"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {[
          { key: "all", label: "All", emoji: "🍽️" },
          { key: "quick", label: "Quick (<20 min)", emoji: "⚡" },
          { key: "medium", label: "Medium (20–45 min)", emoji: "⏱️" },
          { key: "long", label: "Long (>45 min)", emoji: "🍳" },
          { key: "veg", label: "Veg", emoji: "🥬" },
          { key: "nonveg", label: "Non-Veg", emoji: "🍗" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => applyFilter(f.key)}
            className={`
        px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 
        transform hover:scale-105 shadow-sm hover:shadow-md
        ${
          activeFilter === f.key
            ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white border-orange-400 shadow-md scale-105"
            : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-500"
        }
      `}
          >
            <span className="mr-2">{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} onProcedure={handleProcedure} />
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No recipes found. Try another search or filter.
          </p>
        )}
      </div>

      {/*  Pagination */}
      {filteredRecipes.length > recipesPerPage && (
        <div className="flex flex-col items-center mt-8 space-y-2">
          <div className="flex gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-300 text-white hover:bg-orange-400"
              }`}
            >
              Prev
            </button>

            <span className="flex items-center font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-300 text-white hover:bg-orange-400"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
