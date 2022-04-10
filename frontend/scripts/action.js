$(document).ready(function() {
    fetch("pages/navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
    });
});
    

$(function(){
    $("#show-app").click(function(){
    $("#txt").append("Gre aus Wien");
    });
});
    
$(function(){
    hello();
})
