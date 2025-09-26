import React from 'react'
import Navbar from './Navbar'
import RecipeCard from './RecipeCard'

const Recipes = () => {
  return (
    <div>
        <Navbar />
        Recipes
        <RecipeCard 
        name="Creamy Garlic Mushroom Pasta"
        ingredients={[
        ["200 grams", "pasta"],
        ["2 tablespoons", "butter"],
        ["1 tablespoon", "olive oil"],
        ["3 cloves", "garlic, minced"],
        ["250 grams", "mushrooms, sliced"],
        ["1/2 cup", "heavy cream"],
        ["1/2 cup", "grated parmesan"],
        ["to taste", "salt"],
        ["to taste", "pepper"],
        ["some", "fresh parsley"]
      ]}
      caption="Creamy garlic mushroom pasta in under 20 minutes."
        />
    </div>
  )
}

export default Recipes