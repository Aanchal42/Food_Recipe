import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let value;

    if (e.target.name === "ingredients") {
      value = e.target.value.split(",");
    } else if (e.target.type === "file") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }

    setRecipeData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("instructions", recipeData.instructions);
    formData.append(
      "ingredients",
      JSON.stringify(recipeData.ingredients)
    );
    formData.append("file", recipeData.file);

    try {
      await axios.post("http://localhost:5000/recipe", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input type="text" name="title" onChange={onHandleChange} />
        </div>

        <div className="form-control">
          <label>Time</label>
          <input type="text" name="time" onChange={onHandleChange} />
        </div>

        <div className="form-control">
          <label>Ingredients (comma separated)</label>
          <textarea name="ingredients" rows="5" onChange={onHandleChange} />
        </div>

        <div className="form-control">
          <label>Instructions</label>
          <textarea name="instructions" rows="5" onChange={onHandleChange} />
        </div>

        <div className="form-control">
          <label>Recipe Image</label>
          <input type="file" name="file" onChange={onHandleChange} />
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
