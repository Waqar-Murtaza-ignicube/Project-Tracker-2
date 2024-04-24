from django.db import models
from core.models import Company
from phonenumber_field.modelfields import PhoneNumberField

class Client(models.Model):
    """client model"""
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, related_name='clients')
    client_name = models.CharField(max_length=55)
    client_contact = PhoneNumberField(null=True)

    CHOICES = [
        ('active', 'Active'),
        ('deactive', 'Deactive'),
    ]
    client_status = models.CharField(max_length=55, choices=CHOICES, default='Active')

    def __str__(self):
        return f"{self.client_name}"
