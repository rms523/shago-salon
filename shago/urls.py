"""shago URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import shagoappoint.views

admin.site.site_header = "Welcome to shago appointment record."
admin.site.site_title = "Shago login"
admin.site.index_title = "Shago DB"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', shagoappoint.views.home, name='home' ),
    path('date_selected/', shagoappoint.views.date_selected, name='date_selected'),
    path('appointment_booking/', shagoappoint.views.appointment_booking, name='appointment_booking')
    #path('verify_otp/', shagoappoint.views.verify_otp, name='verify_otp')
]
