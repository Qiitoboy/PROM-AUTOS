from django.db import models


class Car(models.Model):

    CONDITION_CHOICES = [
        ("new", "New"),
        ("used", "Used"),
    ]

    STATUS_CHOICES = [
        ("available", "Available"),
        ("sold", "Sold"),
    ]

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    year = models.IntegerField()

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    mileage = models.IntegerField()

    fuel_type = models.CharField(
        max_length=50
    )

    condition = models.CharField(
        max_length=10,
        choices=CONDITION_CHOICES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="available"
    )

    description = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="cars/",
        blank=True,
        null=True
    )

    featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"