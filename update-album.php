<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
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
	$arr_new = $mlivedb->query(" album_song ","album"," album_id = '".$album_id."'");
if($arr_new[0][0] != ''){	
	$s = explode(',',$arr_new[0][0]);
	foreach($s as $x=>$val) {
		$arr[$x] = $mlivedb->query(" m_id, m_title, m_singer,m_viewed ","data"," m_id = '".$s[$x]."'");
		$singer_name = GetSingerName($arr[$x][0][2]);
		$get_singer = GetSinger($arr[$x][0][2]);
		$stt	=	$x+1;
		$song_url 		= url_link($arr[$x][0][1]."-".$singer_name,$arr[$x][0][0],'nghe-bai-hat');
		echo '<li class="group" id="arrayorder_'.$arr[$x][0][0].'" data-name="'.$arr[$x][0][1].'" data-from="playlist" data-type="song" data-id="'.en_id($arr[$x][0][0]).'" data-code="LHcHyLHaWNRERmFtZbcyDmkG" data-pid="'.en_id($arr[$x][0][0]).'">
                                        <input type="hidden" name="item_id" value="'.en_id($arr[$x][0][0]).'" />
                                        <div class="info-dp pull-left">
                                            <h3 class="txt-primary">'.$stt.'. 
                                                <a href="'.$song_url.'" title="Bài hát  '.$arr[$x][0][1].' - '.$singer_name.'">
                                                    '.rut_ngan($arr[$x][0][1].' - '.$singer_name,9).'
                                                </a>
                                            </h3>
                                        </div>
                                        <div class="bar-chart"><span class="fn-bar" title="'.$arr[$x][0][3].'" style="width:'.($arr[$x][0][3]/50).'%;"></span></div>                                    
                                        <div class="tool-song">
                                            <div class="i25 i-small remove"><a onClick="xSongAlbum('.$album_id.','.$arr[$x][0][0].');" title="Xóa" class="fn-rmitem" data-item="#song'.en_id($arr[$x][0][0]).'"></a></div>
                                            <div class="i25 i-small drag"><a href="#"></a></div>
                                        </div>
                                    </li>';
	} } 
}
?>

