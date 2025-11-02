import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import axios from 'axios'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  console.log(id);
  console.log(recipe);
  
  

  useEffect(() => {
              axios.get(`http://localhost:5000/api/recipes/${id}`).then((res) => setRecipe(res.data))
  }, [id])

  if (!recipe) return <p className="text-center py-20">Loading recipe...</p>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <img
        src={recipe.image || 'https://via.placeholder.com/600x400'}
        alt={recipe.title}
        className="rounded-lg w-full h-64 object-cover mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-700 mb-4">{recipe.cuisine}</p>

      <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients?.split(',').map((ing, i) => (
          <li key={i}>{ing.trim()}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Steps:</h3>
      <ol className="list-decimal list-inside space-y-1 mb-4">
        {recipe.steps?.split('.').map((step, i) => (
          <li key={i}>{step.trim()}</li>
        ))}
      </ol>

      {recipe.video_url && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Video Tutorial:</h3>
          <iframe
            width="100%"
            height="315"
            src={recipe.video_url.replace('watch?v=', 'embed/')}
            title={recipe.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  )
}
