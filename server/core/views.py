"""imported modules"""
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import CompanySerializer
from .models import Company

class CompanyViewSet(viewsets.ModelViewSet):
    """company requests"""
    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_serializer_context(self):
        """Override get_serializer_context to include request in the serializer context"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def list(self, request, *args, **kwargs):
        if not hasattr(request.user, 'company'):
            return Response({"detail": "User has no associated company"}, status=400)
        queryset = self.get_queryset().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK )
