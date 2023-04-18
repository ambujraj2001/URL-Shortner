from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('short_url/', views.short_url, name='short_url'),
]
