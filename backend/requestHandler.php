<?php 

include ("logic/simpleLogic.php");

$method = "";

//basically connection of frontend to backend, manages requests and responses

if(isset($_POST["method"])){
    $method = $_POST["method"];
    //access to distribution in Logic
    $logic = new Logic();
    $result = $logic->handleRequest($method);
    //reacting according to result
    if($result == null || $result == false){
        //send message of failure
        respond("POST", 400, $result);
    } 
    else {
        respond("POST", 200, $result);
    }
}
else{
    $method = false;
    respond($method, 400 , null);
}

//responding to frontend

function respond($method, $http, $data){
    header('Content-Type: application/json');
    if($method == "POST"){
        http_response_code($http);
        //data is json encoded for readability
        echo (json_encode($data));
    }
    else{
        http_response_code(405);
        echo ("Used method unavailable!");
    }
}

?>
