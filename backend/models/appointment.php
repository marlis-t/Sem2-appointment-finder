<?php 

class Appointment {

    private $app_Id;
    private $title;
    private $location;
    private $address;
    private $house_nr;
    private $date;
    private $expiry;
    
    public function getAppointmentData(){

        $db = new Database();
        $result = $db->getAppointments();
        if(!isset($result)){
            return false;
        }

        $this->app_Id = $result["app_Id"];
        $this->title = $result["title"];
        $this->location = $result["location"];
        $this->address = $result["address"];
        $this->house_nr = $result["house_nr"];
        $this->date = $result["date"];
        $this->expiry = $result["expiry"];

        return true;
    }

    public function getAppId(){
        if(isset($this->app_Id)){
            return $this->app_Id;
        }
    }

    public function getTitle(){

    }
}

?>
