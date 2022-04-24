<?php 

class Votes {

    public $user_termin_Id;
    public $fk_termin_Id;
    public $username;
    public $comment;

    function __construct() {}

}

function getVotesData($fk_termin_Id){

    $db = new Database();
    $result = $db->getVotes($fk_termin_Id);
    if ($result->num_rows === 0){
        return "no votes found";
    }

    //same principle as appointments
    $voteList = array();
    foreach($result as $row){

        $vote = new Votes;
        $vote->user_termin_Id = $row['user_termin_Id'];
        $vote->fk_termin_Id = $row['fk_termin_Id'];
        $vote->username = $row['username'];
        $vote->comment = $row['comment']; 
        
        array_push($voteList, $vote);
    }
    return $voteList;
}