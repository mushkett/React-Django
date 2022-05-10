from apscheduler.schedulers.background import BackgroundScheduler
from posts.views import reset_upvote


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(reset_upvote, "interval", hours=24, replace_existing=True)
    scheduler.start()
