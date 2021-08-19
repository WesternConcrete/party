from rest_framework import serializers
from .models import ExtendedUser

class ExtendedUserSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	friends = serializers.StringRelatedField(many=True)
	blocked = serializers.StringRelatedField(many=True)
	blocked_by = serializers.StringRelatedField(many=True)


	class Meta: 
		model = ExtendedUser
		fields = '__all__'



	# user = serializers.StringRelatedField()
	# friends = serializers.StringRelatedField(many=True)
	# birthday = serializers.DateField()
	# last_latitude = serializers.DecimalField(max_digits=9, decimal_places=6)
	# last_longitude = serializers.DecimalField(max_digits=9, decimal_places=6)

