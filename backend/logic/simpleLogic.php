<?php

include ("db/dataHandler.php");


class Logic{

    private $db;
    //on construction also constructs Database object for connection
    function __construct()
    {
        $this->db = new Database();
    }

    //distributes sent values to correct function with sent method
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
            case "deleteAppointment":
                return $this->deleteApp();
            default:
                return null;
        }
    }

    private function getAppointments(){
        //redirects to appointment-model
        $result = getAppointmentData();
        return $result;
    }

    private function getOneAppointment(){
        $app_Id = $_POST["app_Id"];
         //redirects to appointment-model
        $result = getOneAppointmentData($app_Id);
        return $result;
    }

    private function getTermine(){ 
        $fk_app_Id = $_POST["fk_app_Id"];
         //redirects to termin-model
        $result = getTerminData($fk_app_Id);
        return $result;
    }

    private function getComments(){ 
        $fk_termin_Id = $_POST["fk_termin_Id"];
         //redirects to votes-model
        $result = getVotesData($fk_termin_Id);
        return $result;
    }

    private function getExpired(){
        //only ids, get into array
         //redirects to appointment-model
        $result = getExpiredId();
        return $result;
    }

    private function uploadChoice(){
        //should not be empty at this point, double-checking for safety
        if(empty($_POST["username"]) || empty($_POST["fk_term_Id"])){
            return null;
        }

        //trims input to make it neater
        function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $username = test_input(($_POST["username"]));
        $fk_term_Id = test_input(($_POST["fk_term_Id"]));
        $comment = test_input(($_POST["comment"]));

        //checks if username only consists of alphanumeric characters
        if (!preg_match("/^[a-zA-Z0-9]+$/", $username)) {
            return null;
        }
        
        $result = $this->db->alreadyVoted($fk_term_Id, $username);

        //only if this user did not already vote on this timeslot 
        if ($result->num_rows === 0){
            if($this->db->saveChoiceAndComment($fk_term_Id, $username, $comment)){
                return "completed";
            }
            else{
                return null;
            }
            
        }
        else{
            return "already voted";
        }
    }

    private function deleteApp(){
        $app_Id = $_POST["app_Id"];
        if($this->db->deleteAppointment($app_Id)){
            return "deleted";
        }
        return null;
    }
}

?>

