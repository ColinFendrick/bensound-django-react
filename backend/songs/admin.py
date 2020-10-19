from django.contrib import admin
from .models import Song

class SongAdmin(admin.ModelAdmin):
    list_display = ('name', 'songFile', 'description')

admin.site.register(Song, SongAdmin)
