<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/class.inputfilter.php");
include("../includes/securesession.class.php");
include("../includes/class.upload.php");
include("./functions.php");
$myFilter = new InputFilter();
$upload = new UPLOAD_FILES();
$ss = new SecureSession();
$ss->check_browser = true;
$ss->check_ip_blocks = 2;
$ss->secure_word = 'SALT_';
$ss->regenerate_id = true;
$ss->Open();
include("./auth.php");

if(isset($_GET["act"])) $act = $myFilter->process($_GET['act']);
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
if(isset($_GET["mode"])) $mode=$myFilter->process($_GET["mode"]);
if(isset($_GET["del_id"])) $del_id=$myFilter->process($_GET["del_id"]);
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);
if ($page > 0 && $page!= "") {
	$start=($page-1) * HOME_PER_PAGE;
} else {
	$page = 1;
	$start=0;
}
if (!$ss->Check() || !isset($_SESSION["username"]) || !$_SESSION["username"])
{
header('Location: login.php');
die();
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>QUẢN LÝ WEBSITE | <?php echo VER?> </title>
<?php  include("./java.php");?>
  </head>

<?php  include("./header.php");?>
     
      <!-- Left side column. contains the logo and sidebar -->
     <?php  include("main_side.php");?>

					<?php 
                    $link = './index.php?';
                    if($_SERVER["QUERY_STRING"]) $link .= $_SERVER["QUERY_STRING"];
                    switch($act){
                        default					:include("./dashboard.php");break;
                        case "dashboard"			:include("./dashboard.php");break;
                        case "media"			:include("./media/media.php");break;
                        case "list-media"			:include("./media/list_song.php");break;
						case "topic-video"			:include("./media/topic_video.php");break;
						case "topic-album"			:include("./media/topic_album.php");break;
                        case "news"			:include("./media/news.php");break;
                        case "list-news"			:include("./media/list_news.php");break;
                        case "cat-news"			:include("./media/cat_news.php");break;
                        case "list-cat-news"			:include("./media/list_cat_news.php");break;
                        case "album"			:include("./media/album.php");break;
                        case "list-album"			:include("./media/list_album.php");break;
						case "ads"			:include("./media/ads.php");break;
						case "list-ads"			:include("./media/list_ads.php");break;
						case "singer"			:include("./media/singer.php");break;
                        case "list-singer"			:include("./media/list_singer.php");break;
						case "cat"			:include("./media/cat.php");break;
                        case "list-cat"			:include("./media/list_cat.php");break;
						case "topic"			:include("./media/topic.php");break;
                        case "list-topic"			:include("./media/list_topic.php");break;
                        case "list-topic-stt"			:include("./media/list_topic_stt.php");break;
                        case "user"			:include("./media/user.php");break;
                        case "list-user"			:include("./media/list_user.php");break;
                        case "cau-hinh"			:include("./media/cau_hinh.php");break;
                        case "list-comment"			:include("./media/list_comment.php");break;
                        case "server"			:include("./media/server.php");break;	
                        case "multi-add-album"			:include("./media/multi_add_album.php");break;	
                        case "add-song-album"			:include("./media/add_song_album.php");break;
                        case "list-bxh"			:include("./media/list_bxh.php");break;	
                        case "bxh"			:include("./media/bxh.php");break;		
                        case "slider"			:include("./media/slider.php");break;							
                    }
                    ?>
     <?php  include("./footer.php");?>
  </body>
</html>


