from django.contrib import admin

# Register your models here.
from .models import appointment

class appointmentAdmin(admin.ModelAdmin):
        list_display = ('username', 'contact_no', 'worker', 'date', 'alloted_time', 'alloted_duration')
        list_filter = ('date',)

admin.site.register(appointment, appointmentAdmin)

