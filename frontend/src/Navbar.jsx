import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/grocerylist">Grocery List</Link>
        <Link to="/pantry">Pantry</Link>
        <Link to="/user">User Profile</Link>
    </div>
  )
}

export default Navbar