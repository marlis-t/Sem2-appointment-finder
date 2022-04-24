function uploadChoice(term_Id){
    
    emptyInVotes();
    var allOk = true;
    var username = $("#username"+term_Id).val();
    var comment = $("#userComment"+term_Id).val();
 
    allOk = checkIfAlphanumeric(allOk, term_Id);
     
    if(allOk===true) {
        submitInput(term_Id, username, comment);
    }
}
 
function emptyInVotes(){
    $("#error").empty();
    $("#success").empty(); 
}

function checkIfAlphanumeric(allIsOk, term_Id){
    var allOk = allIsOk;
    var username = $("#username"+term_Id).val();
    if(username.length === 0) {
        $("#error").append("<div class='alert alert-danger'>You must type in a username to vote for timeslot #"+term_Id+".<br></div>");
        var myTimeout = setTimeout(removeInfoPopup, 2000, 1);
        allOk = false;
        return allOk;
    }
    if(!/^[a-zA-Z0-9]+$/.test(username)){
        allOk = false;
        $("#error").append("<div class='alert alert-danger'>Only alphanumeric characters allowed for username in timeslot #"+term_Id+".<br></div>");
        var myTimeout = setTimeout(removeInfoPopup, 2000, 1);
        return allOk;
    }
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
            var myResponse = response;
            if(myResponse === "completed"){
                //fade out mit delay, dann empty für alle benachrichtigungen
                $("#success").append("<div class='alert alert-success'>The upload of your vote for timeslot #"+term_Id+" was successful.<br></div>");
                $("#username"+term_Id).val("");
                $("#userComment"+term_Id).val("");
                var myTimeout = setTimeout(removeInfoPopup, 4000, 2);

                if(!$("#comHead").is(':empty') || $("#comInfo").length){
                    showVotes(term_Id);
                }
            }
            else if(myResponse === "already voted"){
                $("#error").append("<div class='alert alert-danger'>You already voted for this timeslot of the appointment, duplicate votes are not allowed.</br></div>");
                var myTimeout = setTimeout(removeInfoPopup, 5000, 1);
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while uploading your vote for timeslot #"+term_Id+".<br></div>");
            var myTimeout = setTimeout(removeInfoPopup, 4000, 1);
        }
    });
 
}