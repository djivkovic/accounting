from rest_framework import serializers
from .models import PricingPlan, AccountingBalance, Transaction

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
        
        
class AccountingBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountingBalance
        fields = ['id', 'balance']
        extra_kwargs = {
            
            'id': {'required': True}, 
            'balance':{'required':True}
        }
        
        def create(self, validated_data):
            return AccountingBalance.objects.create(**validated_data)
        
        

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'userId', 'created_at']
        extra_kwargs = {
            'id': {'required': True},
            'created_at': {'read_only': True},  
        }

    def create(self, validated_data):
        return Transaction.objects.create(**validated_data)