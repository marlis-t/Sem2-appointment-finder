function deleteApp(app_Id){
    emptyInDeleteApp();
    $.ajax({
        type: "POST",
        url: "/Sem2-appointment-finder/backend/requestHandler.php",
        data: {
            method: "deleteAppointment", 
            app_Id: app_Id
        },
        cache: false,
        dataType: "json",
        success: function (response) {
            var myResponse = response;
            if(myResponse === "deleted"){
                $("#success").append("<div class='alert alert-success'>The appointment was deleted.</div>");
                showAppointments();
            }
        },
        error: function(e){
            $("#error").append("<div class='alert alert-danger'>An error occured while deleting the appointment.</div>");
        }
    });
}

function emptyInDeleteApp(){
    $("#success").empty();
    $("#error").empty();
}