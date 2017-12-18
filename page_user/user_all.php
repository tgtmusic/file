        
<?php   
$list =  substr($fav_song,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1);
$arr_song = $mlivedb->query("  m_id, m_title, m_singer, m_img,m_viewed ","data","m_id IN ($list) AND m_type = 1 ORDER BY m_id DESC LIMIT 8");

?>     <div class="section mt0">    
<div class="row">
    <div class="col-12">
        <h2 class="title-section">
            <a href="u/<?php  echo $user_name;?>/bai-hat">Bài hát <?php  echo $user_name;?> <i class="icon-arrow"></i></a>
        </h2>
        <div class="list-item full-width">
            <ul>
<?php  if($fav_song == ',') {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
<?php 
for($i=0;$i<count($arr_song);$i++) {
	$song_id = en_id($arr_song[$i][0]);
	$song_idd = $arr_song[$i][0];
	$luotxem = number_format($arr_song[$i][4]);
$singer_name = GetSingerName($arr_song[$i][2]);
$get_singer = GetSinger($arr_song[$i][2]);
	$type = check_type($arr_song[$i][5],$arr_song[$i][0]);
	$song_url = url_link(un_htmlchars($arr_song[$i][1]).'-'.$singer_name,$arr_song[$i][0],'nghe-bai-hat');
	$download = 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');
?>
<li id="song<?php  echo $song_id;?>" class="group fn-song" data-type="song" data-id="<?php  echo $song_id;?>" data-code="kmJHykmsQaNWCxkTkvxybHkH" data-active="show-tool">
                    <div class="info-dp pull-left">
						   <h3 class="txt-primary ellipsis">
                                            <a href="<?php  echo $song_url; ?>" title="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo $singer_name; ?>" class="_trackLink" tracking="_frombox=artist_all_song_">
                                                <?php  echo un_htmlchars($arr_song[$i][1]); ?> - <span><?=$singer_name?></span>
                                            </a>
                                        </h3>
                    </div>
                    <div class="bar-chart">
                        <span class="fn-bar" style="width:<?php  echo $luotxem/50;?>%;"></span>
                    </div>
                    <div class="tool-song">
            <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#song<?php  echo $song_id;?>" href="<?php  echo $download;?>"></a></div>
<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$song_idd?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$song_idd?>);"></a></div>
<!-- End playlist ADD -->
 
<?php 	} }?>
</ul>
        </div><!-- END .list-item -->
    </div><!-- END .col-6 -->
</div>

</div>

<?php   

$list =  substr($fav_album,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$arr_album = $mlivedb->query(" * ","album","album_id IN ($list) AND album_type = 0 ORDER BY album_id DESC LIMIT 8");

?>
	  <div class="section">
    <h2 class="title-section">
        <a href="u/<?php  echo $user_name;?>/playlist" title="Album/playlist yêu thích của <?php  echo $user_name;?>" 
           class="ellipsis">PLAYLIST YÊU THÍCH <i class="icon-arrow"></i>
        </a>
    </h2>
<?php  if($fav_album == ',') {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
<?php 
echo	"<div>";
for($i=0;$i<count($arr_album);$i++) {
$singer_name = GetSingerName($arr_album[$i][3]);
$get_singer = GetSinger($arr_album[$i][3]);
$album_url = url_link(un_htmlchars($arr_album[$i][1]).'-'.$singer_name,$arr_album[$i][0],'nghe-album');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
?><?php  echo $class1[$i]; ?><div class="album-item des-inside otr col-3">
            <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]).' - '.$singer_name; ?>" class="thumb track-log" order="0">
                <img src="<?=check_img($arr_album[$i][4]); ?>" alt="Album <?php  echo un_htmlchars($arr_album[$i][1]).' - '.$singer_name; ?>" class="img-responsive" />
                <span class="icon-circle-play"></span>
                <div class="des">
                    <h3 class="title-item txt-primary ellipsis"><?php  echo un_htmlchars($arr_album[$i][1]);?></h3>
                    <h4 class="title-sd-item txt-info ellipsis"><?=$singer_name; ?></h4>
                </div><!-- /.des -->
                <span class="item-mask"></span>
            </a>
        </div>
<?php  } echo	"</div>"; }?>

       </div>  

	  <div class="section">
    <h2 class="title-section">
        <a href="u/<?php  echo $user_name;?>/user-playlist" title="Album/playlist của <?php  echo $user_name;?>" 
           class="ellipsis">PLAYLIST Cá Nhân <i class="icon-arrow"></i>
        </a>
    </h2>
<?php
$arr_album = $mlivedb->query(" * ","album","album_poster = '".$user_id."' AND album_type = 1 ORDER BY album_id DESC LIMIT 8");
  if(!$arr_album) {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
<?php 
echo	"<div>";
for($i=0;$i<count($arr_album);$i++) {
$singer_name = GetSingerName($arr_album[$i][3]);
$get_singer = GetSinger($arr_album[$i][3]);
$album_url = url_link(un_htmlchars($arr_album[$i][1]).'-'.$singer_name,$arr_album[$i][0],'nghe-album');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
?><?php  echo $class1[$i]; ?><div class="album-item des-inside otr col-3">
            <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]).' - '.$singer_name; ?>" class="thumb track-log" order="0">
                <img src="<?=check_img($arr_album[$i][4]); ?>" alt="Album <?php  echo un_htmlchars($arr_album[$i][1]).' - '.$singer_name; ?>" class="img-responsive" />
                <span class="icon-circle-play"></span>
                <div class="des">
                    <h3 class="title-item txt-primary ellipsis"><?php  echo un_htmlchars($arr_album[$i][1]);?></h3>
                    <h4 class="title-sd-item txt-info ellipsis"><?=$singer_name; ?></h4>
                </div><!-- /.des -->
                <span class="item-mask"></span>
            </a>
        </div>
<?php  } echo	"</div>"; } ?>

       </div>  
       
<?php   

$list =  substr($fav_video,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗ
$arr_video = $mlivedb->query("  m_id, m_title, m_singer, m_img ","data","m_id IN ($list) AND m_type = 2 ORDER BY m_id DESC LIMIT 8");

?><div class="section ">
    <h2 class="title-section">
        <a href="u/<?php  echo $user_name;?>/video" title="MV Yêu Thích của <?php  echo $user_name;?>" class="ellipsis">Video Yêu Thích <?php  echo $user_name;?> 
            <i class="icon-arrow"></i>
        </a>
    </h2>
<?php  if($fav_video == ',') {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
<?php 
echo	"<div>";
 for($i=0;$i<count($arr_video);$i++) {
$singer_name = GetSingerName($arr_video[$i][2]);
$get_singer = GetSinger($arr_video[$i][2]);
$song_url = url_link(un_htmlchars($arr_video[$i][1]).'-'.$singer_name,$arr_video[$i][0],'xem-video');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
?><?php  echo $class1[$i]; ?>
<div class="album-item col-3">
            <a href="<?php  echo $song_url; ?>" title="Video <?php  echo un_htmlchars($arr_video[$i][1]).' - '.$singer_name; ?>" class="thumb track-log" order="0">
                <img src="<?=check_img($arr_video[$i][3]); ?>" alt="Video <?php  echo un_htmlchars($arr_video[$i][1]).' - '.$singer_name; ?>" class="img-responsive" />
                <span class="icon-circle-play otr"></span>
            </a>                    
            <h3 class="title-item ellipsis">
                <a href="<?php  echo $song_url; ?>" title="Video <?php  echo un_htmlchars($arr_video[$i][1]).' - '.$singer_name; ?>" class="txt-primary track-log" order="0">
                    <?php  echo un_htmlchars($arr_video[$i][1]); ?>
                </a>
            </h3>
            <h4 class="title-sd-item ellipsis txt-info"><?=$get_singer; ?></h4>					
        </div><!-- END .video-item -->	
<?php  } echo	"</div>"; }?>

        </div>
		   </div> 
