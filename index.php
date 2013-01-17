<?php	
	if(!isset($_COOKIE['t3con']) && !isset($_POST['skip'])){
		echo ("<meta http-equiv='refresh' content='0; URL=php/intro.php'>");
		//header("Location: php/intro.php");
		}
    else{           

			//Datenbank
			include('php/databaseconfig.php');
			$connection=mysql_connect($mysqlhost, $mysqluser, $mysqlpwd);
			mysql_select_db($mysqldb, $connection);	
			
			//Cookie auslesen und setzen
           if (isset($_COOKIE['t3con'])){
               $skip=$_COOKIE['t3con'];
           }
            elseif(isset($_POST['skip'])){
                 setcookie('t3con', 'skip');//, time()+10000);
                 $skip="skip";
            }
            else{
                setcookie('t3con', 'watched');//, time()+10000); 
                $skip="watched";
            }
		echo ($_COOKIE['t3con']);

//Conferenceinformation
$sql = "SELECT * from conferences where `id`='1'";
$erg = mysql_query($sql);
$con = mysql_fetch_array($erg);
//print_r($erg);

//SET day
if(isset($_GET['day'])){
	$day=$_GET['day'];
}
else{
	$day="Friday";
}


$conference_id=1;
$sql_pp="Select * from programpoints right join topics on programpoints.topic_id=topics.id  WHERE `conference_id`='$conference_id' and `day`='$day' order by programpoints.start_time ASC";

//Html-Datei erzeugen
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
	<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
	<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
	<!--[if gt IE 8]>      <html class="no-js"> <[endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	<title>Typo3Con Cambodia</title>
    <meta name="viewport" content="width=device-width"/>
    <meta name="description" content="mydescription">
	<link href="img/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="img/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/font.css" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />

	<script src="js/jquery-1.8.3.min.js" type="text/javascript"></script>
	<script src="js/bootstrap.js" type="text/javascript"></script>
	<script src="js/html5shiv.js" type="text/javascript"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="js/main.js" type="text/javascript"></script>
	<!--Embed the slider-->
	<script src="js/slides/slides.jquery.js" type="text/javascript"></script>
	<script src="js/image_slider.js" type="text/javascript"></script>
	<!--Embed the fancy box-->
	<script type="text/javascript" src="js/fancybox.js"></script>
	<script type="text/javascript" src="js/fancyapps/lib/jquery.mousewheel-3.0.6.pack.js"></script>
	<link rel="stylesheet" href="js/fancyapps/source/jquery.fancybox.css?v=2.1.3" type="text/css" media="screen" />
	<script type="text/javascript" src="js/fancyapps/source/jquery.fancybox.pack.js?v=2.1.3"></script>
	<link rel="stylesheet" href="js/fancyapps/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" media="screen" />
	<script type="text/javascript" src="js/fancyapps/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
	<script type="text/javascript" src="js/fancyapps/source/helpers/jquery.fancybox-media.js?v=1.0.5"></script>
	<link rel="stylesheet" href="js/fancyapps/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" type="text/css" media="screen" />
	<script type="text/javascript" src="js/fancyapps/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

	
</head>	
<body>
	<div class="container">         
		<!--This is the header-->
		<div class="row header">
			<div class="span9 heading">
				<?php
				echo ("
					<div id=\"conference-header-line-one\">".$con['title']."</div> 
					<div id=\"conference-header-line-two\">".$con['subtitle']."</div>  
				")
				?>                           
			</div>
			<div class="span3 logo">
				<a href="http://www.typo3.org"><img src="img/t3-logo.png"/></a>
			</div>
		</div>

		<?php
		if($skip=="skip"){
		echo("
		<div class=\"row\">
			<div class=\"span3\">&nbsp;</div>
			<div class=\"span8 skip\">
            	<p>Hi people, this is our page to give you a short overview about the T3Con 2012 in Cambodia. You are able to see here all talks of the conference by cklicking at the Traks. As well as you're able to get some impresiions of the spirit by clicking on at the breaks and other events. Have fun around.</p>    
        	</div>                    
		</div>");
		}
		?>
		<div class="row">
			<div class="span3">&nbsp;</div>
			<div class="span8 daytext">
                <?php
				
                    if ($day=="Friday"){					
                        echo("<div class=\"menu_active\">Friday</div> <div class=\"slash\">/</div> <div class=\"menu_passiv\"><a  href=\"index.php?day=Saturday\">Saturday</a></div>");
                    } 
                    else{					
                        echo("<div class=\"menu_passiv\"><a  href=\"index.php?day=Friday\">Friday</a></div> <div class=\"slash\">/</div> <div class=\"menu_active\">Saturday</div>");                                
                    }                 
            	?>  
        	</div>                    
		</div>

		<!-- Here starts the main content-->
		<div class="row">
			<!-- Here is the sidebar for the bubbles-->
			<div class="span3 sidebar">
				<div class="bubble left-floating bubble-left" id="bubble-2">
	          		<canvas id="canvas1" class="bubbleborder" width="240" height="200" >
	         		 </canvas>
	          		<div class="bubbletext bubbletext-left">
		            	<h3 class="title title-left">Der Titel des Vortrags</h3>
		            	<div class="speaker-name speaker-name-left">Liesa Burgey</div>
		            	<div class="bubble-content bubble-content-left">
		             		<p class="bubble-text bubble-text-left"> Dies ist ein Satz in welchem der Inhalt beschrieben ist.</p>
		            	</div>
	            		<div class="button button-left"> Info »</div>
	          		</div>
	        	</div>
	    	</div>

			<!--Here is the centered content-->
				
			

			<div class="span6 center-content">
				<div class="row">
					<div class="span6 content-heading">
						<div class="left-floating heading-text">
							Business/Community Track
						</div>
						<div class="right-floating heading-text">
							Technical Track
						</div>
					</div>
				</div>
				<?php $pp = mysql_query($sql_pp);
				while($point = mysql_fetch_array($pp)){
					if ($point['referent_id'] != 0){
						$sql_ref1="SELECT firstname, lastname from referents where `id`='$point[referent_id]'";
						$ref1 = mysql_query($sql_ref1);
						$ref1 = mysql_fetch_array($ref1);
					if($point['referent2_id'] != 0){
						$sql_ref2="SELECT firstname, lastname from referents where `id`='$point[referent2_id]'";
						$ref2 = mysql_query($sql_ref2);
						$ref2 = mysql_fetch_array($ref2);
						$referent="(".utf8_encode($ref1['firstname'])." ".utf8_encode($ref1['lastname']).", ".utf8_encode($ref2['firstname'])." ".utf8_encode($ref2['lastname']).")";
						}
					else{
						$referent="(".utf8_encode($ref1['firstname'])." ".utf8_encode($ref1['lastname']).")";
						}
				}
				else{
				$referent="";
				}
				if($point['topic_id']=="7"){
			        echo("
			    <div class=\"row\">"); 
			        echo("<div class=\"break span6 content-heading bordered-line ".$point['break_id']."\" id=\"".$point['break_id']."\">");
			       		echo("<div class=\"left-floating heading-text\">");
							echo($point['title']);
			        	echo(" </div>
			        </div>
			    </div>");
			                                          
			    }
			    elseif($point['column']=="1"){
			        echo("
			    <div class=\"row\">");
			        echo("<div class=\"span6\">");
				        echo("<div class=\"keynote-time\" >");
					        	echo(substr($point['start_time'],0,5)."-<br/>".substr($point['end_time'],0,5));
					    echo("</div>");
					    echo("<div class=\"keynote-track ".$point['color']."-track\" id=\"".$point['0']."\" >");
					        echo("<div class=\"track-title\">".$point['title']."</div><div class=\"track-speaker\">".$referent."</div>");
				        echo("</div>
			        </div>
			    </div>");
			    }
			    elseif($point['column']=="2" && $point['subcolumn']=="1"){
			        echo(" 
			    <div class=\"row\">
			        <div class=\"span6\">
			            <div class=\"left-floating ".$point['color']."-track track\"  id=\"".$point['0']."\">
							<div class=\"track-title\">".$point['title']."</div> <div class=\"track-speaker\">".$referent."</div>							
			            </div>
						<div class=\"left-floating middle-field first-field\">
							".substr($point['start_time'],0,5)."-<br/>".substr($point['end_time'],0,5)." 
						</div>");                                        
						}
						elseif($point['column']=="2" && $point['subcolumn']=="2"){                                          
							echo(" 
						<div class=\"left-floating ".$point['color']."-track track\" id=\"".$point['0']."\">
							<div class=\"track-title\">".$point['title']."</div><div class=\"track-speaker\">".$referent."</div>					
						</div>
					</div>
				</div>");
				    }				                                    
				}
				?>
				<div class="row">
					<div class="upper-legend-text span6"></div>
				</div>
				<div class="row">
					<div class="span6">
						<div class="legend" id="legend-yellow"><p>Business and <br/>Best Practices</p></div>
						<div class="legend" id="legend-purple"><p>Mobile Development</p></div>
						<div class="legend" id="legend-blue"><p>TYPO3 Enterprise CMS</p></div>
						<div class="legend" id="legend-green"><p>FLOW3 PHP <br/>Framework</p></div>
						<div class="legend" id="legend-orange"><p>Design and UX</p></div>
						<div class="legend" id="legend-red"><p>Community / General</p></div>
					</div>
				</div>
				<div class="row">
					<div class="lower-legend-text span6"></div>
				</div>			
			</div>
			<!--This is the right sidecontent (for the bubbles)-->
			<div class="span3 sidebar">
				<div class="bubble left-floating bubble-right" id="bubble-1">
					<canvas id="canvas2" class="bubbleborder" width="240" height="200" >
					</canvas>
					<div class="bubbletext bubbletext-right">
						<h3 class="title title-right">Der Titel des Vortrags</h3>
						<div class="speaker-name speaker-name-right">Liesa Burgey</div>
						<div class="bubble-content bubble-content-right">
							<p class="bubble-text bubble-text-right"> Dies ist ein Satz in welchem der Inhalt beschrieben ist.</p>
						</div>
						<div class="button button-right"> Info »</div>
					</div>
				</div>
			</div>
		</div>
</body>
</html>

<?php

}
?>
