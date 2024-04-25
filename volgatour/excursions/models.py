from django.db import models


# Модель экскурсии:
class Excursion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=2000)
    small_description = models.TextField(max_length=200)
    photo = models.CharField()
    datee = models.DateField()
    timee = models.TimeField()
    guide_id = models.IntegerField()
    cost = models.FloatField()
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    route = models.ForeignKey('Route', on_delete=models.CASCADE)
    group_size = models.IntegerField()

    def __str__(self):
        return self.title


# Модель Маршрута:
class Route(models.Model):
    name = models.CharField(max_length=50)
    complexity = models.ForeignKey('Complexity', on_delete=models.PROTECT, null=True)
    duration = models.TimeField()
    length = models.FloatField(max_length=6)

    def __str__(self):
        return self.name


# Модель Сложности:
class Complexity(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


# Модель Категория:
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
# Модель Пользователя:
# Модель Бронирования:
# ?Модель Гида:
# ?Модель Отзыва:
