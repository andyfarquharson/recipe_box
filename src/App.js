import React, { useState } from "react";
import "./App.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("/api/login", { email: user.email, password: user.password })
      .then((response) => {
        setIsLoggedIn(true);
        navigate.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    axios
      .post("/api/signup", { email: user.email, password: user.password })
      .then((response) => {
        setIsLoggedIn(true);
        navigate.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .post("/api/logout")
      .then((response) => {
        setIsLoggedIn(false);
        navigate.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/recipes", recipe)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={(event) =>
                  setUser({ ...user, password: event.target.value })
                }
              />
            </label>
            <button type="submit">Login</button>
          </form>
          <button onClick={handleSignup}>Signup</button>
        </div>
      ) : (
        <div>
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default App;
