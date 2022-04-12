<?php

include ("db/dataHandler.php");


class Logic{

    private $db;
    function __construct()
    {
        $this->db = new Database();
    }

    function handleRequest($method){
        switch($method) {
            case "getApp":
                return $this->getAppointments();
            case "getOneApp":
                return $this->getOneAppointment();
            case "getTermine":
                return $this->getTermine();
            case "getComments":
                return $this->getComments();
            case "getExpired":
                return $this->getExpired();
            case "uploadChoice":
                return $this->uploadChoice();
            case "alreadyVoted":
                return $this->alreadyVoted();
            default:
                return null;
        }
    }

    private function getAppointments(){
        $result = getAppointmentData();
        return $result;
    }

    private function getOneAppointment(){ //create class in models file
        $app_Id = $_POST["app_Id"];
        $result = getOneAppointmentData($app_Id);
        return $result;
    }

    private function getTermine(){ //create class in models file
        $fk_app_Id = $_POST["fk_app_Id"];
        $result = getTerminData($fk_app_Id);
        return $result;
    }

    private function getComments(){ //$termin_Id, create class in models
        $termin_Id = $_POST["termin_id"];
        $result = $this->db->getUserComments($termin_Id);
        return $result;
    }

    private function getExpired(){
        //only ids, get into array
        $result = $this->db->getExpired();
    }

    private function alreadyVoted(){
        $fk_term_Id = $_POST["fk_term_id"];
        $username = $_POST["username"];

        $result = $this->db->alreadyVoted($fk_term_Id, $username);

        if($result == null){
            return "upload possible";
        }
        return null;
    }

    private function uploadChoice(){
        if(empty($_POST["username"]) || empty($_POST["fk_term_Id"])){
            return null;
        }

        function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $username = test_input(($_POST["username"]));
        $fk_term_Id = test_input(($_POST["fk_term_Id"]));
        $comment = test_input(($_POST["comment"]));

        if (!preg_match("/^[a-zA-Z0-9]+$/", $username)) {
            return null;
        }

        $possible = $this->db->alreadyVoted($fk_term_Id, $username);

        if($possible !==null){
            return null;
        }
        
        $this->db->saveChoiceAndComment($fk_term_Id, $username, $comment);

        return "completed";
    }
}

?>

