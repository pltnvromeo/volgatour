from django.contrib import admin
from .models import Excursion, Route, Complexity, Category, Booking


@admin.register(Excursion)
class ExcursionAdmin(admin.ModelAdmin):
    list_display = (
        "title", "description", "small_description", "photo", "datee", "timee", "guide", "cost", "category",
        "route",
        "group_size")
    list_editable = (
    "description", "photo", "datee", "timee", "small_description", "guide", "cost", "category", "route")
    search_fields = ["title"]
    list_filter = ["category__name", "route__name"]


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = (
        "name", "complexity", "duration", "length")
    list_editable = ('complexity', 'duration', 'length')
    list_filter = ["complexity__name"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )


@admin.register(Complexity)
class ComplexityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'booking_user', 'excursion', 'num_of_reserve')
    list_filter = ['booking_user', 'excursion']
