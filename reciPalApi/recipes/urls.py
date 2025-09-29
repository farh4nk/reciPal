# recipes/urls.py
from rest_framework.routers import DefaultRouter
from .views import RecipeViewSet

# 1. Initialize the router
router = DefaultRouter()

# 2. Register your RecipeViewSet. 
# This automatically creates all CRUD endpoints (e.g., /recipes/, /recipes/1/, etc.)
router.register(r'recipes', RecipeViewSet, basename='recipe')

# 3. The urlpatterns list is now the router's generated URL list
urlpatterns = router.urls