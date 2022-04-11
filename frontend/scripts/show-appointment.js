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
            if(myResponse === null){
                $("#error").append("No data could be retrieved");
            }
            else{
                $.each(myResponse, function(i, p) {
                    //$("#error").append(p + "fish");
                    $("#appointment-list").append("<tr id ='" + p["app_Id"] + "'><td>" + p["title"] + "</td><td>" + p["location"] + "</td><td>" + p["date"] + "</td><td>" + p["expiry"] + "</td></tr>")
    
                });
    
                $("#appointments").fadeIn("slow");
            }
        },
        error: function(e){
            $("#error").append("an error");
            $("#appointments").fadeIn("slow");
        }
    });
}