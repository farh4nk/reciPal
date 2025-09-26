# backend/accounts/serializers.py
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers, exceptions

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate_password(self, value):
        validate_password(value)  # uses Django’s validators
        return value

    def validate_email(self, value):
        if value and User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

    def create(self, validated_data):
        # always use create_user so password is hashed
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email") or "",
            password=validated_data["password"],
        )

# Optional: allow login via username OR email with a single "login" field
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    # accept {"login": "...", "password": "..."} instead of username
    login = serializers.CharField(write_only=True)
    def validate(self, attrs):
        login = attrs.get("login")
        password = attrs.get("password")
        user = None

        if "@" in login:
            try:
                uname = User.objects.get(email__iexact=login).username
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed("Invalid credentials.", code="authorization")
            user = authenticate(username=uname, password=password)
        else:
            user = authenticate(username=login, password=password)

        if not user:
            raise exceptions.AuthenticationFailed("Invalid credentials.", code="authorization")

        # Put username into data for parent class to build tokens
        data = {"username": user.username, "password": password}
        # Trick the parent to use username/password flow
        self.fields["username"] = serializers.CharField(write_only=True)
        attrs.update({"username": user.username})

        validated = super().validate(attrs)
        # Include user info in response
        validated["user"] = UserSerializer(user).data
        return validated
