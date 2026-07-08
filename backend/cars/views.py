from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Car
from .serializers import CarSerializer


class CarViewSet(viewsets.ModelViewSet):

    queryset = Car.objects.all().order_by("-created_at")
    serializer_class = CarSerializer

    def get_permissions(self):

        if self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [IsAdminUser()]

        return [AllowAny()]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
