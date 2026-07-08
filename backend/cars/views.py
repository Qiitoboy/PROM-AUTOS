from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Car
from .serializers import CarSerializer


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all().order_by("-created_at")
    serializer_class = CarSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "condition",
        "status",
        "featured",
        "brand",
    ]

    search_fields = [
        "brand",
        "model",
        "description",
    ]

    ordering_fields = [
        "price",
        "year",
        "created_at",
    ]