from django.conf import settings
from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    data = models.JSONField(default=dict, blank=True)
