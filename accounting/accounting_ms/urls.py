from django.urls import path
from .views import PricingPlanView, AllPricingPlans,GetCurrentPricingPlan, EditPricingPlan,DeletePricingPlan,BuyPricingPlan, GetAllTransactions, ExportTransactionsCSV, ExportTransactionsCSV12, ExportTransactionsCSV6,GetBalance

urlpatterns = [
    path("create-pricing-plan", PricingPlanView.as_view(), name='create_pricing-plan-view'),
    path("view-all-pricing-plans", AllPricingPlans.as_view(), name='view-all-pricing-plans-view'),
    path("get-current-pricing-plan/<str:id>", GetCurrentPricingPlan.as_view(), name='get-current-pricing-plan-view'),
    path("edit-pricing-plan/<str:id>", EditPricingPlan.as_view(), name="edit-pricing-plan-view"),
    path("delete-pricing-plan/<str:id>", DeletePricingPlan.as_view(), name="delete-pricing-plan-view"),
    path("pricing-plan-shop", BuyPricingPlan.as_view(), name='pricing-plan-shop-view'),
    path("get-all-transactions", GetAllTransactions.as_view(), name='get-all-transactions-view'),
    path("get-all-transactions-csv", ExportTransactionsCSV.as_view(), name='get-12month-transactions-csv-view'),
    path("get-12month-transactions-csv", ExportTransactionsCSV12.as_view(), name='get-all-transactions-csv-view'),
    path("get-6month-transactions-csv", ExportTransactionsCSV6.as_view(), name='get-6month-transactions-csv-view'),
    path("get-balance", GetBalance.as_view(), name="get-balance-view")
    
    
]
