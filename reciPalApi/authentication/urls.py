# backend/backend/urls.py
from django.urls import path
from .views import SignupView, MeView, SigninView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("signin/", SigninView.as_view(), name="signin"),            # returns access/refresh + user
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),                        # requires Authorization: Bearer <access>
]
