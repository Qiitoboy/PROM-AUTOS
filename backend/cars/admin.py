from django.contrib import admin
from .models import Car, CarImage


class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 1


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = (
        "brand",
        "model",
        "year",
        "price",
        "condition",
        "status",
        "featured",
    )

    list_filter = (
        "condition",
        "status",
        "featured",
    )

    search_fields = (
        "brand",
        "model",
    )

    inlines = [CarImageInline]