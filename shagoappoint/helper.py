class Calculations():
    granularity = 15
    start = 480
    end = 1320
    available_time = [x for x in range(start, end, 15)]
    service_time_mapping = {'Hair Cutting': 15, 'Shaving': 15, 'Message': 15, 'Spa': 15}
    total_service_time = 0

    def remove_before_time(self, alloted_time):
        total_remove_count = self.total_service_time // self.granularity
        # print ("total_remove_count: ", total_remove_count)
        while total_remove_count > 0:
            if alloted_time in self.available_time:
                # print ("available")
                self.available_time.remove(alloted_time)
                alloted_time = alloted_time - self.granularity
                # print (self.available_time)
            total_remove_count -= 1
        # print ("available_time ", self.available_time)
        return

    def remove_after_time(self, alloted_time, alloted_duration):
        total_remove_count = alloted_duration // self.granularity
        total_remove_count -= 1
        alloted_time = alloted_time + self.granularity
        # print ("total_remove_count: ", total_remove_count)
        # print ("alloted_time ", alloted_time)
        # print ("available_time ", self.available_time)
        while total_remove_count > 0:
            if alloted_time in self.available_time:
                self.available_time.remove(alloted_time)
                alloted_time = alloted_time + self.granularity

                # print (self.available_time)
            total_remove_count -= 1
        return

    def time_conversion(self):
        available_time_formatted = []
        format = 'AM'
        for time in self.available_time:
            hour = time // 60
            minutes = time % 60
            if hour > 12:
                hour = hour - 12
                format = 'PM'
            else:
                format = 'AM'

            if minutes != 0:
                corrected_time = str(hour) + "." + str(minutes) + " " + format
            else:
                corrected_time = str(hour) + ".00 " + format

            available_time_formatted.append(corrected_time)

        return available_time_formatted
        # return list(dict.fromkeys(available_time_formatted))

    def get_availability(self, alloted_time_duration, services):

        services = services.split(', ')

        for service in services:
            self.total_service_time += self.service_time_mapping[service]

        for dictionary in alloted_time_duration:
            self.remove_before_time(dictionary['alloted_time'])
            self.remove_after_time(dictionary['alloted_time'], dictionary['alloted_duration'])

        print(self.available_time)
        return self.time_conversion()


    def convert_services_to_time(self, services):
        services = services.split(', ')

        for service in services:
            self.total_service_time += self.service_time_mapping[service]

        return self.total_service_time

    def set_booking(self):
        pass

