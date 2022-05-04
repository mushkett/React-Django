from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview),
    path('posts/', views.posts_list),
    path('posts/<int:pk>/', views.post_detail),

    path('comments/', views.comments_list),
    path('comments/<int:pk>/', views.comment_detail),
]
