			<div class="section" >
			<div class="row">
<div id="viet-hot-song" class="col-6 col-border-left"> <h2 class="title-section"><a title="Nhạc Việt Hot" href="/chu-de/Nhac-Hot/EZEFZOE.html">Nhạc Việt Hot <i class="icon-arrow"></i></a></h2> <div class="list-item tool-song-hover style2"> <ul> 
<?php 
	$arr = $mlivedb->query("m_id, m_title, m_img, m_singer, m_cat, m_hot, m_hq, m_viewed","data"," m_type = 1 AND m_hot = 1 AND m_cat LIKE '%,".IDCATVN.",%' ORDER BY m_viewed DESC LIMIT 10");
	for($i=0;$i<count($arr);$i++) {
	$singer_name	=	GetSingerName($arr[$i][3]);
	$get_singer = GetSinger($arr[$i][3]);
	$singer_img = GetSingerIMG($arr[$i][3]);
	$song_title		= un_htmlchars($arr[$i][1]);
	$video_img		= check_img($arr[$i][2]);
	$song_url 		= url_link($song_title.'-'.$singer_name,$arr[$i][0],'nghe-bai-hat');
	$video_url 		= url_link($song_title.'-'.$singer_name,$arr[$i][0],'xem-video');
	$checkhq		= check_song($arr[$i][5],$arr[$i][6]);
	$download 		= 'down.php?id='.$arr[$i][0].'&key='.md5($arr[$i][0].'tgt_music');
	$stt			= $i+1;
	?>
 <li id="songhot<?=en_id($arr[$i][0])?>" class="fn-song" data-type="song" data-id="<?=en_id($arr[$i][0])?>" data-code="ZmxGyLGaWJZHRzlTkvxyFHkm" data-active="show-tool"> <a class="thumb pull-left _trackLink track-log" tracking="_frombox=home_newsong_" href="<?=$song_url?>" title="Bài hát <?=$song_title?> - <?=$singer_name?>"> <img width="50" alt="<?=$song_title?>" src="<?=$singer_img?>"> <span class="icon-circle-play icon-small"></span> </a> <h3 class="txt-primary"> <a class="ellipsis list-item-width _trackLink track-log" tracking="_frombox=home_newsong_" href="<?=$song_url?>" title="Bài hát <?=$song_title?> - <?=$singer_name?>"><?=rut_ngan($song_title,5)?></a> </h3> <span class="inblock ellipsis">  <h4><?=$get_singer?></h4>  </span> <div class="tool-song"> <div class="i25 i-small download"><a title="Download" class="fn-dlsong" data-item="#songhot<?=en_id($arr[$i][0])?>" href="<?=$download?>"></a></div> 

<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$arr[$i][0]?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$arr[$i][0]?>);"></a></div>
<!-- End playlist ADD -->
 <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#songhot<?=en_id($arr[$i][0])?>" href="<?=$song_url?>"></a></div> </div> </li> 
	<?php } ;?>
 </ul> </div></div>			

<div id="viet-new-song" class="col-6 col-border-left"> <h2 class="title-section"><a title="Nhạc Việt Mới" href="/chu-de/Nhac-Viet-Moi/EZEFZU8.html">Nhạc Việt Mới <i class="icon-arrow"></i></a></h2> 
<div class="list-item tool-song-hover style2"> <ul> 
<?php 
	$arr = $mlivedb->query("m_id, m_title, m_img, m_singer, m_cat, m_hot, m_hq, m_viewed","data"," m_type = 1 AND m_new = 1 AND m_cat LIKE '%,".IDCATVN.",%' ORDER BY m_id DESC LIMIT 10");
	for($i=0;$i<count($arr);$i++) {
	$singer_name	=	GetSingerName($arr[$i][3]);
	$get_singer = GetSinger($arr[$i][3]);
	$singer_img = GetSingerIMG($arr[$i][3]);
	$song_title		= un_htmlchars($arr[$i][1]);
	$video_img		= check_img($arr[$i][2]);
	$song_url 		= url_link($song_title.'-'.$singer_name,$arr[$i][0],'nghe-bai-hat');
	$video_url 		= url_link($song_title.'-'.$singer_name,$arr[$i][0],'xem-video');
	$checkhq		= check_song($arr[$i][5],$arr[$i][6]);
	$download 		= 'down.php?id='.$arr[$i][0].'&key='.md5($arr[$i][0].'tgt_music');
	$stt			= $i+1;
	?>

 <li id="songhot<?=en_id($arr[$i][0])?>" class="fn-song" data-type="song" data-id="<?=en_id($arr[$i][0])?>" data-code="ZmxGyLGaWJZHRzlTkvxyFHkm" data-active="show-tool"> <a class="thumb pull-left _trackLink track-log" tracking="_frombox=home_newsong_" href="<?=$song_url?>" title="Bài hát <?=$song_title?> - <?=$singer_name?>"> <img width="50" alt="<?=$song_title?>" src="<?=$singer_img?>"> <span class="icon-circle-play icon-small"></span> </a> <h3 class="txt-primary"> <a class="ellipsis list-item-width _trackLink track-log" tracking="_frombox=home_newsong_" href="<?=$song_url?>" title="Bài hát <?=$song_title?> - <?=$singer_name?>"><?=rut_ngan($song_title,5)?></a> </h3> <span class="inblock ellipsis">  <h4><?=$get_singer?></h4>  </span> <div class="tool-song"> <div class="i25 i-small download"><a title="Download" class="fn-dlsong" data-item="#songhot<?=en_id($arr[$i][0])?>" href="<?=$download?>"></a></div> 
 							<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$arr[$i][0];?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$arr[$i][0]; ?>);"></a></div>
                <!-- End playlist ADD -->
 <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#songhot<?=en_id($arr[$i][0])?>" href="<?=$song_url?>"></a></div> </div> </li> 
	<?php } ;?>
 </ul> </div></div>
			</div>
            </div>