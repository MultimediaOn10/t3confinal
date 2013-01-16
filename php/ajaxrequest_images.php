<?php
$breakname = "break1";

$alledateien = scandir('../img/'.$breakname); //Ordner "files" auslesen
foreach ($alledateien as $datei) { // Ausgabeschleife
    //echo $datei."<br />"; //Ausgabe Einzeldatei
		if (strpos($datei, "thumb")==false){
			$datei_blanko=str_replace(".jpg","",$datei);
			echo ("<div class='item'>
								<a class='fancybox-images' data-thumbnail='../img/break1/".$datei_blanko."_thumb.jpg' href='../img/break1/".$datei_blanko.".jpg'>".$datei."</a>
					</div>
						");
		}

	
	};
?>
