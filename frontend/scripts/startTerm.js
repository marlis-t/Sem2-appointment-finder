$(document).ready(function() {
    //fetches navbar
    fetch("navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });
    //fetches modal for onclick event
    fetch("finish-modal.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("modal").innerHTML = data;
    });

    //hides empty comments and timeslot tables
    $("#comment").hide();
    $("#termine").hide();
    //starts off first js function for page
    showOneAppointment();

    //if this site is left, backbutton is disabled (no immediate going back after finishing the vote)
    function disableBack() {
        window.history.forward()
    }
    window.onload = disableBack();
    window.onpageshow = function(e) {
        if (e.persisted)
            disableBack();
    }
});

//onclick of confirmation in modal
function finishVoting(){
    location.href = "/Sem2-appointment-finder/frontend/pages/finish.html";
}



