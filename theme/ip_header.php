
		<header> 
		<div class="container group"> 
		<div class="logo"> 
		<a href="<?php echo SITE_LINK;?>" title="<?=WEB_NAME;?>" class="hide-text"> 
		<img src="<?php echo SITE_LINK;?>theme/images/logo.png" alt="<?=WEB_NAME;?>"> </a>
		</div> 
		<div id="sug" class="section-search"> 
		<form action="<?php if($_GET['key']) echo $link_s; else echo "tim-kiem.html";?>" method="get" class="search"> 
		<input id="q" type="text" name="key" value="<?php if($_GET['key']) { echo $ky;}?>" placeholder="<?php if($_GET['key']) { echo $_GET['key']; } else { echo "Nhập nội dung cần tìm";}?>" class="input-txt" autocomplete="off"> 	
		<span class="input-btn"> 
		<button type="submit" class="zicon btn hide-text">Tìm kiếm</button> 
		</span> 
		</form> 
<div id="suggesstion-box"></div>
 </div> 

		<ul class="jumper-link pull-left"> 
		<li class="active"> 
		<a href="<?php echo SITE_LINK;?>" title="Zing MP3" target="_blank" rel="nofollow">MP3</a> </li>
		<li> <a href="tin-tuc" title="Zing News" target="_blank" rel="nofollow">NEWS</a> </li> 
		<li> <a href="bang-xep-hang/index.html" title="BXH" target="_blank" rel="nofollow">BXH</a> </li> 
		</ul>  
  <div id="LoginMLV"></div>
					<?php include("ip_menu_right.php");?>
		</div> 
		</header>

	<nav> <div class="container"> 
	<ul class="main-nav group"> 
	<li class="home">
	<a title="M LIVE" href="<?php echo SITE_LINK;?>">M LIVE</a></li> 
	<li class="home-logo">
	<a title="Trang chủ" href="<?php echo SITE_LINK;?>"><img src="<?php echo SITE_LINK;?>theme/images/logo.png" alt="Zing MP3"></a></li>
	<?php
	if($_SESSION["mlv_user_id"]) { $user_url = url_link($_SESSION["mlv_user_name"],$act,'users');
	echo '
	<li class="active"><a class="fn-login" <a href="./mymusic/myplaylist" title="Nhạc cá nhân">Nhạc Cá Nhân</a> 
	<div class="megamenu submenu menu-col-1 fn-userbox"> 
	<div class="subcol menu-col-1-narrow"> 
	<div class="subinner_item"> 
	<ul> 
<li><a href="'.$user_url.'" title="Kênh của tôi" class="fn-my-channel">Kênh của tôi</a></li>
 <li><a href="./mymusic/favorites-song" title="Yêu thích">Yêu Thích</a></li> 
<li><a href="./mymusic/myplaylist" title="Playlist cá nhân">Playlist Cá Nhân</a></li>
<li><a href="./mymusic/following-artist" title="Quan tâm">Quan tâm</a></li>
 <li><a href="./mymusic/upload" title="Nhạc upload">Nhạc Upload</a></li>
	</ul> </div> </div><!--End .sub-col --> </div> </li> 
	';
	}
	?>
	<li class="separation"></li>
	<li><a title="Chủ Đề" href="./chu-de">Chủ Đề</a><?php include("./theme/box/ip_cat_topic.php");?></li>
	<li><a title="Nhạc" href="./the-loai-nhac.html">Nhạc</a><?php include("./theme/box/ip_cat_mp3.php");?></li>
	<li><a title="Video" href="./the-loai-video.html">Video</a><?php include("./theme/box/ip_cat_video.php");?></li>
     <li><a title="Album" href="./the-loai-album.html">Album</a><?php include("./theme/box/ip_cat_album.php");?></li>
   <li><a title="Nghệ Sĩ" href="./the-loai-nghe-si">Nghệ Sĩ</a>
                <div class="megamenu submenu menu-col-1">
                    <div class="subcol menu-col-1-narrow">
                        <div class="subinner_item">
                            <ul>
<?php 
$cats = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC LIMIT 3");
for($z=0;$z<count($cats);$z++) {
	$cat_ids = $cats[$z][0];
	$cat_names = un_htmlchars($cats[$z][1]);
	$cat_urls = url_link($cat_names,$cat_ids,'singer-cat');
	?>
        <li><a title="<?php echo un_htmlchars($cat_names);?>" href="<?php echo $cat_urls;?>"><?php echo un_htmlchars($cat_names);?></a></li>
<?php };?>
 </ul>
                        </div>
                    </div><!--End .sub-col -->
                </div>
            </li>
 <li><a title="BXH" href="bang-xep-hang/index.html">BXH</a>
                        <div class="megamenu submenu menu-col-3 menu-bxh">
                            <div class="subcol menu-col-1-narrow">
                                <div class="title-menu">Việt Nam</div>
                                <div class="subinner_item">
                                    <ul>
                                        <li><a title="Bài hát" href="bang-xep-hang/bai-hat-Viet-Nam/EZEFZOA.html">Bài hát</a></li>
                                        <li><a title="Album" href="bang-xep-hang/album-Viet-Nam/EZEFZOA.html">Album</a></li>
										<li><a title="MV" href="bang-xep-hang/video-Viet-Nam/EZEFZOA.html">MV</a></li>
                                        <li><a title="Social" href="bang-xep-hang/top-40-social/EZEFZOA.html">Social</a></li>
                                    </ul>
                                </div>
                            </div><!--End .sub-col -->
                            <div class="subcol menu-col-1-narrow">
                                <div class="title-menu">Âu Mỹ</div>
                                <div class="subinner_item">
                                    <ul>
                                        <li><a title="Bài hát" href="bang-xep-hang/bai-hat-Au-My/EZEFZOB.html">Bài hát</a></li>
                                        <li><a title="Album" href="bang-xep-hang/album-Au-My/EZEFZOB.html">Album</a></li>
										<li><a title="MV" href="bang-xep-hang/video-Au-My/EZEFZOB.html">MV</a></li>

                                    </ul>
                                </div>
                            </div><!--End .sub-col -->
                            <div class="subcol menu-col-1-narrow">
                                <div class="title-menu">Châu Á</div>
                                <div class="subinner_item">
                                    <ul>
                                        <li><a title="Bài hát" href="bang-xep-hang/bai-hat-Chau-A/EZEFZOC.html">Bài hát</a></li>
                                        <li><a title="Album" href="bang-xep-hang/album-Chau-A/EZEFZOC.html">Album</a></li>
										<li><a title="MV" href="bang-xep-hang/video-Chau-A/EZEFZOC.html">MV</a></li>

                                    </ul>
                                </div>
                            </div><!--End .sub-col -->
                        </div>
                 </li>
   <li><a title="Top 100" href="./top100/Nhac-Tre/EZEFZOE.html">Top 100</a>
                <div class="megamenu submenu menu-col-1">
                    <div class="subcol menu-col-1-narrow">
                        <div class="subinner_item">
                            <ul>
                                <li><a title="Việt Nam" href="./top100/Nhac-Tre/EZEFZOE.html">Việt Nam</a></li>
                                <li><a title="Âu Mỹ" href="./top100/Pop/EZEFZUB.html">Âu Mỹ</a></li>
                                <li><a title="Hàn Quốc" href="./top100/Han-Quoc/EZEFZZ9.html">Châu Á</a></li>
                                <li><a title="Hòa Tấu" href="./top100/Classical/EZEFZZC.html">Hòa Tấu</a></li>
                            </ul>
                        </div>
                    </div><!--End .sub-col -->
                </div>
            </li>
 <li><a title="Tin Tức" href="tin-tuc" >Tin Tức</a><?php include("./theme/box/ip_cat_news.php");?></li>
 </ul><!-- END .main-nav --> 
 <a title="Bật quảng cáo" href="javascript:;"  class="toggle-ads fn-banner-off active"><i class="zicon icon-power"></i>Tắt quảng cáo</a> 
 <a title="Upload" id="UserUpload" href="javascript:;" class="zicon icon-cloud fn-login"></a> </div><!-- END .container -->
	</nav>
	