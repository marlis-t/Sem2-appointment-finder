//get id of the xpired ones
function getExpiredApp(){
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            //gives all necessary information to backend
            method: "getExpired", 
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            var expArray = response;
            if(expArray !== "no expired appointments"){
                //if there are exp. appointments, go through each tr and add class for identification
                $("#appointment-list tr").each(function(){
                    var trId = $(this).attr("id");
                   
                    for(var i=0; i<expArray.length; i++){
                        var expId = expArray[i];
                        //if any id of expired ones = id of tr
                        if(trId == expId){
                            $("#"+trId).addClass("expired");
                            //break as each tr can only have one id and check next tr
                          break;
                        }
                    }

                });
                //msg only displayed if there are expired appointments
                $("#expired-msg").append("<div id='exp-info' class='alert alert-secondary'>*Greyed-out appointments are expired. You cannot vote for them anymore, but viewing the placed votes and comments is still possible.</div>")
            }
            
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while loading the data about appointment expiry.</div>");
            //deletes the popups after timeout
            var myTimeout = setTimeout(removeInfoPopup, 4000, 1);
        }
    });
}