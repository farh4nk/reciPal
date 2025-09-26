from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SignupSerializer, UserSerializer, EmailOrUsernameTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class SignupView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SignupSerializer

class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class SigninView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EmailOrUsernameTokenObtainPairSerializer

