<?php
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id = $myFilter->process($_GET['id']);
if(isset($_GET["key"])) $key = $myFilter->process($_GET['key']);

if ($id && $key == md5($id.'tgt_music')) {
	$arr = $mlivedb->query(" m_url, m_is_local ","data"," m_id = '".$id."'");
	mysqli_query($link_music,"UPDATE table_data SET m_downloaded = m_downloaded + 1, m_downloaded_month = m_downloaded_month + 1 WHERE m_id = '".$id."'");
	$url = grab(get_url($arr[0][1],$arr[0][0]));
	header("Location: ".$url);
}
?>