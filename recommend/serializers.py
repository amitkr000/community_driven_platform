from rest_framework import serializers
from .models import BookRecommendation, Like, Comment

class BookRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookRecommendation
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
