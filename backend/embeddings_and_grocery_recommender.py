import os
import uuid
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
from collections import Counter

app = Flask(__name__)

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

recipe_documents = []
recipe_ids = []
ingredients_set = []
EMBEDDINGS_DB = {} 
RECIPES_DB = {} 


saved_recipes = {
  "recipes": [
    {
      "recipe_id": "recipe_123",
      "name": "Creamy Garlic Mushroom Pasta",
      "ingredients": [["200 grams", "pasta"], ["2 tablespoons", "butter"]],
      "caption": "Creamy garlic mushroom pasta in under 20 minutes."
    },
    {
      "recipe_id": "recipe_456",
      "name": "Zucchini Cream Pasta",
      "ingredients": [["200 grams", "penne pasta"], ["1", "onion, diced"]],
      "caption": "Light and bright zucchini cream pasta."
    }
  ]
}


def create_recipe_document(recipe):
    name = recipe.get('name', '')
    caption = recipe.get('caption', '')
    ingredient_names = [ing[1].split(',')[0] for ing in recipe.get('ingredients', [])]
    ingredients_string = ", ".join(ingredient_names)
    return f"Recipe: {name}. Description: {caption}. Ingredients: {ingredients_string}."

def recommend_groceries(user_pantry, saved_recipes_list):
    pantry_set = set(user_pantry)
    incomplete_recipes = []
    all_missing_ingredients = []
    for recipe in saved_recipes_list:
      recipe_ingredients_set = set(ing[1].split(',')[0] for ing in recipe.get('ingredients', []))
      missing = list(recipe_ingredients_set - pantry_set)
      if missing:
        incomplete_recipes.append({'name': recipe['name'], 'missing': missing})
        all_missing_ingredients.extend(missing)
  
    if not all_missing_ingredients:
      return ["You have all the ingredients for your saved recipes!"]
    
    ingredient_counts = Counter(all_missing_ingredients)
    sorted_recommendations = ingredient_counts.most_common()
  
    recommendation_strings = []
    for ingredient, count in sorted_recommendations:
      unlocked_recipes = [r['name'] for r in incomplete_recipes if ingredient in r['missing']]
      recipe_text = "recipes" if count > 1 else "recipe"
      unlocked_names = " and ".join(unlocked_recipes)
      recommendation_strings.append(
          f"💡 Buy {ingredient.title()} to unlock {count} new {recipe_text}: {unlocked_names}!"
      )
    return recommendation_strings
  
  
@app.route('/api/add-recipe', methods=['POST'])
def add_recipe():
    recipe_data = request.json
    if not recipe_data or 'name' not in recipe_data:
        return jsonify({"error": "Invalid recipe data"}), 400
    
    recipe_id = str(uuid.uuid4()) # Generate a unique ID
    RECIPES_DB[recipe_id] = recipe_data
    print(f"Recipe '{recipe_data['name']}' saved with ID: {recipe_id}")

    recipe_document = create_recipe_document(recipe_data)
    result = genai.embed_content(
        model="models/embedding-001",
        content=recipe_document,
        task_type="RETRIEVAL_DOCUMENT"
    )
    embedding = result['embedding']
    EMBEDDINGS_DB[recipe_id] = embedding
    print(f"Embedding generated and saved for recipe ID: {recipe_id}")
    
    return jsonify({"message": "Recipe added successfully", "recipe_id": recipe_id}), 201

@app.route('/api/recommend-groceries', methods=['POST'])
def get_grocery_recommendations():
    data = request.json
    user_pantry = data.get('pantry', [])

    all_saved_recipes = list(RECIPES_DB.values())
    
    if not all_saved_recipes:
        return jsonify({"recommendations": ["No recipes saved yet! Add some to get recommendations."]})

    recommendations = recommend_groceries(user_pantry, all_saved_recipes)
    
    return jsonify({"recommendations": recommendations})

