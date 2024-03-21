from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import *

@api_view(['POST','GET']) # We only want to recieve POST requests here, GET REQUESTS ARE INVALID!
@permission_classes([AllowAny])
def daily_reset_test(request):
    import random
    from database.models import PostsUser, Challenges
    random.seed()
    for x in PostsUser.objects.all():
        x.stepsTakenToday=0
        x.postsMadeToday=0
        x.postsSavedToday=0
        x.save()

    num_challenges=0
    for y in Challenges.objects.filter(type="daily"):
        y.inUse=False
        num_challenges+=1
        y.save()
        
    z=Challenges.objects.filter(type="daily")[random.randint(0,num_challenges)]
    z.inUse=True
    z.save()

    #return HttpResponse("Daily Reset Complete")
    return Response({"daily reset compete"},status=status.HTTP_200_OK)