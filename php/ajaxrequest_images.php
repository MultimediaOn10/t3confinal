<?php
$breakname = "break1";

$alledateien = scandir('../img/'.$breakname); //Ordner "files" auslesen
foreach ($alledateien as $datei) { // Ausgabeschleife
    echo $datei."<br />"; //Ausgabe Einzeldatei
};
?>

<div class='slides_container'>
	<div class='slide'>
		<div class='item'>
			<a class='fancybox-images' data-thumbnail='../img/break1/MG_8605""_thumb.jpg' href='../img/break1/MG_8605.jpg'>Open #2</a>
		</div>
	</div>
</div>