"""imported modules"""
from django.db import models
from accounts.models import CustomUser

class Company(models.Model):
    """company model"""
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=55)
    company_employees = models.IntegerField(default=10)

    CHOICES = [
        ('software company', 'Software Company'),
        ('media agency', 'Media Agency'),
        ('trading agency', 'Trading Agency'),
    ]
    company_type = models.CharField(max_length=55, choices=CHOICES, default='Software Company')
    country = models.CharField(max_length=55)

    def __str__(self):
        return f"{self.company_name}"
