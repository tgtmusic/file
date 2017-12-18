<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/functions_user.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);
if(isset($_GET["name"])) $name=$myFilter->process($_GET["name"]);
if(isset($_GET["act"])) $act=$myFilter->process($_GET["act"]);
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
$id	=	del_id($id);

if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
$arr_user = $mlivedb->query(" * ","user"," username = '".$name."'");
$fav_song 	= get_data("user","user_like_song","userid = '".$arr_user[0][0]."'");
$fav_album 	= get_data("user","user_like_album","userid = '".$arr_user[0][0]."'");
$fav_video 	= get_data("user","user_like_video","userid = '".$arr_user[0][0]."'");
$fav_following 	= get_data("user","user_following","userid = '".$arr_user[0][0]."'");
$user_id = $arr_user[0][0];
$user_name = $arr_user[0][1];
$user_img = check_img($arr_user[0][7]);
$user_big_img = check_img2($arr_user[0][15]);
$user_url_u = url_link($user_name,$act,'users');;
if (count($arr_user)<1) header("Location: ".SITE_LINK."the-loai/404.html");
if ($name=='') header("Location: ".SITE_LINK."404.html");
if(!$act) { $title_web = 'Nhạc của '.$user_name.' | '.NAMEWEB.''; $des_web = ''.$user_name.' Channel, kho nhac cá nhân của  '.$user_name.' gồm các ca khúc yêu thích và được upload, video clip MV hot nhất và playlist chọn lọc hay nhất của  '.$user_name.''; $key_web = ''.$user_name.', '.$user_name.' Channel, Nhac cua '.$user_name.', '.$user_name.' tren '.NAMEWEB.'' ;}

elseif($act	== 'bai-hat') { $title_web = ''.$user_name.'  | bài hát mới, ca khúc hay nhất | '.NAMEWEB.''; $des_web = 'Nhạc  '.$user_name.', tất cả bài hát hay nhất của '.$user_name.', đầy đủ ca khúc mới  hot nhất chất lượng cao sáng tác và thể hiện bởi '.$user_name.''; $key_web = 'Nhac '.$user_name.', bai hat '.$user_name.', ca khuc '.$user_name.', '.$user_name.' sang tac' ;}
elseif($act	== 'favorites-song') { $title_web = ''.$user_name.'  | bài hát mới, ca khúc hay nhất | '.NAMEWEB.''; $des_web = 'Nhạc  '.$user_name.', tất cả bài hát hay nhất của '.$user_name.', đầy đủ ca khúc mới  hot nhất chất lượng cao sáng tác và thể hiện bởi '.$user_name.''; $key_web = 'Nhac '.$user_name.', bai hat '.$user_name.', ca khuc '.$user_name.', '.$user_name.' sang tac' ;}
elseif($act	== 'upload') { $title_web = ''.$user_name.'  | bài hát mới, ca khúc hay nhất | '.NAMEWEB.''; $des_web = 'Nhạc  '.$user_name.', tất cả bài hát hay nhất của '.$user_name.', đầy đủ ca khúc mới  hot nhất chất lượng cao sáng tác và thể hiện bởi '.$user_name.''; $key_web = 'Nhac '.$user_name.', bai hat '.$user_name.', ca khuc '.$user_name.', '.$user_name.' sang tac' ;}

elseif($act	== 'playlist') { $title_web = 'Playlist của  '.$user_name.' | playlist mới nghe nhiều nhất '.$user_name.' | '.NAMEWEB.''; $des_web = ''.$user_name.' Album '.$user_name.', tất cả playlist hay nhất của '.$user_name.', đầy đủ playlist mới phát hành hot nhất chất lượng cao 320 lossless '.$user_name.''; $key_web = 'playlist '.$user_name.', playlist hay nhat, playlist moi nhat, playlist '.$user_name.', chat luong lossless' ;}
elseif($act	== 'favorites-playlist') { $title_web = 'Playlist của  '.$user_name.' | playlist mới nghe nhiều nhất '.$user_name.' | '.NAMEWEB.''; $des_web = ''.$user_name.' Album '.$user_name.', tất cả playlist hay nhất của '.$user_name.', đầy đủ playlist mới phát hành hot nhất chất lượng cao 320 lossless '.$user_name.''; $key_web = 'playlist '.$user_name.', playlist hay nhat, playlist moi nhat, playlist '.$user_name.', chat luong lossless' ;}
elseif($act	== 'user-playlist') { $title_web = 'Playlist của  '.$user_name.' | playlist mới nghe nhiều nhất '.$user_name.' | '.NAMEWEB.''; $des_web = ''.$user_name.' Album '.$user_name.', tất cả playlist hay nhất của '.$user_name.', đầy đủ playlist mới phát hành hot nhất chất lượng cao 320 lossless '.$user_name.''; $key_web = 'playlist '.$user_name.', playlist hay nhat, playlist moi nhat, playlist '.$user_name.', chat luong lossless' ;}

elseif($act	== 'video') { $title_web = 'Video của  '.$user_name.' | video clip mới MV HD hot nhất '.$user_name.' | '.NAMEWEB.''; $des_web = 'Video '.$user_name.', tất cả MV hot đẹp nhất của '.$user_name.', đầy đủ video clip mới phát hành chất lượng cao HD 720 1080 '.$user_name.''; $key_web = 'Video '.$user_name.', mv '.$user_name.', clip hot '.$user_name.', chat luong hd, video moi nhat' ;}
elseif($act	== 'favorites-playlist') { $title_web = 'Video của  '.$user_name.' | video clip mới MV HD hot nhất '.$user_name.' | '.NAMEWEB.''; $des_web = 'Video '.$user_name.', tất cả MV hot đẹp nhất của '.$user_name.', đầy đủ video clip mới phát hành chất lượng cao HD 720 1080 '.$user_name.''; $key_web = 'Video '.$user_name.', mv '.$user_name.', clip hot '.$user_name.', chat luong hd, video moi nhat' ;}
elseif($act	== 'user-video') { $title_web = 'Video của  '.$user_name.' | video clip mới MV HD hot nhất '.$user_name.' | '.NAMEWEB.''; $des_web = 'Video '.$user_name.', tất cả MV hot đẹp nhất của '.$user_name.', đầy đủ video clip mới phát hành chất lượng cao HD 720 1080 '.$user_name.''; $key_web = 'Video '.$user_name.', mv '.$user_name.', clip hot '.$user_name.', chat luong hd, video moi nhat' ;}

elseif($act	== 'following') { $title_web = ''.$user_name.' | quan tâm '.$user_name.' | '.NAMEWEB.''; $des_web = 'Video '.$user_name.', tất cả MV hot đẹp nhất của '.$user_name.', đầy đủ video clip mới phát hành chất lượng cao HD 720 1080 '.$user_name.''; $key_web = 'Video '.$user_name.', mv '.$user_name.', clip hot '.$user_name.', chat luong hd, video moi nhat' ;}
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $title_web;?> | <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">

<meta name="title" content="<?php  echo $title_web;?> | <?php  echo NAMEWEB;?>" />
<meta name="description" content="<?php  echo $des_web;?> | <?php  echo NAMEWEB;?>" />
<meta name="keywords" content="<?php  echo $key_web;?> | <?php  echo NAMEWEB;?>" />
<meta property="og:title" content="<?php  echo $title_web;?> | <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="<?php  echo $des_web;?> | <?php  echo NAMEWEB;?>" />        
<meta property="og:image" content="<?php  echo $user_img;?>" />
<meta property="og:image:url" content="<?php  echo $user_img;?>" />
<meta property="og:url" content="<?php  echo $user_url_u.$act;?>" />
<link rel="image_src" href="<?php  echo $user_img;?>" />
<?php  include("./theme/ip_java.php");?>

</head>
<body>
	<?php  include("./theme/ip_header.php");?>

  <div class="wrapper-page"> 
<div class="full-banner user-page" id="userCover">
    <div class="container">
        <img src="<?=$user_big_img?>" alt="<?=$user_name?>" />
        <div class="box-info-artist">
            <div class="info-artist fluid">
                <div class="inside">
                    <i class="fn_zme_info" style="display: none;" data_uname="<?=$user_name?>" data-thumb="#userCover .fn-thumb"></i>
                    <img height="130" class="fn-thumb" src="<?=$user_img?>" alt="<?=$user_name?>" />
                    <div class="info-summary">
						<h1><?=$user_name?></h1>
						<div class="clearfix"></div>
						<p><?php  if($fav_song == ',') { echo '0';}
						else { echo SoBaiHat(substr(substr($fav_song,1),0,-1)); }?> bài hát • <?php  if($fav_album == ',') { echo '0';}
						else { echo  SoBaiHat(substr(substr($fav_album,1),0,-1)); }?> playlist • <?php  if($fav_video == ',') { echo '0';}
						else { echo SoBaiHat(substr(substr($fav_video,1),0,-1)); }?> video</p>						
					</div><!-- /.info-summary -->                    
                </div>
            </div>
        </div>
    </div>
</div>
                           
<div class="wrap-body group  page-artist-all page-artist container">    
    <div class="tab-menu group">
    <ul>
        <li class="<?php  if(!$act) echo 'active';?>"><a href="./u/<?=$user_name?>">Tất cả</a></li>
        <li class="<?php  if($act=='bai-hat' || $act=='upload' || $act=='favorites-song') echo 'active';?>"><a href="./u/<?=$user_name?>/bai-hat">Bài hát</a></li>
        <li class="<?php  if($act=='playlist' || $act=='user-playlist' || $act=='favorites-playlist') echo 'active';?>"><a href="./u/<?=$user_name?>/playlist">Playlist</a></li>
        <li class="<?php  if($act=='video' || $act=='user-video' || $act=='favorites-video') echo 'active';?>"><a href="./u/<?=$user_name?>/video">Video</a></li>                        
        <li class="<?php  if($act=='following') echo 'active';?>"><a href="./u/<?=$user_name?>/following">Quan tâm</a></li>                        
        <!-- <li ><a href="/u/david.marion.UEI0UOOO/fans">Được quan tâm</a></li>                         -->
    </ul>    
    <div class="subcribe subcribed pull-right none">
        <a class="fn-follow _trackLink" tracking="_frombox=artist_artistfollow" data-id="UEI0UOOO" 
           data-type="artist" data-name="<?=$user_name?>" href="#"><span></span>Quan tâm</a>
        <span><i></i><b></b><s class="fn-followed" data-id="UEI0UOOO" data-type="artist" data-name="<?=$user_name?>">0</s></span>
    </div>    
</div>
    <div class="wrap-2-col">
        <div class="wrap-content">
					<?php 
                    $link = '/page_user.php?';
                    if($_SERVER["QUERY_STRING"]) $link .= $_SERVER["QUERY_STRING"];
                    switch($act){
                        default					:include("./page_user/user_all.php");break;
                        case "following"			:include("./page_user/user_following.php");break;
						case "favorites-video"	:include("./page_user/user_favourite_video.php");break;
						case "video"	:include("./page_user/user_favourite_video.php");break;
						case "user-video"	:include("./page_user/user_upload_video.php");break;
						case "playlist"	:include("./page_user/user_favourite_playlist.php");break;
						case "user-playlist"	:include("./page_user/user_playlist.php");break;
						case "favorites-playlist"	:include("./page_user/user_favourite_playlist.php");break;
						case "bai-hat"		:include("./page_user/user_favourite_song.php");break;
						case "favorites-song"		:include("./page_user/user_favourite_song.php");break;
						case "upload"		:include("./page_user/user_upload_song.php");break;
						case "u"				:include("./page_user/user_all.php");break;
                    }
                    ?>
     <div class="wrap-sidebar">
   <div class="widget widget-countdown">
           <?=BANNER('tim_kiem','300');?>
	</div>	   
<div class="widget widget-countdown">
    <h3 class="title-section sz-title-sm">Nghệ Sĩ Tương Tự</h3>
    <div class="widget-content with-action-follow no-padding no-border">
        <ul>
<?php 
$arr = $mlivedb->query(" * ","singer"," singer_hot ORDER BY RAND() LIMIT 6");
for($z=0;$z<count($arr);$z++) {
$singer_name = $arr[$z][1];
$singer_url = 'nghe-si/'.replace($singer_name);
$singer_img	= check_img($arr[$z][3]);
?>
            <li>
                <a href="<?=$singer_url; ?>" title="<?=$singer_name; ?>" class="thumb pull-left">
                    <img width="50" src="<?=$singer_img; ?>" alt="<?=$singer_name; ?>" />
                </a>
                <h3 class="song-name"><a href="<?=$singer_url; ?>" title="<?=$singer_name; ?>" class="txt-primary"><?=rut_ngan($singer_name,4); ?></a></h3>
                <div class="singer-name"><a href="#" class="txt-info"><s class="fn-followed" data-id="<?=en_id($arr[$z][0]); ?>">0</s> quan tâm</a></div>
                 <div id="Load_Singer_<?=$arr[$z][0];?>"><i onclick="ADDFAV(<?=$arr[$z][0];?>,4);" class="button-follow fn-follow" data-id="<?=en_id($arr[$z][0]); ?>" data-name="<?=$singer_name; ?>" data-type="artist"></i></div>
            </li>
<?php  } ?>
        </ul>
    </div>
</div>

        </div>
    </div>
</div> </div></div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php  
//}
//$cache->close();
?>