import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Recipes from "./Recipes.jsx";
import Pantry from "./Pantry.jsx";
import GroceryList from "./GroceryList.jsx";
import RecipeCard from "./RecipeCard.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import User from "./User.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/recipes" element={<Recipes />} />
  <Route path="/recipes/:id" element={<RecipeCard />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/grocery" element={<GroceryList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        {/* Optional placeholders for links shown on Home */}
        {/* Optional placeholders for links shown on Home */}
        {/* Optional placeholders for links shown on Home */}
        <Route path="*" element={<div className="container" style={{padding:"32px 20px"}}>Page not found.</div>} />
      </Routes>
    </>
  );
}

export default App;
