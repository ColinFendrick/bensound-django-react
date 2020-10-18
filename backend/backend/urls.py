from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from songs import views

router = routers.DefaultRouter()
router.register(r'songs', views.SongView, 'song')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
