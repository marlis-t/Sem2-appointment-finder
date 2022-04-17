$(document).ready(function() {
    fetch("navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });
    
});

function toStart() {
    location.href = "/Sem2-appointment-finder/frontend/index.html";
}