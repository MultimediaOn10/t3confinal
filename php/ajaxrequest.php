<?php
//Variable
$trackID = $_POST ["trackID"];
//Verbindung zur Datenbank  
    include ('databaseconfig.php'); 
	$connection=mysql_connect($mysqlhost, $mysqluser, $mysqlpwd);
	mysql_select_db($mysqldb, $connection);	
    
//Ausgabe für den text
	$query = "Select * from media where `programpoint_id`='$trackID'";
    $getmycontent = mysql_query($query); 
	
    $rows = array();
        
    while($row = mysql_fetch_array($getmycontent)) {
	
    $rows[] = $row;
    }	
    echo json_encode(array("items" => $rows));
    
?>