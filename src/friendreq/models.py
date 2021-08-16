from django.db import models
from register.models import ExtendedUser
# Create your models here.

class FriendReq(models.Model):
	from_user 	= models.ForeignKey(ExtendedUser, related_name='from_user', on_delete=models.CASCADE)
	to_user 	= models.ForeignKey(ExtendedUser, related_name='to_user', on_delete=models.CASCADE)
	accepted 	= models.BooleanField(default=False)
	rejected 	= models.BooleanField(default=False)

	#friend request can be created using the parameters from_user and to_user (which are both ExtendedUser objects)
	#they can be accepted or rejected. make sure to do the following lines of code to accept:
	#
	#    assume request is equal to the current FriendReq object that is ready to be accepted
	#req = request
	#req.accepted = True
	#req.save()
	#
	#to reject, simply replace 'req.accepted' with 'req.rejected'

	#when searching for user to send freind request, remember to now show the current user

	def __str__(self):
		return "from:" + str(self.from_user) + "-to: " +str(self.to_user)


	def save(self, *args, **kwargs):
		super(FriendReq, self).save(*args, **kwargs)

		self.from_user.add_pending_friendreq(self)
		self.to_user.add_pending_friendreq(self)

		if self.to_user == self.from_user:
			self.delete()
		else:
			if self.accepted:
				print("Request accepted, adding friends and deleting request")
				self.from_user.add_friend(self.to_user)
				self.to_user.add_friend(self.from_user)
				self.delete()

			if self.rejected:
				self.delete()




