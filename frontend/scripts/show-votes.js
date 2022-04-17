function showVotes(term_Id){
    $("#comment").fadeOut("fast");
    $("#vote-list").empty();
    $("#close-btn").empty();
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
            if(myResponse === "no votes found"){
                $("#comHead").text("Nobody voted for this timeslot");
            }
            else{
                $.each(myResponse, function(i, p) {
                    var user_termin_Id = p["user_termin_Id"];
                    var fk_termin_Id = p["fk_termin_Id"];
                    var username = p["username"];
                    var comment = p["comment"];

                    $("#vote-list").append("<tr id ='" + user_termin_Id + "'><td>" + username + "</td><td>" + comment + "</td><td></td></tr>");                
                });
                $("#comHead").text("These users voted for timeslot #"+term_Id);
                $("#close-btn").append("<button onclick='hideVotes()' id = 'hidvotes' class = 'btn btn-danger'>\u00D7</button>");
                $("#comment").fadeIn("slow");
            }
        },
        error: function(e){
            $("#error").append("<br>An error occured while loading data about the votes");
        }
    });

}

function hideVotes() {
    $("#comment").fadeOut("fast");
    $("#vote-list").empty();
    $("#comHead").empty();
    $("#close-btn").empty();
}