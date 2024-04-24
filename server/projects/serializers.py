from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    """project serializer"""
    client_name = serializers.SerializerMethodField()
    class Meta:
        """project fields"""
        model = Project
        fields = ('id', 'client', 'client_name', 'project_name', 'project_deadline')
        read_only_fields = ('client_name',)

    def get_client_name(self, obj):
        """Method to get client name"""
        return obj.client.client_name if obj.client else None
