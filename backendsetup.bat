call ./backend/venv/Scripts/activate.bat

cd backend/PostCard
py -m pip install -r requirements.txt
python manage.py makemigrations database
python manage.py migrate
echo "setup admin privileges"
pause
python manage.py createsuperuser
echo "run backend"
pause
python manage.py runserver
python manage.py process_tasks
