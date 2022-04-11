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
            case "getTermine":
                return $this->getTermine();
            case "getComments":
                return $this->getComments();
            default:
                return null;
        }
    }

    private function getAppointments(){
        $result = getAppointmentData();
        return $result;
    }

    private function getTermine(){ //
        $fk_app_Id = $_POST["fk_app_id"];
        $result = $this->db->getTermine($fk_app_Id);
        return $result;
    }

    private function getComments(){ //$termin_Id
        $termin_Id = $_POST["termin_id"];
        $result = $this->db->getUserComments($termin_Id);
        return $result;
    }
}

?>

