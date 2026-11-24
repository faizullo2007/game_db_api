from django.db import models


class Developer(models.Model):
    name = models.CharField(max_length=200, unique=True)
    country = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Game(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    release_year = models.PositiveIntegerField()
    rating = models.FloatField(default=0)
    developer = models.ForeignKey(Developer, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
