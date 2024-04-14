from django.db import models

# Create your models here.

class PricingPlan(models.Model):
    name = models.CharField(max_length=100)
    adv = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    creator = models.CharField(max_length=100)
    id = models.AutoField(primary_key=True)
    
    def __str__(self):
        return 'name: ' + self.name +', adv: ' + self.adv+', price: ' + self.price+', creator:' + self.creator
    

class AccountingBalance(models.Model):
    id = models.AutoField(primary_key=True)
    balance = models.IntegerField()
    
    def __str__(self):
        return 'balance: ' + str(self.balance)

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.IntegerField()
    userId = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Transaction {self.id} - Amount: {self.amount}, User ID: {self.userId}, Created At: {self.created_at}"
