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
    path('bensounds/', views.get_all_bensounds),
    path('bensounds/<slug:slug>', views.get_single_bensounds),
    path('bensounds/stream/<slug:slug>', views.get_bensounds_stream),
    path('bensounds/download/<slug:slug>', views.get_bensounds_download)
]
