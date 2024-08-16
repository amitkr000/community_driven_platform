from rest_framework import generics, status
from rest_framework.response import Response
from .models import BookRecommendation, Like, Comment
from .serializers import BookRecommendationSerializer, LikeSerializer, CommentSerializer

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

class BookRecommendationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookRecommendation.objects.all()
    serializer_class = BookRecommendationSerializer

class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
