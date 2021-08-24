from register.models import ExtendedUser
from django.contrib.auth.models import User
from friendreq.models import FriendReq
from groups.models import Group
from parties.models import Party
from register.serializers import ExtendedUserSerializer
print("""
THIS LIBRARY IS SIMPLY USED TO IMPORT ALL EXISTING MODELS AND TO PROVIDE A FEW FUNCTIONS THAT MAKE DEBUGGING EASIER.

This library may be helpful to use when passing commands from the frontend to the backend
""")

users = User.objects.all()
extended_users = ExtendedUser.objects.all()

def createUserAndExtendedUser(username, password, **kwargs):
	user = User.objects.create_user(username=username, password=password, **kwargs)
	ExtendedUser.objects.create(user=user)

# def removeUserAndExtendedUser(username)
# 	user = User.objects.get(username=username)
# 	ExtendedUser.objects.get(user=user).delete()
# 	User.objects.delete(user)

def return_extended_user(un):
	return ExtendedUser.objects.get(user=User.objects.get(username=un))

def createExtendedUserForAllUsers():
	for user in users:
		try:
			ExtendedUser.objects.get(user=user)
		except ExtendedUser.DoesNotExist:
			ExtendedUser.objects.create(user=user)

def acceptFriendReq(request):
	req = request
	req.accepted = True
	req.save()

def createGroup(groupname, members):
	group_object = Group.objects.create(name=groupname)
	for member in members:
		member.add_group(group_object)


