from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
import os
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from rest_framework import status
import datetime
from rest_framework.views import APIView
from rest_framework import permissions
from PIL import Image
from django.db.models import Q
from django.db.models.functions import Length


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
		filename = json['username'] + '.jpg'
		img = Image.new('RGB', (1, 1), color = 'red')
		print(img)
		img.save('media/profpic/'+ json['username']+ '.jpg')
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

@method_decorator(csrf_exempt, name='dispatch')
class changeImage(APIView):

	parser_classes= [FormParser, MultiPartParser, JSONParser]

	def post(self, request, format=None):
		image = request.data['profile_image']
		user = request.data['user']
		user = ExtendedUser.objects.get(user = User.objects.get(username=user))
		old_image = user.profile_image
		user.profile_image = image
		user.save()
		if bool(old_image):
			os.remove('media/' + str(old_image))
		return JsonResponse({'errMessage': None, 'image': '/media/' + str(user.profile_image)}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class getFriendInfo(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		username = JSONParser().parse(request)['username']
		data = {}
		user = User.objects.get(username=username)
		ex_user = ExtendedUser.objects.get(user = user)
		image = str(ex_user.profile_image)
		if bool(image):
			data['url'] = '/media/' + image
		else: 
			data['url'] = None
		data['name'] = user.first_name
		return JsonResponse(data, status=status.HTTP_200_OK)
		
@method_decorator(csrf_exempt, name='dispatch')
class updateFriends(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		username = JSONParser().parse(request)['username']
		user = User.objects.get(username=username)
		ex_user = ExtendedUser.objects.get(user = user)
		print(ex_user.friends.all())
		friends = []
		for friend in ex_user.friends.all():
			friends.append(str(friend))
		print(friends)
		return JsonResponse({'friends': friends}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class formatFriendData(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		friends = JSONParser().parse(request)['friends']
		arr = []
		for friend in friends: 
			user = User.objects.get(username=friend)
			ex_user = ExtendedUser.objects.get(user = user)
			image = str(ex_user.profile_image)
			if bool(image):
				image = '/media/' + image
			else: 
				image = None
			friend_obj = {'username':friend, 'name':user.first_name, 'url': image}
			arr.append(friend_obj)
		return JsonResponse({'friendData': arr}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class findFriends(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		search = JSONParser().parse(request)['search']
		search_results = ExtendedUser.objects.filter(Q(user__username__contains=search) | Q(user__first_name__contains=search))
		print(search_results)
		data=[]
		for user in search_results:
			image = str(user.profile_image)
			if bool(image):
				image = '/media/' + image
			else: 
				image = None
			friend_obj = {'username':str(user.user), 'name':user.user.first_name, 'url': image}
			data.append(friend_obj)
		print(data)
		return JsonResponse({'data': data}, status=status.HTTP_200_OK)








@method_decorator(csrf_exempt, name='dispatch')
class getFriendRequests(View):
	def get(self, request):
		return JsonResponse({})

	def post(self, request):
		username = JSONParser().parse(request)['username']
		ex_user = ExtendedUser.objects.get(user = User.objects.get(username=username))
		friend_requests = ex_user.pending_friend_requests.all()
		arr = []
		for friend_request in friend_requests:
			obj = {'from': str(friend_request.from_user), 'to': str(friend_request.to_user)}
			arr.append(obj)
		return JsonResponse({'friend_requests': arr}, status=status.HTTP_200_OK)


