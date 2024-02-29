### Backend files and document

Requirements:
An installed instance of Python (https://www.python.org)
An installed instance of pip (https://pypi.org/project/pip/)

Set up and activate a virtual environment:

```bash
$ cd backend/venv/

$ source .env/bin/activate          # Linux
$ ./Scripts/activate             # Windows
```

Navigate to the project directory, where `manage.py` is located.

```bash
$ cd ../PostCard
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


### API ENDPOINTS DESCRIPTION 

URL : http://127.0.0.1:8000/api/register/ <br>
What requests it accepts : "POST" <br>
What it returns if successful : Status 200 and token generated for user created and saved <br>
What it returns if unsuccessful : status 400 <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/login/ <br>
What requests it accepts : "POST" <br>
What it returns if successful: Status 200 and token assigned to existsing user <br>
What it returns if unsuccessful : status 400 and the error message: "Invalid credentials" <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/posts/ <br>
What requests it accepts : Any <br>
What it returns if successful : All posts made <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/posts/<int:pk>/ <br>
What requests it accepts : Any <br>
What it returns if successful : A specific post made by using postID <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/geolocations/ <br>
What requests it accepts : Any <br>
What it returns if successful : All geolocations retrieved by making posts <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/geolocations/<int:pk>/ <br>
What requests it accepts : Any <br>
What it returns if successful : Specific geolocation retrieved from a post made <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/stickers/ <br>
What requests it accepts : Any <br>
What it returns if successful : All stickers made <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/stickers/<int:pk>/ <br>
What requests it accepts : Any <br>
What it returns if successful : A specific sticker made using stickerID <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/stickerusers/ <br>
What requests it accepts : Any <br>
What it returns if successful : All stickers owned by a user <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/stickerusers/<int:pk>/ <br>
What requests it accepts : Any <br>
What it returns if successful: A sticker owned by a user <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/createPost/ <br>
What requests it accepts : "POST" <br>
What it returns if successful : Status 200, post saved to db and a message : "post made" <br>
What it returns if unsuccessful : status 400 <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/getRecentPosts/ <br>
What requests it accepts : "POST" , "Get" <br>
What it returns if successful : Status 200 and all posts made in the last 24hrs <br>
What it returns if unsuccessful : status 400 and the error message <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/collectPost/ <br>
What requests it accepts : "POST" <br>
What it returns if successful : Status 201 and message: "Post added to collection" <br>
What it returns if unsuccessful : Status 400 and the error message: "User not logged in" <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/collectedPosts/ <br>
What requests it accepts : "POST" <br>
What it returns if successful : Status 200 and all posts collected by a user <br>
What it returns if unsuccessful : Status 400 and the error message <br>
Permissions : Any <br>

URL : http://127.0.0.1:8000/api/getUser/ <br>
What requests it accepts : "POST" , "GET" <br>
What it returns if successful : Status 200 and user details : userID and username <br>
What it returns if unsuccessful : Status 400 and the error message : "User not logged in" <br>
Permissions : Any <br>
