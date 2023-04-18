from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login,logout
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from .models import *
import json
import pyshorteners


# Create your views here.

def index(request):
    return JsonResponse({'msg': 'Hello World!'})

@api_view(['POST'])
def short_url(request):
    data=json.loads(request.body)
    url=data['url']
    email=data['email']
    s = pyshorteners.Shortener()
    short_url=s.tinyurl.short(url)
    urlserializer=UrlsSerializer(data={'email': email, 'url': url, 'short_url': short_url})
    if urlserializer.is_valid():
        urlserializer.save()
    email_url=Urls.objects.filter(email=email)
    urlserializer=UrlsSerializer(email_url,many=True)
    return JsonResponse({'url': url, 'email': email,'short_url':short_url, 'urls': urlserializer.data})