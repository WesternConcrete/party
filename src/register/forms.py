from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
	email = forms.EmailField()
	first_name = forms.CharField(max_length=20)

	class Meta:
		model = User
		fields = ["username", "email", "first_name", "password1", "password2"]
