<?php

function curl_string($url){
       $ch = curl_init();
       curl_setopt ($ch, CURLOPT_URL, $url);
       curl_setopt ($ch, CURLOPT_USERAGENT, "Mozilla/6.0");
       curl_setopt ($ch, CURLOPT_HEADER, 1);
       curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt ($ch, CURLOPT_TIMEOUT, 120);
       $result = curl_exec ($ch);
       curl_close($ch);
       return $result;
}

$id=$_GET['id'];
if($id) {
	$url	=	"http://hcm.nhac.vui.vn/asx2.php?type=1&id=".$id;
	$a		=	curl_string($url);	
    $aArray	=	explode('<location><![CDATA[',$a);
    $A		=	explode(']]></location>',$aArray[1]);
	$load 	= 	urldecode($A[0]);
	header( "Location: ".$load);
}else {
	die("Error.");	
}
?>
