from django.urls import path
from .views import PricingPlanView, AllPricingPlans,GetCurrentPricingPlan, EditPricingPlan,DeletePricingPlan,BuyPricingPlan

urlpatterns = [
    path("create-pricing-plan", PricingPlanView.as_view(), name='create_pricing-plan-view'),
    path("view-all-pricing-plans", AllPricingPlans.as_view(), name='view-all-pricing-plans-view'),
    path("get-current-pricing-plan/<str:id>", GetCurrentPricingPlan.as_view(), name='get-current-pricing-plan-view'),
    path("edit-pricing-plan/<str:id>", EditPricingPlan.as_view(), name="edit-pricing-plan-view"),
    path("delete-pricing-plan/<str:id>", DeletePricingPlan.as_view(), name="delete-pricing-plan-view"),
    path("pricing-plan-shop", BuyPricingPlan.as_view(), name='pricing-plan-shop-view')
]
