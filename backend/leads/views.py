from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):

    queryset = Lead.objects.all().order_by("-created_at")
    serializer_class = LeadSerializer

    def get_permissions(self):

        if self.action == "create":
            return [AllowAny()]

        return [IsAdminUser()]