"""imported modules"""
from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.contrib.auth.models import Group
from .models import CustomUser

class SignUpSerializer(serializers.ModelSerializer):
    """user signup serializer"""
    email = serializers.EmailField(max_length=80)
    username = serializers.CharField(max_length=55)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        "defining fields and user from model"
        model = CustomUser
        fields = ("email","username","password","date_of_birth","gender")

    def validate(self, attrs):
        email_exists = CustomUser.objects.filter(email=attrs['email']).exists()
        if email_exists:
            raise ValidationError("email already exists")
        return super().validate(attrs)

    def create(self, validated_data):
        admin_group = Group.objects.get(name='Admin')
        date_of_birth = validated_data.pop('date_of_birth', None)
        user = CustomUser.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.groups.add(admin_group)
        if date_of_birth:
            user.date_of_birth = date_of_birth
            user.save()
        return user

class MemberSignupSerializer(serializers.ModelSerializer):
    """member signup serializer"""
    email = serializers.EmailField(max_length=80)
    username = serializers.CharField(max_length=55)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        "defining fields and user from model"
        model = CustomUser
        fields = ('email', 'username', 'password')

    def validate(self, attrs):
        email_exists = CustomUser.objects.filter(email=attrs['email']).exists()
        if email_exists:
            raise ValidationError("email already exists")
        return super().validate(attrs)

    def create(self, validated_data):
        admin_group = Group.objects.get(name='Member')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.groups.add(admin_group)
        user.save()
        return user
