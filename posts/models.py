from django.db import models

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=25)
    link = models.URLField()
    upvotes = models.IntegerField(default=0, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    author_name = models.CharField(max_length=25)

    def upvote_post(self):
        self.upvotes += 1


class Comment(models.Model):
    author_name = models.CharField(max_length=25)
    content = models.TextField()
    creation_date = models.DateField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
