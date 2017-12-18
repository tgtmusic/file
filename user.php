<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/functions_user.php");
$myFilter = new InputFilter();
if(isset($_GET["act"])) $act=$myFilter->process($_GET["act"]);
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);

if(!$_SESSION["mlv_user_id"])  mss("Bạn chưa đăng nhập vui lòng đăng nhập để sử dụng chức năng này.","".SITE_LINK."");
$user_title = $_SESSION["mlv_user_name"];
$name_des ="Tất cả các playlist nhạc mà ".$user_title." tự tạo và cập nhật tại ".NAMEWEB." và có thể nghe trên tất cả các thiết bị."; 
$name_key = "playlist ca nhan, playlist cua ".$user_title.", tuyen tap của ".$user_title.", nhac cua ".$user_title."";
if($act == "upload") $name_seo = "Bài hát";
if($act == "favorites-song") $name_seo = "Bài hát yêu thích";
if($act == "favorites-playlist") $name_seo = "Playlist yêu thích";
if($act == "myplaylist") $name_seo = "Playlist";
if($act == "myplaylist-edit") $name_seo = "Sửa Playlist";
if($act == "upload-video") $name_seo = "Video";
if($act == "favorites-video") $name_seo = "Video yêu thích";
if($act == "following-artist") $name_seo = "Nghệ sĩ quan tâm";
if ($act=='') header("Location: ".SITE_LINK."404.html");
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $name_seo;?> | <?php  echo $user_title;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $name_seo;?> | <?php  echo $user_title;?>" />
<meta name="description" content="<?php  echo $name_des;?>" />
<meta name="keywords" content="<?php  echo $name_key;?>" />
<meta property="og:title" content="<?php  echo $name_seo;?> | <?php  echo $user_title;?>" />                
<meta property="og:description" content="<?php  echo $name_des;?>" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php  echo SITE_LINK."mymusic/".$act.$p;?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
   <div class="wrapper-page"> <div class="wrap-body group  page-artist-genre container">
    <div class="wrap-2-col">
<?php  include("./user/user_right.php");?>
               
					<?php 
                    $link = '/user.php?';
                    if($_SERVER["QUERY_STRING"]) $link .= $_SERVER["QUERY_STRING"];
                    switch($act){
                        default							:include("./user/myplaylist.php");break;
                        case "upload"				:include("./user/upload.php");break;
						case "favorites-song"			:include("./user/favorites-song.php");break;
						case "myplaylist"			:include("./user/myplaylist.php");break;
						case "myplaylist-edit"		:include("./user/myplaylist-edit.php");break;
						case "favorites-playlist"			:include("./user/favorites-playlist.php");break;
                        case "upload-video"				:include("./user/upload-video.php");break;
						case "favorites-video"			:include("./user/favorites-video.php");break;
						case "following-artist"			:include("./user/following-artist.php");break;
                    }
                    ?>
                
			</div>
     </div>   </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
