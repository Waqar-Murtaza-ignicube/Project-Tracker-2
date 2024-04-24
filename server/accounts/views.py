"""imported modules"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .serializers import SignUpSerializer, MemberSignupSerializer

class SignUpView(APIView):
    """Registration request"""
    def post(self, request):
        """post apiview method"""
        serializer = SignUpSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    """SignIn request"""
    def post(self, request):
        """post apiview method"""
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            group = request.user.groups.get().name
            return Response({'token': token.key, 'group': group}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    """SignOut request"""
    def post(self, request):
        """post apiview method"""
        request.user.auth_token.delete()
        logout(request)
        return Response({"detail": "You have been Successfully logged out."}, status=status.HTTP_200_OK)

class MemberSignupView(APIView):
    """MemberSignOut request"""
    def post(self, request):
        """post apiview method"""
        serializer = MemberSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
