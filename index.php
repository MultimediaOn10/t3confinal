<?php


$mysqlhost="localhost"; 
$mysqluser="root";
$mysqlpwd="";
$connection=mysql_connect($mysqlhost, $mysqluser, $mysqlpwd);
$mysqldb="t3con"; 
mysql_select_db($mysqldb, $connection);

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
$sql_pp="Select * from programpoints left join topics on programpoints.topic_id=topics.id  WHERE `conference_id`='$conference_id' and `day`='$day' order by programpoints.start_time ASC";



//html-Datei erzeugen

//header, ....
echo("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\">
<!--[if lt IE 7]>      <html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"> <![endif]-->
<!--[if IE 7]>         <html class=\"no-js lt-ie9 lt-ie8\"> <![endif]-->
<!--[if IE 8]>         <html class=\"no-js lt-ie9\"> <![endif]-->
<!--[if gt IE 8]><!--> <html class=\"no-js\"> <!--<![endif]-->
<head>
	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />	<title>Typo3Con Cambodia</title>
    <meta name=\"viewport\" content=\"width=device-width\">
    <meta name=\"description\" content=\"mydescription\">
	<link href=\"img/favicon.ico\" type=\"image/x-icon\" rel=\"icon\" /><link href=\"img/favicon.ico\" type=\"image/x-icon\" rel=\"shortcut icon\" /><link rel=\"stylesheet\" type=\"text/css\" href=\"css/main.css\" /><link rel=\"stylesheet\" type=\"text/css\" href=\"css/font.css\" /><link rel=\"stylesheet\" type=\"text/css\" href=\"css/bootstrap-responsive.min.css\" /><link rel=\"stylesheet\" type=\"text/css\" href=\"css/bootstrap.min.css\" />
       <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
       </style>
</head>
<body>");


echo("<div class=\"container\">         
		<!--This is the header-->
		<div class=\"row header\">
			<div class=\"span9 heading\">
				<div id=\"conference-header-line-one\">".$con['title']."</div> 
				<div id=\"conference-header-line-two\">".$con['subtitle']."</div>                             
			</div>
			<div class=\"span3 logo\">
				<a href=\"http://www.typo3.org\"><img src=\"img/t3-logo.png\"/></a>
			</div>
		</div>
		<div class=\"row\">
			<div class=\"span3\">&nbsp;</div>
			<div class=\"span8 daytext\">
                            ");
                                if ($day="Friday"){
                                    echo("<a class=\"menu_active\" href=\"index.php?day=Friday\">Friday</a> / <a class=\"menu_passiv\" href=\"index.php?day=Saturday\">Saturday</a>");
                                } 
                                else{
                                    echo("<a class=\"menu_passiv\" href=\"index.php?day=Friday\">Friday</a> / <a class=\"menu_activ\" href=\"index.php?day=Saturday\">Saturday</a>");                                
                                }
                            
                            
        echo("</div>                    
		</div>");
		
		
$pp = mysql_query($sql_pp);
echo("
<div class=\"span6 center-content\">
				<div class=\"row\">
					<div class=\"span6 content-heading\">
						<div class=\"left-floating heading-text\">
							Business/Community Track
						</div>
						<div class=\"right-floating heading-text\">
							Technical Track
						</div>
					</div>
				</div>");
while($point = mysql_fetch_array($pp)){
	if ($point['referent_id'] != 0){
		$sql_ref1="SELECT firstname, lastname from referents where `id`='$point[referent_id]'";
		$ref1 = mysql_query($sql_ref1);
		$ref1 = mysql_fetch_array($ref1);
	if($point['referent2_id'] != 0){
		$sql_ref2="SELECT firstname, lastname from referents where `id`='$point[referent2_id]'";
		$ref2 = mysql_query($sql_ref2);
		$ref2 = mysql_fetch_array($ref2);
		$referent="($ref1[firstname] $ref1[lastname], $ref2[firstname] $ref2[lastname])";
		}
	else{
		$referent="($ref1[firstname] $ref1[lastname])";
	}
}
else{
	$referent="";
}
	if($point['topic_id']=="7"){
        echo("<div class=\"row\">"); 
        echo("<div class=\"span6 content-heading bordered-line\">");
        echo("<div class=\"left-floating heading-text\" id=\"".$point['id']."\">");
		echo($point['title']);
        echo(" </div>
               </div>
               </div>");
                                          
    }
    elseif($point['column']=="1"){
        echo(" <div class=\"row\">");
        echo("<div class=\"span6\">");
        echo("<div class=\"keynote-time\">");
        echo(substr($point['start_time'],0,5)."-<br/>".substr($point['end_time'],0,5));
        echo("</div>");
        echo("<div class=\"keynote-track ".$point['color']."-track\" id=\"".$point['id']."\">");
        echo("<div class=\"track-title\">".$point['title']."</div><div class=\"track-speaker\">".$referent."</div>");
                                                      
        echo("</div>
        </div>
        </div>");
    }
    elseif($point['column']=="2" && $point['subcolumn']=="1"){
        echo(" <div class=\"row\">
            <div class=\"span6\">
            <div class=\"left-floating ".$point['color']."-track track\" id=\"".$point['id']."\">
			<div class=\"track-title\">".$point['title']."</div> <div class=\"track-speaker\">".$referent."</div>							
            </div>
			<div class=\"left-floating middle-field first-field\">
							".substr($point['start_time'],0,5)."-<br/>".substr($point['end_time'],0,5)." 
						</div>");
                                         
    }
    elseif($point['column']=="2" && $point['subcolumn']=="2"){                                          
        echo(" <div class=\"left-floating ".$point['color']."-track track\" id=\"".$point['id']."\">
							<div class=\"track-title\">".$point['title']."</div><div class=\"track-speaker\">".$referent."</div>
							
                                                    </div>
                                                    </div>
                                                    </div>");
                                           // echo ("<font color=\"#FF0000\">Vortrag rechte Spalte</font>");
                                        }
                                  //  print_r($value);
                                    //exit;
                                    
                                 //   echo ("</div></div>");
                                    
                                }

echo("
<div class=\"row\">
					<div class=\"span6\">
						<div class=\"legend\" id=\"legend-yellow\">Business and <br/>Best Practices</div>
						<div class=\"legend\" id=\"legend-purple\">Mobile Development</div>
						<div class=\"legend\" id=\"legend-blue\">TYPO3 Enterprise CMS</div>
						<div class=\"legend\" id=\"legend-green\">FLOW3 PHP <br/>Framework</div>
						<div class=\"legend\" id=\"legend-orange\">Design and UX</div>
						<div class=\"legend\" id=\"legend-red\">Community / General</div>
					</div>
				</div>
			</div>");


echo("</body></html>");
?>