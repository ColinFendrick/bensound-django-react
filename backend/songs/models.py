from django.db import models

class Song(models.Model):
    name = models.CharField(max_length=100, unique=True)
    songFile = models.FileField(upload_to='media/')
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=200, blank=True, default='')

    def _str_(self):
        return self.name
