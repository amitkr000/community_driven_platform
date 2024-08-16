from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class BookRecommendation(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=100)
    rating = models.FloatField(null=True, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    cover_image = models.URLField(blank=True)
    # recommended_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recommendations')
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recommendation = models.ForeignKey(BookRecommendation, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recommendation = models.ForeignKey(BookRecommendation, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
