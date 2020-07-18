from django.shortcuts import render, redirect
from .models import appointment
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from .helper import Calculations
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.template.loader import render_to_string
# Create your views here.

def get_booking(selected_date):
    alloted_time_duration = []
    # TODO check bookings.all
    #print (type(bookings))
    for booking in appointment.objects.all(): #.values('username', 'contact_no', 'date', 'alloted_time', 'alloted_duration'):
        #booking.date.strftime('%Y-%m-%d')
        if booking.date.strftime('%Y-%m-%d') == selected_date:
            #print(booking.date, selected_date.split(" ")[0])
            dictionary = {'alloted_time': booking.alloted_time, 'alloted_duration': booking.alloted_duration}
            alloted_time_duration.append(dictionary)
    #print (alloted_time_duration)
    return alloted_time_duration


def home(request):
    return render(request, 'shagoappoint/home.html')

@csrf_exempt
def date_selected(request):
    selected_date = request.POST['date_select']
    services = request.POST['services']
    print("services list is: ", services)
    #bookings = appointment.objects.all
    if request.is_ajax():

        alloted_time_duration = get_booking(selected_date)
        calculation = Calculations()
        available_time = calculation.get_availability(alloted_time_duration, services, selected_date)
        print (available_time)
        html = render_to_string('shagoappoint/middleman.html', {'available_time': available_time})
        #print(html)
        print (type(html))
        return JsonResponse({'html': html})
        #return jsonify({'data': render_template('middleman.html', available_time=available_time)})



def appointment_booking(request):
    selected_date = request.POST['selected_date'].split(" ")[0]
    services = request.POST.getlist('services')
    print("services list is: ", services)
    selected_time = request.POST['selected_time']
    username = request.POST['username']
    phoneno = request.POST['phoneno']
    calculation = Calculations()
    alloted_duration = calculation.convert_services_to_time(services)
    time, format = list(selected_time.split(" "))
    hours, minutes = list(map(int, time.split(".")))
    if format=='AM':
        selected_time = 60 * hours + minutes
    if format=='PM':
        selected_time = 60 * hours + minutes + 12 * 60

    booking = appointment(username=username, contact_no=phoneno, date=selected_date, alloted_time=selected_time, alloted_duration=alloted_duration )
    booking.save()
    #return render(request, 'shagoappoint/home.html')
    return redirect('home')
