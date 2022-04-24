function showAppointments(){
    //reforms the page for appointment table
    $("#appointment-list").empty();
    $("#welcome").fadeOut("fast");
    $("#heading").text("These appointments are currently open for voting:");
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        //gives all necessary information to backend
        data: {method: "getApp"},
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === "no result found"){
                $("#error").append("<div class='alert alert-warning'>No appointments in database</div>");
            }
            else{
                //fills received information into the table
                $.each(myResponse, function(i, p) {
                    var app_Id = p["app_Id"];
                    var title = p["title"];
                    var location = p["location"];
                    var date = p["date"];
                    var expiry = p["expiry"];

                    $("#appointment-list").append("<tr id ='" + app_Id + "'><td>" + title + "</td><td>" + location + "</td><td>" + date + "</td><td>" + expiry + "</td><td><button onclick='toTermine("+app_Id+")' id = 'moreInfo' class = 'btn btn-info'>></button></td><td><button onclick='deleteApp("+app_Id+")' id = 'deleteApp' class = 'btn btn-danger'>\u00D7</button></td></tr>");
                });
                //checks which appointments are expired
                getExpiredApp();
                $("#appointments").fadeIn("slow");
                
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occurred while loading the data about the appointments.</div>");
            var myTimeout = setTimeout(removeInfoPopup(1), 5000);
        }
    });
}

//onclick of button redirects to next page which displays the timeslots
function toTermine(app_Id){
    if($("#"+app_Id).hasClass("expired")){
        //saves the id of the clicked appointment and if it is expired
        sessionStorage.setItem("app_Id", app_Id);
        sessionStorage.setItem("expired", "yes");
    }
    else{
        sessionStorage.setItem("app_Id", app_Id);
        sessionStorage.setItem("expired", "no");
    }
    
    location.href = "pages/termine.html";
}
