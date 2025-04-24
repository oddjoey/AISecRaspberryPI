# encryption/urls.py

from django.urls import path #type:ignore
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('upload/', views.videoencrypt, name='videoencrypt'),
]
