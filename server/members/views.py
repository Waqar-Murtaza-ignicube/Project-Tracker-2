from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from projects.models import Project
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    """members requests"""
    permission_classes = [IsAuthenticated]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def list(self, request, *args, **kwargs):
        if not hasattr(request.user, 'company'):
            return Response({"detail": f"{request.user} has no projects"}, status=status.HTTP_400_BAD_REQUEST)
        queryset = self.get_member_queryset(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
