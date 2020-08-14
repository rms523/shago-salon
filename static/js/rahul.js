$(document).ready(function(){
    var date = new Date();
    date.setDate(date.getDate());

    $('#datepicker').datepicker({
        dayNamesMin: ['SUN', 'MUN', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        dateFormat: 'yy-mm-dd',
        minDate: date,
        maxDate: '+4D',
        //changeMonth: true
    //     disableDaysOfWeek: [0, 0],
    //     icons: {
    //      rightIcon: '<span class="fa fa-caret-down"></span>'
    //  }
        beforeShow: function (input, inst) {
      setTimeout(function() {
        inst.dpDiv.outerWidth($('#datepicker').outerWidth());
      }, 0);},

    }).attr('readonly', 'true');

     $('div.ui-datepicker').on('click',function(){
    $(this).outerWidth($('#datepicker').outerWidth());
  });


    $('select').selectpicker({
        size: '10'
    });

    var selected_services;
    $('.selectpicker').on('changed.bs.select', function () {
        $("#ErrorMessage").text("");
        selected_services = $(this).siblings('.btn.dropdown-toggle').attr('title');
        console.log(selected_services);
        $('#datepicker').val('');
        //$('#btnTrigger').click();
    });

    $('#datepicker').change(function() {
        var date_select = document.getElementById("datepicker").value;
        //console.log("here");

        if (!selected_services)
        {

            $("#ErrorMessage").text("Error! Please select a service first.");
            $('#datepicker').val('');
            return;
        }

        if (selected_services == "Nothing selected")
        {

            $('#datepicker').val('');
            $("#ErrorMessage").text("Error! Please select a service first.");
            return;
        }


        else
        {



        req =  $.ajax({
            url: "date_selected/",
            type: "post",
            cache: false,
            dataType: 'json',
            data: {'date_select': date_select, 'services': selected_services, 'csrfmiddlewaretoken': '{{ csrf_token }}'},
            success: function(response){
                console.log(response['html']);
                $('#select1').html(response['html'])
            },
             error: function(response){
                console.log("error");
            }
        });  
    
        //$('#myModal').modal('show');
        $('#myModal').modal({backdrop: 'static', keyboard: false});

       }



        });


        var num = null;
        $(".btn-group-vertical > button.btn").on("click", function(){
            num = +this.innerHTML;
            console.log("value");
            //alert("Value is " + num);
        });


        $("#select input:radio").change(function() {
            var option = $(this).val();
            console.log(option);
        });

//
//    $("#bookingform").validate({
//    ignore: "",
//        rules:{
//            servicelist: "required",
//            time_selected: "required",
//            datepicker: "required",
//            username: {
//                required: true,
//                minlength: 2
//            },
//            phoneno: {
//                required: true,
//                minlength: 10,
//                maxlength: 10
//            }
//        },
//
//     messages: {
//        servicelist: "Please select a service first",
//        time_selected: "No time selected. Please select a time.",
//        datepicker: "No Date Selected",
//        username: {
//            required: "Please enter you name",
//            minlength: "Your name must consist of at lease 2 characters",
//
//        },
//        phoneno: {
//            required: "Please enter you contact number",
//            minlength: "Your number must be 10 digit",
//            maxlength: "Your number must be 10 digit"
//        }
//     }
//
//});
                  var time_selected = "";
                  document.getElementById("select1").onclick = buton;

                  function buton(e) {
                  if (e.target.tagName == 'BUTTON') {
                    //alert(e.target.id);
                    time_selected = e.target.id;
                  }
                }

                document.getElementById('time_save').onclick = time_save;
                function time_save(){
                    if (!time_selected)
                    {
                         $('#datepicker').val("");
                    }
                    else
                    {
                        //var time_selected = $('#time_selected').val();
                        var date_selected = $('#datepicker').val();
                        var date_time = date_selected + " " + time_selected;
                        $('#time_selected').val(time_selected);
                        $('#datepicker').val(date_time);
                    }
                }

                 $('#bookingform').on('submit', function(e){
                    e.preventDefault();

                    if (!selected_services)
                    {
                        generate_error("Please select a service.");
                        return;
                    }

                    if (selected_services == "Nothing selected")
                    {
                        generate_error("Please select a service.");
                        return;
                    }

                    var date_select = document.getElementById("datepicker").value;

                    if (!date_select)
                    {
                        generate_error("Please select a date.");
                        return;
                    }

                    var username = $('#username').val();
                    var len = $('#username').val().length;
                    if (len > 20  || len < 4) {
                        generate_error("Username length must be in between 4 and 20");
                        return;
                    }

                    var phoneno = $('#phoneno').val();
                    len = $('#phoneno').val().length;
                    if (len != 10) {
                        generate_error("Contact number must be 10 digit long.");
                        return;
                    }


                    $.ajax({
                    url: "appointment_booking/",
                    type: "post",
                    cache: false,
                    dataType: 'json',
                    data: {'selected_date': date_select, 'services': selected_services, 'selected_time': time_selected, 'username': username, 'phoneno': phoneno,  'csrfmiddlewaretoken': '{{ csrf_token }}'},
                    success: function(response){
                        console.log(response['html']);
                        //$('#select1').html(response['html'])
                        $('#status').html(response['html'])
                        $('#otp_verification').modal({backdrop: 'static', keyboard: false});


//                        $('.selectpicker').selectpicker("destroy");
//                        $('.selectpicker').selectpicker("refresh");
                    },
                     error: function(response){
                        console.log("error");
                    }
                });


                  // this.submit();
                  //$('#otp_verification').modal({backdrop: 'static', keyboard: false});
                   //$("#otp_verification").show();
                    //return;

                });


                document.getElementById('verify_otp').onclick = verification_otp;
                function verification_otp() {

                        $('#bookingform')[0].reset();
                        //$('.selectpicker').empty();
                        $(".selectpicker").selectpicker('refresh').empty();
                        location.reload();
                }



//                document.getElementById('verify_otp').onclick = verification_otp;
//                function verification_otp() {
//
//                    user_otp = $('#OTP').val();
//                    console.log('user_otp');
//                    $.ajax({
//                    url: "verify_otp/",
//                    type: "post",
//                    cache: false,
//                    dataType: 'json',
//                    data: {'OTP': user_otp, 'csrfmiddlewaretoken': '{{ csrf_token }}'},
//                    success: function(response){
//                        //console.log(response['html']['status']);
//                        //$('#select1').html(response['html'])
//                        $('#status').html(response['html'])
//                    },
//                     error: function(response){
//                        console.log("error");
//                    }
//                });
//
//
//                }
});


function generate_error(e)
{
     $("#response").animate({
        height: '+=72px'
    }, 300);
   $('<div class="alert alert-danger">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button>' + e + '</div>').hide().appendTo('#response').fadeIn(1000);

  $(".alert").delay(3000).fadeOut(
  "normal",
  function(){
    $(this).remove();
  });

   $("#response").delay(4000).animate({
        height: '-=72px'
    }, 300);

}

//
//window.onload = myMain;
//
//function myMain() {
//  document.getElementById("select1").onclick = buton;
//}
//
//function buton(e) {
//  if (e.target.tagName == 'BUTTON') {
//    //alert(e.target.id);
//    var time_selected = e.target.id;
//    $('#time_selected').val(time_selected);
//
//    var time_selected = $('#time_selected').val();
//    if (!time_selected)
//    {
//        console.log("TimeError");
//        $("#TimeError").text("You did not select time! Please select a date and time for booking.");
//        return;
//    }
//
//    else
//    {
//        $("#TimeError").text("");
//        var time_selected = $('#time_selected').val();
//        var date_selected = $('#datepicker').val();
//        var date_time = date_selected + " " + time_selected;
//        $('#datepicker').val(date_time);
//
//    }
//
//  }
//}

//
//$(document).on("mouseover", "td", function() {
//    $(this).css({border: 1px})
//    });

// $('#select1').on("click",'.button', function(event) {
//     //$("#addvariable").show(400);  //not sure how this relates to the clicked element. 
//     // $(this).find(".addvariable").show(400); //if it is a child
//     console.log("Thisisit");
// });

//$('#select-time').on('click', '.btn', function (){
//
//    alert("value is " + $(this).value);
//});

// $(document).ready(function(){


    
// });

// $(document).ready(function() {

//     //$('#default-select').selectpicker();
//   }); 


// $(document).ready(function() {
   
    
//     });


// $("#datepicker").datepicker({
//     onSelect: function(dateText) {
//         display("Selected date: " + dateText + ", Current Selected Value= " + this.value);
//         $(this).change();
//         }
//     }).on("change", function() {
//         display("Change event");
//     });
    
//     function display(msg) {
//         console.log(msg);
//     }

    

//jQuery("#bookingform").submit(function (evt) {
//
//  //At this point the browser will have performed default validation methods.
//
//  //If you want to perform custom validation do it here.
//  if (jQuery("input[Name='name']").val().length < 4) {
//    alert("first Input must have 4 characters according to my custom validation!");
//    evt.preventDefault();
//    return;
//  }
//  alert("Values are correct!");
//
//});




