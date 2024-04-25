from django.contrib import admin
from .models import Excursion, Route, Complexity, Category


# create a class for the admin-model integration
class ExcursionAdmin(admin.ModelAdmin):
    list_display = (
    "title", "description", "small_description", "photo", "datee", "timee", "guide_id", "cost", "category", "route_id",
    "group_size")


class RouteAdmin(admin.ModelAdmin):
    list_display = (
    "name", "complexity", "duration", "length")


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
    "name",
    )


class ComlexityAdmin(admin.ModelAdmin):
    list_display = (
    "name",
    )


admin.site.register(Excursion, ExcursionAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Complexity, ComlexityAdmin)
admin.site.register(Route, RouteAdmin)
