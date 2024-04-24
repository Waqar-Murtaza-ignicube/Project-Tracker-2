from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import TimeSheet
from .serializers import TimeSheetSerializer

class TimeSheetViewSet(viewsets.ModelViewSet):
    """timesheet requests"""
    permission_classes = [IsAuthenticated]
    queryset = TimeSheet.objects.all()
    serializer_class = TimeSheetSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(user = request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK )
