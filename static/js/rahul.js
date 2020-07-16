$(document).ready(function(){
    var date = new Date();
    date.setDate(date.getDate());

    $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: date,
        maxDate: '+4D',
        //changeMonth: true
    //     disableDaysOfWeek: [0, 0],
    //     icons: {
    //      rightIcon: '<span class="fa fa-caret-down"></span>'
    //  }
    }).attr('readonly', 'true');


    $('select').selectpicker({
        size: '10'
    });

    var selected_services;
    $('.selectpicker').on('changed.bs.select', function () {
        selected_services = $(this).siblings('.btn.dropdown-toggle').attr('title');
        console.log(selected_services);
        //$('#btnTrigger').click();
    });

    $('#datepicker').change(function() {
        var date_select = document.getElementById("datepicker").value;
        //console.log("here");
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
    
        $('#myModal').modal('show'); 
                
        });


        var num = null;
        $(".btn-group-vertical > button.btn").on("click", function(){
            num = +this.innerHTML;
            console.log("value");
            alert("Value is " + num);
        });


        $("#select input:radio").change(function() {
            var option = $(this).val();
            console.log(option);
        });


});

window.onload = myMain;

function myMain() {
  document.getElementById("select1").onclick = buton;
}

function buton(e) {
  if (e.target.tagName == 'BUTTON') {
    alert(e.target.id);
    var time_selected = e.target.id;
    $('#time_selected').val(time_selected);
  }
}

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

    






