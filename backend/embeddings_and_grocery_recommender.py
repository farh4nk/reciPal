import os
import uuid
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
from collections import Counter
import json

#added comment for push
app = Flask(__name__)

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
substitution_model = genai.GenerativeModel('gemini-1.5-flash-latest')

ingredients_set = []

EMBEDDINGS_DB = {} 
RECIPES_DB = {} 


#saved_recipes = {
#  "recipes": [
#    {
#      "recipe_id": "recipe_123",
#      "name": "Creamy Garlic Mushroom Pasta",
#      "ingredients": [["200 grams", "pasta"], ["2 tablespoons", "butter"]],
#      "caption": "Creamy garlic mushroom pasta in under 20 minutes."
#    },
#    {
#      "recipe_id": "recipe_456",
#      "name": "Zucchini Cream Pasta",
#      "ingredients": [["200 grams", "penne pasta"], ["1", "onion, diced"]],
#      "caption": "Light and bright zucchini cream pasta."
#    }
#  ]
#}


def create_recipe_document(recipe):
    name = recipe.get('name', '')
    caption = recipe.get('caption', '')
    ingredient_names = [ing[1].split(',')[0] for ing in recipe.get('ingredients', [])]
    ingredients_string = ", ".join(ingredient_names)
    return f"Recipe: {name}. Description: {caption}. Ingredients: {ingredients_string}."

def recommend_groceries_with_substitutions(user_pantry, saved_recipes):
    pantry_set = set(user_pantry)
    incomplete_recipes = []
    all_missing_for_grocery_list = []
    substitution_suggestions = []
    for recipe in saved_recipes:
        recipe_ingredients_set = set(ing[1].split(',')[0] for ing in recipe.get('ingredients', []))
        missing_ingredients = list(recipe_ingredients_set - pantry_set)
        
        if not missing_ingredients:
            continue # User can make this recipe, so skip

        # --- NEW: Substitution Check Logic ---
        prompt = f"""
        You are a helpful culinary assistant. Your task is to find valid culinary substitutions.
        Analyze the list of "missing_ingredients" and see if any can be reasonably substituted by an item in the "pantry_ingredients".
        Rules:
        1. Only suggest common, valid substitutions.
        2. If a pantry ingredient can be used but requires a simple preparation step (e.g., blending oats to make oat flour), provide a brief instruction.
        3. If no valid substitutions are found, return an empty list.
        4. Respond ONLY with a valid JSON object in the following format:
           [
             {{
               "missing": "original missing ingredient",
               "pantry_substitute": "the ingredient from the pantry to use",
               "instruction": "A brief, simple preparation step, or null if not needed."
             }}
           ]
        Context:
        - Missing Ingredients: {json.dumps(missing_ingredients)}
        - Pantry Ingredients: {json.dumps(list(pantry_set))}
        JSON Response:
        """
        try:
            response = substitution_model.generate_content(prompt)
            
            substitutions = json.loads(response.text.replace("```json", "").replace("```", "").strip())
        except (json.JSONDecodeError, Exception) as e:
            print(f"Error processing substitutions for '{recipe['name']}': {e}")
            substitutions = []

        found_substitutes = {sub['missing']: sub for sub in substitutions}
        final_missing_ingredients = []
        for item in missing_ingredients:
            if item in found_substitutes:
                # A substitution was found! Add it to our suggestions list.
                sub_info = found_substitutes[item]
                substitution_suggestions.append(
                    f"✅ For '{recipe['name']}', you can substitute '{sub_info['missing']}' with '{sub_info['pantry_substitute']}'."
                    + (f" Just {sub_info['instruction'].lower()}" if sub_info.get('instruction') else "")
                )
            else:
                # No substitution found, this item is still needed for the grocery list.
                final_missing_ingredients.append(item)
        if final_missing_ingredients:
            incomplete_recipes.append({'name': recipe['name'], 'missing': final_missing_ingredients})
            all_missing_for_grocery_list.extend(final_missing_ingredients)
    
    grocery_recommendations = []
    if all_missing_for_grocery_list:
        ingredient_counts = Counter(all_missing_for_grocery_list)
        sorted_recommendations = ingredient_counts.most_common()
        for ingredient, count in sorted_recommendations:
            unlocked_recipes = [r['name'] for r in incomplete_recipes if ingredient in r['missing']]
            recipe_text = "recipes" if count > 1 else "recipe"
            unlocked_names = " and ".join(unlocked_recipes)
            grocery_recommendations.append(
                f"💡 Buy {ingredient.title()} to unlock {count} new {recipe_text}: {unlocked_names}!"
            )
            
    return substitution_suggestions + grocery_recommendations
  
  
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

    recommendations = recommend_groceries_with_substitutions(user_pantry, all_saved_recipes)
    
    return jsonify({"recommendations": recommendations})

