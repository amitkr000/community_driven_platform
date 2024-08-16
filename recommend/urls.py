from django.urls import path
from .views import (
    BookRecommendationListCreateView,
    BookRecommendationDetailView,
    LikeCreateView,
    CommentListCreateView
)

urlpatterns = [
    path('recommendations/', BookRecommendationListCreateView.as_view(), name='recommendation-list'),
    path('recommendations/<int:pk>/', BookRecommendationDetailView.as_view(), name='recommendation-detail'),
    path('recommendations/<int:pk>/like/', LikeCreateView.as_view(), name='like-create'),
    path('recommendations/<int:pk>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
]
