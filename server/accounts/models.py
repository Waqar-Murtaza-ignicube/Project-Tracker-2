"""imported modules"""
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

class UserManager(BaseUserManager):
    """custom usermanager to override usermodel methods"""
    def create_user(self, email, password, **extra_fields):
        """To override builtin create_user method"""
        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """To override builtin create_superuser method"""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Super user must have is_staff being True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Super user must have is_superuser being True")

        return self.create_user(email=email, password=password, **extra_fields)

class CustomUser(AbstractUser):
    """User model"""
    email = models.EmailField(max_length=80, unique=True)
    username = models.CharField(max_length=55)
    date_of_birth = models.DateField(null=True)
    CHOICES = [
        ("male","Male"),
        ("female","Female")
    ]
    gender = models.CharField(max_length=8, choices=CHOICES, default='Male')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.username}"
