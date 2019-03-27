<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/cache.php");
// tu tao thu muc upload anh album + anh ca si + anh video
			$oldumask = umask(0);
				// album
				@mkdir('upload/', 0777);
				@mkdir('upload/album', 0777);
				@mkdir('upload/album/'.date("Ym"), 0777);
				// singer
				@mkdir('upload/', 0777);
				@mkdir('upload/singer', 0777);
				@mkdir('upload/singer/'.date("Ym"), 0777);
				// video
				@mkdir('upload/', 0777);
				@mkdir('upload/video', 0777);
				@mkdir('upload/video/'.date("Ym"), 0777);
				// news
				@mkdir('upload/', 0777);
				@mkdir('upload/news', 0777);
				@mkdir('upload/news/'.date("Ym"), 0777);
				// ads
				@mkdir('upload/', 0777);
				@mkdir('upload/adv', 0777);
				@mkdir('upload/adv/'.date("Ym"), 0777);
				// topic
				@mkdir('upload/', 0777);
				@mkdir('upload/topic', 0777);
				@mkdir('upload/topic/'.date("Ym"), 0777);
			umask($oldumask); 
// end
if(date("w",NOW) == 1) {
	mysqli_query($link_music,"UPDATE table_charts SET charts_up = '1'");
	mysqli_query($link_music,"UPDATE table_config SET charts_value = '1' WHERE charts_name = 'week_up'");
	}

elseif(date("w",NOW) == 1) {
	mysqli_query($link_music,"UPDATE table_data SET m_viewed_week = 0 ");
	mysqli_query($link_music,"UPDATE table_album SET album_viewed_week = 0 ");
}
	/* reset viewed
if(date("w") == 0) {
	mysql_query("UPDATE table_data SET m_viewed = '0',m_viewed_month = '0',m_viewed_week = '0',m_viewed_day = '0'");
	}
if(date("w") == 0) {
	mysql_query("UPDATE table_album SET album_viewed = '0',album_viewed_month = '0',album_viewed_week = '0',album_viewed_day = '0'");
	}
	*/
if(date("H:i d/m",NOW) == "00:00 ".date("d/m",NOW)) {
	mysqli_query($link_music,"UPDATE table_data SET m_viewed_day = 0 ");
	mysqli_query($link_music,"UPDATE table_album SET album_viewed_day = 0 ");
	}
elseif(date("H:i d/m",NOW) == '00:00 01/'.date("m",NOW)) {
	mysqli_query($link_music,"UPDATE table_data SET m_viewed_month = 0 ");
	mysqli_query($link_music,"UPDATE table_album SET m_viewed_month = 0 ");
}

//$cache = new cache();
//if ( $cache->caching ) {
?>
<!DOCTYPE html>
<html lang="vi">
    <head> <title><?=WEB_NAME;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?=WEB_NAME;?>" />
<meta name="description" content="<?=WEB_DES;?>" />
<meta name="keywords" content="<?=WEB_KEY;?>" />
<meta property="og:title" content="<?=WEB_NAME;?>" />                
<meta property="og:description" content="<?=WEB_DES;?>" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?=SITE_LINK;?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>

</head>

<body>
	<?php  include("./theme/ip_header.php");?>


<div class="wrapper-page"> <div class="wrap-body container"> 
<?=BANNER('top_banner_home','1006');?>
		<div class="wrap-content">

		<?php  include("./theme/ip_slider.php");?>
			<?php  include("./theme/ip_album_new.php");?>
			<?php  include("./theme/ip_album_chonloc.php");?>
            <?=BANNER('home_center_1','485');?>
			<?php  include("./theme/ip_video_new.php");?>
            <?=BANNER('home_center_2','485');?>
			<?php  include("./theme/ip_song_hotnew.php");?>
			<?php  include("./theme/ip_singer_hot.php");?>
			<?php  include("./theme/ip_tin_tuc.php");?>

		
        </div>
        <!--3-->
		<div class="wrap-sidebar">

			<?php  include("./theme/ip_chu_de.php");?>
        	<?=BANNER('home_right_1','345');?>
        	<?php  include("./theme/ip_bxh_mp3.php");?>
            <?=BANNER('home_right_2','345');?>
        	<?php  include("./theme/ip_bxh_video.php");?>
        	<?php  include("./theme/ip_bxh_album.php");?>
        </div>
        <div class="clr"></div>
    </div></div>

    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php  
//}
//$cache->close();
?>