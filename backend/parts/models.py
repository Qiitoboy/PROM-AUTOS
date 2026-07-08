from django.db import models


class Part(models.Model):

    CATEGORY_CHOICES = [
        ("engine", "Engine"),
        ("brake", "Brake"),
        ("electrical", "Electrical"),
        ("body", "Body"),
        ("interior", "Interior"),
        ("other", "Other"),
    ]


    name = models.CharField(
        max_length=200
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    compatibility = models.CharField(
        max_length=255,
        help_text="Example: Toyota Corolla 2018-2023"
    )

    description = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="parts/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return self.name