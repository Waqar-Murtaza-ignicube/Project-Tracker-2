"""imported modules"""
from rest_framework import serializers
from .models import Company, Client, Project, Member, TimeSheet

class CompanySerializer(serializers.ModelSerializer):
    """company serializer"""
    class Meta:
        """company fields"""
        model = Company
        fields = ['user', 'company_name', 'company_employees', 'country', 'company_type']
        read_only_fields = ['user']

    def create(self, validated_data):
        """Override create method to automatically populate 'user' field"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ClientSerializer(serializers.ModelSerializer):
    """client serializer"""
    class Meta:
        """client fields"""
        model = Client
        fields = ['id', 'company', 'client_name', 'client_contact', 'client_status']
        read_only_fields = ['company']

    def create(self, validated_data):
        """Override create method to automatically populate 'user' field"""
        company = self.context['request'].user.company
        validated_data['company'] = company
        return super().create(validated_data)

class ProjectSerializer(serializers.ModelSerializer):
    """project serializer"""
    client_name = serializers.SerializerMethodField()
    class Meta:
        """project fields"""
        model = Project
        fields = ['id', 'client', 'client_name', 'project_name', 'project_deadline']
        read_only_fields = ['client_name']

    def get_client_name(self, obj):
        """Method to get client name"""
        return obj.client.client_name if obj.client else None

class MemberSerializer(serializers.ModelSerializer):
    """member serializer"""
    project_name = serializers.SerializerMethodField()

    class Meta:
        """member fields"""
        model = Member
        fields = ['id', 'member_name', 'project_name', 'member_email', 'member_role', 'project']
        read_only_fields = ['project_name']

    def get_project_name(self, obj):
        return obj.project.project_name if obj.project else None

class TimeSheetSerializer(serializers.ModelSerializer):
    """timesheet serializer"""
    project_name = serializers.SerializerMethodField()
    class Meta:
        """timesheet fields"""
        model = TimeSheet
        fields = ['id', 'user', 'project', 'project_name', 'date', 'time_spent']
        read_only_fields = ['user', 'project_name']

    def create(self, validated_data):
        """Override create method to automatically populate 'user' field"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_project_name(self, obj):
        return obj.project.project_name if obj.project else None
