<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();
//$cache = new cache();
//if ( $cache->caching ) {
if(isset($_GET["id"])) $id = $myFilter->process($_GET['id']); $id = del_id($id);
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
if(isset($_GET["ft"])) $ft = $myFilter->process($_GET['ft']);
if(isset($_GET["type"])) $type = $myFilter->process($_GET['type']);
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}

	if($ft == 'view') $sql_order = " ORDER BY album_viewed ";
	elseif($ft == 'time') $sql_order = " ORDER BY album_time ";
	elseif($ft == 'release_date') 	$sql_order = " ORDER BY album_id ";
	elseif($ft == 'hot') 	$sql_order = "AND album_hot = 1 ORDER BY album_id ";
	//elseif(!$ft) 					$sql_order = " ORDER BY album_viewed ";
	else $sql_order = " ORDER BY album_id";
	// phan trang
 	$sql_tt = "SELECT album_id  FROM table_album WHERE  album_topic LIKE '%,".$id.",%' $sql_order DESC LIMIT ".LIMITSONG;

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_album = $mlivedb->query(" album_id, album_name, album_singer, album_viewed, album_img, album_type, album_topic, album_poster, album_time, album_song ","album"," album_topic LIKE '%,".$id.",%'  $sql_order DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$cat_name = get_data("topic","topic_name"," topic_id = '".$id."'");
	$topic_info1 = get_data("topic","topic_info"," topic_id = '".$id."'");
	$topic_info = un_htmlchars($topic_info1);
	$topic_img1 = get_data("topic","topic_img"," topic_id = '".$id."'");
	$topic_img = check_img($topic_img1);
	$topic_url = url_link($cat_name,$id,'chu-de');
	$embed_topic = SITE_LINK."embed/mv-topic/".en_id($id)."&type=topic";
	$link_s = "chu-de/".replace($cat_name)."/".en_id($id).".html"."&p=#page#";
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s,"");
	$name_key = str_replace ('-', ' ',replace($cat_name));

?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $cat_name;?> | Tuyển tập nhạc hay chọn lọc</title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $cat_name;?> | Tuyển tập nhạc hay chọn lọc" />
<meta name="description" content="<?php  echo $topic_info;?>" />
<meta name="keywords" content="<?php  echo $name_key;?>, tuyen tap <?php  echo $name_key;?>, video <?php  echo $name_key;?>, <?php  echo $name_key;?> hay nhat" />
<meta property="og:title" content="<?php  echo $cat_name;?> | Tuyển tập nhạc hay chọn lọc" />                
<meta property="og:description" content="<?php  echo $topic_info;?>" />        
<meta property="og:image" content="<?php  echo $topic_img;?>" />
<meta property="og:image:url" content="<?php  echo $topic_img;?>" />
<meta property="og:url" content="<?php echo SITE_LINK."chu-de/".replace($cat_name)."/".en_id($id).".html";?>" />
<link rel="image_src" href="<?php  echo $topic_img;?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
   <div class="wrapper-page">
   <div class="top-banner" style="background: #001131;"> <div class="container"> <img src="<?php  echo $topic_img;?>" class="img-responsive" alt="<?php  echo $cat_name;?>" /> <div class="caption"> <div class="title-caption"> <h1><a title="<?php  echo $cat_name;?>" href=<?php  echo $topic_url;?>"><?php  echo $cat_name;?></a></h1> <div class="box-social-2"> <div class="fb-like" data-href="<?php  echo $topic_url;?>" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"> </div> </div> </div> <p> <?php  echo $topic_info;?> </p> </div> </div></div>
<div class="wrap-body page-hottopic container">

    <div class="wrap-content">
	 <?php  if($type == 'play') { ?>
 <iframe scrolling="no" width="100%" height="366px" src="<?php echo $embed_topic;?>" frameborder="0" allowfullscreen="true"></iframe>
 <?php  } ?>
 <?php if($arr_album){ ?>
        <div class="section mt0"> <h2 class="title-section"> <a href=""> PLAYLIST CHỌN LỌC <?php  echo $cat_name;?> <i class="icon-arrow"></i> </a> </h2> 
<?php  
echo	"<div>";
for($i=0;$i<count($arr_album);$i++) {
	$singer_name 	=	GetSingerName($arr_album[$i][2]);
	$get_singer = GetSinger($arr_album[$i][2]);
	$user_name = get_user($arr_album[$i][7]);
	$album_url = url_link(un_htmlchars($arr_album[$i][1]).'-'.$singer_name,$arr_album[$i][0],'nghe-album');
	$user_url = url_link($user_name,$arr_album[$i][7],'user');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}

?><?php  echo $class1[$i]; ?>

<div class="album-item des-inside col-3 otr"> <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" class="thumb _trackLink track-log" tracking="_frombox=topic_playlist_"> <img width="200" src="<?php  echo check_img($arr_album[$i][4]);?>" alt="" class="img-responsive" /> <span class="icon-circle-play"></span> <div class="des"> <h3 class="title-item txt-primary ellipsis"><?php  echo un_htmlchars($arr_album[$i][1]); ?></h3> <div class="inblock ellipsis">  <h4 class="title-sd-item txt-info ellipsis"> <?=$singer_name?> </h4>   </div> </div> <span class="item-mask"></span> </a></div> 

<?php  } echo	"</div>"; ?>
</div>
<?php  } ?>
<?php

$sql_tt = "SELECT m_id  FROM table_data WHERE  m_topic LIKE '%,".$id.",%' AND m_type = 2 ORDER BY m_id  DESC LIMIT ".LIMITSONG;

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_v = $mlivedb->query(" * ","data"," m_topic LIKE '%,".$id.",%' AND m_type = 2 ORDER BY m_id  DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");

if($arr_v){
	?>
  <div class="section">   <h2 class="title-section"> <a href="<?=$topic_url?>&type=play">MV CHỌN LỌC <?php  echo $cat_name;?> <i class="icon-arrow"></i></a> </h2>   

  <?php 
echo	"<div>";
for($i=0;$i<count($arr_v);$i++) {
	$singer_name 	=	GetSingerName($arr_v[$i][3]);
	$get_singer = GetSinger($arr_v[$i][3]);
	$user_name = get_user($arr_v[$i][4]);
	$song_url = url_link(un_htmlchars($arr_v[$i][1]).'-'.$singer_name,$arr_v[$i][0],'xem-video');
	$user_url = url_link($user_name,$arr_v[$i][4],'user');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}

?><?php  echo $class1[$i]; ?>
  <div class="album-item col-3 fn-item"> <a href="<?php  echo $song_url; ?>" title="Video <?php  echo un_htmlchars($arr_v[$i][1]);?><?php echo $singer_name; ?>" class="thumb fn-link _trackLink" tracking="_frombox=play_artistvideo_"> <img width="200" src="<?php  echo check_img($arr_v[$i][19]);?>" alt="Video <?php  echo un_htmlchars($arr_v[$i][1]);?><?php echo $singer_name; ?>" class="img-responsive fn-thumb" /> <span class="icon-circle-play otr"></span> </a> <h3 class="title-item ellipsis"> <a href="<?php  echo $song_url; ?>" title="Video <?php  echo un_htmlchars($arr_v[$i][1]);?><?php echo $singer_name; ?>" class="txt-primary fn-name fn-link _trackLink" tracking="_frombox=play_artistvideo_"> <?php  echo un_htmlchars($arr_v[$i][1]);?></a> </h3> <div class="inblock ellipsis">  <h4 class="title-sd-item txt-info ellipsis"><?=$get_singer?></h4>   </div> <span class=" fn-badge"></span></div>
  <?php  } echo	"</div>"; ?>
  </div>  
    <?php  } ?>
<?php  echo $phantrang; ?>

                     </div>
	<div class="wrap-sidebar">
  <?php  include("./theme/ip_chu_de.php");?> 
	</div> 
	</div>     
</div> </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php 
//}
//$cache->close();
?>