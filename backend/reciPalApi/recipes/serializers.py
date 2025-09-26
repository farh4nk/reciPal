from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", read_only=True)

    class Meta:
        model = Recipe
        fields = ["id", "title", "data", "user"]
        read_only_fields = ["id", "user"]
