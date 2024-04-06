from django.urls import path
from .views import PricingPlanView

urlpatterns = [
    path("create-pricing-plan", PricingPlanView.as_view(), name='create_pricing-plan-view'),
    
]
