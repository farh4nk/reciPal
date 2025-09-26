# recipes/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Recipe
from .serializers import RecipeSerializer # Assuming you created this file

class RecipeViewSet(viewsets.ModelViewSet):
    # This must match the name 'RecipeViewSet' used in recipes/urls.py
    
    # 1. Permission Check
    permission_classes = [IsAuthenticated]
    
    # 2. Serializer to format data
    serializer_class = RecipeSerializer

    # 3. Filtering: Only show recipes owned by the current user.
    def get_queryset(self):
        # We use .filter() to restrict the results
        return Recipe.objects.filter(user=self.request.user).order_by('-created_at')

    # 4. User Association: Automatically set the user when creating a new recipe.
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)