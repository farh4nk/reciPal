from django.urls import path
from .views import (
    GetRecipeById, SearchRecipesByTitle,
    CreateRecipe, EditRecipe, AllRecipes
)

urlpatterns = [
    path("get/<int:id>", GetRecipeById.as_view(), name="recipe-get-by-title"),
    path("get/search/<str:title>", SearchRecipesByTitle.as_view(), name="recipe-search"),
    path("create", CreateRecipe.as_view(), name="recipe-create"),
    path("edit", EditRecipe.as_view(), name="recipe-edit"),
    path("get/all/", AllRecipes.as_view(), name="recipe-get-all")
]
