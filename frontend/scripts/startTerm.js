$(document).ready(function() {
    fetch("navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });
    $("#comment").hide();
    $("#termine").hide();
    showTermine();
});
/*
function finishVoting(){
    var text = "You are about to leave this page!\nAre you sure you want to finish voting?";
    $.alerts.okButton="OKAYYYYYYYYYY";
    $.alerts.cancelButton="CANCELLLLLLLLLL";
    if (confirm(text) == true) {
        location.href = "/Sem2-appointment-finder/frontend/pages/finish.html";
    }  
}*/

$(".confirm").confirm({
    text: "Are you sure you want to finish voting?",
    title: "You are about to leave this site",
    confirm: function(button) {
        location.href = "/Sem2-appointment-finder/frontend/pages/finish.html";
    },
    cancel: function(button) {
        // nothing to do
    },
    confirmButton: "Yes, finish voting",
    cancelButton: "No, continue voting",
    confirmButtonClass: "btn-success",
    cancelButtonClass: "btn-default",
    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
});