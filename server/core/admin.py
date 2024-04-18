"""imported modules"""
from django.contrib import admin
from .models import Company, Client, Project, Member, TimeSheet

admin.site.register(Company)
admin.site.register(Client)
admin.site.register(Project)
admin.site.register(Member)
admin.site.register(TimeSheet)
