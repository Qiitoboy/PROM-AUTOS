from rest_framework import serializers
from .models import Car, CarImage


class CarImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarImage
        fields = ["id", "image"]


class CarSerializer(serializers.ModelSerializer):

    images = CarImageSerializer(
        many=True,
        read_only=True
    )

    name = serializers.SerializerMethodField()
    make = serializers.CharField(
        source="brand",
        read_only=True
    )
    fuel = serializers.CharField(
        source="fuel_type",
        read_only=True
    )
    image = serializers.SerializerMethodField()


    class Meta:
        model = Car
        fields = "__all__"


    def get_name(self, obj):
        return f"{obj.brand} {obj.model}"


    def get_image(self, obj):

        first_image = obj.images.first()

        if first_image:
            request = self.context.get("request")

            if request:
                return request.build_absolute_uri(
                    first_image.image.url
                )

            return first_image.image.url

        return None