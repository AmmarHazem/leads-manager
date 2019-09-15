from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(write_only = True, style = {'input_type' : 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        print('--- register data ', data)
        password = data['password']
        passowrd2 = data['password2']
        print(password, passowrd2)
        if not passowrd2 == password:
            raise serializers.ValidationError('Password fields did not match')
        return data

    def create(self, validated_data):
        return User.objects.create_user(
            validated_data.get('username'),
            validated_data.get('email'),
            validated_data.get('password'),
        )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')
