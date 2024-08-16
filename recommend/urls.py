from django.urls import path
from .views import (
    BookRecommendationListCreateView,
    BookRecommendationListView,
    BookRecommendationUpdateView,
    LikeCreateView,
    CommentListCreateView
)

urlpatterns = [
    path('add-book/', BookRecommendationListCreateView.as_view(), name='recommendation-list'),
    path('retrive/', BookRecommendationListView.as_view()),
    path('update/<int:pk>/', BookRecommendationUpdateView.as_view(), name='recommendation-detail'),
    path('recommendations/<int:pk>/like/', LikeCreateView.as_view(), name='like-create'),
    path('recommendations/<int:pk>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
]
