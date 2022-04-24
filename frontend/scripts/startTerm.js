$(document).ready(function() {
    fetch("navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });
    fetch("finish-modal.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("modal").innerHTML = data;
    });

    $("#comment").hide();
    $("#termine").hide();
    showOneAppointment();

    function disableBack() {
        window.history.forward()
    }
    window.onload = disableBack();
    window.onpageshow = function(e) {
        if (e.persisted)
            disableBack();
    }
});

function finishVoting(){
    location.href = "/Sem2-appointment-finder/frontend/pages/finish.html";
}



