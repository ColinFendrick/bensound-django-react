from django.urls import path
from . import views

urlpatterns = [
    path('api/song/', views.SongListCreate.as_view() ),
]
