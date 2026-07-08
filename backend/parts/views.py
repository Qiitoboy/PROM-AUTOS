from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Part
from .serializers import PartSerializer
from cars.permissions import IsAdminUser


class PartViewSet(viewsets.ModelViewSet):

    queryset = Part.objects.all().order_by("-created_at")
    serializer_class = PartSerializer


    def get_permissions(self):

        if self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [IsAdminUser()]

        return [AllowAny()]