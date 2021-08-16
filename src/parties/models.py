from django.db import models
from register.models import ExtendedUser
import datetime

# Create your models here.

#--------------EXAMPLE OF MAKING DATETIME OBJECT BELOW---------------
# >>> from datetime import datetime
# >>> a = datetime.strptime("04:30",'%H:%M')
# >>> b = datetime.strptime("02:30",'%H:%M')
# >>> a
# datetime.datetime(1900, 1, 1, 4, 30)
# >>> b
# datetime.datetime(1900, 1, 1, 2, 30)
#--------------------------------------------------------------------

class Party(models.Model):
	name 	= models.CharField(max_length=32)
	host 	= models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, related_name='host', null=True)
	hide_host = models.BooleanField(default=False)
	public = models.BooleanField(default=False)
	invited_people = models.ManyToManyField(ExtendedUser,blank=True)
	latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
	longitude = models.DecimalField(max_digits=9, decimal_places=6,blank=True)
	address = models.CharField(max_length=128)
	start_time = models.DateTimeField(default = datetime.datetime.now, blank=True)
	end_time = models.DateTimeField(default = datetime.datetime.now, blank=True)
	radius = models.PositiveIntegerField(blank=True, null=True)
	min_age = models.PositiveIntegerField(default = 0, blank=True)
	max_age = models.PositiveIntegerField(default = 256, blank=True)
	message = models.TextField(max_length=280)
	attending_people = models.ManyToManyField(ExtendedUser,blank=True, related_name='attending_people')
	cancelled = models.BooleanField(default=False)
	ratings = models.TextField(null=True,default='{}')



	#rating_options = {1:'lame',2:'chill',3:'rager'}
#is used to add invited people to invited_people field. ONLY ADD PEOPLE TO PARTY USING THIS METHOD. MUST BE USED AFTER PARTY OBJECT IS CREATED
	def populate_invited(self,list_of_ExtendedUsers):
		for user in list_of_ExtendedUsers:
			if self.public:
				age = user.get_age()
				if age >= self.min_age and age <= self.max_age:
					user.add_invite(self)
			else:
				user.add_invite(self)

	def __str__(self):
		return self.name
#work in progress, adds the party to host's my_parties field. will hopefully be able to check for users within the radius and call populate_invited with a list of those users
	def save(self, *args, **kwargs):
		super(Party, self).save(*args, **kwargs)
		if self.host != None:
			self.host.my_parties.add(self)
		if self.public and self.radius != None:
			pass
#this is a rating function for party model object. simply call the rate function on the party with the rating 1-3 and the extended user object as parameters
	def rate(self, rating, exuser):
		rating_list = eval(self.ratings)
		rating_list[exuser.user.username] = rating
		self.ratings = str(rating_list)
		self.save()
		




	