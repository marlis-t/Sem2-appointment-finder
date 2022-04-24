function uploadChoice(term_Id){
    $("#error").empty();
    $("#success").empty();
    $("#errorCode").removeClass();
   
     var allOk = true;
     var username = $("#username"+term_Id).val();
     var comment = $("#userComment"+term_Id).val();
 
     //checkIfAlreadyVoted(term_Id, username);
     allOk = checkIfAlphanumeric(allOk, term_Id);
     
     //alert($("#errorCode").hasClass("aV"));
     
     /*if($("#errorCode").hasClass("aV")){
        allOk = false;
        $("#error").append("class is set");
    }*/
     if(allOk===true) {
         submitInput(term_Id, username, comment);
    }
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
 
 function checkIfAlreadyVoted(term_Id, username){
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
            /*if(response === "upload possible"){
                $("#success").append(response);
                
            }*/
        },
         error: function(e){
             $("#error").append("<br>You already voted for this timeslot of the appointment");
             //$("<tr id='errorUpload" + term_Id +"' class='error'><td>You already voted for this timeslot of that appointment</td></tr>").insertAfter("#vote"+term_Id);
            $("#errorCode").addClass("aV");
             
        }
    });
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
             if(response === "completed"){
                $("#success").append("The upload of your vote for timeslot #"+term_Id+" was successful");
                $("#username"+term_Id).val("");
                $("#userComment"+term_Id).val("");
            }
            else if(response === "already voted"){
                $("#error").append("<br>You already voted for this timeslot of the appointment, duplicate votes are not allowed.</br>");
            }
         },
         error: function(e){
             $("#error").append("<br>An error occured while uploading your vote for timeslot #"+term_Id);
         }
     });
 
 }