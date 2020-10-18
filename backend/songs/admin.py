from django.contrib import admin
from .models import Song

class SongAdmin(admin.ModelAdmin):
    list_display = ('name', 'fileName')

admin.site.register(Song, SongAdmin)
