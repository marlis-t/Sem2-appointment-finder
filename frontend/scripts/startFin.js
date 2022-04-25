$(document).ready(function() {
    //fetches navbar
    fetch("navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });

    //starts off counter and redirection mechanism
    var seconds = 5;
    $("#counter").text(seconds);
    setInterval(function () {
        //counts down secongs via interval
        seconds--;
        $("#counter").text(seconds);
        if (seconds == 1) {
            location.href = "/Sem2-appointment-finder/frontend/index.html";
        }
    }, 1000);
    
});