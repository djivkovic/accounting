from rest_framework import serializers
from .models import PricingPlan

class PricingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlan
        fields = ['name', 'adv', 'price', 'creator', 'id']
        extra_kwargs = {
            'name': {'required': True},
            'adv': {'required': True}, 
            'price': {'required': True}, 
            'creator': {'required': True}, 
            'id': {'required': True}, 
            
        }
        
        def create(self, validated_data):
            return PricingPlan.objects.create(**validated_data)
        