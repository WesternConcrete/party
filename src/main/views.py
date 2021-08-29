from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from rest_framework import status
import datetime


from django.contrib.auth.models import User
from register.forms import RegisterForm
from register.models import ExtendedUser
from register.serializers import ExtendedUserSerializer


# Create your views here.
def home_view(request):
	return render(request, "main/home.html", {})

@method_decorator(csrf_exempt, name='dispatch')
class api_authenticate_user(View):
	def get(self, request):
		# ex_users = ExtendedUser.objects.all()
		# serializer = ExtendedUserSerializer(ex_users, many=True)
		return JsonResponse({})

	def post(self, request):
		loginInfo = JSONParser().parse(request)
		# serializer = ExtendedUserSerializer(data=data)
		# if serializer.is_valid():
		# 	serializer.save()
		# 	return JsonResponse(serializer.data, status=201)
		response = {}
		code=status.HTTP_404_NOT_FOUND
		username = loginInfo['username']
		password = loginInfo['password']
		user = authenticate(username=loginInfo['username'], password=loginInfo['password'])
		if user is not None:
			ex_user = ExtendedUser.objects.get(user=user)
			serializer = ExtendedUserSerializer(ex_user)
			data = dict(serializer.data)
			if data['birthday'] != None:
				data['birthday'] = data['birthday'][-5:] + '-' + data['birthday'][:4]
			data['first_name'] = user.first_name
			print(data)
			response['user'] = data
			code=status.HTTP_200_OK
		elif username == '' or password == '': 
			response['errMessage'] = 'Missing username or password'

		else:
			response['errMessage'] = 'Incorrect username or password'
		print(response)
		return JsonResponse(response, status=code)

@method_decorator(csrf_exempt, name='dispatch')
class check_username(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		username = JSONParser().parse(request)['username']
		if User.objects.filter(username=username).exists():
			response = {'errMessage': 'This username already exists'}
			return JsonResponse(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)
		else: 
			return JsonResponse({'errMessage': None}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class createUser(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		json = JSONParser().parse(request)
		user = None
		if json['name'] != None:
			user = User.objects.create_user(username=json['username'], password=json['password'], first_name=json['name'])
		else:
			user = User.objects.create_user(username=json['username'], password=json['password'])
		ex_user = ExtendedUser.objects.create(user=user)
		return JsonResponse({'username': json['username'], 'password': json['password']}, status=status.HTTP_200_OK)



@method_decorator(csrf_exempt, name='dispatch')
class changeName(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		json = JSONParser().parse(request)
		user = User.objects.get(username=json['username'])
		user.first_name = json['name']
		user.save()
		return JsonResponse({'errMessage': None}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class changeBirthday(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		json = JSONParser().parse(request)
		user = ExtendedUser.objects.get(user = User.objects.get(username=json['username']))
		birthday = datetime.datetime.strptime(json['birthday'], '%Y-%m-%d')
		print(birthday)
		user.birthday = birthday
		user.save()
		return JsonResponse({'errMessage': None}, status=status.HTTP_200_OK)

