from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from songs import views

router = routers.DefaultRouter()
router.register(r'songs', views.SongView, basename='song')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('media/<path:path>', views.serve_song),
    path('bensounds/', views.ben_sounds)
]
