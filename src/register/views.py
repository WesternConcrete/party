from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator

from .forms import RegisterForm
from .models import ExtendedUser
from .serializers import ExtendedUserSerializer


# Create your views here.
# def register(response):
# 	if response.method == "POST":
# 		print(response)
# 		print('\n---')
# 		print(response.POST)
# 		form = RegisterForm(response.POST)
# 		if form.is_valid(): 
# 			form.save()
# 			return redirect('/login')
# 	else:
# 		form = RegisterForm()

# 	return render(response, "register/register.html", {"form": form})


#------------ register new account form----------------
@method_decorator(csrf_exempt, name='dispatch')
class extended_user_list(View):
	def get(self, request):
		ex_users = ExtendedUser.objects.all()
		serializer = ExtendedUserSerializer(ex_users, many=True)
		return JsonResponse(serializer.data, safe=False)

	def post(self, request):
		# data = JSONParser().parse(request)
		# serializer = ExtendedUserSerializer(data=data)
		# if serializer.is_valid():
		# 	serializer.save()
		# 	return JsonResponse(serializer.data, status=201)
		print(request.body)
		return JsonResponse({})
