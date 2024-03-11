

def dailyReset():
    try:
        import random
        from datetime import datetime
        import pytz
        from database.models import PostsUser, Challenges, CurrentDay
        timezone = pytz.timezone('Europe/London')
        currentDate = datetime.now(timezone).date()
        print("CURRENT DATE ACCORDING TO DEVICE = " + str(currentDate))
        date = CurrentDay.objects.first()
        print("CURRENT DATE ACCORDING TO DATABASE = " + str(date.dateOfLastInteraction))
        if currentDate != date.dateOfLastInteraction:
            random.seed()
            for x in PostsUser.objects.all():
                x.stepsTakenToday=0
                x.postsMadeToday=0
                x.postsSavedToday=0
                x.save()
            
            for y in Challenges.objects.all()[0:2]:
                y.inUse=False
                y.save()
            z=Challenges.objects.all()[random.randint(0,2)]
            z.inUse=True
            z.save()
            date.dateOfLastInteraction = currentDate
            date.save()
            print("DAILY RESET SUCCESSFUL")
        print("DAILY RESET NOT NEEDED")
    except Exception as err:
        print(err)
