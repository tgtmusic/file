<?php

$z=$_GET['link'];
if($z) {
	$zv=file_get_contents($z);
		$zvArray=explode('?xmlURL=',$zv);
		$ZV=explode('&',$zvArray[1]);
	$a=file_get_contents($ZV[0]);
		$aArray=explode('<source><![CDATA[',$a);
		$A=explode(']]></source>',$aArray[1]);
		$link=$A[0];
	$url = $link;
	header("Location: ".$url);
}
?>