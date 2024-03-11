from django.shortcuts import render
from rest_framework import generics
from database.models import Geolocation, Posts, Stickers, StickersUser, PostsUser, Challenges
from PostCard.serializers import PostsSerializer, GeolocationSerializer, StickersSerializer, StickersUserSerializer, PostsUserSerializer, ChallengesSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .daily_reset import dailyReset


# creating the views based on the models, should be able to list and view the data


#Returns All posts objects
class PostsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [AllowAny]

#Returns a specific post made by using the postID
class PostsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [AllowAny]

#Returns all geolocations retrieved from posts made
class GeolocationList(generics.ListCreateAPIView):
    queryset = Geolocation.objects.all()
    serializer_class = GeolocationSerializer
    permission_classes = [AllowAny]

#Returns a specific geolocation
class GeolocationDetail(generics.RetrieveAPIView):
    queryset = Geolocation.objects.all()
    serializer_class = GeolocationSerializer
    permission_classes = [AllowAny]

#Returns all stickers made
class StickersList(generics.ListCreateAPIView):
    queryset = Stickers.objects.all()
    serializer_class = StickersSerializer
    permission_classes = [AllowAny]

#Returns a specific sticker made 
class StickersDetail(generics.RetrieveAPIView):
    queryset = Stickers.objects.all()
    serializer_class = StickersSerializer
    permission_classes = [AllowAny]

#Returns all stickers owned by a user
class StickersUserList(generics.ListCreateAPIView):
    queryset = StickersUser.objects.all()
    serializer_class = StickersUserSerializer
    permission_classes = [AllowAny]

#Returns a sticker owned by a user
class StickersUserDetail(generics.RetrieveAPIView):
    queryset = StickersUser.objects.all()
    serializer_class = StickersUserSerializer
    permission_classes = [AllowAny]

#Returns all posts made by a user    
class PostUserList(generics.ListCreateAPIView):
    queryset = PostsUser.objects.all()
    serializer_class = PostsUserSerializer
    permission_classes = [AllowAny]

#Returns a specific post made by a user    
class PostUserDetail(generics.RetrieveAPIView):
    queryset = PostsUser.objects.all()
    serializer_class = PostsUserSerializer
    permission_classes = [AllowAny]

#Returns all Challenges    
class ChallengesList(generics.ListCreateAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [AllowAny]

#Returns a specific challenge
class ChallengesDetail(generics.RetrieveAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [AllowAny]

@api_view(['POST']) # Secuirty purposes we do not want to append user details to header
@permission_classes([AllowAny])
def createPost(request):
    try:
        userid = request.user.id
    except:
        # if user is not logged in, then raise an error
        return Response({"message":"User not logged in"},status=status.HTTP_400_BAD_REQUEST)
    
    #Getting the length of image name
    filename = request.FILES['image'].name
    filename_length = len(filename)

    #If its larger than 100 than get upload the last 30 chars to avoid errors
    if filename_length > 100:
        request.FILES['image'].name = filename[-30:] 

    # Create a mutable copy of request.data
    #data = request.data.copy()
    print(request.data)
    request.data['userid'] = userid  # Add 'userid' key

    try:
        userData = PostsUser.objects.get(userID = request.data['userid'])
        userData.postsMade += 1
        userData.postsMadeToday += 1
        dailyReset()
    except:
        print("Failed to get user data")
   

    # Create a serializer instance with the mutable copy of request.data
    serialized = PostsSerializer(data=request.data)
    
    if serialized.is_valid():
        serialized.save()
        return Response({"message":"Post made"},status=status.HTTP_201_CREATED) # Successful post creation
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST) # Failed post creation  

@api_view(['POST' ,'Get']) 
@permission_classes([AllowAny])
def getUser(request):
    try:
        dailyReset()
        user = request.user
        user_information,_ = PostsUser.objects.get_or_create(userID=user)
        userid = request.user.id
        username = request.user.username
        print(user_information.coins)
    except Exception as e:
        # if user is not logged in, then raise an error
        return Response({"Message":"error"},status=status.HTTP_400_BAD_REQUEST)
    return Response({"userid":userid,"username":username,"coins":user_information.coins},status=status.HTTP_200_OK)  # Successful user creation

#TODO 
#1 create view to return all avatars avaiable for user
#2 modify getUser to return the img avatar they're using

@api_view(['POST' ,'Get']) 
@permission_classes([AllowAny])
def getChallenges():
    try:
        # checks to see if the challenge is daily (ID's 1,2,3) & its active 
        todays_challenge = Challenges.objects.filter(id__in= [1,2,3],inUse=True) 
        active_challenge = todays_challenge.first() # We can get the active challenge today

        milestone_1 = Challenges.objects.get(id= 4)
        milestone_2 = Challenges.objects.get(id= 5) 
 

    except Exception as error:
        return Response({"Error": error},status=status.HTTP_400_BAD_REQUEST)
    # Returns the challenge requirement
    return Response({"Todays Challenge": active_challenge.challengeDesc, "No. of Post creation":active_challenge.postsNeeded, "No. of Post saves":active_challenge.savesNeeded, "Coins rewarded" : active_challenge.coinsRewarded,
                     "Milestone Challenge 1": milestone_1.challengeDesc, "No. of Post creation":milestone_1.postsNeeded, "No. of Post saves":milestone_1.savesNeeded, "Coins rewarded" : milestone_1.coinsRewarded,
                     "Milestone Challenge 2": milestone_2.challengeDesc, "No. of Post creation":milestone_2.postsNeeded, "No. of Post saves":milestone_2.savesNeeded, "Coins rewarded" : milestone_2.coinsRewarded,}, status=status.HTTP_200_OK)


@api_view(['POST' ,'Get']) 
@permission_classes([AllowAny])
def checkWinner(request):

    user = request.user
    user_data = PostsUser.objects.get_or_create(userID=user)

    todays_challenge = Challenges.objects.filter(id__in=[1,2,3],inUse=True) 
    challenge = todays_challenge.first()

    milestone_1 = Challenges.objects.get(id= 4)
    milestone_2 = Challenges.objects.get(id= 5) 

    # Daily Challenges
    if challenge.savesNeeded and user_data.postsSavedToday == 5:
        user_data.coins += challenge.coinsRewarded
        return Response({"Message": f"You completed today's challenge! Your reward is {challenge.coinsRewarded}"}, status=status.HTTP_200_OK)
    
    if challenge.postsNeeded and user_data.postsMadeToday == 5:
        user_data.coins += challenge.coinsRewarded
        return Response({"Message": f"You completed today's challenge! Your reward is {challenge.coinsRewarded}"}, status=status.HTTP_200_OK)
    
    if challenge.postsNeeded and challenge.savesNeeded and user_data.postsSavedToday and user_data.postsSavedToday == 2:
        user_data.coins += challenge.coinsRewarded
        return Response({"Message": f"You completed today's challenge! Your reward is {challenge.coinsRewarded}"}, status=status.HTTP_200_OK)
    
    # Milestone Challenges
    if milestone_1.postsNeeded or milestone_1.savesNeeded == user_data.postsMade or user_data.postsSaved:
        user_data.coins += milestone_1.coinsRewarded
        return Response({"Message": f"You completed a Milestone! Your reward is {milestone_1.coinsRewarded}"})
    if milestone_2.postsNeeded or milestone_2.savesNeeded == user_data.postsMade or user_data.postsSaved:
        user_data.coins += milestone_2.coinsRewarded
        return Response({"Message": f"You completed a Milestone! Your reward is {milestone_2.coinsRewarded}"})
    
@api_view(['POST' ,'Get']) 
@permission_classes([AllowAny])
def purchase(request):
    user = request.user
    user_data,_ = PostsUser.objects.get_or_create(userID=user)
    
    #Seeing if sticker exists
    try : 
        sticker = request.data.get("sticker")
        avatar = Stickers.objects.get(id=sticker) # getting the sticker id assoicated with that avatar

    except:
        return Response({"Message": "Sticker does not exist"},status=status.HTTP_404_NOT_FOUND)

    # Checks to see If user has enough coins to purchase a avatar
    if user_data.coins < avatar.stickerPrice:
        return Response({"Message": f"Insuffiecient funds, You require {avatar.stickerPrice - user_data.coins} more coins"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user_data.coins -= avatar.stickerPrice
        user_data.unlockedAvatars.add(avatar)
        return Response({"Message": f"Successful purchase, you have {user_data.coins}"}, status=status.HTTP_200_OK)






from django.utils import timezone
from datetime import timedelta

@api_view(['POST','GET'])
@permission_classes([AllowAny])
def getPostsLast24Hours(request):
    try:
        current_time = timezone.now()
        
        #stores the last 24 hrs
        time_24_hours_ago = current_time - timedelta(days=1)

        #Stores posts made in the last 24hrs
        recent_posts = Posts.objects.filter(datetime__range=[time_24_hours_ago, current_time]).select_related('geolocID')
        
        data = []
        # Prepare the data to return
        for post in recent_posts:
            data.append({
            'id': post.id,
            'image': post.image.url,
            'caption': post.caption,
            'datetime': post.datetime,
            'open': False,
            'position': {
                'location': post.geolocID.location,
                'lat': post.geolocID.latitude,
                'lng': post.geolocID.longitude,
                }
            }
            )

        
            # Return the data as JSON
        return Response(data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    
@api_view(['POST'])
@permission_classes([AllowAny])
def addCollection(request):
    try:
        user = request.user
    except Exception as e:
        #if user is not logged in
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    post_id = request.data.get('postid')
    if not post_id:
        #If post not found
        return Response({"message": "postid not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Retrieve the Post instance using post_id
        post = Posts.objects.get(id=post_id)
    except Posts.DoesNotExist:
        return Response({"message": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    sticker_default = Stickers.objects.first() # setting up a temporary sticker instance to prevent NOT NULL ERROR for avatarInUse

    # Get or create a PostsUser instance for the user
    posts_user, created = PostsUser.objects.get_or_create(userID=user,avatarInUse=sticker_default)
    
    # Add the post to the user's collection
    posts_user.postID.add(post)
    try:
        posts_user.postsMade += 1
        posts_user.postsMadeToday += 1
    except:
        print("Failed to get user data")
    dailyReset()
    return Response({"message": "Post added to collection"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])

#returns the collection of posts saved by a user
def getCollections(request):
    try:
        user = request.user
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        posts_user = PostsUser.objects.get(userID=user)

    except PostsUser.DoesNotExist:
        posts_user = [] 
    
    print(posts_user)
    serializer = PostsUserSerializer(posts_user)
    postlist = serializer.data.get('postID')
    posts = Posts.objects.filter(id__in=postlist)
    serializer = PostsSerializer(posts, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
