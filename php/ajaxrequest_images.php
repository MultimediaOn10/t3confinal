<?php
$breakname = $_POST ["breakname"];

$alledateien = scandir('../img/'.$breakname); //Ordner "files" auslesen
$img_array=array();
foreach ($alledateien as $datei) { // Ausgabeschleife
    //echo $datei."<br />"; //Ausgabe Einzeldatei
	
	
		if (strpos($datei, "thumb")==false && $datei != "." && $datei != ".."){
			$datei_blanko=str_replace(".jpg","",$datei);
			$img="<div class='slides_container'><div class='slide'><div class='item'><a class='fancybox-images' data-thumbnail='../img/break1/".$datei_blanko."\"\"_thumb.jpg' href='../img/break1/".$datei_blanko.".jpg'>".$datei."</a></div></div></div>";
		$img_array[]=$img;
		}		
	
	};
echo json_encode(array("items" => $img_array));
?>

