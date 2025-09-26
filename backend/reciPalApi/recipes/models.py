from django.conf import settings
from django.db import models

class Recipe(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recipes",
    )
    title = models.CharField(max_length=200)
    data = models.JSONField(default=dict, blank=True)
