from django.db import models

class Song(models.Model):
    name = models.CharField(max_length=100)
    fileName = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.name
