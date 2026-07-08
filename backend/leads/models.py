from django.db import models


class Lead(models.Model):

    TYPE_CHOICES = [
        ("car", "Car"),
        ("part", "Part"),
    ]

    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("closed", "Closed"),
    ]


    name = models.CharField(max_length=100)

    phone = models.CharField(
        max_length=20
    )

    email = models.EmailField(
        blank=True
    )

    message = models.TextField()


    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        default="car"
    )


    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new"
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return f"{self.name} - {self.type}"