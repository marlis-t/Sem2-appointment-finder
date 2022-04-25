$(document).ready(function() {
    //fetches the navbar first
    fetch("pages/navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });
    //starts up the functionality of application page, hides empty table and activates onclick event
    $("#appointments").hide();
    $("#show-app").on("click", function () {
        showAppointments();
    });
});
    

