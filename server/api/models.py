from django.db import models

# Create your models here.

class Urls(models.Model):
    email = models.CharField(max_length=200)
    url = models.CharField(max_length=2000,unique=True)
    short_url = models.CharField(max_length=200)
    