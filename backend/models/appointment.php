<?php 

class Appointment {

    public $app_Id;
    public $title;
    public $location;
    public $address;
    public $house_nr;
    public $date;
    public $expiry;

    function __construct() {}

}

function getAppointmentData(){

    $db = new Database();
    $result = $db->getAppointments();
    if(!isset($result)){
        return "no result found";
    }
    $appList = array();
    foreach($result as $row){

        $app = new Appointment;
        $app->app_Id = $row['app_Id'];
        $app->title = $row['title'];
        $app->location = $row['location'];
        $app->address = $row['address'];
        $app->house_nr = $row['house_nr'];
        $app->date = $row['date'];
        $app->expiry = $row['expiry'];
        
        array_push($appList, $app);
    }

    if($appList[0] == null)
    {
        return "collecting data unsuccessful";
    }
    return $appList;
}

function getOneAppointmentData($app_Id){
    $db = new Database();
    $result = $db->getOneAppointment($app_Id);
    if(!isset($result)){
        return "no result found";
    }
    $appList = array();
    foreach($result as $row){

        $app = new Appointment;
        $app->app_Id = $row['app_Id'];
        $app->title = $row['title'];
        $app->location = $row['location'];
        $app->address = $row['address'];
        $app->house_nr = $row['house_nr'];
        $app->date = $row['date'];
        $app->expiry = $row['expiry'];
        
        array_push($appList, $app);
    }

    if($appList[0] == null)
    {
        return "collecting data unsuccessful";
    }
    return $appList;
}


?>
