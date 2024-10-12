from django.urls import path

from . import views

urlpatterns = [
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('signup/', views.signup_view, name='api-signup'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
    path('get_questions', views.get_questions, name = 'get_questions'),
    path('get_personal_stats', views.get_personal_stats, name = 'get_personal_stats'),
    path('get_all_stats', views.get_all_stats, name = 'get_all_stats'),
    path('send_stats', views.send_stats, name = 'send_stats'),
]