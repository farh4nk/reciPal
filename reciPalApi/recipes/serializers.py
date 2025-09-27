# recipes/serializers.py
from rest_framework import serializers
from .models import Recipe, Ingredient


# 1. Ingredient Serializer
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        # Include the fields you defined in your Ingredient model
        fields = ['name', 'quantity', 'unit']

# 2. Recipe Serializer
class RecipeSerializer(serializers.ModelSerializer):
    # This nests the ingredients data within the recipe JSON response.
    # 'many=True' means it expects a list of ingredients.
    ingredients = IngredientSerializer(many=True, read_only=True) 

    class Meta:
        model = Recipe
        # Include all fields the API should handle
        fields = [
            'id', 
            'user', 
            'title', 
            'data' 
            
        ]
        # The 'user' field will be set automatically based on the logged-in user, 
        # so it's read-only for incoming data.
        read_only_fields = ['user']