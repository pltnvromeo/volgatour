from rest_framework import serializers
from .models import Excursion, Route, Complexity, Category


class ComplexitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Complexity
        fields = (
            'id', 'name'
        )


class RouteSerializer(serializers.ModelSerializer):
    complexity = ComplexitySerializer()

    class Meta:
        model = Route
        fields = (
            'id', 'name', 'complexity', 'duration', 'length'
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id', 'name'
        )


class ExcursionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    route = RouteSerializer()

    class Meta:
        model = Excursion
        fields = (
            'id', 'title', 'description', 'small_description', 'photo', 'datee', 'timee', 'guide_id', 'cost',
            'category', 'route', 'group_size')
