<?php
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
function album_new($singer_type,$album_type) {
	global $mlivedb;
if($singer_type == 1) { $where 		= "album_cat LIKE '%,".IDCATVN.",%' AND album_type = '".$album_type."' ORDER BY album_hot DESC,album_id DESC"; $link_pages	=	'album/Viet-Nam.html';}
elseif($singer_type == 2) { $where 		= "album_cat LIKE '%,".IDCATAM.",%' AND album_type = '".$album_type."' ORDER BY album_hot DESC,album_id DESC"; $link_pages	=	'album/Au-My.html';}
elseif($singer_type == 3) { $where 		= "album_cat LIKE '%,".IDCATCA.",%' AND album_type = '".$album_type."' ORDER BY album_hot DESC,album_id DESC"; $link_pages	=	'album/Chau-A.html';}
elseif (!$singer_type) { $where 		= " album_type = '".$album_type."' ORDER BY album_hot DESC,album_id DESC"; $link_pages	=	'the-loai-album.html';}
$arr = $mlivedb->query(" album_id,album_name,album_singer,album_img ","album",$where." LIMIT 12");
echo	"<div>";
for($z=0;$z<count($arr);$z++) {
	$singer_name	=	GetSingerName($arr[$z][2]);
	$get_singer = GetSinger($arr[$z][2]);
	$album_name		= un_htmlchars($arr[$z][1]);
	$album_img		= check_img($arr[$z][3]);
	$album_url 		= url_link($arr[$z][1].'-'.$singer_name,$arr[$z][0],'nghe-album');
	if($z == 3 || $z == 7 || $z == 11)	{
		$hang[$z]	=	"</div>";
	}
		elseif($z == 0 || $z == 4 || $z == 8)	{
		$class[$z]	=	"</div><div class=\"row\">";

	}
	echo	" $class[$z]<div class=\"album-item des-inside otr col-3\"> 
			<a href=\"$album_url\" title=\"$album_name - $singer_name\" class=\"thumb _trackLink track-log\" tracking=\"_frombox=home_hotalbum_\"> 
			<img width=\"200\" src=\"$album_img\" alt=\"$album_name - $singer_name\" class=\"img-responsive\" /> 
			<span class=\"icon-circle-play class otr\"></span> </a> 
			<div class=\"des\"> <h3 class=\"title-item txt-primary ellipsis\">
			<a href=\"$album_url\" title=\"$album_name - $singer_name\" class=\"_trackLink track-log\" tracking=\"_frombox=home_hotalbum_\">$album_name</a> </h3> 
			<div class=\"inblock ellipsis\">  <h4 class=\"title-sd-item txt-info fn-artist\">$get_singer</h4>  
			</div> </div> <span class=\"item-mask\"></span> </div> ";
}
echo	"</div>";
} 

function video_new($singer_type) {
	global $mlivedb;
if($singer_type == 1) { $where 		= "m_cat LIKE '%,".IDCATVN.",%' AND m_type = 2 ORDER BY m_hot DESC,m_id DESC"; $link_pages	=	'video/Viet-Nam.html';}
elseif($singer_type == 2) { $where 		= "m_cat LIKE '%,".IDCATAM.",%' AND m_type = 2 ORDER BY m_hot DESC,m_id DESC"; $link_pages	=	'video/Au-My.html';}
elseif($singer_type == 3) { $where 		= "m_cat LIKE '%,".IDCATCA.",%' AND m_type = 2 ORDER BY m_hot DESC,m_id DESC"; $link_pages	=	'video/Chau-A.html';}
elseif (!$singer_type) { $where 		= " m_type = 2 ORDER BY m_hot DESC,m_id DESC"; $link_pages	=	'the-loai-video.html';}
$arr = $mlivedb->query(" m_id,m_title,m_singer,m_img ","data",$where." LIMIT 12");
echo	"<div>";
for($z=0;$z<count($arr);$z++) {
		$singer_name	=	GetSingerName($arr[$z][2]);
	$get_singer = GetSinger($arr[$z][2]);
	$video_name		= un_htmlchars($arr[$z][1]);
	$video_img		= check_img($arr[$z][3]);
	$video_url 		= url_link($arr[$z][1].'-'.$singer_name,$arr[$z][0],'xem-video');
		if($z == 3 || $z == 7 || $z == 11)	{
		$hang[$z]	=	"</div>";
	}
		elseif($z == 0 || $z == 4 || $z == 8)	{
		$class[$z]	=	"</div><div class=\"row\">";
	}
	echo	"$class[$z]<div class=\"album-item col-3\"> 
			 <a href=\"$video_url\" title=\"Video $video_name - $singer_name\" class=\"thumb _trackLink track-log\" tracking=\"_frombox=home_hotvideo_\"> 
			 <img height=\"100\" width=\"200\" src=\"$video_img\" alt=\"$video_name - $singer_name\" class=\"img-responsive-v\" /> 
			 <span class=\"icon-circle-play otr\"></span> </a> 
			 <h3 class=\"title-item ellipsis\"> 
			 <a href=\"$video_url\" title=\"Video $video_name - $singer_name\" class=\"txt-primary _trackLink track-log\" tracking=\"_frombox=home_hotvideo_\"> $video_name </a> </h3> 
			 <div class=\"inblock ellipsis\">  
			 <h4 class=\"title-sd-item txt-info fn-artist\">$get_singer</h4>  </div> </div>";
} echo	"</div>";
} 

function news_home($type) { global $mlivedb;
$arr = $mlivedb->query("news_id, news_title, news_cat, news_img, news_info, news_viewed","news"," news_hot = '0' OR news_hot = '1' ORDER BY news_id DESC LIMIT 6");
for($z=0;$z<count($arr);$z++) {
$news_name = un_htmlchars($arr[$z][1]);
$news_name_ngan = un_htmlchars($arr[$z][1]);
$news_img = check_img($arr[$z][3]);
$news_url = check_url_news($arr[$z][1],$arr[$z][0]);
$news_info = rut_ngan($arr[$z][4],50);

	echo "<div class=\"col-4\"><div class=\"item-news\"> <a title=\"$news_name\" href=\"$news_url\" class=\"thumb pull-left\" target=\"_blank\" rel=\"nofollow\"> <img width=\"210\" src=\"$news_img\" alt=\"album-name\" /> </a> 
  <h3 class=\"title-item\"> <a title=\"$news_name\" href=\"$news_url\" class=\"txt-primary\" target=\"_blank\" rel=\"nofollow\"> $news_name_ngan </a> </h3> </div></div>";


 }
}

function top_song($type, $number = 10) {
	global $mlivedb;
// tao cache
$type_mlivechannel	=	$type;
$file = PATH."mlivechannel_".$type.".xxx"; // lấy tên file cache theo type để tránh trùng lập
$expire = 86400; // 24h
if (file_exists($file) &&
    filemtime($file) > (time() - $expire)) {
    include(PATH."mlivechannel_".$type_mlivechannel.".xxx");
} else {  
	if($type == 'bxh_vn') {
	$where 		= " m_cat LIKE '%,".IDCATVN.",%' AND m_type = 1 ORDER BY m_viewed_week DESC";
	$num		= 1;
	$link_pages	= "bang-xep-hang/bai-hat-Viet-Nam/EZEFZOA.html";
	}
	elseif($type == 'bxh_am') {
	$where 		= "m_cat LIKE '%,".IDCATAM.",%' AND m_type = 1 ORDER BY m_viewed_week DESC";
	$num		= 2;
	$link_pages	= "bang-xep-hang/bai-hat-Au-My/EZEFZOB.html";
	}
	elseif($type == 'bxh_ca') {
	$where 		= "m_cat LIKE '%,".IDCATCA.",%' AND m_type = 1 ORDER BY m_viewed_week DESC";
	$num		= 3;
	$link_pages	= "bang-xep-hang/bai-hat-Chau-A/EZEFZOC.html";
	}
	if($type == 'bxhv_vn') {
	$where 		= "m_cat LIKE '%,".IDCATVN.",%' AND m_type = 2 ORDER BY m_viewed_week DESC";
	$num		= 4;
	$link_pages	= "bang-xep-hang/video-Viet-Nam/EZEFZOA.html";
	}
	elseif($type == 'bxhv_am') {
	$where 		= "m_cat LIKE '%,".IDCATAM.",%' AND m_type = 2 ORDER BY m_viewed_week DESC";
	$num		= 5;
	$link_pages	= "bang-xep-hang/video-Au-My/EZEFZOB.html";
	}
	elseif($type == 'bxhv_ca') {
	$where 		= "m_cat LIKE '%,".IDCATCA.",%' AND m_type = 2 ORDER BY m_viewed_week DESC";
	$num		= 6;
	$link_pages	= "bang-xep-hang/video-Chau-A/EZEFZOC.html";
	}
	// OLD
	elseif($type == 'new_vn') {
	$where 		= "m_type = 1 AND m_cat LIKE '%,".IDCATVN.",%' ORDER BY m_id DESC";
	$num		= 7;
	$link_pages	= "bai-hat/Viet-Nam.html";
	}
	elseif($type == 'new_am') {
	$where 		= "m_type = 1 AND m_cat LIKE '%,".IDCATAM.",%' ORDER BY m_id DESC";
	$num		= 8;
	$link_pages	= "bai-hat/Au-My.html";
	}
	elseif($type == 'new_ca') {
	$where 		= "m_type = 1 AND m_cat LIKE '%,".IDCATCA.",%' ORDER BY m_id DESC";
	$num		= 9;
	$link_pages	= "bai-hat/Chau-A.html";
	}
	
	// XH ALBUM	
	if($type == 'bxhal_vn') {
	$where 		= "album_cat LIKE '%,".IDCATVN.",%' AND album_type = 0 ORDER BY album_viewed_week DESC";
	$num		= 10;
	$link_pages	= "bang-xep-hang/album-Viet-Nam/EZEFZOA.html";
	}
	elseif($type == 'bxhal_am') {
	$where 		= "album_cat LIKE '%,".IDCATAM.",%' AND album_type = 0 ORDER BY album_viewed_week DESC";
	$num		= 11;
	$link_pages	= "bang-xep-hang/album-Au-My/EZEFZOB.html";
	}
	elseif($type == 'bxhal_ca') {
	$where 		= "album_cat LIKE '%,".IDCATCA.",%' AND album_type = 0 ORDER BY album_viewed_week DESC";
	$num		= 12;
	$link_pages	= "bang-xep-hang/album-Chau-A/EZEFZOC.html";
	}

// ALBUM	
	$arr_album = $mlivedb->query(" album_id, album_name, album_singer, album_img, album_cat, album_viewed_week ","album",$where." LIMIT ".$number);
				for($i=0;$i<count($arr_album);$i++) {
				$id_album  =  $arr_album[$i][0];
				$album_name = un_htmlchars($arr_album[$i][1]);
				$singer_name	=	GetSingerName($arr_album[$i][2]);
				$get_singer = GetSinger($arr_album[$i][2]);
				$album_url = url_link($album_name.'-'.$singer_name,$id_album,'nghe-album');
				$album_img = check_img($arr_album[$i][3]);
				$viewed = number_format($arr_album[$i][5]);
				$stt	=	$i+1;
 // 1				
	if($num == 10 || $num == 11 || $num == 12) {
		if($stt	< 3)	$classb[$i]	=	"fjx";	
		if($i == 0 )	{
		$class1[$i]	=	"<li class=\"fn-first first-item\"> 
<a class=\"zthumb fn-link _trackLink track-log\" tracking=\"_frombox=home_chartalbum_vietnam_$stt\" href=\"$album_url\" title=\"$album_name - $singer_name\"> 
 <img class=\"fn-thumb\" src=\"$album_img\" title=\"$album_name - $singer_name\" /> </a> 
 <div class=\"des\"> <span class=\"rank rank-$stt fn-order\">$stt</span> <h3 class=\"song-name ellipsis\">
 <a class=\"txt-primary fn-link fn-name _trackLink track-log\" tracking=\"_frombox=home_chartalbum_vietnam_$stt\" href=\"$album_url\" title=\"$album_name - $singer_name\">$album_name</a></h3> 
 <div class=\"inblock singer-name ellipsis fn-artist_list\">  
 <h4 class=\"txt-info fn-artist\">$get_singer</h4>  </div> 
<i class=\"txt-info pull-right view-stas fn-score fn-number\">$viewed</i></div> 
<span class=\"item-mask\"></span> </li>";

	}
	elseif($i == 1 || $i == 2 || $i == 3 || $i == 4)	{
		$class2[$i]	=	"<li class=\"fn-item\"> 
<a class=\"thumb pull-left fn-link _trackLink track-log\" tracking=\"_frombox=home_chartalbum_vietnam_$stt\" href=\"$album_url\" title=\"$album_name - $singer_name\"> 
<img width=\"110\" height=\"110\" class=\"fn-thumb\" src=\"$album_img\" title=\"$album_name - $singer_name\"/> 
<span class=\"rank rank-$stt fn-order\">$stt</span> <span class=\"item-mask\"></span>
 <span class=\"icon-circle-play otr icon-small\"></span> </a>
 <h3 class=\"song-name ellipsis\">
 <a class=\"txt-primary fn-link fn-name _trackLink track-log\" tracking=\"_frombox=home_chartalbum_vietnam_$stt\" href=\"$album_url\" title=\"$album_name - $singer_name\">$album_name</a></h3>
 <div class=\"inblock singer-name ellipsis fn-artist_list\">  
 <h4 class=\"txt-info fn-artist\">$get_singer</h4>  </div> 
 <i class=\"txt-info z-point fn-score fn-number\">$viewed</i> </li>";
	}
		$HTML_BOX	.= "".$class1[$i]." ".$class2[$i]."";
	}
}

	$arr = $mlivedb->query("m_id, m_title, m_img, m_singer, m_cat, m_hot, m_hq, m_viewed_week","data",$where." LIMIT ".$number);

for($i=0;$i<count($arr);$i++) {
	$singer_name	=	GetSingerName($arr[$i][3]);
	$get_singer = GetSinger($arr[$i][3]);
	$singer_img = GetSingerIMG($arr[$i][3]);
	$song_title		= un_htmlchars($arr[$i][1]);
	$video_img		= check_img($arr[$i][2]);
	$song_url 		= url_link($arr[$i][1].'-'.$singer_name,$arr[$i][0],'nghe-bai-hat');
	$video_url 		= url_link($arr[$i][1].'-'.$singer_name,$arr[$i][0],'xem-video');
	$checkhq		= check_song($arr[$i][5],$arr[$i][6]);
	$download 		= 'down.php?id='.$arr[$i][0].'&key='.md5($arr[$i][0].'tgt_music');
	$stt			= $i+1;
	// 1 Song BXH
	if($num == 1 || $num == 2 || $num == 3) { 
		if($stt	< 2)	$classb[$i]	=	"fjx";
			if($i == 0 )	{
		$class1[$i]	=	" <li class=\"fn-first first-item fn-song\" data-type=\"song\" data-id=\"".en_id($arr[$i][0])."\" data-code=\"kHcGyknaQaaLQFxyLFxyvmkm\" data-active=\"show-tool\" id=\"chartitemsong".en_id($arr[$i][0])."\"> 
 <a class=\"zthumb fn-link _trackLink track-log\" tracking=\"_frombox=home_chartsong_vietnam_1\" href=\"$song_url\" title=\"$song_title - $singer_name\"> 
 <img class=\"fn-thumb\" src=\"".check_img($singer_img)."\"/> </a>
 <div class=\"des\"> <span class=\"rank rank-$stt fn-order\">$stt</span> 
 <h3 class=\"song-name ellipsis\">
 <a class=\"txt-primary fn-link fn-name _trackLink track-log\" tracking=\"_frombox=home_chartsong_vietnam_1\" href=\"$song_url\" title=\"$song_title - $singer_name\">$song_title</a></h3>
 <div class=\"inblock singer-name ellipsis fn-artist_list\"> 
 <h4 class=\"txt-info fn-artist\">$get_singer</h4> 
 </div> 
 <i class=\"txt-info pull-right view-stas fn-score fn-number\">".$arr[$i][7]."</i>
 <div class=\"tool-song\"> 
 <div class=\"i25 i-small download\">
 <a title=\"Download\" class=\"fn-dlsong\" data-item=\"#chartitemsong".en_id($arr[$i][0])."\" href=\"".$download."\"></a></div> 

<!-- Playlist ADD -->
<div class=\"i25 i-small addlist\" id=\"playlist_".$arr[$i][0]."\"><a href=\"javascript:;\"  title=\"Thêm vào\" class=\"fn-addto\" onclick=\"_load_box(".$arr[$i][0].");\"></a></div>
<!-- End playlist ADD -->

 </div> 
 </div> 
 <span class=\"item-mask\"></span> </li>   ";

	}
	elseif($i == 1 || $i == 2 || $i == 3 || $i == 4 || $i == 5 || $i == 6 || $i == 7 || $i == 8 || $i == 9)	{
		$class2[$i]	=	"<li class=\"fn-item fn-song\" data-type=\"song\" data-id=\"".en_id($arr[$i][0])."\" data-code=\"ZnxGTZGNpsiLaChTkbcTFHkm\" data-active=\"show-tool\" id=\"chartitemsong".en_id($arr[$i][0])."\"> 
 <span class=\"rank rank-$stt fn-order\">$stt</span> 
 <h3 class=\"song-name ellipsis\">
 <a class=\"txt-primary fn-link fn-name _trackLink track-log\" tracking=\"_frombox=home_chartsong_vietnam_$stt\" href=\"$song_url\" title=\"$song_title - $singer_name\">$song_title</a></h3> 
 <div class=\"inblock singer-name ellipsis fn-artist_list\">  
 <h4 class=\"txt-info fn-artist\">$get_singer</h4>  </div> 

 <i class=\"txt-info pull-right view-stas fn-score fn-number\">".$arr[$i][7]."</i> 
 <div class=\"tool-song\"> 
 <div class=\"i25 i-small download\">
 <a title=\"Download\" class=\"fn-dlsong\" data-item=\"#chartitemsong".en_id($arr[$i][0])."\" href=\"".$download."\"></a></div> 

<!-- Playlist ADD -->
<div class=\"i25 i-small addlist\" id=\"playlist_".$arr[$i][0]."\"><a href=\"javascript:;\"  title=\"Thêm vào\" class=\"fn-addto\" onclick=\"_load_box(".$arr[$i][0].");\"></a></div>
<!-- End playlist ADD -->
 </div> </li> ";
	}
		$HTML_BOX	.= "".$class1[$i]." ".$class2[$i]."";
	}
	// 2 bxh video home
	elseif($num == 4 || $num == 5 || $num == 6) { 
		if($stt	< 2)	$classb[$i]	=	"fjx";
	if($i == 0 )	{
		$class1[$i]	=	"<li class=\"fn-first first-item\">
 <a class=\"zthumb fn-link _trackLink track-log\" tracking=\"_frombox=home_chartvideo_vietnam_$stt\" href=\"$video_url\" title=\"$song_title - $singer_name\"> 
 <img class=\"fn-thumb\" src=\"$video_img\" alt=\"$song_title\"/> </a> 
 <div class=\"des\"> <span class=\"rank rank-$stt fn-order\">$stt</span> 
 <h3 class=\"song-name ellipsis\">
 <a class=\"txt-primary fn-link fn-name _trackLink track-log\" tracking=\"_frombox=home_chartvideo_vietnam_$stt\" href=\"$video_url\" title=\"$song_title - $singer_name\">$song_title</a></h3>
 <div class=\"inblock singer-name ellipsis fn-artist_list\">  
 <h4 class=\"txt-info fn-artist\">$get_singer</h4>  </div> 
 <i class=\"txt-info pull-right view-stas fn-score fn-number\">".$arr[$i][7]."</i> </div> <span class=\"item-mask\"></span> </li> ";

	}
	elseif($i == 1 || $i == 2 || $i == 3 || $i == 4)	{
		$class2[$i]	=	"<li class=\"fn-item\">
 <a class=\"thumb pull-left fn-link _trackLink track-log\" tracking=\"_frombox=home_chartvideo_vietnam_$stt\" href=\"$video_url\" title=\"$song_title - $singer_name\">
 <img width=\"110\" class=\"fn-thumb\" alt=\"$song_title\" src=\"$video_img\"/> 
 <span class=\"rank rank-$stt fn-order\">$stt</span> <span class=\"item-mask\"></span> 
 <span class=\"icon-circle-play otr icon-small\"></span> </a> 
 <h3 class=\"song-name ellipsis\">
 <a class=\"txt-primary fn-link fn-name _trackLink track-log\" tracking=\"_frombox=home_chartvideo_vietnam_$stt\" href=\"$video_url\" title=\"$song_title - $singer_name\">$song_title</a></h3> 
 <div class=\"inblock singer-name ellipsis fn-artist_list\">  
 <h4 class=\"txt-info fn-artist\">$get_singer</h4>  </div> 
 <span class=\"txt-info z-point fn-score fn-number\">".$arr[$i][7]."</span> </li> ";
	}
		$HTML_BOX	.= "".$class1[$i]." ".$class2[$i]."";
	
			
	}
	//3 new song
	elseif($num == 7 || $num == 8 || $num == 9) { 
		$HTML_BOX	.= "
                <!--song-->
				<li id=\"songnewZW78B7DE\" class=\"fn-song\" data-type=\"song\" data-id=\"ZW78B7DE\" data-code=\"kmcGyZHsQNRRinbyLFcTDmZG\" data-active=\"show-tool\"> 
				<a class=\"thumb pull-left _trackLink track-log\" tracking=\"_frombox=home_newsong_\" href=\"".$song_url."\" title=\"".un_htmlchars($arr[$i][1])."-".un_htmlchars($singer_name)."\"> 
				<img width=\"50\" alt=\"".un_htmlchars($arr[$i][1])."\" src=\"".check_img($singer_img)."\" /> 
				<span class=\"icon-circle-play icon-small\"></span> </a>
				<h3 class=\"txt-primary\"> 
				<a class=\"ellipsis list-item-width _trackLink track-log\" tracking=\"_frombox=home_newsong_\" href=\"".$song_url."\" title=\"Bài Hát ".un_htmlchars($arr[$i][1])."-".un_htmlchars($singer_name)."\">".un_htmlchars($arr[$i][1])."</a> </h3> 
				<span class=\"inblock ellipsis\">  <h4>$get_singer</h4>  </span> 
				<div class=\"tool-song\"> 
				<div class=\"i25 i-small download\"><a title=\"Download\" class=\"fn-dlsong\" data-item=\"#songnewZW78B7DE\" href=\"".$download."\"></a></div> 

				<!-- Playlist ADD -->
<div class=\"i25 i-small addlist\" id=\"playlist_".$arr[$i][0]."\"><a href=\"javascript:;\"  title=\"Thêm vào\" class=\"fn-addto\" onclick=\"_load_box(".$arr[$i][0].");\"></a></div>
<!-- End playlist ADD -->
		</div>
				<br/></li>
				";
	}
		//3 new hot song
	elseif($num == 13 || $num == 14 || $num == 15) { 
		$HTML_BOX	.= "
                <!--song-->
				<li id=\"songnewZW78B7DE\" class=\"fn-song\" data-type=\"song\" data-id=\"ZW78B7DE\" data-code=\"kmcGyZHsQNRRinbyLFcTDmZG\" data-active=\"show-tool\"> 
				<a class=\"thumb pull-left _trackLink track-log\" tracking=\"_frombox=home_newsong_\" href=\"".$song_url."\" title=\"".un_htmlchars($arr[$i][1])."-".un_htmlchars($singer_name)."\"> 
				<img width=\"50\" alt=\"".un_htmlchars($arr[$i][1])."\" src=\"".check_img($singer_img)."\" /> 
				<span class=\"icon-circle-play icon-small\"></span> </a>
				<h3 class=\"txt-primary\"> 
				<a class=\"ellipsis list-item-width _trackLink track-log\" tracking=\"_frombox=home_newsong_\" href=\"".$song_url."\" title=\"Bài Hát ".un_htmlchars($arr[$i][1])."-".un_htmlchars($singer_name)."\">".un_htmlchars($arr[$i][1])."</a> </h3> 
				<span class=\"inblock ellipsis\">  <h4>$get_singer</h4>  </span> 
				<div class=\"tool-song\"> 
				<div class=\"i25 i-small download\"><a title=\"Download\" class=\"fn-dlsong\" data-item=\"#songnewZW78B7DE\" href=\"".$download."\"></a></div> 

<!-- Playlist ADD -->
<div class=\"i25 i-small addlist\" id=\"playlist_".$arr[$i][0]."\"><a href=\"javascript:;\"  title=\"Thêm vào\" class=\"fn-addto\" onclick=\"_load_box(".$arr[$i][0].");\"></a></div>
<!-- End playlist ADD -->
		</div>
				<br/></li>
				";
	}
}
	$HTML_BOX	.= "<div style=\"text-align:center;\" class=\"list-item\"><ul><li><a href=\"$link_pages\">Xem thêm</a></li></ul></div>";
    $fp = fopen($file,"w");
    fputs($fp, $HTML_BOX);
    fclose($fp);
	include(PATH."mlivechannel_".$type_mlivechannel.".xxx");
	}  
}
?>