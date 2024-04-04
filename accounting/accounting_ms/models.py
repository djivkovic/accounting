from django.db import models

# Create your models here.

class pricingPlan(models.Model):
    pricing_plan_name = models.CharField(max_length=100)
    pricing_plan_adv = models.CharField(max_length=100)
    pricing_plan_price = models.CharField(max_length=100)
    pricing_plan_creator = models.CharField(max_length=100)
    
    def __str__(self):
        return 'name: ' + self.pricing_plan_name +', adv: ' + self.pricing_plan_adv+', price: ' + self.pricing_plan_price+', creator:' + self.pricing_plan_creator