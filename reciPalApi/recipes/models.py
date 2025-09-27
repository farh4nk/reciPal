# Create your models here.
# recipes/models.py
from django.db import models
from django.conf import settings # Use settings.AUTH_USER_MODEL for user ForeignKey

# 1. Define the main Recipe object
class Recipe(models.Model):
    # Links the recipe to the user who saved it
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recipes')

    title = models.CharField(max_length=255)
    data = models.JSONField(default = dict, blank = True)  # Store recipe details as JSON
    


    
