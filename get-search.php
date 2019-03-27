<?php
define('MLive-Channel',true);
include("./includes/configurations.php");
$q = $_POST["q"];
if (!$q) return;
$key = $q;
$key_text	= str_replace (' ', '+', $key );
$key 		= replace($key);
$key		= str_replace ('-', ' ', $key );
$key		= htmlchars($key);
	// lấy thông tin ca sĩ
	$arr_singer = $mlivedb->query(" * ","singer"," singer_name_ascii LIKE '%".$key."%'");
	for($s=0;$s<count($arr_singer);$s++) {
		$list_singer .= $arr_singer[$s][0].',';
		$singer_list = substr($list_singer,0,-1);
	}
	if(count($arr_singer)>0) {
	 $singer_seach = " OR m_singer LIKE '%,".$singer_list.",%' ";
	 $singer_seach_album = "OR album_singer LIKE '%,".$singer_list.",%'";
	}
?>

<div id="sugResult" class="fn-result suggestion-2 mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar" style="overflow: visible; height: auto;"><div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_outside" tabindex="0"><div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position: relative; left: 0px; top: 0px;" dir="ltr"> 
<ul> 
<li id="sugTopKeyword" class="none"> <ul class="fn-list" style="cursor: pointer;"> <li id="tplTopKeyword" class="none fn-item"> <div class="meta-search"> <a class="ellipsis pad-top-5"> <span class="fn-name"></span> </a> </div> </li> </ul> </li> 
<?php 
$arr_song = $mlivedb->query(" * ","data"," m_type = 1 AND m_title_ascii LIKE '%".$key."%' $singer_seach ORDER BY m_hot DESC,m_viewed DESC LIMIT 1");
if ($arr_song) {
?>
<li id="sugTop" class=""> <div class="title-row"><span class="ics zicon ics-song"></span>Top Kết Quả</div> <ul class="fn-list">
 <?php 
 for($i=0;$i<count($arr_song);$i++) {
	$songname = un_htmlchars(urldecode($arr_song[$i][1]));
		$singer_name 	=	GetSingerName($arr_song[$i][3]);
			$song_url 	= url_link($arr_song[$i][1]."-".$singer_name,$arr_song[$i][0],'nghe-bai-hat');
?>
 <li id="tplSugSong" class="fn-item"> <a class="fn-link track-log" href="<?php  echo $song_url; ?>" title="<?=$songname?> - <?=$singer_name?>"> <div class="meta-search"> <p class="ellipsis pad-top-5"> <span class="fn-name"><strong class="mark"></strong><?=$songname?></span> <br> <span class="fn-artist txt-info"><?=$singer_name?></span> </p> </div> </a> </li>
 <?php }?>
</ul> </li>
<?php } ?>
</ul> </li>

<?php 
$arr_singer = $mlivedb->query(" * ","singer"," singer_name_ascii LIKE '%".$key."%' ORDER BY singer_hot DESC,singer_like DESC LIMIT 3");
if($arr_singer) {
	
?>
<li id="sugArtist" class=""> <div class="title-row"><span class="ics zicon ics-artist"></span>Nghệ Sĩ</div> <ul class="fn-list">
<?php
for($i=0;$i<count($arr_singer);$i++) {
$singer_name = un_htmlchars($arr_singer[$i][1]);
$singer_url = 'nghe-si/'.replace($singer_name);
$singer_img	= check_img($arr_singer[$i][3]);

?>
<li id="tplSugArtist" class="fn-item"> <a class="fn-link track-log" href="<?=$singer_url?>" title="<?=$singer_name?>" data-id="IWZ9Z0CW"> <div class="meta-search ellipsis"> <img class="fn-thumb" src="<?=$singer_img?>" alt="<?=$singer_name?>"> <span class="fn-name"><strong class="mark"></strong><?=$singer_name?></span> </div> </a> </li>
<?php } ?>
</ul> </li>
<?php } ?>
<?php 
 $sql_where = " m_title_ascii LIKE '%".$key."%' AND m_type = 1 ".$singer_seach;
$arr_song = $mlivedb->query(" * ","data",$sql_where." AND m_type = 1 ORDER BY m_hot DESC,m_viewed DESC LIMIT 3");
if ($arr_song) {
?>
 <li id="sugSong" class=""> <div class="title-row"><span class="ics zicon ics-song"></span>Bài Hát</div> <ul class="fn-list">
 <?php 
 for($i=0;$i<count($arr_song);$i++) {
	$songname = un_htmlchars(urldecode($arr_song[$i][1]));
		$singer_name 	=	GetSingerName($arr_song[$i][3]);
			$song_url 	= url_link($arr_song[$i][1]."-".$singer_name,$arr_song[$i][0],'nghe-bai-hat');
?>
 <li id="tplSugSong" class="fn-item"> <a class="fn-link track-log" href="<?php  echo $song_url; ?>" title="<?=$songname?> - <?=$singer_name?>"> <div class="meta-search"> <p class="ellipsis pad-top-5"> <span class="fn-name"><strong class="mark"></strong><?=$songname?></span> <br> <span class="fn-artist txt-info"><?=$singer_name?></span> </p> </div> </a> </li>
 <?php }?>
</ul> </li> 
 <?php }?>
<?php
$sql_where_a = "album_name_ascii LIKE '%".$key."%' AND album_type = 0 ".$singer_seach_album;
$arr_album = $mlivedb->query(" * ","album",$sql_where_a." AND album_type = 0 ORDER BY album_hot DESC,album_viewed DESC LIMIT 3");
if ($arr_album) {
?> 
<li id="sugAlbum" class=""> <div class="title-row"><span class="ics zicon ics-album"></span>Album</div> <ul class="fn-list">
<?php
for($i=0;$i<count($arr_album);$i++) {
	$album_name = un_htmlchars(urldecode($arr_album[$i][1]));
	$singer_name 	=	GetSingerName($arr_album[$i][3]);
	$album_img 	=	check_img($arr_album[$i][4]);
	$album_url 	= url_link($arr_album[$i][1]."-".$singer_name,$arr_album[$i][0],'nghe-album');
?>
<li id="tplSugAlbum" class="fn-item"> <a class="fn-link track-log" href="<?=$album_url?>" title="<?=$album_name?> - <?=$singer_name?>"> <div class="meta-search"> <img class="fn-thumb" src="<?=$album_img?>" alt="<?=$album_name?>"> <p class="ellipsis pad-top-5"> <span class="fn-name"><strong class="mark"></strong><?=$album_name?></span> <br> <span class="fn-artist txt-info"><?=$singer_name?></span> </p> </div> </a> </li>
 <?php };?>
</ul> </li>
 <?php };?>
 <?php 
 $sql_where2 = " m_title_ascii LIKE '%".$key."%' AND m_type = 2 ".$singer_seach;
$arr_video = $mlivedb->query(" * ","data",$sql_where2." AND m_type = 2 ORDER BY m_hot DESC,m_viewed DESC LIMIT 3");
if ($arr_video) {
?>
<li id="sugVideo" class=""> <div class="title-row"><span class="ics zicon ics-video"></span>Video</div> <ul class="fn-list">
 <?php 
 for($i=0;$i<count($arr_video);$i++) {
	$songname = un_htmlchars(urldecode($arr_video[$i][1]));
	$singer_name 	=	GetSingerName($arr_video[$i][3]);
	$video_img 	=	check_img($arr_video[$i][19]);
	$song_url 	= url_link($arr_video[$i][1]."-".$singer_name,$arr_video[$i][0],'xem-video');
?>
<li id="tplSugVideo" class="fn-item"> <a class="fn-link track-log" href="<?=$song_url?>" title="<?=$songname?> - <?=$singer_name?>"> <div class="meta-search"> <img class="fn-thumb" src="<?=$video_img?>" alt="<?=$songname?>"> <p class="ellipsis pad-top-5"> <span class="fn-name"><strong class="mark"></strong> <?=$songname?></span> <br> <span class="fn-artist txt-info"><?=$singer_name?></span> </p> </div> </a> </li>
 <?php };?> 
</ul> </li>
 <?php };?>
</ul> 
</div></div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical mCSB_scrollTools_onDrag_expand" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; height: 0px; top: 0px;" oncontextmenu="return false;"><div class="mCSB_dragger_bar" style="line-height: 30px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>