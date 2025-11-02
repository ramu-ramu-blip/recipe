// src/pages/Procedure.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

function getYouTubeEmbed(urlOrId) {
  if (!urlOrId) return null;
  
  const ytMatch = urlOrId.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  const id = ytMatch ? ytMatch[1] : urlOrId;
  return `https://www.youtube.com/embed/${id}`;
}

export default function Procedure() {
  const [list, setList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        console.log(res);
        
        setRecipe(res.data);
      } catch (err) {
        console.error("Error loading recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!recipe) return <p className="p-6">Recipe not found.</p>;
 const handleClick = () => {
   
    setList([...recipe.ingredients.split(", ")]);
  };
  

  // console.log("line 47", typeof recipe.ingredients.split(", "));
  console.log("line 49", list);
  console.log(recipe.list);
  

  const steps = Array.isArray(recipe.steps)
    ? recipe.steps
    : recipe.steps
    ? recipe.steps
        .split("||")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const embedSrc = getYouTubeEmbed(recipe.video_url);
  console.log("line 47", recipe.video_url);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-600"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {recipe.cuisine} • {recipe.cook_time_min} min
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Steps</h2>
          {steps.length ? (
            <ol className="list-decimal ml-5 space-y-2 text-gray-700">
              {steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">
              No step-by-step instructions available.
            </p>
          )}
        </div>
        <div>
          <button className=" p-2 bg-amber-600 text-white font-bold rounded-md cursor-pointer" onClick={handleClick}>Grocery List</button>
          <ul className=" list-disc">
            {list.map((item) => 
              <li  className="ml-8 ">{item}</li>
            )}
          </ul>
        </div>
        <div>
          {embedSrc ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">Video Tutorial</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title="Recipe video"
                  src={embedSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-56 rounded"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No video available for this recipe.</p>
          )}
        </div>
      </div>
    </div>
  );
}
