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
        fields = ("email","username","password", "date_of_birth","gender")

    def validate(self, attrs):
        """validating if the admin with same username or email exists"""
        email_exists = CustomUser.objects.filter(email__iexact=attrs['email']).exists()
        username_exists = CustomUser.objects.filter(username__iexact=attrs['username']).exists()

        if email_exists:
            raise ValidationError("email already exists")
        if username_exists:
            raise ValidationError("username already exists")
        return super().validate(attrs)

    def create(self, validated_data):
        """creating the admin for the first time"""
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
        """validating if the member with same username or email exists"""
        email_exists = CustomUser.objects.filter(email__iexact=attrs['email']).exists()
        username_exists = CustomUser.objects.filter(username__iexact=attrs['username']).exists()
        if email_exists:
            raise ValidationError("email already exists")
        if username_exists:
            raise ValidationError("username already exists")
        return super().validate(attrs)

    def create(self, validated_data):
        """creating the member for the first time"""
        admin_group = Group.objects.get(name='Member')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.groups.add(admin_group)
        user.save()
        return user
