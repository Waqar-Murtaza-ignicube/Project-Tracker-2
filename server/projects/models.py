from django.db import models
from clients.models import Client

class Project(models.Model):
    """project model"""
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='projects')
    project_name = models.CharField(max_length=55)
    project_created = models.DateTimeField(auto_now_add=True, null=True)
    project_deadline = models.DateField()

    def __str__(self):
        return f"{self.project_name}"
