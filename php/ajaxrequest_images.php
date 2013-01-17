<?php
$breakname = $_POST ["breakname"];

$alledateien = scandir('../img/'.$breakname); //Ordner "files" auslesen
$img_array=array();
foreach ($alledateien as $datei) { // Ausgabeschleife
    //echo $datei."<br />"; //Ausgabe Einzeldatei
	
	
		if (strpos($datei, "thumb")==false && $datei != "." && $datei != ".."){
			$datei_blanko=str_replace(".jpg","",$datei);
			$img="<div class='item'><a class='fancybox-images' ref='gallery' data-thumbnail='img/".$breakname."/".$datei_blanko."_thumb_.jpg' href='img/".$breakname."/".$datei_blanko.".jpg'><img src='img/".$breakname."/".$datei_blanko."_thumb_.jpg'/></a></div>";
		$img_array[]=$img;
		}		
	
	};
echo json_encode(array("items" => $img_array));
?>

