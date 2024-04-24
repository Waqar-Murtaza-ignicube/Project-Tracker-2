from django.db import models
from projects.models import Project

class Member(models.Model):
    """member model"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='members')
    member_name = models.CharField(max_length=55)
    member_email = models.EmailField(max_length=50)
    CHOICES = [
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]
    member_role = models.CharField(max_length=55, choices=CHOICES, default='Employee')

    def __str__(self):
        return f"{self.member_name}"
