$(document).ready(function() {
    fetch("navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });

    var seconds = 5;
    $("#counter").text(seconds);
    setInterval(function () {
        seconds--;
        $("#counter").text(seconds);
        if (seconds == 1) {
            location.href = "/Sem2-appointment-finder/frontend/index.html";
        }
    }, 1000);
    
});