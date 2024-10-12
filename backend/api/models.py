from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    title = models.CharField(max_length=2048)
    option_correct = models.CharField(max_length = 1024)
    option_wrong_1 = models.CharField(max_length = 1024)
    option_wrong_2 = models.CharField(max_length = 1024, null = True, blank = True)
    option_wrong_3 = models.CharField(max_length = 1024, null = True, blank = True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['title']

class Statistic(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, null = True, blank = True)
    username = models.CharField(max_length = 1024)
    score = models.IntegerField()

    def __str__(self):
        return f"Score {self.score} / 10 : {self.user.username.title()}"
    
    class Meta:
        ordering = ['-score']