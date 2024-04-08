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