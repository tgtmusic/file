<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/cache.php");
#$cache = new cache();
#if ( $cache->caching ) {
?>

<!DOCTYPE html>
<html lang="vi">
    <head>
        <title>Bảng Xếp Hạng Âm Nhạc | <?php echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="Bảng Xếp Hạng Âm Nhạc | <?php echo NAMEWEB;?>" />
<meta name="description" content="Danh sách nhạc được nghe nhiều nổi bật nhất, được đánh giá cao trong tuần từ các BXH âm nhạc uy tín nổi tiếng châu Á, Âu Mỹ và thế giới: <?php echo NAMEWEB;?>, MTV, Billboard, Soompi, Channel V" />
<meta name="keywords" content="bang xep hang, bxh, bxh am nhac, music chart, zing chart, z-score, billboard, soompi, mnet, oricon" />
<meta property="og:title" content="Bảng Xếp Hạng Âm Nhạc | <?php echo NAMEWEB;?>" />                
<meta property="og:description" content="Danh sách nhạc được nghe nhiều nổi bật nhất, được đánh giá cao trong tuần từ các BXH âm nhạc uy tín nổi tiếng châu Á, Âu Mỹ và thế giới: <?php echo NAMEWEB;?>, MTV, Billboard, Soompi, Channel V" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php  echo SITE_LINK."bang-xep-hang/index.html";?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
	 <div class="wrapper-page"> 
	 <style type="text/css"> .box-chart-ov .thumb img { height: auto !important; }</style>
	 <div class="title-page align-center bxh-bg">
	 <h1 class="title-section">Bảng Xếp Hạng</h1> 
	 <p>Cập nhật vào Thứ Hai hàng tuần, dữ liệu được thống kê từ <?=NAMEWEB?> (BXH <?=NAMEWEB?>) và tham khảo các BXH âm nhạc uy tín khác như Billboard (US-UK), Soompi (K-Pop)</p>
	 </div>
	 <div class="wrap-body page-bxh container"> 
	 <div class="wrap-fullwidth-content">
<div class="row"> <div class="col-12"> <div class="chart-social"> <span class="text-topic">Top 40 Social</span> <ul> 
          <?php 
                    $hotSinger = $mlivedb->query("  singer_id, singer_name, singer_img, singer_like  ","singer"," singer_hot = 1 ORDER BY singer_like DESC LIMIT 5");
                    for($i=0;$i<count($hotSinger);$i++) {
					$singer_name = un_htmlchars($hotSinger[$i][1]);
					$singer_url = 'nghe-si/'.replace($singer_name);
					 $number = $i+1;
 if($i==0)	$class[$i]	=	"class=\"first-item\"";
                    ?>
 <li> <a href="<?=$singer_url;?>" class="outter-thumb _trackLink" tracking="_frombox=chart_overviewartist_vietnam_0<?php  echo $number;?>" title="Nghệ sĩ <?php  echo $hotSinger[$i][1];?>"> <img src="<?php  echo check_img($hotSinger[$i][2]);?>" alt="Nghệ sĩ <?php  echo $hotSinger[$i][1];?>" class="img-responsive" /> <span class="countdown po-0<?php  echo $number;?>">0<?php  echo $number;?></span> </a> <div class="ui-meta"> <h3 class="txt-primary ellipsis"><a href="<?=$singer_url;?>" title="Nghệ sĩ <?php  echo $hotSinger[$i][1];?>" class="_trackLink" tracking="_frombox=chart_overviewartist_vietnam_0<?php  echo $number;?>"><?php  echo $hotSinger[$i][1];?></a></h3> <span class="txt-info ellipsis"><s class="fn-followed fn-number" data-id="<?php  echo en_id($hotSinger[$i][0]);?>" data-type="artist" data-name="<?php  echo $hotSinger[$i][1];?>"><?php  echo $hotSinger[$i][3];?></s> quan tâm</span> </div> </li>   
 <?php  } ?>
 </ul> <a href="./bang-xep-hang/top-40-social/EZEFZOA.html" class="btn-gray" title="Top 40 social">Xem thêm</a>
 </div><!-- /.chart-social --> </div><!-- /.col-12 --></div>
 
 <div class="row"> 
 <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> 
 <h2 class="title"> <a href="./bang-xep-hang/bai-hat-Viet-Nam/EZEFZOA.html">BXH Bài Hát Việt Nam <i class="icon-arrow-right-1"></i></a> <a title="Nghe tất cả" href="./bang-xep-hang/bai-hat-Viet-Nam/EZEFZOA.html&act=play" class="picon icon-play-all"></a> </h2>
 <ul>

	<?php  echo bang_xep_hang('bxh_vn');?>
                </ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 -->
 <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/bai-hat-Au-My/EZEFZOB.html">BXH Bài Hát Âu Mỹ <i class="icon-arrow-right-1"></i></a> <a title="Nghe tất cả" href="./bang-xep-hang/bai-hat-Au-My/EZEFZOB.html&act=play" class="picon icon-play-all"></a> </h2> <ul>
					<?php  echo bang_xep_hang('bxh_am');?>
</ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 --> 
 <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/bai-hat-Chau-A/EZEFZOC.html">BXH Bài Hát Châu Á <i class="icon-arrow-right-1"></i></a> <a title="Nghe tất cả" href="./bang-xep-hang/bai-hat-Chau-A/EZEFZOC.html&act=play" class="picon icon-play-all"></a> </h2> <ul>
					<?php  echo bang_xep_hang('bxh_ca');?>
 </ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 --> <div class="clearfix"></div> </div><!-- END .row -->
 <div class="row"> <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/video-Viet-Nam/EZEFZOA.html">BXH MV Việt Nam <i class="icon-arrow-right-1"></i></a> <a title="Xem tất cả" href="./bang-xep-hang/video-Viet-Nam/EZEFZOA.html&act=play" class="picon icon-play-all"></a> </h2> <ul>
<?php  echo bxh_video('bxh_vn');?>
</ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 -->
      <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/video-Au-My/EZEFZOB.html">BXH MV Âu Mỹ <i class="icon-arrow-right-1"></i></a> <a title="Xem tất cả" href="./bang-xep-hang/video-Au-My/EZEFZOB.html&act=play" class="picon icon-play-all"></a> </h2> <ul>  	
                	<?php  echo bxh_video('bxh_am');?>
</ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 -->
 <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/video-Chau-A/EZEFZOC.html">BXH MV Châu Á <i class="icon-arrow-right-1"></i></a> <a title="Xem tất cả" href="./bang-xep-hang/video-Chau-A/EZEFZOC.html&act=play" class="picon icon-play-all"></a> </h2> <ul>
                	<?php  echo bxh_video('bxh_ca');?>
 </ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 --> </div><!-- END .row --> 
 
<div class="row"> <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/album-Viet-Nam/EZEFZOA.html">BXH Album Việt Nam <i class="icon-arrow-right-1"></i></a> </h2> <ul>
                	<?php  echo bxh_album('bxh_vn');?>
             </ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 -->
 <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/album-Au-My/EZEFZOB.html">BXH Album Âu Mỹ <i class="icon-arrow-right-1"></i></a> </h2> <ul>
                	<?php  echo bxh_album('bxh_am');?>
                
</ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 --> <div class="col-4"> <div class="box-chart-ov bordered non-bg-rank"> <h2 class="title"> <a href="./bang-xep-hang/album-Chau-A/EZEFZOC.html">BXH Album Châu Á <i class="icon-arrow-right-1"></i></a> </h2> <ul>
                	<?php  echo bxh_album('bxh_ca');?>
              </ul>
 </div><!-- END .bordered --> </div><!-- END .col-4 --> </div><!-- END .row --> </div><!-- END .wrap-content --></div><!-- END .container --> </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php  
#} $cache->close();
?>