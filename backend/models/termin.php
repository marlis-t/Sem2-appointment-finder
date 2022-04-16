<?php
class Termin{
    public $termin_Id;
    public $time;

    function __construct() {}
}
 
function getTerminData($fk_app_Id){
    $db = new Database();
    $result = $db->getTermine($fk_app_Id);
    if(!isset($result)){
        return "no result found";
    }
    if($result->num_rows === 0){
        return "no result found";
    }
    $termList = array();
    foreach($result as $row){
        $term = new Termin;
        $term->termin_Id = $row['termin_Id'];
        $term->time = $row['time'];

        array_push($termList, $term);
    }

    if($termList[0] == null)
    {
        return null;
    }
    return $termList;
}