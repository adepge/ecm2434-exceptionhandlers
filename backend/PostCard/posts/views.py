from django.shortcuts import render
from rest_framework import generics
from database.models import Geolocation, Posts, Stickers, PostsUser, Challenges
from PostCard.serializers import PostsSerializer, GeolocationSerializer, StickersSerializer,StickersUser, StickersUserSerializer, PostsUserSerializer, ChallengesSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .daily_reset import dailyReset
from django.conf import settings
from django.urls import path
import os
from django.db import IntegrityError
from .checkWinner import checkWinner



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

@api_view(['POST','Get']) 
@permission_classes([AllowAny])
#CREATES ALL OBJECTS NEEDED , MUST BE CALLED FIRST
def createObjects(request):
    try:
        #Creating all challenges 
            
        #Daily
        x,_ = Challenges.objects.get_or_create(postsNeeded = 5, coinsRewarded = 25, challengeDesc="Create 5 posts")
        y,_ = Challenges.objects.get_or_create(savesNeeded = 5, coinsRewarded = 25, challengeDesc ="Save 5 posts")
        #Milestone
        a,_ = Challenges.objects.get_or_create(postsNeeded = 35, inUse = True, coinsRewarded = 250, challengeDesc = "Create 35 posts")
        b,_ = Challenges.objects.get_or_create(savesNeeded = 35, inUse = True, coinsRewarded = 250, challengeDesc = "Save 35 posts")
        
        base = f"{request.scheme}://{request.get_host()}{settings.MEDIA_URL}media/avatar/"
        avatar_files = os.listdir(os.path.join(settings.MEDIA_ROOT, 'media/avatar'))

        #Loops through all the avatar files and appending it to base
        for files in avatar_files:
            index = files.index(".")
            # Creating all the needed sticker objects
            x,y = Stickers.objects.get_or_create(stickersName = files[:index], fileName = base+files, stickerPrice = 25)
            if y == False: # sticker does not exist
                x.save()

    except Exception as e:
        return Response({e},status=status.HTTP_404_NOT_FOUND)

    return Response({"Database set up"},status=status.HTTP_201_CREATED)

@api_view(['POST','Get']) 
@permission_classes([AllowAny])
def changeBio(request):
    try:
        user = request.user.id
        bio = request.data['bio']
        youtubeUrl = request.data['youtube']
        twitterUrl = request.data['twitter']
        instagramUrl = request.data['instagram']  

        user_info,_ = PostsUser.objects.get_or_create(userID=user)
        user_info.bio = bio
        user_info.youtubeLink = youtubeUrl
        user_info.twitterLink = twitterUrl 
        user_info.instagramLink = instagramUrl

        user_info.save()

    except Exception as e:
        return Response({e},status=status.HTTP_400_BAD_REQUEST)
    return Response({"youtube":youtubeUrl,"twitter":twitterUrl,"instagram":instagramUrl,"Bio":bio},status=status.HTTP_200_OK)

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
    request.data['userid'] = userid  # Add 'userid' key

    try:
        userData = PostsUser.objects.get(userID = userid)
        milestone_1 = Challenges.objects.get(postsNeeded=35)
        Inuse_challenges = Challenges.objects.filter(inUse=True)

        for i in Inuse_challenges:
            if i.postsNeeded < 10 and i.savesNeeded < 10:
                todays_challenge = i        
        
        if userData.postsMadeToday != todays_challenge.postsNeeded:
            userData.postsMadeToday += 1
            userData.save()
            checkWinner(userData,todays_challenge)

        elif userData.postsMade != milestone_1.postsNeeded:
            userData.postsMade += 1
            userData.save()
            checkWinner(userData,milestone_1)

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
        user_info,_ = PostsUser.objects.get_or_create(userID=user)
        username = request.user.username
       
        if user_info.unlockedAvatars.exists() == False:
            user_info.unlockedAvatars.add(Stickers.objects.create(stickersName="default",stickerPrice =0,fileName="NULL"))
            user_info.avatarInUse = user_info.unlockedAvatars.get(stickersName="default")
            user_info.save()
    except Exception as e:
        # if user is not logged in, then raise an error
        return Response({"Message":e},status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"username":username,"coins":user_info.coins,"profilePicture": user_info.avatarInUse.fileName,
                     "Bio":user_info.bio,"youtube":user_info.youtubeLink,"instagram":user_info.instagramLink,"twitter":user_info.twitterLink},status=status.HTTP_200_OK) 

@api_view(['POST','GET'])
@permission_classes([AllowAny])
def changeAvatar(request):
    user = request.user.id
    user_info,_ = PostsUser.objects.get_or_create(userID = user)
    profile_name = request.data['avatar'] # this correct? 

    unlocked_avatars = user_info.unlockedAvatars.all()
    unlocked_avatars_list = []
    for avatars in unlocked_avatars:
        unlocked_avatars_list.append(avatars.stickersName)

    if profile_name not in unlocked_avatars_list:
        return Response({"You have not unlocked this avatar"},status=status.HTTP_401_UNAUTHORIZED)
    else:
        profile_pic = Stickers.objects.get(stickersName = profile_name)
        user_info.avatarInUse = profile_pic
        user_info.save()

        
        return Response({"you successfully changed your profile! Your current profile is": user_info.avatarInUse.fileName, "Avatar name is": user_info.avatarInUse.stickersName},status=status.HTTP_200_OK)

@api_view(['POST','GET'])
@permission_classes([AllowAny])
# RETURNS ALL AVATARS NOT OWNED BY A USER
def getAvatars(request):
    try:
        user = request.user
        user_info,_ = PostsUser.objects.get_or_create(userID=user)

        # loops and returns all avatars a user owns in a list          
        all_avatars = user_info.unlockedAvatars.all()
        all_avatars_list = []
        for avatars in all_avatars:
                all_avatars_list.append(avatars.stickersName)
        
        #loops and returns all avatars that a user DOES NOT own
        all_stickers = Stickers.objects.all()
        all_stickers_list = []
        for stickers in all_stickers:
            if stickers.stickersName not in all_avatars_list:
                all_stickers_list.append({"name":stickers.stickersName,"price":stickers.stickerPrice,"path":stickers.fileName})

    except Exception as e:
        return Response({e}, status=status.HTTP_400_BAD_REQUEST)
    return Response(all_stickers_list,status=status.HTTP_200_OK)


@api_view(['POST','GET'])
@permission_classes([AllowAny])
# RETURNS ALL AVATARS OWNED BY A USER
def getAllAvatars(request):
    user = request.user.id
    user_info = PostsUser.objects.get(userID=user)

    all_avatars = user_info.unlockedAvatars.all()
    all_avatars_list = []

    for avatars in all_avatars:
            all_avatars_list.append({"name":avatars.stickersName,"price":avatars.stickerPrice,"path":avatars.fileName})
    return Response(all_avatars_list,status=status.HTTP_200_OK)



@api_view(['POST' ,'Get']) 
@permission_classes([AllowAny])
def getChallenges(request):
    try:
        user = request.user.id
        user_info,_ = PostsUser.objects.get_or_create(userID=user)

        # gets list of objects that are active, loops and gets daily challenge
        Inuse_challenges = Challenges.objects.filter(inUse=True)
        for i in Inuse_challenges:
            if i.postsNeeded < 10 and i.savesNeeded < 10:
                todays_challenge = i

        milestone_1 = Challenges.objects.get(postsNeeded = 35)
        milestone_2 = Challenges.objects.get(savesNeeded = 35) 
 

    except Exception as error:
        return Response({"Error": error},status=status.HTTP_400_BAD_REQUEST)

    # dict containing all challenge related info
    all_challenges = {"DailyChallenge":todays_challenge.challengeDesc, "DailyCoinsRewarded":25,"Milestone1Challenge":milestone_1.challengeDesc
                      ,"Milestone1CoinsRewarded": milestone_1.coinsRewarded, "Milestone2Challenge": milestone_2.challengeDesc, "Milestone2CoinsRewarded":milestone_2.coinsRewarded}

    if todays_challenge.savesNeeded == 0: 
        all_challenges["Daily"] = str(user_info.postsMadeToday) +"/"+ str(todays_challenge.postsNeeded)
    elif todays_challenge.postsNeeded == 0:
        all_challenges["Daily"] = str(user_info.postsSavedToday) +"/"+ str(todays_challenge.savesNeeded)
    
    if milestone_1.postsNeeded == 0:
        all_challenges["Milestone1"] = str(user_info.postsSaved)+"/"+str(milestone_1.savesNeeded)
    elif milestone_2.savesNeeded == 0:
        all_challenges["Milestone2"] = str(user_info.postsMade)+"/"+str(milestone_1.postsNeeded)
    else:
        all_challenges["Milestone1"] = str(user_info.postsMade)+"/"+str(milestone_1.postsNeeded)
        all_challenges["Milestone2"] = str(user_info.postsSaved)+"/"+str(milestone_2.savesNeeded)
    return Response(all_challenges, status=status.HTTP_200_OK)

    
@api_view(['POST' ,'Get']) 
@permission_classes([AllowAny])
def purchase(request):
    user = request.user
    user_data,_ = PostsUser.objects.get_or_create(userID=user)
    
    #Seeing if sticker exists
    try : 
        sticker = request.data['sticker']
        avatar = Stickers.objects.get(stickersName=sticker) # getting the sticker id assoicated with that avatar
    except:
        return Response({"Message": "Sticker does not exist"},status=status.HTTP_409_CONFLICT)

    # Checks to see If user has enough coins to purchase a avatar
    if user_data.coins < avatar.stickerPrice:
        return Response({"Message": f"Insuffiecient funds, You require {avatar.stickerPrice - user_data.coins} more coins"}, status=status.HTTP_409_CONFLICT)
    else:
        try:
            user_data.unlockedAvatars.add(avatar)
            user_data.coins -= avatar.stickerPrice
            user_data.save()
        except IntegrityError:
            return Response({"Message": "You already own this avatar"}, status=status.HTTP_409_CONFLICT)
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
    

    # Get or create a PostsUser instance for the user
    posts_user, created = PostsUser.objects.get_or_create(userID=user)

    # Add the post to the user's collection
    posts_user.postID.add(post)
    try:
                
        milestone_2 = Challenges.objects.get(savesNeeded=35)
        Inuse_challenges = Challenges.objects.filter(inUse=True)
        for i in Inuse_challenges:
            if i.postsNeeded < 10 and i.savesNeeded < 10:
                todays_challenge = i        
        
        if posts_user.postsSavedToday != todays_challenge.savesNeeded:
            posts_user.postsSavedToday += 1
            posts_user.save()
            checkWinner(posts_user,todays_challenge)

        if posts_user.postsSaved != milestone_2.savesNeeded:
            posts_user.postsSaved += 1
            posts_user.save()
            checkWinner(posts_user,milestone_2)

        dailyReset()
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
        return Response([], status=status.HTTP_200_OK)
    
    serializer = PostsUserSerializer(posts_user)
    postlist = serializer.data.get('postID')
    posts = Posts.objects.filter(id__in=postlist)
    serializer = PostsSerializer(posts, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)