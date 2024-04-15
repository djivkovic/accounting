from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PricingPlan, AccountingBalance, Transaction
from .serializers import PricingPlanSerializer, AccountingBalanceSerializer, TransactionSerializer
from rest_framework import status
from django.utils import timezone
from django.http import HttpResponse
from datetime import timedelta
import csv

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
        
        
class BuyPricingPlan(APIView):
    def put(self, request):
        try:
            balance_instance = AccountingBalance.objects.get(id=1)
        except AccountingBalance.DoesNotExist:
            return Response({"message": "Accounting balance with specified id does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        current_balance = balance_instance.balance  
        new_balance = current_balance + int(request.data.get('balance', 0)) 

        serializer = AccountingBalanceSerializer(balance_instance, data={'balance': new_balance}, partial=True)
        if serializer.is_valid():
            serializer.save()
            
            user_id = request.data.get('user_id')
            amount = int(request.data.get('balance', 0))
            created_at = timezone.now()
            transaction_data = {'amount': amount, 'userId': user_id, 'created_at': created_at}
            transaction_serializer = TransactionSerializer(data=transaction_data)
            if transaction_serializer.is_valid():
                transaction_serializer.save()
                return Response(serializer.data)
            else:
                return Response

class GetAllTransactions(APIView):
    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
    
class ExportTransactionsCSV(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=Transactions.csv'
        
        writer = csv.writer(response)
        writer.writerow(['Id', 'Amount', 'User ID', 'Date'])
        
        transactions = Transaction.objects.all()
        for transaction in transactions:
            writer.writerow([transaction.id, transaction.amount, transaction.userId, transaction.created_at])
        
        return response
    
class ExportTransactionsCSV6(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=Transactions_6_months.csv'
        
        writer = csv.writer(response)
        writer.writerow(['Id', 'Amount', 'User ID', 'Date'])
        
        six_months_ago = timezone.now() - timedelta(days=180)
        transactions = Transaction.objects.filter(created_at__gte=six_months_ago)
        
        for transaction in transactions:
            writer.writerow([transaction.id, transaction.amount, transaction.userId, transaction.created_at])
        
        return response
    

class ExportTransactionsCSV12(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=Transactions_12_months.csv'
        
        writer = csv.writer(response)
        writer.writerow(['Id', 'Amount', 'User ID', 'Date'])
        
        twelve_months_ago = timezone.now() - timedelta(days=365)
        transactions = Transaction.objects.filter(created_at__gte=twelve_months_ago)
        
        for transaction in transactions:
            writer.writerow([transaction.id, transaction.amount, transaction.userId, transaction.created_at])
        
        return response

class GetBalance(APIView):
    def get(self, request):
        try:
            balance_instance = AccountingBalance.objects.get(id=1)
        except AccountingBalance.DoesNotExist:
            return Response({"message": "Accounting balance with specified id does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        current_balance = balance_instance.balance  
        serializer = AccountingBalanceSerializer(balance_instance, data={'balance': current_balance})
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response({"message":"error while getting balance..."})