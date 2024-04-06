from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PricingPlan
from .serializers import PricingPlanSerializer


# Create your views here.

class PricingPlanView(APIView):
    def get(self, request):
        print('dobar dan')
        return Response({"message":"success"})
    
    def post(self, request):
        serializer = PricingPlanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pricing_plan  = serializer.save()
        
        print('pricing_plna, ', pricing_plan)
        return Response({"message":"Successfully created pricing plan"})