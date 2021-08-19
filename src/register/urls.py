from django.urls import path
from .views import extended_user_list

urlpatterns = [
    path('extended-users/', extended_user_list.as_view(), name="extended-users"),
]
