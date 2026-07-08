from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "type",
        "status",
        "created_at",
    )

    list_filter = (
        "type",
        "status",
    )

    search_fields = (
        "name",
        "phone",
    )