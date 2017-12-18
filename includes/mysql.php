<?php
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
 #error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED);
// ket noi database
$link_music 	= 	mysqli_connect(SERVER_HOST,DATABASE_USER,DATABASE_PASS);
$dataconnect	=	mysqli_select_db($link_music,DATABASE_NAME);
if(!$dataconnect)	die("Error: ".mysqli_error());	


// class mysql database 
class mysql {
function query($item,$table,$con){
	global $link_music;
	$table	=	trim($table);
	$arr=null;
	$i=(float) 0;
	$sql="SELECT $item FROM ".DATABASE_NAME.'.'.DATABASE_FX.$table;
	if($con!="")
		$sql.=" WHERE $con";
	$result= mysqli_query($link_music,$sql);
	if ($result){
		while($myrow = mysqli_fetch_row($result)){
			$count = mysqli_num_fields($result);
			for($j=(float)0;$j<$count;$j++)
				$arr[$i][$j]=$myrow[$j];
			$i++;
		}
		mysqli_free_result($result);
		return $arr;
   }
   else
	return false;
}

}

function get_data($table, $field, $con){
	global $mlivedb;
	$arr = $mlivedb->query($field , $table , $con);
	if(count($arr) > 0)
		return $arr[0][0];
	else
		return false;
}
function GetTheLoai($cat_id,$type='song') {
	 $cat_list	=	substr($cat_id, 1);
	 $cat_list	=	substr($cat_list,0,-1);
	 $s = explode(',',$cat_list);
     foreach($s as $x=>$val) {
		$name_cat	=	get_data("theloai","cat_name"," cat_id = '".$s[$x]."'");
		if($type	==	'album')
			$url_cat	=	url_link($name_cat,$s[$x],'album-cat');
		elseif($type	==	'nghe-si')
		$url_cat	=	url_link($name_cat,$s[$x],'singer-cat');
		elseif($type	==	'video')
			$url_cat	=	url_link($name_cat,$s[$x],'video-cat');
		else
			$url_cat	=	url_link($name_cat,$s[$x],'the-loai');
		$html_cat  .=	"<span class=\"singer_\"><a href=\"".$url_cat."\" title=\"".$name_cat."\">".$name_cat."</a></span>, ";
	 }
	 $html_cat 		= substr($html_cat,0,-2);
	 return $html_cat;
}

function GetCAT($cat_id) {
	 $cat_list	=	substr($cat_id, 1);
	 $cat_list	=	substr($cat_list,0,-1);
	 $s = explode(',',$cat_list);
     foreach($s as $x=>$val) {
		$name_cat	=	get_data("theloai","cat_name"," cat_id = '".$s[$x]."'");
		$html_cat  .=	$name_cat.", ";
	 }
	 $html_cat 		= substr($html_cat,0,-2);
	 return $html_cat;
}

function GetSinger($singer_id) {
	$singer_list	=	substr($singer_id, 1);
	 $singer_list	=	substr($singer_list,0,-1);
	 $s = explode(',',$singer_list);
     foreach($s as $x=>$val) {
		$name_singer	=	get_data("singer","singer_name"," singer_id = '".$s[$x]."'");
		$url_singer	=	'nghe-si/'.replace($name_singer);
		$html_singer  .=	"<a href=\"".$url_singer."\" title=\"Nghệ sĩ ".$name_singer."\">".$name_singer."</a>, ";
		 if ($x>1) { 
		 $name_singer = get_data("singer","singer_name"," singer_id IN ($singer_list) ORDER BY singer_id = '".$s[$x]."'");
		$url_singer	=	'nghe-si/'.replace($name_singer);
		$html_singer  =	"<a href=\"".$url_singer."\" title=\"Nghệ sĩ ".$name_singer."\">Nhiều Nghệ Sĩ</a>, ";
		 }
	 }
	 $html_singer 		= substr($html_singer,0,-2);
	 return $html_singer;
}

function GetSingerName($singer_id) {
	$singer_list	=	substr($singer_id, 1);
	 $singer_list	=	substr($singer_list,0,-1);
	 $s = explode(',',$singer_list);
     foreach($s as $x=>$val) {
		$name_singer	=	get_data("singer","singer_name"," singer_id = '".$s[$x]."'");
		$url_singer	=	'nghe-si/'.replace($name_singer);
		$html_singer  .= $name_singer.", ";
	 }
	 $html_singer 		= substr($html_singer,0,-2);
	 return $html_singer;
}
function GetSingerIMG($singer_id) {
	$singer_list	=	substr($singer_id, 1);
	$singer_list	=	substr($singer_list,0,-1);
	$s = explode(',',$singer_list);
     foreach($s as $x=>$val) {
	$singer_img = get_data("singer","singer_img"," singer_id IN ($singer_list) ORDER BY singer_id = '".$s[$x]."'");
	 }
	$html_singer	=	check_img($singer_img);
	 return $html_singer;
}
function GetSingerIMGBIG($singer_id) {
	$singer_list	=	substr($singer_id, 1);
	$singer_list	=	substr($singer_list,0,-1);
	$s = explode(',',$singer_list);
     foreach($s as $x=>$val) {
	$singer_img = get_data("singer","singer_big_img"," singer_id IN ($singer_list) ORDER BY singer_id = '".$s[$x]."'");
	 }
	$html_singer	=	check_img2($singer_img);
	 return $html_singer;
}
function GetSingerID($singer_id) {
	$singer_list	=	substr($singer_id, 1);
	$singer_list	=	substr($singer_list,0,-1);
	$s = explode(',',$singer_list);
     foreach($s as $x=>$val) {
	$singer_id = get_data("singer","singer_id"," singer_id IN ($singer_list) ORDER BY singer_id = '".$s[$x]."'");
	 }
	$html_singer	=	$singer_id;
	 return $html_singer;
}
function SoBaiHat($chuoi) {
	$count = substr_count($chuoi, ',')+1;
	return $count;
}
function SoBaiHat1($chuoi) {
	$chuoi_list	=	substr($chuoi, 1);
	$chuoi_list	=	substr($chuoi_list,0,-1);
	$count = substr_count($chuoi_list, ',')+1;
	return $count;
}
function GetTIMEDATE($date) {
	$date = date("H:i d/m/Y",$date);
	return $date;
}
function CheckSingerInfo($value,$singer_id,$type) {
	global $mlivedb;
	if($type == 1) {
		if($value == "") $value = 'Chưa có thông tin về ca sĩ này.!';
		else $value = $value.'<br><a class="_viewMore" onclick="LoadInfoSinger(\''.$singer_id.'\',1,'.$type.');">Xem toàn bộ</a>';
	} else { 
		if($value == "") $value = 'Bài hát này chưa có lời.!';
		else $value = $value.'<p><a onclick="LoadInfoSinger(\''.$singer_id.'\',1,'.$type.');">Xem toàn bộ</a></p>';
	}
	return $value;
}

function get_user($user_id){
	global $mlivedb;
	$arr = $mlivedb->query("username " , "user" , "userid = '".$user_id."'");
	if(count($arr) > 0) {
		$user_name = $arr[0][0];
		return $user_name;
		}
	else
		return false;
}
function get_url($id, $url){
	global $mlivedb;
	$arr = $mlivedb->query(" local_link " , "local" , "local_id = '$id'");
	if(count($arr) > 0) 
	$link = $arr[0][0].'/'.$url;
	else $link = $url;
	
	return $link;
}


function getConfig($key){
	global $mlivedb;
	$arr = $mlivedb->query(" cf_value ","config"," cf_name ='".$key."'");
	if(count($arr) > 0)
		return $arr[0][0];
	else
		return false;
}

function tinh_tuan($a)
{
	$hours = $a * 24;
	$added = ($hours * 3600)+time();
	$month = date("m", $added);
	$day = date("j", $added);
	$year = date("Y", $added);
	$result = "$day/$month/$year";
	return ($result);
}
function w_m_noyear($a)
{
	$hours = $a * 24;
	$added = ($hours * 3600)+time();
	$month = date("m", $added);
	$day = date("j", $added);
	$year = date("Y", $added);
	$result = "$day/$month";
	return ($result);
}
function DeleteCache($dir,$rf = "") {
    $mydir = opendir($dir);
          while(false !== ($file = readdir($mydir))) {
              if($file != "." && $file != "..") {
                  if(!is_dir($dir.$file)) {
                          unlink($dir.$file) or DIE("Không thể xóa $dir$file<br />");
                  }

              }
          }
	closedir($mydir);
	if($rf != "") {
		header ("Location: ../index.php");
	}
	exit();
}
function delFile($path){
	$path	=	$_SERVER["DOCUMENT_ROOT"].$path;
	if(file_exists($path)){
		@unlink($path);
		return true;
	}else
		return false;
}

// set cookie
function _SETCOOKIE($name, $value = ""){ 
	$expires = time() + 60*60*24*365; 
	setcookie($name, $value, $expires, "/");
} 
// lay cookie
function _GETCOOKIE($name){ 
	if (isset($_COOKIE[$name])) return urldecode($_COOKIE[$name]); 
	else return FALSE; 
} 
?>