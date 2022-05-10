from django.db.models import F
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment


# Create your views here.


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        "Posts": {
            'Add': {
                'URL': '/posts',
                'Method': 'POST'
            },
            'Post list': {
                'URL': '/posts',
                'Method': 'GET'
            },
            'Post detail': {
                'Get post by id': {
                    'URL': '/posts/<int:pk>/',
                    'Method': 'GET'
                },
                'Update post by id': {
                    'URL': '/posts/<int:pk>/',
                    'Method': 'PUT'
                },
                'Delete post by id': {
                    'URL': '/posts/<int:pk>/',
                    'Method': 'DELETE'
                }
            }
        },
        "Commentaries": {
            'Add': {
                'URL': '/comments',
                'Method': 'POST'
            },
            'Comments list': {
                'URL': '/comments',
                'Method': 'GET'
            },
            'Comment detail': {
                'Get comment by id': {
                    'URL': 'comments/<int:pk>/',
                    'Method': 'GET'
                },
                'Update comment by id': {
                    'URL': 'comments/<int:pk>/',
                    'Method': 'PUT'
                },
                'Delete comment by id': {
                    'URL': 'comments/<int:pk>/',
                    'Method': 'DELETE'
                }
            }
        },
    }
    return Response(api_urls)


@api_view(['GET', 'POST'])
def posts_list(request):
    if request.method == 'GET':
        if request.query_params:
            posts = Post.objects.filter(**request.query_params.dict())
        else:
            posts = Post.objects.all()

        if posts:
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':

        if Post.objects.filter(**request.data).exists():
            raise serializers.ValidationError("This data already exists!")

        post = PostSerializer(data=request.data)

        if post.is_valid():
            post.save()
            return Response(post.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = PostSerializer(post, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def comments_list(request):
    if request.method == 'GET':
        if request.query_params:
            comment = Comment.objects.filter(**request.query_params.dict())
        else:
            comment = Comment.objects.all()

        if comment:
            serializer = CommentSerializer(comment, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == "POST":
        comment = CommentSerializer(data=request.data)
        if Comment.objects.filter(**request.data).exists():
            raise serializers.ValidationError("This data already exists!")

        if comment.is_valid():
            comment.save()
            return Response(comment.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
def comment_detail(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CommentSerializer(comment, context={'request': request})
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = CommentSerializer(comment, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def upvote_post(request, pk):
    if request.method == "POST":
        Post.objects.filter(pk=pk).update(upvotes=F('upvotes') + 1)
        return Response(status=status.HTTP_204_NO_CONTENT)


def reset_upvote():
    Post.objects.update(upvotes=0)
