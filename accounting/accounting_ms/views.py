from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PricingPlan
from .serializers import PricingPlanSerializer
from rest_framework import status

# Create your views here.

class PricingPlanView(APIView):
    def get(self, request):
        print('dobar dan')
        return Response({"message":"success"})
    
    def post(self, request):
        serializer = PricingPlanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pricing_plan  = serializer.save()
        
        print('pricing_plan, ', pricing_plan)
        return Response({"message":"Successfully created pricing plan"})
    
class AllPricingPlans(APIView):
    def get(self, request):
        products = PricingPlan.objects.all()
        serializer = PricingPlanSerializer(products, many=True)
        return Response(serializer.data)
    

class GetCurrentPricingPlan(APIView):
    def get(self, request, id):
        product = PricingPlan.objects.get(id=id)
        serializer = PricingPlanSerializer(product)
        return Response(serializer.data)
        
class EditPricingPlan(APIView):
    def post(self, request, id):
        product = PricingPlan.objects.get(id=id)
        
        if 'name' in request.data and request.data['name'] != '':
            product.name = request.data['name']
        
        if 'adv' in request.data and request.data['adv'] != '':
            product.adv = request.data['adv']
        
        if 'price' in request.data and request.data['price'] != '':
            product.price = request.data['price']
        
        product.save()
        return Response({"message":"Successfully edited pricing plan"})
    
    
class DeletePricingPlan(APIView):
    def delete(self, request, id):
        try:
            product = PricingPlan.objects.get(id=id)
            product.delete()
            return Response({"message": "Successfully deleted pricing plan"}, status=status.HTTP_204_NO_CONTENT)
        except PricingPlan.DoesNotExist:
            return Response({"error": "Pricing plan not found"}, status=status.HTTP_404_NOT_FOUND)
    