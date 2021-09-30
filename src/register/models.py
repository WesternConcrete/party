from django.db import models
from django.contrib.auth.models import User
import json
from django.http import Http404
import datetime
from datetime import date

def upload_path(instance, filename):
	return '/'.join(['profpic', filename])


class ExtendedUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	friends = models.ManyToManyField('self',blank=True)
	groups = models.ManyToManyField("groups.Group", blank=True)
	birthday = models.DateField(blank = True, null=True)
	invited_parties = models.ManyToManyField('parties.Party',blank=True,related_name='invited_parties')
	attending_parties = models.ManyToManyField('parties.Party', blank=True,related_name='attending_parties')
	hidden_parties = models.ManyToManyField('parties.Party',blank=True,related_name='hidden_parties')
	my_parties = models.ManyToManyField('parties.Party',blank=True,related_name='my_parties')
	blocked = models.ManyToManyField('self',blank=True, related_name='blocked')
	blocked_by = models.ManyToManyField('self',blank=True, related_name='blocked_by')
	profile_image = models.ImageField(upload_to=upload_path, null=True,blank=True) #may want to add default profile image after we figure out image format on frontend
	last_latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
	last_longitude = models.DecimalField(max_digits=9, decimal_places=6,blank=True, null=True)
	pending_friend_requests = models.ManyToManyField("friendreq.FriendReq", blank=True)


#is used in populate_invite method in Party class in parties.models. is used to check if user is old enough for party. only used for public parties.
	def get_age(self):
	    today = date.today()
	    age = today.year - self.birthday.year - ((today.month, today.day) < (self.birthday.month, self.birthday.day))
	    return age

	# friends = models.TextField(null=True,default='[]')

	def __str__(self):
		return str(self.user)

#friend methods
    #dont ever call directly, is used for friend requests in FriendReq model ("/friendreq.models")
	def add_friend(self, user):
		self.friends.add(user)
		user.friends.add(self)

	#call this with CurrentExtendedUser.remove_friend(OtherExtendedUser)
	def remove_friend(self, user):
		self.friends.remove(user)
		user.friends.remove(self)

#friend methods
    #dont ever call directly, is used for friend requests in FriendReq model ("/friendreq.models")
	def add_pending_friendreq(self, req):
		self.pending_friend_requests.add(req)


#group methods
	def add_group(self, group):
		self.groups.add(group)
		group.members.add(self)

	def remove_group(self, group):
		self.groups.remove(group)
		group.members.remove(self)

#party methods
	def add_invite(self, party):
		self.invited_parties.add(party)
		party.invited_people.add(self)

	def remove_invite(self, party):
		self.invited_parties.remove(party)

	def accept_invite(self, party):
		party.attending_people.add(self)
		self.attending_parties.add(party)
		self.remove_invite(party)

	def hide_invite(self,party):
		self.hidden_parties.add(party)
		self.invited_parties.remove(party)

	def delete(self, *args, **kwargs):
		super(ExtendedUser, self).delete(*args, *kwargs)

#block methods
	#adds user to blocked field and on the blocked users account, add this user to their blocked_by field
	#also removes them as a friend
	def block(self, user):
		self.remove_friend(user)
		self.blocked.add(user)
		user.blocked_by.add(self)

	def unblock():
		self.blocked.remove(user)
		user.blocked_by.remove(self)














	# #dont ever call directly, is used for friend requests in FriendReq model ("/friendreq.models")
	# def add_friend(self, username):
	# 	list_of_friends = json.loads(self.friends)
	# 	try:
	# 		user_object = User.objects.get(username=username)
	# 		if user_object.username not in list_of_friends:
	# 			print('Adding friend: '+ user_object.username)
	# 			list_of_friends.append(user_object.username)
	# 			self.friends = json.dumps(list_of_friends)
	# 			self.save()
	# 		else:
	# 			print("ALREADY FRIENDS WITH THIS USER")
	# 	except User.DoesNotExist:
	# 		raise Http404("NO FRIEND ADDED. Inputted username is not a valid username") 

	# def get_friends(self):
	# 	return json.loads(self.friends)

	# #call this with CurrentExtendedUser.remove_friend('UsernameOfFriendYouWantRemoved')
	# def remove_friend(self, username):
	# 	list_of_friends = json.loads(self.friends)
	# 	try:
	# 		user_object = User.objects.get(username=username)
	# 		if user_object.username not in list_of_friends:
	# 			print("NOT FRIENDS WITH USER")
	# 		else:
	# 			print("Removing friend: "+ user_object.username)
	# 			list_of_friends.remove(user_object.username)
	# 			self.friends = json.dumps(list_of_friends)
	# 			self.save()
	# 			removed_friend = ExtendedUser.objects.get(user=user_object)
	# 			removed_friend_friendlist = json.loads(removed_friend.friends)
	# 			removed_friend_friendlist.remove(self.user.username)
	# 			removed_friend.friends = json.dumps(removed_friend_friendlist)
	# 			removed_friend.save()
	# 	except User.DoesNotExist:
	# 		raise Http404("NO FRIEND REMOVED. Inputted username is not a valid username") 

