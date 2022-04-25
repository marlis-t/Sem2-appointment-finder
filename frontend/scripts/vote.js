function uploadChoice(term_Id){
    
    emptyInVotes();
    var allOk = true;
    //get input from form fields
    var username = $("#username"+term_Id).val();
    var comment = $("#userComment"+term_Id).val();
 
    //check if username was filled in and only contains alphanumeric characters
    allOk = checkIfUsernameIsValid(allOk, term_Id);
     
    if(allOk===true) {
        submitInput(term_Id, username, comment);
    }
}
 
//clears up residue for no double popups
function emptyInVotes(){
    $("#error").empty();
    $("#success").empty(); 
}

function checkIfUsernameIsValid(allIsOk, term_Id){
    var allOk = allIsOk;
    var username = $("#username"+term_Id).val();
    if(username.length === 0) {
        $("#error").append("<div class='alert alert-danger'>You must type in a username to vote for timeslot #"+term_Id+".<br></div>");
        var myTimeout = setTimeout(removeInfoPopup, 2000, 1);
        //allOk is false, stops input from being sent to backend
        allOk = false;
        return allOk;
    }
    //checked with regex
    if(!/^[a-zA-Z0-9]+$/.test(username)){
        //allOk is false, stops input from being sent to backend
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
            //all necessary parameters
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
                $("#success").append("<div class='alert alert-success'>The upload of your vote for timeslot #"+term_Id+" was successful.<br></div>");
                //clears input fields
                $("#username"+term_Id).val("");
                $("#userComment"+term_Id).val("");
                var myTimeout = setTimeout(removeInfoPopup, 4000, 2);

                //if comments are currently visible, reload them to show the update
                if(!$("#comHead").is(':empty') || $("#comInfo").length){
                    showVotes(term_Id);
                }
            }
            //if this username already voted on this timeslot, throw error
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