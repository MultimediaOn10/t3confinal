<?php
//Variable
$trackID = $_POST ["trackID"];

//Verbindung zur Datenbank  
    include ('databaseconfig.php'); 
	$connection=mysql_connect($mysqlhost, $mysqluser, $mysqlpwd);
	mysql_select_db($mysqldb, $connection);	
    
//Ausgabe für den text
	$query = "Select programpoints.title, programpoints.id, ref1.lastname as ref1_last, ref1.firstname as ref1_first, ref2.lastname as ref2_last, ref2.firstname as ref2_first from programpoints left join (referents as ref1) on (programpoints.`referent_id`= ref1.`id`) left join (referents as ref2) on (programpoints.`referent2_id`= ref2.`id`) where programpoints.`id`='$trackID'";
    $getspeakertitle = mysql_query($query); 
    $rows = array();
        
    while($row = mysql_fetch_array($getspeakertitle)) {
	$row['ref1_last']=utf8_encode($row['ref1_last']);
	$row['ref2_last']=utf8_encode($row['ref2_last']);
    $rows[] = $row;
	}
    echo json_encode(array("items" => $rows));
    
?>