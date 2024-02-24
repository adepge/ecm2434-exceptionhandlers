from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import *

@api_view(['POST'])
@permission_classes([AllowAny])
# We only want to recieve POST requests here, GET REQUESTS ARE INVALID!
def UserRegisterAuthentication(request):
    
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() # Account is made and save to the database, test by checking the admin page / querying to DB
        return Response(status=status.HTTP_201_CREATED)    # Successful user creation
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST) # Failed user creation
    


