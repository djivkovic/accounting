from django.urls import path
from .views import PricingPlanView, AllPricingPlans,GetCurrentPricingPlan

urlpatterns = [
    path("create-pricing-plan", PricingPlanView.as_view(), name='create_pricing-plan-view'),
    path("view-all-pricing-plans", AllPricingPlans.as_view(), name='view-all-pricing-plans-view'),
    path("get-current-pricing-plan/<str:id>", GetCurrentPricingPlan.as_view(), name='get-current-pricing-plan-view'),
    
    
    
]
