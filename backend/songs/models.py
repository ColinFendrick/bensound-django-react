from django.db import models

class Song(models.Model):
    name = models.CharField(max_length=100)
    songFile = models.FileField(upload_to='media/')
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.name
