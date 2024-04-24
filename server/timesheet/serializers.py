from rest_framework import serializers
from .models import TimeSheet

class TimeSheetSerializer(serializers.ModelSerializer):
    """timesheet serializer"""
    project_name = serializers.SerializerMethodField()
    class Meta:
        """timesheet fields"""
        model = TimeSheet
        fields = ('id', 'user', 'project', 'project_name', 'date', 'time_spent')
        read_only_fields = ('user', 'project_name')

    def create(self, validated_data):
        """Override create method to automatically populate 'user' field"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_project_name(self, obj):
        return obj.project.project_name if obj.project else None
