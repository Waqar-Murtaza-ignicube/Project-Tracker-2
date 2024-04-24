from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    """client requests"""
    permission_classes = [IsAuthenticated]
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def get_serializer_context(self):
        """Override get_serializer_context to include request in the serializer context"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def list(self, request, *args, **kwargs):
        if not hasattr(request.user, 'company'):
            return Response({"detail": f"{request.user} has no clients"}, status=400)
        queryset = self.get_queryset().filter(company=request.user.company)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK )
