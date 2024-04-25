from django.urls import path
from . import views

urlpatterns = [
    path('api/excursions/<int:pk>/', views.ExcursionView.as_view()),
    path('api/router/<int:pk>/', views.RouteView.as_view()),
    path('api/categories/<int:pk>/', views.CategoryView.as_view()),
    path('api/complexities/<int:pk>/', views.ComplexityView.as_view())
]