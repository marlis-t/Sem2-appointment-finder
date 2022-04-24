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
    if($result->num_rows === 0){
        //if no appointments in database
        return "no result found";
    }

    //array of objects created, sql result saved for easy acces later on
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

    //if null here, filling of array went wrong
    if($appList[0] == null)
    {
        return null;
    }
    return $appList;
}

function getOneAppointmentData($app_Id){
    $db = new Database();
    $result = $db->getOneAppointment($app_Id);
    if($result->num_rows === 0){
        return "no result found";
    }
    //same principle as above
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
        return null;
    }
    return $appList;
}

function getExpiredId(){
    $db = new Database;
    $result = $db->getExpired();

    //no appointment is expired
    if($result->num_rows === 0){
        return "no expired appointments"; 
    }

    $expList = array();
    foreach($result as $row){
        $expId = $row['app_Id'];
        array_push($expList, $expId);
    }

    //returns array of id of expired appointments
    return $expList;
}


?>
