import "./App.css";
import React, { useState } from "react";

function App() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });
  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // add code to send the recipe to database
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Ingredients:
        <input
          type="text"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        />
      </label>
      <label>
        Instructions:
        <textarea
          name="instructions"
          value={recipe.ingredients}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default App;
