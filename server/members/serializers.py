from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    """member serializer"""
    project_name = serializers.SerializerMethodField()

    class Meta:
        """member fields"""
        model = Member
        fields = ('id', 'member_name', 'project_name', 'member_email', 'member_role', 'project')
        read_only_fields = ('project_name',)

    def get_project_name(self, obj):
        return obj.project.project_name if obj.project else None
