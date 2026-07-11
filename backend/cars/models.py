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

    fuel_type = models.CharField(max_length=50)

    transmission = models.CharField(
        max_length=50,
        default="Automatic"
    )

    body_type = models.CharField(
        max_length=50,
        blank=True
    )

    engine = models.CharField(
        max_length=100,
        blank=True
    )

    speed = models.CharField(
        max_length=50,
        blank=True,
        help_text="Example: 3.2s 0-100 km/h"
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

    description = models.TextField(blank=True)

    featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"


class CarImage(models.Model):

    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(
        upload_to="cars/"
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.car.brand} {self.car.model}"