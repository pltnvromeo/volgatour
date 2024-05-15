from django.urls import path
from rest_framework.decorators import api_view
from . import views


urlpatterns = [
    path('api/excursions/<int:pk>/', views.ExcursionView.as_view()),
    path('api/router/<int:pk>/', views.RouteView.as_view()),
    path('api/categories/<int:pk>/', views.CategoryView.as_view()),
    path('api/complexities/<int:pk>/', views.ComplexityView.as_view()),
    path('api/bookings/', views.BookingView.as_view({'get': 'list'})),
    path('api/create-booking/', views.create_booking)
]