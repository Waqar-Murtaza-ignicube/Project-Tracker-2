"""imported modules"""
from django.utils import timezone
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
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

class Project(models.Model):
    """project model"""
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='projects')
    project_name = models.CharField(max_length=55)
    project_created = models.DateTimeField(auto_now_add=True, null=True)
    project_deadline = models.DateField()

    def __str__(self):
        return f"{self.project_name}"

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

class TimeSheet(models.Model):
    """register hours model"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    date = models.DateField(default=timezone.now)
    time_spent = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.project}"
