import numpy as np
recipe_documents = []
recipe_ids = []
ingredients_set = []
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
for recipe in saved_recipes['recipes']:
    # Add the ID to the IDs list
    recipe_ids.append(recipe['recipe_id'])
    
    # Create the descriptive document string
    name = recipe['name']
    caption = recipe['caption']
    ingredient_names = [ing[1] for ing in recipe['ingredients']]
    ingredients_string = ", ".join(ingredient_names)
    recipe_ingredients_set = set(ingredient[1].split(',')[0] for ingredient in recipe['ingredients'])
    document = f"Recipe: {name}. Description: {caption}. Ingredients: {ingredients_string}."
    
    # Add the document to the documents list
    recipe_documents.append(document)
    ingredients_set.append(recipe_ingredients_set)

print("--- Prepared Data ---")
print("IDs:", recipe_ids)
print("Documents:", recipe_documents)

for doc in recipe_documents:
    print(doc)
    print("-" * 20)
print(f"here is the ingredient set: {recipe_ingredients_set}")
for ingredient in recipe_ingredients_set:
    print(ingredient)

from google import genai
from google.genai import types
client = genai.Client(api_key)

result = [
    np.array(e.values) for e in client.models.embed_content(
        model="gemini-embedding-001",
        contents=recipe_documents,
        config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")).embeddings
]

embeddings_matrix = np.array(result)

formatted_embeddings = []
for id, embedding in zip(recipe_ids, result):
    formatted_embeddings.append({
        'id': id,
        'embedding': embedding
    })

print("\n--- Final Mapped Data ---")
print(formatted_embeddings)

print(formatted_embeddings[0])

