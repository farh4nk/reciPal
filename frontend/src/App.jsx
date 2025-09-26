import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Recipes from "./pages/Recipes"
import RecipeCard from "./pages/RecipeCard"
import Pantry from './pages/Pantry';
import GroceryList from './pages/GroceryList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;