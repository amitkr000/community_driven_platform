from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
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
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['genre', 'rating', 'publication_date']
    ordering_fields = ['title', 'author', 'rating', 'publication_date']

    def get_queryset(self):
        queryset = BookRecommendation.objects.all()

        return queryset

    def filter_queryset(self, queryset):
        # Apply any filtering and ordering specified in the view
        queryset = super().filter_queryset(queryset)

        # Apply the limit last
        limit = self.request.query_params.get('limit', None)
        if limit is not None:
            queryset = queryset[:int(limit)]

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
