function showAppointments(){
    $("#appointment-list").empty();
    $("#welcome").fadeOut("fast");
    $("#heading").text("These appointments are currently open for voting:");
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {method: "getApp"},
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === "no result found"){
                $("#error").append("No appointments in database");
            }
            else{
                $.each(myResponse, function(i, p) {
                    var app_Id = p["app_Id"];
                    var title = p["title"];
                    var location = p["location"];
                    var date = p["date"];
                    var expiry = p["expiry"];

                    $("#appointment-list").append("<tr id ='" + app_Id + "'><td>" + title + "</td><td>" + location + "</td><td>" + date + "</td><td>" + expiry + "</td><td><button onclick='toTermine("+app_Id+")' id = 'moreInfo' class = 'btn btn-primary'>></button></td></tr>");
                });
                //getExpired();
                $("#appointments").fadeIn("slow");
                
            }
        },
        error: function(e){
            $("#error").append("An error occurred while loading the data");
            //$("#appointments").fadeIn("slow");
        }
    });
}

function toTermine(app_Id){
    sessionStorage.setItem("app_Id", app_Id);
    location.href = "pages/termine.html";
}
