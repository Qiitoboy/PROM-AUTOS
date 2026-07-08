from django.contrib import admin
from .models import Part


@admin.register(Part)
class PartAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "category",
        "price",
        "stock",
        "created_at",
    )

    list_filter = (
        "category",
    )

    search_fields = (
        "name",
        "compatibility",
    )