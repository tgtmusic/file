<?php
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
function acp_cat($id = 0, $add = false) {
	global $link_music,$mlivedb;
	$arr = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC");
	echo "<select class=\"upload_tgt\" name=\"cat_name\" id=\"cat_name\">";
	for($i=0;$i<count($arr);$i++) {
		echo "<option value=".$arr[$i][0].(($id == $arr[$i][0])?" selected":'').">".$arr[$i][1]."</option>";
		$arrz = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = '".$arr[$i][0]."' ORDER BY cat_order ASC");
		for($z=0;$z<count($arrz);$z++) {
       	 echo "<option value=".$arrz[$z][0].(($id == $arrz[$z][0])?" selected":'').">----".$arrz[$z][1]."</option>";
		}
	} 
	echo "</select>";
}

function them_moi_singer($new_singer,$singer_type) {
	global $link_music,$mlivedb;
	$new_singer =  htmlchars(stripslashes($new_singer));
	$list_singer = $new_singer.',';
	$new_singer = substr($list_singer,0,-1);
	$s = explode(', ',$new_singer);
	foreach($s as $x=>$val)
      {
	$new_singer =  htmlchars(stripslashes($s[$x]));
	$singer_ascii = replace($s[$x]);
	$singer_ascii = str_replace('-'," ",$singer_ascii);
	$singer_ascii = strtolower(get_ascii($singer_ascii));
		$arr = $mlivedb->query(" singer_id ","singer"," singer_name = '".$s[$x]."'");
	if (count($arr)>0) {
		$singer1 .= $arr[0][0].',';
		$singer = ','.substr($singer1,0,-1).',';
	}
	else {
		mysqli_query($link_music,"INSERT INTO table_singer (singer_name,singer_name_ascii,singer_type) VALUES ('".$new_singer."','".$singer_ascii."','".$singer_type."')");
		$singer1 .= mysqli_insert_id($link_music).',';
		$singer = ','.substr($singer1,0,-1).',';

	}}
	  return $singer;
}

function acp_type(&$url) {
	$t_url = strtolower($url);
	$ext = explode('.',$t_url);
	$ext = $ext[count($ext)-1];
	$ext = explode('?',$ext);
	$ext = $ext[0];
	$movie_arr = array(
		'asf',
		'wma',
		'wmv',
		'avi',
		'asf',
		'mpg',
		'mpe',
		'mpeg',
		'asx',
		'm1v',
		'mp2',
		'mpa',
		'ifo',
		'vob',
	);
	$mp3_arr = array(
		'mp3',
	);
	$flv_arr = array(
		'flv',
		'f4v',
		'mp4',
	);
	if (in_array($ext,$movie_arr)) $type = 0;
	elseif (in_array($ext,$mp3_arr)) $type = 1;
	elseif (in_array($ext,$flv_arr)) $type = 2;
	elseif (!$type) $type = 1;

	return $type;
}
function grab_img($url) {
if (preg_match("#youtube.com/v/([^/-]+)#s",$url,$id_yt)){
		$img = 'http://img.youtube.com/vi/'.$id_yt[1].'/0.jpg';
	}
elseif (preg_match("#youtube.com/watch\?v=([^/]+)#s",$url, $id_sr)){
		$img = 'http://img.youtube.com/vi/'.$id_sr[1].'/0.jpg';
	}
elseif (preg_match("#http://mp3.zing.vn/video-clip/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<meta property="og:image" content="',$a);
    	$A=explode('"',$aArray[1]);
		$img=$A[0];	
    }
elseif (preg_match("#http://mp3.zing.vn/tv/media/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<link rel="image_src" href="',$a);
    	$A=explode('" />',$aArray[1]);
		$img=$A[0];	
    }
	elseif (preg_match("#http://tv.zing.vn/video/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<meta property="og:image" content="',$a);
    	$A=explode('" />',$aArray[1]);
		$img=$A[0];	
    }
elseif (preg_match("#http://nhacso.net/xem-video/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<link href="',$a);
    	$A=explode('" rel="image_src" />',$aArray[1]);
		$img=$A[0];	
    }	
elseif (preg_match("#http://www.nhaccuatui.com/mv/(.*?).html#s",$url,$id_sr)){
		$a=file_get_contents($url);
    	$aArray=explode('<meta property="og:image" content="',$a);
    	$A=explode('"/>',$aArray[1]);
		$img=$A[0];	
    }	
return $img;

}
?>

