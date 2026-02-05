import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

// const API = import.meta.env.VITE_API_URL   // ✅ ADD THIS
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getAllRecipes = async () => {
  const res = await axios.get(`${API}/recipe`)
  return res.data
}

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user?._id)
}

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || []
}

const getRecipe = async ({ params }) => {
  let recipeRes = await axios.get(`${API}/recipe/${params.id}`)
  let recipe = recipeRes.data

  let userRes = await axios.get(`${API}/user/${recipe.createdBy}`)
  recipe = { ...recipe, email: userRes.data.email }

  return recipe
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
