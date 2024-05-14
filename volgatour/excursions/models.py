from django.db import models


# Модель экскурсии:
class Excursion(models.Model):
    title = models.CharField(max_length=50, verbose_name="Название экскурсии")
    description = models.TextField(max_length=2000, verbose_name="Описание")
    small_description = models.TextField(max_length=200, verbose_name="Краткое описание")
    photo = models.CharField(verbose_name="Фото")
    datee = models.DateField(verbose_name="Дата проведения")
    timee = models.TimeField(verbose_name="Время")
    guide_id = models.IntegerField(verbose_name="Гид")
    cost = models.FloatField(verbose_name="Стоимость")
    category = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name="Категория")
    route = models.ForeignKey('Route', on_delete=models.CASCADE, verbose_name="Маршрут")
    group_size = models.IntegerField(verbose_name="Размер группы")

    def __str__(self):
        return self.title
    class Meta:
        verbose_name = "Экскурсии"
        verbose_name_plural = "Экскурсии"


# Модель Маршрута:
class Route(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название маршрута")
    complexity = models.ForeignKey('Complexity', on_delete=models.PROTECT, null=True, verbose_name="Сложность")
    duration = models.TimeField(verbose_name="Длительность")
    length = models.FloatField(max_length=6, verbose_name="Протяженность")


    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Маршруты"
        verbose_name_plural = "Маршруты"


# Модель Сложности:
class Complexity(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название сложности")

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Сложности"
        verbose_name_plural = "Сложности"


# Модель Категория:
class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название категории")

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Категории"
        verbose_name_plural = "Категории"
# Модель Пользователя:
# Модель Бронирования:
# ?Модель Гида:
# ?Модель Отзыва:
