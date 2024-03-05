from background_task import background
import random

@background(schedule=60)
def dailyReset():
    random.seed()
    # Import the Employee model
    from database.models import PostsUser, Challenges
    for i in PostsUser.objects.all():
        x=PostsUser.objects.all()[i]
        x.stepsTakenToday=0
        x.postsMadeToday=0
        x.postsSavedToday=0
        x.save()
    y=Challenges.objects.all()[0:9]
    for j in y:
        j.inUse=False
    y.save()
    z=Challenges.objects.all()[random.randint(1,10)]
    z.inUse=True
    z.save()
    print("DATABASE RESET")
