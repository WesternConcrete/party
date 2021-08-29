from django.urls import path
from .views import home_view, api_authenticate_user, check_username, createUser, changeName, changeBirthday

urlpatterns = [
    path('', home_view),
    path('home/', home_view),
    path('authenticate-user/', api_authenticate_user.as_view()),
    path('create-username/', check_username.as_view()),
    path('createUser/', createUser.as_view()),
    path('changeName/', changeName.as_view()),
    path('changeBirthday/', changeBirthday.as_view())

]
