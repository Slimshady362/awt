from django.contrib import admin
from django.urls import path, include
from . import views 
from .views import topic_list
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name="products"),
    path('login/', views.loginuser, name="login"),
    path('logout/', views.logoutuser, name="logout"),
    path('topic/<slug:topic_name>/', views.topic_detail, name="topic_detail"),
    path('topics/', views.topic_list, name="topic_list"),
    path('profile/', views.profile_view, name='profile'),
    path('register/', views.register, name='register'),
    path('recommend/', views.recommend, name='recommend')
]
