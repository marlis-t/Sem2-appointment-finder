function deleteApp(app_Id){
    //empty all notifications if still appended
    emptyInDeleteApp();
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            //gives all necessary information to backend
            method: "deleteAppointment", 
            app_Id: app_Id
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === "deleted"){
                //if deleting successful, show message, update appointment-view 
                $("#success").append("<div class='alert alert-success'>The appointment was deleted.</div>");
                showAppointments();
                //timeout for notification to disappear again
                var myTimeout = setTimeout(removeInfoPopup, 4000, 2);
            }
        },
        error: function(e){
            //reaction in case of failure
            $("#error").append("<div class='alert alert-danger'>An error occured while deleting the appointment.</div>");
            var myTimeout = setTimeout(removeInfoPopup, 4000, 1);
        }
    });
}
function emptyInDeleteApp(){
    $("#success").empty();
    $("#error").empty();
}