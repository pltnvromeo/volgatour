from django.shortcuts import render
from .models import Excursion
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets


class ExcursionView(viewsets.ModelViewSet):
    serializer_class = ExcursionSerializer
    queryset = Excursion.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['title', 'category', 'datee']
    search_fields = ['title', 'category', 'datee']


class ExcursionDetail(generics.RetrieveAPIView):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class RouteView(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ComplexityView(viewsets.ModelViewSet):
    serializer_class = ComplexitySerializer
    queryset = Complexity.objects.all()

