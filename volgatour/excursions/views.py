from rest_framework import status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User

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


class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Booking.objects.filter(booking_user_id=user_id)
        return super().get_queryset()

@csrf_exempt
def create_booking(request):
    if request.method == 'POST':
        try:
            # Получаем данные из JSON-запроса
            data = json.loads(request.body)

            # Извлекаем данные о пользователе, экскурсии и количестве мест
            booking_user_id = data.get('booking_user_id')
            excursion_id = data.get('excursion_id')
            num_of_reserve = data.get('num_of_reserve')

            # Создаем объект бронирования
            booking = Booking.objects.create(
                booking_user_id=booking_user_id,
                excursion_id=excursion_id,
                num_of_reserve=num_of_reserve
            )

            # Сериализуем созданный объект бронирования
            serializer = BookingSerializer(booking)

            # Возвращаем успешный ответ с данными бронирования
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Ошибка при создании бронирования:", e)
            # Возвращаем ошибку, если что-то пошло не так
            return JsonResponse({'error': str(e)}, status=400)