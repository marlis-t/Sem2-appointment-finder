<?php 

//models of different constructs
require_once("models/appointment.php");
require_once("models/termin.php");
require_once("models/votes.php");


class Database{

    //when creating object Database, connection is automatically opened as it's part of the constructor
    private $conn;

    public function __construct(){
        include("db_access.php");

        $this->conn = new mysqli($db_servername, $db_username, $db_password, $db_name);
        if (!$this->conn) {
            die("Error while connecting to database: " . mysqli_connect_error());
        }
    }
    public function __destruct(){
        //closing connection when going out-of-scope
        $this->conn->close();
    }

    //gets all data of all appointments
    function getAppointments(){
        $stmt = $this->conn->prepare("SELECT * FROM appointment");
        $stmt->execute();        
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    //gets data of one specific appointment
    function getOneAppointment($app_Id){
        $stmt = $this->conn->prepare("SELECT * FROM appointment WHERE app_Id=?");
        $stmt->bind_param("i", $app_Id);
        $stmt->execute();        
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    //gets all timeslots of one specific appointment
    function getTermine($fk_app_Id){
        $stmt = $this->conn->prepare("SELECT termin_Id, time FROM termin WHERE fk_app_Id=?");
        $stmt->bind_param("i", $fk_app_Id);
        $stmt->execute();        
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    //gets all comments and usernames belonging to one specific timeslot
    function getVotes($fk_termin_Id){
        $stmt = $this->conn->prepare("SELECT * FROM user_termin WHERE fk_termin_Id=?");
        $stmt->bind_param("i", $fk_termin_Id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    //saves username and (optional) comment into database
    function saveChoiceAndComment($fk_termin_Id, $username, $comment){
        $stmt = $this->conn->prepare("INSERT INTO user_termin (fk_termin_Id, username, comment) VALUES(?, ?, ?)");
        $stmt->bind_param("iss", $fk_termin_Id, $username, $comment);
        if($stmt->execute()){
            $stmt->close();
            return true;
        }
        $stmt->close();
        return false;
    }

    //gets all ids of expired appointments
    function getExpired(){
        $stmt = $this->conn->prepare("SELECT app_Id from appointment where expiry < NOW()"); //zb gestern kleiner wie heute
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    //gets all entries where termin_Id and username are equal to sent variables to check if this username has already voted on this timeslot
    function alreadyVoted($fk_termin_Id, $username){
        $stmt = $this->conn->prepare("SELECT * from user_termin where fk_termin_Id=? and username=?");
        $stmt->bind_param("is", $fk_termin_Id, $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result;

    }

    //deletes one specific appointment
    function deleteAppointment($app_Id){
        $stmt = $this->conn->prepare("DELETE FROM appointment where app_Id=?");
        $stmt->bind_param("i", $app_Id,);
        if($stmt->execute()){
            $stmt->close();
            return true;
        }
        $stmt->close();
        return false;
    }

}


?>

