from django.db import models
from django.contrib.auth.models import User
from register.models import ExtendedUser
import json
from django.http import Http404

# Create your models here.
#

#for this to work, spencer must build a menu to select a bunch of users, then a "create group button"(this includes a group name). 
#those users will then be stored in a list, a Group object will be created without any users, then the list of users
#will be iterated through and each extended user object will call the function ExtendedUserObject.add_group(Group object)

class Group(models.Model):
	name 	= models.CharField(max_length=32, blank=False)
	members = models.ManyToManyField(ExtendedUser, blank=True)

	def __str__(self):
		return self.name
	
	#to add members to group, dont use django admin. in django shell, create list of extendeduser objects and iteratre through list doing extendeduser.add_group(GroupObject)

	# can add members using .add(ExtendedUserObject)
	# can remove with same ^
	# can view all members using .all()
