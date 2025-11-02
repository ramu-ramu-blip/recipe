import React, { useEffect, useState, useContext } from 'react'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get('/recipes')
        console.log(res);
        
        setRecipes(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  const toggleFavorite = async (id) => {
    if (!user) {
      console.log(id);
      
      navigate('/login')
      return
    }
    try {
      await api.post(`/favorites/toggle/${id}`)
      setRecipes((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p className="text-center py-20">Loading recipes...</p>

  return (
    <div className="container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 bg-amber-200">
      {recipes.map((r) => (
        <div
          key={r.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative"
        >
          <img
            src={r.image || 'https://via.placeholder.com/300'}
            alt={r.title}
            className="rounded-lg w-full h-48 object-cover cursor-pointer"
            onClick={() => navigate(`/recipes/${r.id}`)}
          />
          <div className="mt-3">
            <h3
              onClick={() => navigate(`/recipes/${r.id}`)}
              className="font-semibold text-lg cursor-pointer hover:text-indigo-600"
            >
              {r.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{r.cuisine}</p>
          </div>
          <button
            onClick={() => toggleFavorite(r.id)}
            className="absolute top-3 right-3 text-xl text-red-500"
          >
            {r.isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      ))}
    </div>
  )
}
