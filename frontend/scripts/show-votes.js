function showComments(term_Id){
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            method: "getComments", 
            fk_termin_Id: term_Id
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === null){
                $("#error").append("<br>No data about votes could be retrieved");
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
            $("#error").append("<br>An error occured while loading data about the votes");
        }
    });

}