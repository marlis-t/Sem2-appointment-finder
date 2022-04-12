$(document).ready(function() {
    fetch("pages/navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });

    $("#appointments").hide();
    $("#show-app").on("click", function () {
        showAppointments();
    });
});
    

