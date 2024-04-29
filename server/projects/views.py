from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from members.models import Member
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """project requests"""
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        is_admin = request.user.groups.filter(name='Admin').exists()
        if not is_admin:
            member = Member.objects.get(member_email=request.user.email)
            queryset = self.get_queryset().filter(id=member.project_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK )
        clients = request.user.company.clients.all()
        print(clients)
        queryset = self.get_queryset().filter(client__in=clients)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK )
