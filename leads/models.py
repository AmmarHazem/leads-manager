from django.db import models
from django.contrib.auth.models import User

class Lead(models.Model):
    name = models.CharField(max_length = 100)
    email = models.EmailField(max_length = 100, unique = True)
    message = models.TextField(blank = True)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True, blank = True, related_name = 'leads')
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-created_at',)
