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
                    $("#termin-list").append("<tr id ='" + p["termin_Id"] + "'><td>" + p["termin_Id"] + "</td><td>" + p["time"] + " Uhr</td><td><div class='form-check'><input class='form-check-input' type='checkbox' id='checkbox"+p["termin_Id"] +"'><label class='form-check-label'> vote </label></div></td><td><button onclick='showComments("+ p["termin_Id"]+")' id = 'showcom' class = 'btn btn-primary'>></button></td></tr>");
                });

                $("input[id^='checkbox']").change(function(){
                    var term_Id = $(this).parent().parent().parent().attr("id");
                    if($(this).is(':checked')){
                        $("<tr id='vote"+term_Id+"'><td><div class='form-check'><label class='form-check-label' for='username"+term_Id+"'>Username</label><input class='form-control' type='text' id='username"+term_Id+"' placeholder='your username here' required></div></td><td><div class='form-check'><label class='form-check-label' for='userComment"+term_Id+"'>Comment</label><textarea class='form-control' rows='5' id='userComment"+term_Id+"' placeholder='optional'></textarea></div></td><td></td><td><button onclick='uploadChoice("+term_Id+")' class='btn btn-primary' id='sendCom'>submit</button></td></tr>").insertAfter("#"+term_Id);
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




//onlick showcom function in another file, gathers comments