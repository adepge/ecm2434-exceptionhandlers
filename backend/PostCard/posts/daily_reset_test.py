from rest_framework.response import Response
from rest_framework import status
def daily_reset_test(request):
    import random
    from database.models import PostsUser, Challenges
    random.seed()
    for x in PostsUser.objects.all():
        x.stepsTakenToday=0
        x.postsMadeToday=0
        x.postsSavedToday=0
        x.save()
    
    for y in Challenges.objects.all()[0:1]:
        y.inUse=False
        y.save()
    z=Challenges.objects.all()[random.randint(0,1)]
    z.inUse=True
    z.save()

    #return HttpResponse("Daily Reset Complete")
    return Response({"daily reset compete"},status=status.HTTP_200_OK)