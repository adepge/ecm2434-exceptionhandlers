### Backend files and document


Set up and activate a virtual environment:

```bash
$ cd backend/venv/

$ source .env/bin/activate          # Linux
$ ./Scripts/activate             # Windows
```

Navigate to the project directory, where `manage.py` is located.

```bash
$ cd PostCard
```

Install the required packages to your environment.:

```bash
$ pip install -r requirements.txt
```

Set environmental variable to true.

```bash
$ $env:APP_DEVELOPMENT="True"           # Windows Powershell
$ export APP_DEVELOPMENT=true           # MacOS and Linux
$ printenv                          # List currently set environs on macos and linux
```

Set up your local database by running migrations:

```bash
$ python manage.py makemigrations database
$ python manage.py migrate
```

Create a superuser for admin control of the database

```bash
$ python manage.py createsuperuser
```

Finally, run the server:

```bash
$ python manage.py runserver
```

You can visit it at `http://localhost:8000/` (`http://127.0.0.1:8000/`).

# API ENDPOINTS DESCRIPTION #

Url : http://127.0.0.1:8000/api/register/ <br>
What requests it accepts : "Post" <br>
What it returns if successful : Status 200 and token generated for user created and saved <br>
What it returns if unsuccessful : status 400 <br>
Permissions : Any <br>

Url : http://127.0.0.1:8000/api/login/
What requests it accepts : "Post"
What it returns if successful: Status 200 and token assigned to existsing user
What it returns if unsuccessful : status 400 and the error message: "Invalid credentials"
Permissions : Any

Url : http://127.0.0.1:8000/api/posts/
What requests it accepts : Any
What it returns if successful : All posts made
Permissions : Any

Url : http://127.0.0.1:8000/api/posts/<int:pk>/
What requests it accepts : Any
What it returns if successful : A specific post made by using postID
Permissions : Any

Url : http://127.0.0.1:8000/api/geolocations/
What requests it accepts : Any
What it returns if successful : All geolocations retrieved by making posts
Permissions : Any

Url : http://127.0.0.1:8000/api/geolocations/<int:pk>/
What requests it accepts : Any
What it returns if successful : Specific geolocation retrieved from a post made
Permissions : Any

Url : http://127.0.0.1:8000/api/stickers/
What requests it accepts : Any
What it returns if successful : All stickers made 
Permissions : Any

Url : http://127.0.0.1:8000/api/stickers/<int:pk>/
What requests it accepts : Any
What it returns if successful : A specific sticker made using stickerID
Permissions : Any

Url : http://127.0.0.1:8000/api/stickerusers/
What requests it accepts : Any
What it returns if successful : All stickers owned by a user
Permissions : Any

Url : http://127.0.0.1:8000/api/stickerusers/<int:pk>/
What requests it accepts : Any
What it returns if successful: A sticker owned by a user
Permissions : Any

Url : http://127.0.0.1:8000/api/createPost/
What requests it accepts : "Post"
What it returns if successful : Status 200, post saved to db and a message : "post made"
What it returns if unsuccessful : status 400
Permissions : Any

Url : http://127.0.0.1:8000/api/getRecentPosts/
What requests it accepts : "Post" , "Get"
What it returns if successful : Status 200 and all posts made in the last 24hrs
What it returns if unsuccessful : status 400 and the error message

Permissions : Any

Url : http://127.0.0.1:8000/api/collectPost/
What requests it accepts : "Post"
What it returns if successful : Status 201 and message: "Post added to collection"
What it returns if unsuccessful : status 400 and the error message: "User not logged in"
Permissions : Any

Url : http://127.0.0.1:8000/api/collectedPosts/
What requests it accepts : "Post"
What it returns if successful : Status 200 and all posts collected by a user
What it returns if unsuccessful : status 400 and the error message
Permissions : Any

Url : http://127.0.0.1:8000/api/getUser/
What requests it accepts : "Post" , "Get"
What it returns if successful : Status 200 and user details : userID and username
What it returns if unsuccessful : status 400 and the error message : "User not logged in"
Permissions : Any

# API ENDPOINTS DESCRIPTION #
