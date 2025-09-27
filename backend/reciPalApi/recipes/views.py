from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import Recipe
from .serializers import RecipeSerializer
from .services import transcribe_and_extract_recipe

class GetRecipeById(APIView):
    """
    GET /api/recipes/get/<title>
    Return the raw JSON from the DB (recipe.data) for the current user's recipe.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, id: str):
        recipe = Recipe.objects.get(pk=id)
        # "Just literally" return the JSON payload you stored:
        return Response(recipe.data, status=status.HTTP_200_OK)


class SearchRecipesByTitle(APIView):
    """
    GET /api/recipes/get/search/<title>
    Case-insensitive search in the current user's titles.
    """
    permission_classes = [permissions.AllowAny]
    def get(self, request, title: str):
        qs = Recipe.objects.filter(title__icontains=title.strip())[:50]
        return Response(RecipeSerializer(qs, many=True).data, status=status.HTTP_200_OK)
    
class AllRecipes(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        qs = Recipe.objects.all()
        return Response(RecipeSerializer(qs, many=True).data, status=status.HTTP_200_OK)
    
class CreateRecipe(APIView):
    """
    POST /api/recipes/create
    Body (JSON or form-data):
      - title: str (required)
      - reel_url (or url): str (required) -> Instagram reel/post URL

    Behavior:
      - Validates Instagram URL
      - Downloads the reel (your function)
      - Runs Gemini transcription/extraction
      - Saves Recipe(owner,title,data)
    """
    permission_classes = [permissions.AllowAny]
    parser_classes = [JSONParser, FormParser]

    def post(self, request):
        reel_url = (request.data.get("reel_url") or request.data.get("url") or "").strip()

        if not reel_url:
            return Response({"reel_url": "Provide an Instagram reel URL."}, status=400)

        try:
            data = transcribe_and_extract_recipe(reel_url)
        except NotImplementedError:
            # Soft fallback → lets you test end-to-end before you wire the downloader & Gemini
            data = {"transcript": "", "ingredients": [], "notes": "TODO: wire IG downloader + Gemini"}
        except ValueError as ve:
            return Response({"reel_url": str(ve)}, status=400)
        except FileNotFoundError as fe:
            return Response({"reel_url": str(fe)}, status=422)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        recipe = Recipe(title=data["name"], data=data)
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
    permission_classes = [permissions.AllowAny]
    parser_classes = [JSONParser]

    def post(self, request):
        return self._update(request)

    def patch(self, request):
        return self._update(request)

    def _update(self, request):
        idd = request.data.get("id")
        if not idd:
            return Response({"title": "This field is required."}, status=400)
        if "data" not in request.data:
            return Response({"data": "Provide the JSON payload to store."}, status=400)

        recipe = Recipe.objects.get(pk=idd)

        recipe.data = request.data.get("data")
        recipe.save()
        return Response(RecipeSerializer(recipe).data, status=status.HTTP_200_OK)

