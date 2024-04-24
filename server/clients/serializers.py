from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    """client serializer"""
    class Meta:
        """client fields"""
        model = Client
        fields = ('id', 'company', 'client_name', 'client_contact', 'client_status')
        read_only_fields = ('company',)

    def create(self, validated_data):
        """Override create method to automatically populate 'user' field"""
        company = self.context['request'].user.company
        validated_data['company'] = company
        return super().create(validated_data)
