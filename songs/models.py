from django.db import models

class Song(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    fileName = models.FileField()
