from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import pricingPlan


# Create your views here.

class PricingPlanView(APIView):
    def get(self, request):
        print('dobar dan')
        return Response({"message":"success"})
    
    def post(self, request):
        pass