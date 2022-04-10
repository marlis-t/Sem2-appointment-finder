<?php 

include ("logic/simpleLogic.php");

$method = "";

if(isset($_GET["method"])){
    $method = $_GET["method"];
}
else if(isset($_POST["method"])){
    $method = $_POST["method"];
}
else{
    $method = false;
}

$logic = new Logic();
$result = $logic->handleRequest($method);
if($result == null){
    respond("POST", 400, null);
} else {
    respond("POST", 200, $result);
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