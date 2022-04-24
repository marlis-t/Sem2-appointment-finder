function deleteApp(app_Id){
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
                $("#success").text("The appointment was deleted");
                showAppointments();
            }
        },
        error: function(e){
            $("#error").append("<br>An error occured while deleting the appointment.");
        }
    });
}