from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def UserRegisterAuthentication(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Account is made and save to the database
        return Response(status=status.HTTP_201_CREATED)  # Successful user creation
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return specific error messages
