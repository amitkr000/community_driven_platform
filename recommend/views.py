from rest_framework import generics, status
from rest_framework.response import Response
from .models import BookRecommendation, Like, Comment
from .serializers import BookRecommendationSerializer, LikeSerializer, CommentSerializer

# For creating new book entries in database
class BookRecommendationListCreateView(generics.ListCreateAPIView):
    queryset = BookRecommendation.objects.all()
    serializer_class = BookRecommendationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# For Retriving book data from database
class BookRecommendationListView(generics.ListAPIView):
    serializer_class = BookRecommendationSerializer

    def get_queryset(self):
        number_of_books = self.request.query_params.get('limit', None)
        queryset = BookRecommendation.objects.all()
        if number_of_books is not None:
            queryset = queryset[:int(number_of_books)]
        return queryset

# For updating existing entry and deleting a entry from database
class BookRecommendationUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookRecommendation.objects.all()
    serializer_class = BookRecommendationSerializer

class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
