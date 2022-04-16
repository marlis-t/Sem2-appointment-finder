//get id of the xpired ones
function getExpiredApp(){
    //all expired ones toggle class expired
    //still more clickable
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            method: "getExpired", 
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            var expArray = response;
            if(expArray !== "no expired appointments"){
                
                $("#appointment-list tr").each(function(){
                    var trId = $(this).attr("id");
                   
                    for(var i=0; i<expArray.length; i++){
                        var expId = expArray[i];
                        //$("#error").append(trId + " trId " + expId + " index, ");
                        if(trId == expId){
                            $("#"+trId).addClass("expired");
                          break;
                        }
                    }

                });
            }
            /*$.each(expArray, function(i, p) {
                $("#error").append(p + ", ");
            });*/
            
        },
        error: function(e){
            $("#error").append("An error occured while loading the data");
        }
    });
}