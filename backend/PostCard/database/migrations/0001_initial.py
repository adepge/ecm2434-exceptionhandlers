# Generated by Django 5.0.1 on 2024-03-14 21:31

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Challenges',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('challengeDesc', models.CharField(max_length=100)),
                ('stepsNeeded', models.PositiveIntegerField(default=9999999)),
                ('postsNeeded', models.PositiveSmallIntegerField(default=0)),
                ('savesNeeded', models.PositiveSmallIntegerField(default=0)),
                ('inUse', models.BooleanField(default=False)),
                ('coinsRewarded', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='CurrentDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateOfLastInteraction', models.DateField(default='1111-11-11')),
            ],
        ),
        migrations.CreateModel(
            name='Geolocation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('location', models.CharField(max_length=255)),
                ('latitude', models.FloatField(default=0.0)),
                ('longitude', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Stickers',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('stickersName', models.CharField(max_length=50)),
                ('stickerPrice', models.IntegerField(default=25)),
                ('stickersDescription', models.CharField(default='sticker', max_length=100)),
                ('fileName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='media')),
                ('caption', models.CharField(max_length=255)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('geolocID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.geolocation')),
                ('userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PostsUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coins', models.PositiveIntegerField(default=0)),
                ('stepsTaken', models.PositiveBigIntegerField(default=0)),
                ('postsMade', models.PositiveIntegerField(default=0)),
                ('postsSaved', models.PositiveIntegerField(default=0)),
                ('stepsTakenToday', models.PositiveIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(30000)])),
                ('postsMadeToday', models.PositiveSmallIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(48)])),
                ('postsSavedToday', models.PositiveSmallIntegerField(default=0)),
                ('youtubeLink', models.CharField(blank=True, default='', max_length=255)),
                ('twitterLink', models.CharField(blank=True, default='', max_length=255)),
                ('instagramLink', models.CharField(blank=True, default='', max_length=255)),
                ('bio', models.CharField(blank=True, default='', max_length=255)),
                ('postID', models.ManyToManyField(blank=True, to='database.posts')),
                ('userID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('avatarInUse', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_pic', to='database.stickers')),
                ('unlockedAvatars', models.ManyToManyField(blank=True, related_name='unlocked', to='database.stickers')),
            ],
        ),
        migrations.CreateModel(
            name='StickersUser',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('stickersID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.stickers')),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]