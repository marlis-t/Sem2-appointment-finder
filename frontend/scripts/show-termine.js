function showOneAppointment(){
    $("#exp").empty();
    //gets the saved information needed for display
    var app_Id = sessionStorage.getItem("app_Id");
    var exp = sessionStorage.getItem("expired");
    if(exp == "yes"){
      $("#exp").append("<div class='alert alert-warning'>This appointment is expired. Voting is no longer possible.</div>"); 
      
    }
    else{
        //tells user that chosen appointment has expired
        $("#sel-msg").addClass("alert alert-info");
        $("#sel-msg").append("All possible timeslots for the selected appointment are depicted below:");  
    }
     
    //gets further information for the one chosen appointment
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
                //if there is no data for the appointment
                $("#error").append("<div class='alert alert-danger'>No data could be retrieved for this appointment</div>");
            }
            else{
                //adds info to list
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
            var myTimeout = setTimeout(removeInfoPopup(1), 5000);
        }
    });

    showTermine(app_Id);
}

function showTermine(app_Id) {
    var exp = sessionStorage.getItem("expired");
    //clears up possible residue
    $("#finVote").remove();
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
            //if there are no timeslots to vote on
            if(myResponse === "no result found"){
                $("#error").append("<h5 class='heading alert alert-danger'>No timeslots for this appointment</h5>");
            }
            else{
                //append timeslots to table
                $.each(myResponse, function(i, p) {
                    $("#termin-list").append("<tr id ='" + p["termin_Id"] + "'><td>" + p["termin_Id"] + "</td><td>" + p["time"] + " o'clock</td><td><div class='form-check custom-checkbox'><input class='form-check-input' type='checkbox' id='checkbox"+p["termin_Id"] +"'><label class='form-check-label'> vote </label></div></td><td><button onclick='showVotes("+ p["termin_Id"]+")' id = 'showcom' class = 'btn btn-info'>></button></td></tr>");
                });

                //only add finish button if timeslots exist
                $("<button type='button' id='finVote' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#finishModal'>Finish</button><br>").insertAfter("#comment");

                //if appointment is expired, disable checkboxes and voting for timeslots
                if(exp =="yes"){
                    $("input[id^='checkbox']").attr("disabled", true);
                }

                //if a checkbox status is changed, get according termin_id from tr
                $("input[id^='checkbox']").change(function(){
                    var term_Id = $(this).parent().parent().parent().attr("id");
                    if($(this).is(':checked')){
                        //add tr of form below chosen timeslot
                        $("<tr id='vote"+term_Id+"'><td><div class='form'><label class='form-control-label' for='username"+term_Id+"'>Username</label><input class='form-control' type='text' id='username"+term_Id+"' placeholder='eg. maxmust' required></div></td><td><div class='form-check'><label class='form-check-label' for='userComment"+term_Id+"'>Comment</label><textarea class='form-control' rows='5' id='userComment"+term_Id+"' placeholder='optional'></textarea></div></td><td></td><td><button onclick='uploadChoice("+term_Id+")' class='btn btn-info' id='sendCom'>submit</button></td></tr>").insertAfter("#"+term_Id);
                    
                    } 
                    else{
                        //if unchecked, remove form
                        $("#vote"+term_Id).remove();
                    } 
                });
                $("#termine").show();
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while loading the data</div>");
            var myTimeout = setTimeout(removeInfoPopup, 5000, 1);
        }
    });
}

//removes the info popups, empties them only after fadeout is finished
function removeInfoPopup(modus){
    if(modus == 1){
        var rem = function() {
        
            return $("#error").children().fadeOut("slow");
        
        };
    }
    else{
        return $("#success").children().fadeOut("slow");
    }
    

    $.when(rem()).done(function() {
        $("#success").empty();
        $("#error").empty();
    });
}