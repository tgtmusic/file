<?php

	$link	=	$_GET['link'];
	$link 	= 	str_replace('.', '/', $link);
	$link 	= 	str_replace('/html', '.html', $link);
	
	$get = 'http://mp3.zing.vn/bai-hat/'.$link;
	
	$z=file_get_contents($get);
    $zArray=explode('autostart=true&amp;xmlURL=',$z);
    $Z=explode('&',$zArray[1]);
	$link_get	=	$Z[0];
	
	$a=file_get_contents($link_get);
	$aArray=explode('<source><![CDATA[',$a);
	$A=explode(']]></source>',$aArray[1]);
	$link=$A[0];
	$url = $link;
	header("Location: ".$url);
?>
