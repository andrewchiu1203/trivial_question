from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from .serializer import QuestionSerializer, StatisticSerializer
from .models import Question, Statistic, User

import json, random

def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

@require_POST
def signup_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username == "" or password == "":
        return JsonResponse({'detail': 'Username or password are blank.'}, status = 400)

    if User.objects.filter(username = username).exists():
        return JsonResponse({'detail': 'Username already existed.'}, status = 400)

    User.objects.create_user(username = username, password = password).save()
    return JsonResponse({'detail': 'Successfully signup.'})

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status = 400)

    user = authenticate(username = username, password = password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status = 400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status = 400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})

def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})

@api_view(['GET'])
def get_questions(request):
    if request.user.is_authenticated:
        questions = Question.objects.all()
        questions= list(questions)
        questions = random.sample(questions, 10)
        serialized_questions = QuestionSerializer(questions, many = True).data
        return Response(serialized_questions)
    
    return Response({})

@api_view(['GET'])
def get_personal_stats(request):
    if request.user.is_authenticated:
        user = User.objects.get(username = request.user.username)
        personal_stats = Statistic.objects.filter(user = user)
        personal_stats = list(personal_stats)

        if len(personal_stats) >= 5:
            personal_stats = personal_stats[0:5]

        serialized_personal_stats = StatisticSerializer(personal_stats, many = True).data
        return Response(serialized_personal_stats)
    
    return Response({})

@api_view(['GET'])
def get_all_stats(request):    
    all_stats = Statistic.objects.all()
    serialized_all_stats = StatisticSerializer(all_stats, many = True).data
    return Response(serialized_all_stats)

@require_POST
def send_stats(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        username = data.get('username')
        score = data.get('score')
        user = User.objects.get(username = username)

        if user is None:
            return JsonResponse({'detail': 'Failed to upload score.'})

        Statistic.objects.create(user = user, username = user.username, score = score)
        return JsonResponse({'detail': 'Sucessfully upload score.'})

    return JsonResponse({'detail': 'Failed to upload score.'})