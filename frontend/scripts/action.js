$(document).ready(function() {
    fetch("pages/navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });

    $("#appointments").hide();
    $("#show-app").click(function () {
        showAppointments();
    });
});
    
/*
$(function(){
    $("#show-app").click(function(){
    $("#txt").append("Gre aus Wien");
    });
});*/
    

