<?php 

include ("logic/simpleLogic.php");

$method = "";


if(isset($_POST["method"])){
    $method = $_POST["method"];
    $logic = new Logic();
    $result = $logic->handleRequest($method);
    if($result == null || $result == false){
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



function respond($method, $http, $data){
    header('Content-Type: application/json');
    if($method == "POST"){
        http_response_code($http);
        echo (json_encode($data));
    }
    else{
        http_response_code(405);
        echo ("Used method unavailable!");
    }
}

?>
