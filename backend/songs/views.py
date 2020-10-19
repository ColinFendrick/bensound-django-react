from django.shortcuts import render
import json
from django.http import HttpResponse
from rest_framework import viewsets
import stringcase

from .api_integration.bensound import BensoundAPI
from .serializers import SongSerializer
from .models import Song

def serve_song(request, path):
    fsock = open(f'./media/{path}', 'rb').read()
    response = HttpResponse(fsock, content_type='audio/mpeg')
    response['Content-Disposition'] = 'attachment; filename=filename.mp3'
    return response


api = BensoundAPI()
api.extract_all_data()

def get_all_bensounds(request):
    song_list = api.get_song_list()
    json_list = json.dumps({"songList": song_list})
    response = HttpResponse(json_list, content_type="application/json")
    return response

def get_single_bensounds(request, slug):
    title = stringcase.titlecase(slug)
    song = api.get_song_by_title(title)
    properties = song.get_properties()
    json_properties = json.dumps({"properties": properties})
    response = HttpResponse(json_properties, content_type="application/json")
    return response


class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
