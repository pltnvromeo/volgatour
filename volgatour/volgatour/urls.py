from django.contrib import admin
from django.urls import path, include, re_path
from excursions import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'excursions', views.ExcursionView, 'excursion')
router.register(r'routers', views.RouteView, 'router')
router.register(r'complexities', views.ComplexityView, 'complexity')
router.register(r'categories', views.CategoryView, 'category')
router.register(r'bookings', views.BookingView, 'bookings')

urlpatterns = ([
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/create-booking/', views.create_booking),
    path('api/excursions/<int:excursion_id>/bookings/', views.ExcursionBookingsView.as_view()),
    path('users/', include('users.urls', namespace='users'))
])

admin.site.site_header = 'Volgatour панель администрирования'
admin.site.index_title = 'Редактирование пользователей и экскурсий'