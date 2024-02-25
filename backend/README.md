### Backend files and document


Set up and activate a virtual environment:

```bash
$ cd backend/venv/

$ source .env/bin/activate          # Linux
$ .env/Scripts/activate             # Windows
```

Install the required packages to your environment.:

```bash
$ pip install -r requirements.txt
```

Navigate to the project directory, where `manage.py` is located.

```bash
$ cd PostCard
```

Set environmental variable to true.

```bash
$ $env:APP_DEVELOPMENT="True"           # Windows Powershell
$ export APP_DEVELOPMENT=true           # MacOS and Linux
$ printenv                          # List currently set environs on macos and linux
```

Set up your local database by running migrations:

```bash
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