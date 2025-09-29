from collections import Counter

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
missing_ingredients = {}


def recommend_groceries(user_pantry, saved_recipes):
    pantry_set = set(user_pantry)
    incomplete_recipes = []
    all_missing_ingredients = []
    for recipe in saved_recipes:
        recipe_ingredients_set = set(ingredient[1].split(',')[0] for ingredient in recipe['ingredients'])
        missing = list(recipe_ingredients_set - pantry_set)
        if missing:
            # This recipe is incomplete
            incomplete_recipes.append({
                'name': recipe['name'],
                'missing': missing
            })
            all_missing_ingredients.extend(missing)
    ingredient_counts = Counter(all_missing_ingredients)
    sorted_recommendations = ingredient_counts.most_common()    
    recommendation_strings = []

    for ingredient, count in sorted_recommendations:
        # Find which recipes this specific ingredient unlocks
        unlocked_recipes = []
        for recipe in incomplete_recipes:
            if ingredient in recipe['missing']:
                unlocked_recipes.append(recipe['name'])
        
        # Format the output string
        recipe_text = "recipes" if count > 1 else "recipe"
        unlocked_names = " and ".join(unlocked_recipes)
        
        recommendation_strings.append(
            f"💡 Buy {ingredient.title()} to unlock {count} new {recipe_text}: {unlocked_names}!"
        )
        
    return recommendation_strings

my_pantry = ['eggs', 'flour', 'butter', 'pasta']

# 2. Define the user's saved recipes with the correct structure
my_saved_recipes = [
    {
        'name': 'Pancakes',
        'ingredients': [['3', 'eggs'], ['1 cup', 'flour'], ['1 cup', 'milk']]
    },
    {
        'name': 'Omelette',
        'ingredients': [['2', 'eggs'], ['1 slice', 'cheese'], ['1 tbsp', 'butter']]
    },
    {
        'name': 'Mac & Cheese',
        'ingredients': [['200g', 'pasta'], ['1/2 cup', 'cheese'], ['1/2 cup', 'milk']]
    },
    {
        'name': 'Buttered Toast',
        'ingredients': [['1 tbsp', 'butter'], ['1 slice', 'toast']]
    }
]

# 3. Run the corrected algorithm
recommendations = recommend_groceries(my_pantry, my_saved_recipes)

# 4. Print the results
for r in recommendations:
    print(r)