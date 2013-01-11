<?php
//Variable
$trackID = $_POST ["trackID"];

//Verbindung zur Datenbank  
    include ('databaseconfig.php');  
    
//Ausgabe für den text
    $getmycontent = mysql_query("",$conn);  
    
    $rows = array();
        
    while($row = mysql_fetch_array($getmycontent)) {
    $rows[] = $row;
    }
    echo json_encode(array("items" => $rows));
    
?>