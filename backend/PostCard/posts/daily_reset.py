import random
import datetime
import pytz

def dailyReset():
    # Import the Employee model
    from database.models import PostsUser, Challenges, CurrentDay
    date = CurrentDay.objects.all()[0]
    timezone = pytz.timezone('Europe/London')
    currentDate = datetime.now(timezone).date()
    if currentDate != date.date:
        random.seed()
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
        date.dateOfLastInteraction = currentDate
        print("DAILY RESET SUCCESSFUL")
    print("DAILY RESET NOT NEEDED")
