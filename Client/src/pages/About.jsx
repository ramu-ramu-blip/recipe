import React from "react";
import { FaUtensils, FaHeart, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6 md:px-20">
   {/* logo  */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-amber-500 mb-3">About RecipeApp</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to <span className="font-semibold">RecipeApp</span> — your personal cooking assistant!  
          We help food lovers discover, save, and cook delicious recipes from around the world.
        </p>
      </div>

      
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaUtensils className="text-amber-500 text-3xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Discover Recipes</h2>
          <p className="text-gray-600 text-sm">
            Explore hundreds of curated recipes across cuisines — from classic pancakes to authentic Pad Thai.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaHeart className="text-pink-500 text-3xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Save Favourites</h2>
          <p className="text-gray-600 text-sm">
            Create your own list of favourite recipes so you can find them anytime, anywhere.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaLightbulb className="text-yellow-500 text-3xl mb-3" />
          <h2 className="font-semibold text-xl mb-2">Smart Suggestions</h2>
          <p className="text-gray-600 text-sm">
            Get personalized recipe ideas based on your ingredients, cooking time, or preferences.
          </p>
        </div>
      </div>

      
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-amber-500 mb-3">Our vission</h2>
        <p className="text-gray-600">
          At RecipeApp, we believe cooking should be simple, fun, and creative.  
          Whether you’re a beginner or a master chef, we provide tools that make meal planning and discovery effortless.  
          With features like grocery list generation and step-by-step cooking procedures,  
          our goal is to turn your kitchen into a place of inspiration.
        </p>
      </div>

     
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>Developed with ❤️ by <span className="text-amber-500 font-semibold">RecipeApp Team</span></p>
      </div>
    </div>
  );
};

export default About;
