//get id of the xpired ones
function getExpired(){
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
            var myResponse = response;
            
            
                $.each(myResponse, function(i, p) {
                    
                });
            
        },
        error: function(e){
            $("#error").append("An error occured while loading the data");
        }
    });
}
