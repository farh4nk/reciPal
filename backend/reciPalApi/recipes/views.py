from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import Recipe
from .serializers import RecipeSerializer
from .services import generate_recipe_json_from_media

User = get_user_model()

class GetRecipeByTitle(APIView):
    """
    GET /api/recipes/get/<title>
    Return the raw JSON from the DB (recipe.data) for the current user's recipe.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, title: str):
        recipe = get_object_or_404(
            Recipe.objects.filter(user=request.user),
            title__iexact=title.strip()
        )
        # "Just literally" return the JSON payload you stored:
        return Response(recipe.data, status=status.HTTP_200_OK)


class GetRecipesByUser(APIView):
    """
    GET /api/recipes/get/user/<username>
    Return all recipes for that user. (Owner-only for privacy.)
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, username: str):
        if username != request.user.username:
            return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        qs = Recipe.objects.filter(user=request.user).order_by("-created_at")
        return Response(RecipeSerializer(qs, many=True).data, status=status.HTTP_200_OK)


class SearchRecipesByTitle(APIView):
    """
    GET /api/recipes/get/search/<title>
    Case-insensitive search in the current user's titles.
    """

    def get(self, request, title: str):
        qs = Recipe.objects.filter(title__icontains=title.strip())[:50]
        return Response(RecipeSerializer(qs, many=True).data, status=status.HTTP_200_OK)
    
class AllRecipes(APIView):

    def get(self, request):
        qs = Recipe.objects.all()[:50]
        return Response(RecipeSerializer(qs, many=True).data, status=status.HTTP_200_OK)


class CreateRecipe(APIView):
    """
    POST /api/recipes/create
    Multipart form:
      - title: str (required)
      - file: mp3/mp4 (required)  -> parsed with Gemini into JSON
    Returns the created object.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request):
        title = (request.data.get("title") or "").strip()
        file_obj = request.FILES.get("file")

        if not title:
            return Response({"title": "This field is required."}, status=400)
        if not file_obj:
            return Response({"file": "Upload an mp3/mp4 file."}, status=400)

        try:
            # ---- integrate Gemini here (stub call) ----
            data = generate_recipe_json_from_media(file_obj)
            # -------------------------------------------
        except NotImplementedError:
            # Soft fallback so you can test the flow before wiring Gemini:
            data = {"transcript": "", "ingredients": [], "notes": "TODO: wire Gemini"}

        recipe = Recipe(user=request.user, title=title, data=data)
        try:
            recipe.save()
        except IntegrityError:
            return Response(
                {"title": "You already have a recipe with this title."},
                status=status.HTTP_409_CONFLICT,
            )

        return Response(RecipeSerializer(recipe).data, status=status.HTTP_201_CREATED)


class EditRecipe(APIView):
    """
    PUT/PATCH /api/recipes/edit
    JSON body:
      {
        "title": "<existing title to modify>",
        "data": { ...any JSON... }   # this will fully replace the stored JSON
      }
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def put(self, request):
        return self._update(request)

    def patch(self, request):
        return self._update(request)

    def _update(self, request):
        title = (request.data.get("title") or "").strip()
        if not title:
            return Response({"title": "This field is required."}, status=400)
        if "data" not in request.data:
            return Response({"data": "Provide the JSON payload to store."}, status=400)

        recipe = get_object_or_404(
            Recipe.objects.filter(user=request.user),
            title__iexact=title
        )
        recipe.data = request.data["data"]
        recipe.save()
        return Response(RecipeSerializer(recipe).data, status=status.HTTP_200_OK)

