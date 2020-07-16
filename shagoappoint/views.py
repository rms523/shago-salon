from django.shortcuts import render
from .models import appointment
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from .helper import Calculations
from django.http import HttpResponse, JsonResponse
from django.template.loader import render_to_string
# Create your views here.

def get_booking():
    alloted_time_duration = []
    # TODO check bookings.all
    #print (type(bookings))
    for booking in appointment.objects.all(): #.values('username', 'contact_no', 'date', 'alloted_time', 'alloted_duration'):
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
    # print(type(services))
    #bookings = appointment.objects.all
    if request.is_ajax():

        alloted_time_duration = get_booking()
        calculation = Calculations()
        available_time = calculation.get_availability(alloted_time_duration, services)
        print (available_time)
        html = render_to_string('shagoappoint/middleman.html', {'available_time': available_time})
        #print(html)
        print (type(html))
        return JsonResponse({'html': html})
        #return jsonify({'data': render_template('middleman.html', available_time=available_time)})



def appointment_booking(request):
    selected_date = request.POST['selected_date']
    services = request.POST['services']
    selected_time = request.POST['selected_time']
    username = request.POST['username']
    phoneno = request.POST['phoneno']
    calculation = Calculations()
    alloted_duration = calculation.convert_services_to_time(services)

    hours, minutes = list(map(int, selected_time.split(" ")[0].split(".")))
    selected_time = 60 * hours + minutes

    booking = appointment(username=username, contact_no=phoneno, date=selected_date, alloted_time=selected_time, alloted_duration=alloted_duration )
    booking.save()
    return render(request, 'shagoappoint/home.html')
750