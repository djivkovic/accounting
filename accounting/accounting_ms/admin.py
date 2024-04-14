from django.contrib import admin
from .models import PricingPlan, AccountingBalance, Transaction
# Register your models here.


admin.site.register(PricingPlan)
admin.site.register(AccountingBalance)
admin.site.register(Transaction)

