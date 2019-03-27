<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();
//$cache = new cache();
//if ( $cache->caching ) {
if(isset($_GET["act"])) $act = $myFilter->process($_GET['act']);
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
if($act	== 'the-loai-video') { $title_web = 'Thể loại MV | '.NAMEWEB.''; $des_web = 'Danh mục MV âm nhạc chất lượng cao HD, MV đẹp hot nhất, xem download tốc độ nhanh nhất, cập nhật phong phú đầy đủ MV mới nhất tất cả các thể loại'; $key_web = 'Video Clip, MV, am nhac, moi nhat, hot nhat, HD, MV chat luong cao, hay nhat, danh muc, music video' ; $url_web = SITE_LINK."the-loai-video.html";}
elseif($act	== 'the-loai-album') {  $title_web = 'Album hot, nhạc mới hay nhất chất lượng cao | '.NAMEWEB.''; $des_web = 'Tất cả album nhạc mới phát hành được chọn lọc đầy đủ tất cả các thể loại. Kho nhạc luôn được cập nhật thường xuyên nhanh nhất'; $key_web = 'album, kho nhac, thu vien nhac, nhac moi, album moi, nhac moi cap nhat, nhac moi phat hanh, tat ca the loai nhac' ; $url_web = SITE_LINK."the-loai-album.html"; }
elseif($act	== 'the-loai-nhac') { $title_web = 'Thể loại MV | '.NAMEWEB.''; $des_web = 'Danh mục MV âm nhạc chất lượng cao HD, MV đẹp hot nhất, xem download tốc độ nhanh nhất, cập nhật phong phú đầy đủ MV mới nhất tất cả các thể loại'; $key_web = 'Video Clip, MV, am nhac, moi nhat, hot nhat, HD, MV chat luong cao, hay nhat, danh muc, music video' ; $url_web = SITE_LINK."the-loai-nhac.html"; }
elseif($act	== 'the-loai-nghe-si') {  $title_web = 'Thể loại nghệ sĩ | '.NAMEWEB.''; $des_web = 'Danh sách ca sĩ, nhóm nhạc nổi tiếng hot nhất hiện nay đầy đủ các thể loại nhạc Việt Nam, Âu Mỹ, Hàn Quốc, châu Á'; $key_web = 'nghe si, ca si, nhom nhac, noi tieng, hot, danh muc, ban nhac' ; $url_web = SITE_LINK."the-loai-nghe-si"; }
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $title_web;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $title_web;?>" />
<meta name="description" content="<?php  echo $des_web;?>" />
<meta name="keywords" content="<?php  echo $key_web;?>" />
<meta property="og:title" content="<?php  echo $title_web;?>" />                
<meta property="og:description" content="<?php  echo $des_web;?>" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php  echo $url_web;?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
    <div class="wrapper-page"> <div class="wrap-body group page-artist-genre container">
	<?=BANNER('top_banner_category','1006');?>
    <div class="wrap-2-col">
        <!-- .sidebar -->


					<?php 
                    $link = '/cat.php?';
                    if($_SERVER["QUERY_STRING"]) $link .= $_SERVER["QUERY_STRING"];
                    switch($act){
                        default					:include("./cat/video.php");break;
                        case "the-loai-album"			:include("./cat/album.php");break;
						case "the-loai-nhac"			:include("./cat/mp3.php");break;
						case "the-loai-video"			:include("./cat/video.php");break;
						case "the-loai-nghe-si"			:include("./cat/singer.php");break;
                    }
                    ?>
     	      
    </div>
</div> </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php 
//}
//$cache->close();
?>