from django.db import models

# Create your models here.

class appointment(models.Model):

    username = models.CharField(max_length=50)
    contact_no = models.CharField(max_length=10)
    worker = models.CharField(max_length=2)
    #OTP = models.CharField(max_length=4)
    date = models.DateField()
    alloted_time = models.PositiveSmallIntegerField(default=0)
    alloted_duration = models.PositiveSmallIntegerField(default=0)
