from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse(
                    {'message': 'Аутентификация прошла успешно', 'user': {'id': user.id, 'username': user.username, 'is_staff': user.is_staff, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email}})
            else:
                return JsonResponse({'error': 'Неверные учетные данные'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Ошибка разбора JSON'}, status=400)


@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Вы успешно вышли из системы'})


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            if not User.objects.filter(username=username, email=email).exists():
                user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name, is_staff=False)
                login(request, user)#!!!! После успешного создания пользователя, выполняем вход, ПРОВЕРИТЬ
                return JsonResponse({'message': 'Пользователь успешно зарегистрирован и вошел в систему'})
            else:
                return JsonResponse({'error': 'Пользователь с таким логином или эл.почтой уже существует'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Ошибка разбора JSON'}, status=400)