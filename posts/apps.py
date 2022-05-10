from django.apps import AppConfig


class PostsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'posts'

    def ready(self):
        print("Start Scheduler ...")

        from posts.upvotes_scheduler import upvotes_scheduler
        upvotes_scheduler.start()
