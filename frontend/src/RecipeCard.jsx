import React from 'react'

const RecipeCard = ({name, ingredients, caption}) => {
  return (
    <article>
        <h2>Recipe Name: {name}</h2>
        <ul>Ingredients: 
            { ingredients.map((ingredient) => {
                return (
                    <li>{ingredient}</li>
                )
            }) }
            
        </ul>
        <p>{caption}</p>
    </article>
  )
}

export default RecipeCard