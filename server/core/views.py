"""imported modules"""
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from .serializers import CompanySerializer, ClientSerializer, ProjectSerializer, MemberSerializer, TimeSheetSerializer
from .models import Company, Client, Project, Member, TimeSheet

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
        if hasattr(request.user, 'company'):
            queryset = self.get_queryset().filter(user=request.user)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK )
        else:
            return Response({"detail": "User has no associated company"}, status=400)

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
        if hasattr(request.user, 'company'):
            queryset = self.get_queryset().filter(company=request.user.company)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK )
        else:
            return Response({"detail": f"{request.user} has no clients"}, status=400)

class ProjectViewSet(viewsets.ModelViewSet):
    """project requests"""
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        group = request.user.groups.all()[0].name
        if group == 'Admin':
            clients = request.user.company.clients.all()
            queryset = self.get_queryset().filter(client__in=clients)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK )
        elif group == 'Member':
            member = Member.objects.get(member_email=request.user.email)
            queryset = self.get_queryset().filter(id=member.project_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK )
        # if hasattr(request.user, 'company'):
        #     clients = request.user.company.clients.all()
            # queryset = self.get_queryset().filter(client__in=clients)
            # serializer = self.get_serializer(queryset, many=True)
            # return Response(serializer.data, status=status.HTTP_200_OK )
        else:
            return Response({"detail": f"{request.user} has no projects"}, status=400)
        


class MemberViewSet(viewsets.ModelViewSet):
    """members requests"""
    permission_classes = [IsAuthenticated]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def list(self, request, *args, **kwargs):
        if hasattr(request.user, 'company'):
            queryset = self.get_member_queryset(request)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": f"{request.user} has no projects"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        member_email = request.data.get('member_email')
        if member_email:
            self.send_invitation_email(request.user.company, member_email)
        return super().create(request, *args, **kwargs)

    def get_member_queryset(self, request):
        """to filter members"""
        clients = request.user.company.clients.all()
        myprojects = Project.objects.filter(client__in=clients)
        return self.get_queryset().filter(project__in=myprojects)

    def send_invitation_email(self, company, member_email):
        """sending email to the member"""
        send_mail(
            "Welcome to Project Tracker",
            "",
            "Project Tracker",
            [member_email],
            fail_silently=False,
            html_message=f"<p>Hi,</p><p>You have been invited to join {company} at Project Tracker.</p>"
                         f"<p>To sign in, first follow the link and set up your account.</p>"
                         f"<p><a href='http://localhost:5173/membersignup'>Set up your account</a></p>"
        )

class TimeSheetViewSet(viewsets.ModelViewSet):
    """timesheet requests"""
    permission_classes = [IsAuthenticated]
    queryset = TimeSheet.objects.all()
    serializer_class = TimeSheetSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(user = request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK )
