function showTermine(){
    //call is exp function with app_Id, if it is, no adding of checkbox

    var app_Id = sessionStorage.getItem("app_Id");
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
            if(myResponse === null){
                $("#error").append("No data could be retrieved");
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

                    $("#app-info").append("<li> Title: " + title + "</li><li> Location: " + location + "</li><li> Address: " + address + "</li><li> House number: " + house_nr + "</li><li> Takes place on: " + date + "</li><li> Voting expires on: " + expiry + "</li>");
                });
            }
        },
        error: function(e){
            $("#error").append("An error occured while loading the data");
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
            if(myResponse === null){
                $("#error").append("No data could be retrieved");
            }
            else{
                $.each(myResponse, function(i, p) {
                    $("#termin-list").append("<tr id ='" + p["termin_Id"] + "'><td>" + p["termin_Id"] + "</td><td>" + p["time"] + " Uhr</td><td><div class='form-check'><input class='form-check-input' type='checkbox' id='checkbox"+p["termin_Id"] +"'><label class='form-check-label'> vote </label></div></td><td><button id = 'showcom' class = 'btn btn-primary'>></button></td></tr>");
                });

                $("input[id^='checkbox']").change(function(){
                    var term_Id = $(this).parent().parent().parent().attr("id");
                    if($(this).is(':checked')){
                        //$("#"+term_Id).append("Termin Id: " + term_Id);
                        $("<tr id='vote"+term_Id+"'><td><div class='form-check'><label class='form-check-label' for='username"+term_Id+"'>Username</label><input class='form-control' type='text' id='username"+term_Id+"' placeholder='your username here' required></div></td><td><div class='form-check'><label class='form-check-label' for='userComment"+term_Id+"'>Comment</label><textarea class='form-control' rows='5' id='userComment"+term_Id+"'></textarea></div></td><td></td><td><button onclick='uploadChoice("+term_Id+")' class='btn btn-primary' id='sendCom'>submit</button></td></tr>").insertAfter("#"+term_Id);
                     //send the input with termin_Id to database
                    } 
                    else{
                        $("#vote"+term_Id).remove();
                    } 
                });
            }
        },
        error: function(e){
            $("#error").append("An error occured while loading the data");
        }
    });
}

function uploadChoice(term_Id){
   $("#error").empty();
   $("#success").empty();
  
    var allOk = true;
    var username = $("#username"+term_Id).val();
    var comment = $("#userComment"+term_Id).val();
    allOk = checkIfAlphanumeric(allOk, term_Id);
   // if(allOk === true){
        //$("#success").append("finished in alphanum " + term_Id + username+comment);
    //}
    allOk = checkIfAlreadyVoted(allOk, term_Id, username);
    /*if(allOk===true){
        $("#success").append("finished in alredyvoted " + term_Id + username);
    }*/

    if(allOk===true) {
        submitInput(term_Id, username, comment);
    }
    /*else if(allOk===false){
        $("#error").append("in already voted is wrong");
    }*/
}

function checkIfAlphanumeric(allIsOk, term_Id){
    var allOk = allIsOk;
    var username = $("#username"+term_Id).val();
    if(username.length === 0) {
        $("#error").append("You must type in a username to vote for timeslot #"+term_Id);
        allOk = false;
        return allOk;
    }
    if(!/^[a-zA-Z0-9]+$/.test(username)){
        allOk = false;
        $("#error").append("Only alphanumeric characters allowed for username in timeslot #"+term_Id);
        return allOk;
    }
    return allOk;
}

function checkIfAlreadyVoted(allIsOk, term_Id, username){
    var allOk = allIsOk;
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            method: "alreadyVoted", 
            fk_term_Id: term_Id,
            username: username
        },
        cache: false,
        dataType: "json",
        success: function (response) {
           if(response === "upload possible"){
               //$("#success").append("upload possible");
               allOk = true;
               
            }  
        },
        error: function(e){
            $("#error").append("<br>You already voted for the timeslot #"+term_Id+" of this appointment");
            //$("<tr id='errorUpload" + term_Id +"' class='error'><td>You already voted for this timeslot of that appointment</td></tr>").insertAfter("#vote"+term_Id);
            allOk = false;
            //return "notposs"; doesnt work
        }
    });
    return allOk;
}

function submitInput(term_Id, username, comment) {
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            method: "uploadChoice", 
            fk_term_Id: term_Id,
            username: username,
            comment: comment
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            $("#success").append(response);
            //$("#success").append("The upload of your vote for timeslot #"+term_Id+" was successful");
            $("#username"+term_Id).val("");
            $("#userComment"+term_Id).val("");

        },
        error: function(e){
            $("#error").append("<br>An error occured while uploading your vote for timeslot #"+term_Id);
        }
    });

}


//onlick showcom function in another file, gathers comments