"""imported modules"""
from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    """company serializer"""
    class Meta:
        """company fields"""
        model = Company
        fields = ('user', 'company_name', 'company_employees', 'country', 'company_type')
        read_only_fields = ('user',)

    def create(self, validated_data):
        """Override create method to automatically populate 'user' field"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
