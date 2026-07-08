from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Part
from .serializers import PartSerializer
from cars.permissions import IsAdminUser


class PartViewSet(viewsets.ModelViewSet):

    queryset = Part.objects.all().order_by("-created_at")
    serializer_class = PartSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "category",
    ]

    search_fields = [
        "name",
        "compatibility",
        "description",
    ]

    ordering_fields = [
        "price",
        "stock",
        "created_at",
    ]


    def get_permissions(self):

        if self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [IsAdminUser()]

        return [AllowAny()]