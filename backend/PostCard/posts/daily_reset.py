
# function that resets user info related to all daily challenges and actives a random daily challenge
def dailyReset():
    try:
        import random
        from datetime import datetime
        import pytz
        from database.models import PostsUser, Challenges, CurrentDay
        timezone = pytz.timezone('Europe/London')
        currentDate = datetime.now(timezone).date()
        print("CURRENT DATE ACCORDING TO DEVICE = " + str(currentDate))
        date,_ = CurrentDay.objects.get_or_create()
        print("CURRENT DATE ACCORDING TO DATABASE = " + str(date.dateOfLastInteraction))

        # checking if the daily challenge has expired, (24hrs)
        if currentDate != date.dateOfLastInteraction:
            random.seed()
            # reseting user info for daily challenges
            for x in PostsUser.objects.all():
                x.postsMadeToday=0
                x.postsSavedToday=0
                x.save()
            
            # Resets all daily challenges to inactive and actives a random one
            number_daily_challenges=0
            for y in Challenges.objects.filter(type="daily"):
                y.inUse=False
                number_daily_challenges+=1
                y.save()
            z=Challenges.objects.filter(type="daily")[random.randint(0,number_daily_challenges-1)]
            z.inUse=True
            z.save()
            
            date.dateOfLastInteraction = currentDate
            date.save()
            print("DAILY RESET SUCCESSFUL")
        print("DAILY RESET NOT NEEDED")
    except Exception as err:
        print(err)
