from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({
            'user' : UserSerializer(user, context = self.get_serializer_context()).data,
            'token' : AuthToken.objects.create(user)[1],
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        if isinstance(user, User):
            return Response({
                'user' : UserSerializer(user, context = self.get_serializer_context()).data,
                'token' : AuthToken.objects.create(user)[1],
            })
        return Response({
            'detail' : 'Incorrect username or password',
            'status' : 400,
        }, status = status.HTTP_400_BAD_REQUEST)


class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user
