from django.shortcuts import render
import json
from django.http import HttpResponse
from rest_framework import viewsets

from .api_integration.bensound import BensoundAPI
from .serializers import SongSerializer
from .models import Song

def serve_song(request, path):
    fsock = open(f'./media/{path}', 'rb').read()
    response = HttpResponse(fsock, content_type='audio/mpeg')
    response['Content-Disposition'] = 'attachment; filename=filename.mp3'
    return response

def ben_sounds(request):
    api = BensoundAPI()
    api.extract_all_data()
    song_list = api.get_song_list()
    json_list = json.dumps({"songList": song_list})
    response = HttpResponse(json_list, content_type="application/json")
    return response

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
