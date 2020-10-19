from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets

from .serializers import SongSerializer
from .models import Song

def serve_song(request, path):
    fsock = open(f'./media/{path}', 'rb').read()
    response = HttpResponse(fsock, content_type='audio/mpeg')
    response['Content-Disposition'] = 'attachment; filename=filename.mp3'
    return response

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
