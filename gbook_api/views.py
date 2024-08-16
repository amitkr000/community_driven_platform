from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import fetch_books_from_google, process_book_data

class BookSearchView(APIView):
    def get(self, request, format=None):
        query = request.query_params.get('q', '')
        startIndex = request.query_params.get('i', '')
        # print(startIndex)
        query = query.split()
        query = '+'.join(query)
        print(query)
        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        raw_data = fetch_books_from_google(query, startIndex)
        if raw_data is None:
            return Response({'error': 'Failed to fetch data. Please try again later.'}, status=500)
        processed_data = process_book_data(raw_data)
        return Response(processed_data, status=status.HTTP_200_OK)
