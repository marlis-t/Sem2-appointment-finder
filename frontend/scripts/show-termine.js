function showTermine(){
    //call is exp function with app_Id, if it is, no adding of checkbox

    var app_Id = sessionStorage.getItem("app_Id");
    var exp = sessionStorage.getItem("expired");
    if(exp == "yes"){
      $("#exp").text("This appointment is expired. Voting is no longer possible."); 
      $("#sel-msg").empty(); 
    }
    
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            method: "getOneApp", 
            app_Id: app_Id
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === "no result found"){
                $("#error").append("<div class='alert alert-danger'>No data could be retrieved for this appointment</div>");
            }
            else{
                $.each(myResponse, function(i, p) {
                    var app_Id = p["app_Id"];
                    var title = p["title"];
                    var location = p["location"];
                    var address = p["address"];
                    var house_nr = p["house_nr"];
                    var date = p["date"];
                    var expiry = p["expiry"];

                    $("#app-info").append("<li> <strong>Title: </strong>" + title + "</li><li> <strong>Location: </strong>" + location + "</li><li> <strong>Address: </strong>" + address + "</li><li> <strong>House number: </strong>" + house_nr + "</li><li> <strong>Takes place on: </strong>" + date + "</li><li> <strong>Voting expires on: </strong>" + expiry + "</li>");
                });
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while loading the data </div>");
        }
    });


    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
                method: "getTermine", 
                fk_app_Id: app_Id
            },
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === "no result found"){
                $("#error").append("<h5 class='heading alert alert-danger'>No timeslots for this appointment</h5>");
            }
            else{
                $.each(myResponse, function(i, p) {
                    $("#termin-list").append("<tr id ='" + p["termin_Id"] + "'><td>" + p["termin_Id"] + "</td><td>" + p["time"] + " o'clock</td><td><div class='form-check custom-checkbox'><input class='form-check-input' type='checkbox' id='checkbox"+p["termin_Id"] +"'><label class='form-check-label'> vote </label></div></td><td><button onclick='showVotes("+ p["termin_Id"]+")' id = 'showcom' class = 'btn btn-info'>></button></td></tr>");
                });

                if(exp=="yes"){
                    $("input[id^='checkbox']").attr("disabled", true);
                }

                $("input[id^='checkbox']").change(function(){
                    var term_Id = $(this).parent().parent().parent().attr("id");
                    if($(this).is(':checked')){
                        $("<tr id='vote"+term_Id+"'><td><div class='form'><label class='form-control-label' for='username"+term_Id+"'>Username</label><input class='form-control' type='text' id='username"+term_Id+"' placeholder='eg. maxmust' required></div></td><td><div class='form-check'><label class='form-check-label' for='userComment"+term_Id+"'>Comment</label><textarea class='form-control' rows='5' id='userComment"+term_Id+"' placeholder='optional'></textarea></div></td><td></td><td><button onclick='uploadChoice("+term_Id+")' class='btn btn-info' id='sendCom'>submit</button></td></tr>").insertAfter("#"+term_Id);
                     //send the input with termin_Id to database
                    } 
                    else{
                        $("#vote"+term_Id).remove();
                    } 
                });
                $("#termine").show();
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while loading the data</div>");
        }
    });
}




//onlick showcom function in another file, gathers comments