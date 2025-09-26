import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Recipes from './Recipes.jsx'
import GroceryList from './GroceryList.jsx'
import Pantry from './Pantry.jsx'
import User from './User.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/grocerylist' element={<GroceryList />}></Route>
          <Route path='/recipes' element={<Recipes />}></Route>
          <Route path='/pantry' element={<Pantry />}></Route>
          <Route path='/user' element={<User />}></Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
