<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
if ($_POST['xSongFAV']){
	$user_id	=	(int)$_POST['user_id'];
	$remove_id	=	(int)$_POST['remove_id'];
	$arr_old = $mlivedb->query(" user_like_song ","user"," userid = '".$user_id."'");
	
	if($remove_id === $arr_old[0][0]) $str = '';
	else{
		$z = explode(',',$arr_old[0][0]);
		if (in_array($remove_id,$z)) {
		unset($z[array_search($remove_id,$z)]);
			$str = implode(',',$z);
		}
	}
	// up du lieu moi
	mysqli_query($link_music,"UPDATE table_user SET user_like_song = '".$str."' WHERE userid = '".$user_id."'");
?>
 <div class="zcontent">
            <h3 class="title-section">Nhạc Yêu Thích</h3>
            <div class="tab-menu group">
                <ul>
                          <li class="active"><a href="./mymusic/favorites-song">Bài hát</a></li>
                    <li ><a href="./mymusic/favorites-playlist">Playlist</a></li>                    
                    <li><a href="./mymusic/favorites-video">Video</a></li>
                </ul>
            </div><!-- END .tab-menu -->
            <div class="clearfix"></div>
<?php 
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
$fav_song 	= get_data("user","user_like_song","userid = '".$_SESSION["mlv_user_id"]."'");
?>
<form name="myform" method="post" action="./mymusic/favorites-song">

<div id="ask_ok" style="display:none;"></div>
<?php  if($fav_song == ',') {
	echo '<div style="padding-left: 10px;">Bạn chưa có bài hát yêu thích nào.</div>';	
}else { ?>
		<!-- <div class="tab-menu group">
       <input  class="zicon " type="checkbox" onClick="checkAllFields(1);" id="checkAll" name="checkAll" />
    <div class="func-display">

	  <li><button class="func-button" type="button" id="deleteBOX" value="Xóa" /><span class="icon-play-1"></span><span class="text-style-1">Xóa</span></button></li>
    </div>
</div>	-->
<div class="func-tool group">
                <a title="Nghe tất cả" class="func-button" href="?list=2">
                    <span class="icon-play-1"></span>
                    <span class="text-style-1">Nghe tất cả</span>
                </a>
            </div>
 <?php 
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
if($fav_song != ','){
$list =  substr($fav_song,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$sql_tt = "SELECT m_id  FROM table_data WHERE  m_id IN ($list) ORDER BY m_id DESC LIMIT ".LIMITSONG;
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr 		= $mlivedb->query(" m_id, m_title, m_singer, m_poster, m_cat, m_viewed ,m_time ","data"," m_id IN ($list) ORDER BY m_id DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,"./mymusic/favorites-song&p=#page#","");
?>
 <div class="tab-pane">
                <div class="row">
                    <div class="col-12">
                        <div class="list-item full-width">
 <ul id="Load_FAV_Song">
<?php 
for($i=0;$i<count($arr);$i++) {
$singer_name = GetSingerName($arr[$i][2]);
$get_singer = GetSinger($arr[$i][2]);
$nguoi_gui		= get_user($arr[$i][3]);
$user_url 		= url_link('user',$arr[$i][3],'user');
$song_url 		= url_link(un_htmlchars($arr[$i][1]).'-'.$singer_name,$arr[$i][0],'nghe-bai-hat');
$download 		= 'down.php?id='.$arr[$i][0].'&key='.md5($arr[$i][0].'tgt_music');
?>
		 <li id="song<?php  echo en_id($arr[$i][0]);?>" class="group fn-song" data-name="<?php  echo un_htmlchars($arr[$i][1]); ?>" data-from="fav" data-type="song" data-id="<?php  echo en_id($arr[$i][0]);?>" data-code="LGcGTZmsAlbBcWStkDcyFnkH" data-active="show-tool">
      <div class="info-dp pull-left">
       <h3 class="txt-primary">
       <a class="ellipsis  _trackLink" tracking="_frombox=mymusic_favoritesong_" href="<?php  echo $song_url; ?>" title="<?php  echo un_htmlchars($arr[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>">

	 <?php  echo un_htmlchars(rut_ngan($arr[$i][1].' - <span>'.$singer_name.'</span>',9)); ?></a>
          </h3>
         </div>
        <div class="bar-chart">
		<span class="fn-bar" title="<?php  echo $arr[$i][5];?>" style="width: <?php  echo $arr[$i][5]/50;?>%;"></span>
         </div>
        <div class="tool-song">                                        
         <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#song<?php  echo en_id($arr[$i][0]);?>" href="<?php  echo $download;?>"></a></div>
<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$arr[$i][0]?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$arr[$i][0]?>);"></a></div>
<!-- End playlist ADD -->
		<div class="i25 i-small remove"><a href="javascript:;" onClick="xSongFAV(<?php  echo $_SESSION["mlv_user_id"];?>,<?php  echo $arr[$i][0];?>);" title="Xóa" class="fn-rmitem" data-item="#song<?php  echo en_id($arr[$i][0]);?>"></a></div>
          </div>
        </li>
<?php 	} ?>
		</ul></div>
		</div>
		</div>
<?php  echo $phantrang; ?>
		</div>
<?php  } ?>
<?php  } ?>

</form>
</div>
<?php 
if (isset($_POST['deleteAll'])) {
	$all 	= $_POST['checkAll'];
	if($all)	{
		mysqli_query($link_music,"UPDATE table_user SET user_like_song = ',' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		mssBOX("Đã xóa xong !","./mymusic/favorites-song");
	}else {
	$arr 	= $_POST['delAnn'];
	$in_sql = implode(',',$arr);
	$p = explode(',',$in_sql);
	$song_id = explode(',',$fav_song);
	foreach($p as $y=>$ichphienpro) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$fav_upload = implode(',',$song_id);
			mysqli_query($link_music,"UPDATE table_user SET user_like_song = '".$fav_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			mssBOX("Đã xóa xong !","./mymusic/favorites-song");
		}
	
	}
	}
}
?>
<?php } ;?>

