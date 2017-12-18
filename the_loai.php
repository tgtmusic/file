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
if(isset($_GET["sort"])) $sort=$myFilter->process($_GET["sort"]);
if(isset($_GET["filter"])) $filter = $myFilter->process($_GET['filter']);
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
if($filter == 'days') $sql_f = " m_viewed_day DESC,";
	elseif($filter == 'week') 	$sql_f = " m_viewed_week DESC,";
	elseif($filter == 'month') 	$sql_f = " m_viewed_month DESC,";
	elseif(!$filter) 	$sql_f = " m_viewed_day DESC,"; 	

if($sort == 'total_play') {	
	if($filter == 'days') $sql_f = " m_viewed_day DESC,";
	elseif($filter == 'week') 	$sql_f = " m_viewed_week DESC,";
	elseif($filter == 'month') 	$sql_f = " m_viewed_month DESC,";
	elseif(!$filter) 	$sql_f = " m_viewed_day DESC,"; 	
	$sql_order = " ORDER BY $sql_f m_viewed DESC";}
	elseif($sort == 'release_date') 	$sql_order = " ORDER BY m_time DESC";
	elseif($sort == 'hot') 	$sql_order = " ORDER BY m_hot DESC";
	elseif(!$sort) 			$sql_order = " ORDER BY $sql_f m_viewed DESC";
	if($sort) $cimf = "&filter=$filter";
		if($sort) $cim2 = "&sort=$sort";
	// phan trang
	$sql_tt = "SELECT m_id  FROM table_data WHERE m_cat LIKE '%,".$id.",%' AND m_type = 1 $sql_order LIMIT ".LIMITSONG;

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_viewed ,m_time, m_hot, m_hq  ","data"," m_cat LIKE '%,".$id.",%' AND m_type = 1 $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$cat_name = get_data("theloai","cat_name"," cat_id = '".$id."'");
	$link_s = "the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".$cim2.$cimf."&p=#page#";
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s,"");
	$name_key = str_replace ('-', ' ',replace($cat_name));
	if (count($arr_song)<1) header("Location: ".SITE_LINK."404.html");

?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $cat_name;?> | Nhạc mới hay nhất nhạc <?php  echo $cat_name;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $cat_name;?> | Nhạc mới hay nhất nhạc <?php  echo $cat_name;?> " />
<meta name="description" content="<?php  echo $cat_name;?> - Tất cả nhạc <?php  echo $cat_name;?>  mới phát hành được chọn lọc đầy đủ. Kho nhạc <?php  echo $cat_name;?>  hay nhất cập nhật thường xuyên nhanh nhất" />
<meta name="keywords" content="<?php  echo $name_key;?> , nhac <?php  echo $name_key;?> , album <?php  echo $name_key;?> , nhac moi nhat, nhac hay nhat, <?php  echo $name_key;?>  chon locs" />
<meta property="og:title" content="<?php  echo $cat_name;?> | nhạc mới hay nhất nhạc <?php  echo $cat_name;?> " />                
<meta property="og:description" content="<?php  echo $cat_name;?> - Tất cả nhạc <?php  echo $cat_name;?>  mới phát hành được chọn lọc đầy đủ. Kho nhạc <?php  echo $cat_name;?>  hay nhất cập nhật thường xuyên nhanh nhất" />
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php echo SITE_LINK."the-loai-album/".replace($cat_name)."/".en_id($id).".html";?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>

    <div class="wrapper-page"> <div class="wrap-body group page-artist-genre container">
<?=BANNER('top_banner_category','1006');?>
    <div class="wrap-2-col">
        <!-- .sidebar -->
        <div class="sidebar fn-sidebar-fixed">
			<?php  include("./theme/box/cat_mp3.php");?>
	</div>
	   <!-- END .sidebar -->
        <!--2-->
		 <!-- END .sidebar -->
		        <div class="zcontent">
            <h1 class="title-section"><?=$cat_name;?></h1>
            <div class="tab-menu group">
    <ul>
        <li class="<?php  if($sort=='hot') echo 'active';?>"><a href="<?="the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".'&sort=hot'.str_replace("".$cim2."","",$cim2);?>" title="Nổi bật">Nổi bật</a></li>
        <li class="<?php  if(!$sort) echo 'active'; if($sort=='total_play') echo 'active';?>"><a href="<?="the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".'&sort=total_play'.str_replace("".$cim2."","",$cim2);?>" title="Nghe nhiều">Nghe nhiều</a></li>
        <li class="<?php  if($sort=='release_date') echo 'active';?>"><a href="<?="the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".'&sort=release_date'.str_replace("".$cim2."","",$cim2);?>" title="Mới nhất">Mới nhất</a></li>
    </ul>
</div>
<?php if(!$sort | $sort=='total_play') { ?>
<div class="custom-filter pull-right">
    <span>Sắp xếp theo:</span>
    <ul>
        <li><a class="<?php  if(!$filter) echo 'active'; if($filter=='days') echo 'active';?>" href="<?="the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=days'.str_replace("".$cimf."","",$cimf);?>" title="Ngày qua">Ngày qua</a></li>
        <li><a class="<?php  if($filter=='week') echo 'active';?>" href="<?="the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=week'.str_replace("".$cimf."","",$cimf);?>" title="Tuần qua">Tuần qua</a></li>
        <li><a class="<?php  if($filter=='month') echo 'active';?>" href="<?="the-loai-bai-hat/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=month'.str_replace("".$cimf."","",$cimf);?>" title="Tháng qua">Tháng qua</a></li>
    </ul>
</div>
<?php } ?>

<div class="clearfix"></div>
            <div class="tab-pane">
  <div class="row">
                    <div class="col-12">
                        <div class="list-item full-width">
<ul>
<?php  
for($i=0;$i<count($arr_song);$i++) {
	$singer_name 	=	GetSingerName($arr_song[$i][2]);
	$get_singer = GetSinger($arr_song[$i][2]);
	$type 			= check_type($arr_song[$i][5],$arr_song[$i][0]);
	$song_url 		= check_url_song($arr_song[$i][1]."-".$singer_name,$arr_song[$i][0],$arr_song[$i][5]);
	$download		= 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');
	$checkhq		= check_song($arr_song[$i][5],$arr_song[$i][6]);
?>
                                <li id="song<?php  echo en_id($arr_song[$i][0]); ?>" class="group fn-song" data-type="song" data-id="<?php  echo en_id($arr_song[$i][0]); ?>" data-code="ZmcmyLmNlXiiWCsyLFxybHkG" data-active="show-tool">
<div class="info-dp pull-left">
                                        <h3 class="txt-primary ellipsis">
                                            <a href="<?php  echo $song_url; ?>" title="Bài Hát <?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo $singer_name; ?>" class="_trackLink" tracking="_frombox=artist_all_song_">
                                                <?php  echo un_htmlchars(rut_ngan($arr_song[$i][1],7)); ?> - <span><?=rut_ngan($singer_name,6)?></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="bar-chart">
                                        <span class="fn-bar"  style="width:<?php echo $arr_song[$i][3]/50;?>%;"></span>
                                    </div>
                                <div class="tool-song">
                                        <div class="i25 i-small download">
                                            <a title="Tải về" class="fn-dlsong" data-item="#song<?php  echo en_id($arr_song[$i][0]); ?>" href="<?php  echo $download;?>"></a>
                                        </div>
<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$arr_song[$i][0]?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$arr_song[$i][0]?>);"></a></div>
<!-- End playlist ADD -->
                                        <div class="i25 i-small share">
                                            <a title="Chia sẻ" class="fn-share" data-item="#song<?php  echo en_id($arr_song[$i][0]); ?>" href="<?php  echo $song_url; ?>"></a>
                                        </div>
                                    </div>
                                </li>
<?php  } ?> </ul>
</div>
        </div></div>

<?php  echo $phantrang; ?>

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