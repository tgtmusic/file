<?php
define('MLive-Channel',true);
include("../../includes/configurations.php");
include("../functions.php");
$array	= $_POST['arrayorder'];
if ($_POST['update'] == "update" && $_POST['id_album']){
	foreach ($array as $key=>$val) {
		$list .= $array[$key].',';
		$playlist = substr($list,0,-1);
		mysqli_query($link_music,"UPDATE table_album SET album_song = '".$playlist."' WHERE album_id = '".$_POST['id_album']."'");
	}
	echo "Loadding....";
}
elseif ($_POST['xSongAlbum']){
	$album_id	=	(int)$_POST['album_id'];
	$remove_id	=	(int)$_POST['remove_id'];
	$arr_old = $mlivedb->query(" album_song ","album"," album_id = '".$album_id."'");
	if($remove_id === $arr_old[0][0]) $str = '';
	else{
		$z = explode(',',$arr_old[0][0]);
		if (in_array($remove_id,$z)) {
		unset($z[array_search($remove_id,$z)]);
			$str = implode(',',$z);
		}
	}
	// up du lieu moi
	mysqli_query($link_music,"UPDATE table_album SET album_song = '".$str."' WHERE album_id = '".$album_id."'");
	$arr_new = $mlivedb->query(" album_song ","album"," album_id = '".$album_id."'");if($arr_new[0][0] != ''){
	$s = explode(',',$arr_new[0][0]);
	foreach($s as $x=>$val) {
		$arr[$x] = $mlivedb->query(" m_id, m_title, m_singer ","data"," m_id = '".$s[$x]."'");
		$singer_name = GetSingerAdmin($arr[$x][0][2]);
		$stt	=	$x+1;
		echo '<li id="arrayorder_'.$arr[$x][0][0].'">                      <!-- drag handle -->                      <span class="handle">                        <i class="fa fa-ellipsis-v"></i>                        <i class="fa fa-ellipsis-v"></i>                      </span>                      <!-- checkbox -->                      <input type="checkbox" value="" name="" />                      <!-- todo text -->                      <span class="text">'.$stt.'. '.$arr[$x][0][1].'</span>                      <!-- Emphasis label -->                      <small class="label label-danger" ><i class="fa fa-clock-o"></i></small>'.$singer_name.'                      <!-- General tools such as edit or delete-->                      <div class="tools">                        <a onClick="xSongAlbum('.$album_id.','.$arr[$x][0][0].');" style="cursor: pointer;"><i class="fa fa-trash-o"></i></a>                      </div>                    </li>';
	}
} else { echo'<b>Album hiện chưa có bài hát!</b>';}} 
?>

