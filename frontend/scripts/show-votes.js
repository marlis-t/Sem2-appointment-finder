function showVotes(term_Id){
    $("#comment").fadeOut("fast");
    emptyInShowVotes();
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
                $("<div id='comInfo' class='alert alert-warning'>Nobody voted for this timeslot.</div>").insertBefore("#comment");
            }
            else{
                $.each(myResponse, function(i, p) {
                    var user_termin_Id = p["user_termin_Id"];
                    var fk_termin_Id = p["fk_termin_Id"];
                    var username = p["username"];
                    var comment = p["comment"];

                    $("#vote-list").append("<tr id ='" + user_termin_Id + "'><td>" + username + "</td><td>" + comment + "</td><td></td></tr>");                
                });
                $("#comHead").append("These users voted for timeslot <span class='badge bg-info'>#"+term_Id+"</span>");
                $("#close-btn").append("<button onclick='hideVotes()' id = 'hidvotes' class = 'btn btn-danger'>\u00D7</button>");
                $("#comment").fadeIn("slow");
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while loading the data about the votes.</div>");
        }
    });

}

function hideVotes() {
    var fade = function() {
        return $("#comment").fadeOut("fast");
    };

    $.when(fade()).done(function() {
        $("#vote-list").empty();
        $("#comHead").empty();
        $("#close-btn").empty();
    });
}

function emptyInShowVotes(){
    $("#vote-list").empty();
    $("#close-btn").empty();
    $("#comInfo").remove();
    $("#comHead").empty();
    $("#error").empty();
}