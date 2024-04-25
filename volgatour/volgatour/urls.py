from django.contrib import admin
from django.urls import path, include, re_path
from excursions import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'excursions', views.ExcursionView, 'excursion')
router.register(r'routers', views.RouteView, 'router')
router.register(r'complexities', views.ComplexityView, 'complexity')
router.register(r'categories', views.CategoryView, 'category')

urlpatterns = ([
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
])
