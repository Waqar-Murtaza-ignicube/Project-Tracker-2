from django.db import models
from django.utils import timezone
from accounts.models import CustomUser
from projects.models import Project

class TimeSheet(models.Model):
    """register hours model"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    date = models.DateField(default=timezone.now)
    time_spent = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.project}"
