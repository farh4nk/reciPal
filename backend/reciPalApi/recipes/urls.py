from django.urls import path
from .views import (
    GetRecipeByTitle, GetRecipesByUser, SearchRecipesByTitle,
    CreateRecipe, EditRecipe, AllRecipes
)

urlpatterns = [
    path("get/<str:title>", GetRecipeByTitle.as_view(), name="recipe-get-by-title"),
    path("get/user/<str:username>", GetRecipesByUser.as_view(), name="recipe-get-by-user"),
    path("get/search/<str:title>", SearchRecipesByTitle.as_view(), name="recipe-search"),
    path("create", CreateRecipe.as_view(), name="recipe-create"),
    path("edit", EditRecipe.as_view(), name="recipe-edit"),
    path("get/all", AllRecipes.as_view(), name="recipe-get-all")
]
