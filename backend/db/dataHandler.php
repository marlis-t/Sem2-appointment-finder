<?php 

require_once("models/appointment.php");
require_once("models/termin.php");
require_once("models/votes.php");


class Database{

    private $conn;

    public function __construct(){
        include("db_access.php");

        $this->conn = new mysqli($db_servername, $db_username, $db_password, $db_name);
        if (!$this->conn) {
            die("Error while connecting to database: " . mysqli_connect_error());
        }
    }
    public function __destruct(){
        $this->conn->close();
    }

    //before displaying, always check getExpired, those toggle class expired
    function getAppointments(){
        $stmt = $this->conn->prepare("SELECT * FROM appointment");
        $stmt->execute();        
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    function getOneAppointment($app_Id){
        $stmt = $this->conn->prepare("SELECT * FROM appointment WHERE app_Id=?");
        $stmt->bind_param("i", $app_Id);
        $stmt->execute();        
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    function getTermine($fk_app_Id){
        $stmt = $this->conn->prepare("SELECT termin_Id, time FROM termin WHERE fk_app_Id=?");
        $stmt->bind_param("i", $fk_app_Id);
        $stmt->execute();        
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }

    function getVotes($fk_termin_Id){
        $stmt = $this->conn->prepare("SELECT * FROM user_termin WHERE fk_termin_Id=?");
        $stmt->bind_param("i", $fk_termin_Id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        
        return $result;
    }
    
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

    function getExpired(){
        $stmt = $this->conn->prepare("SELECT app_Id from appointment where expiry < NOW()"); //zb gestern kleiner wie heute
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    function alreadyVoted($fk_termin_Id, $username){
        $stmt = $this->conn->prepare("SELECT * from user_termin where fk_termin_Id=? and username=?");
        $stmt->bind_param("is", $fk_termin_Id, $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result;

    }

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

