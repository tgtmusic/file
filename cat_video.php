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
if(isset($_GET["sort"])) $sort = $myFilter->process($_GET['sort']);
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
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
	elseif($sort == 'release_date') 	$sql_order = " ORDER BY m_id DESC";
	elseif($sort == 'hot') 	$sql_order = " ORDER BY m_hot DESC";
	elseif(!$sort) 			$sql_order = " ORDER BY $sql_f m_viewed DESC";
	if($sort) $cimf = "&filter=$filter";
		if($sort) $cim2 = "&sort=$sort";
	// phan trang
	$sql_tt = "SELECT m_id  FROM table_data WHERE  m_cat LIKE '%,".$id.",%'  AND m_type = 2 $sql_order LIMIT ".LIMITSONG;

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_viewed ,m_time, m_img, m_hot, m_new ","data","  m_cat LIKE '%,".$id.",%'  AND m_type = 2 $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$cat_name = get_data("theloai","cat_name"," cat_id = '".$id."'");
	$link_s = "the-loai-video/".replace($cat_name)."/".en_id($id).".html".$cim2.$cimf."&p=#page#";
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s,"");
	$name_key = str_replace ('-', ' ',replace($cat_name));
	if (count($arr_song)<1) header("Location: ".SITE_LINK."404.html");

?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $cat_name;?> | MV mới clip hot nhất <?php  echo $cat_name;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">

<meta name="title" content="<?php  echo $cat_name;?> | MV mới clip hot nhất <?php  echo $cat_name;?>" />
<meta name="description" content="<?php  echo $cat_name;?> - Tất cả MV <?php  echo $cat_name;?> mới nhất được chọn lọc đầy đủ. Kho video clip <?php  echo $cat_name;?> chất lượng cao HD 720 1080" />
<meta name="keywords" content="video <?php  echo $name_key;?>, mv <?php  echo $name_key;?>, clip nhac <?php  echo $name_key;?>, <?php  echo $name_key;?> HD, MV chat luong cao, video clip <?php  echo $name_key;?>, tat ca MV <?php  echo $name_key;?>" />
<meta property="og:title" content="<?php  echo $cat_name;?> | MV mới clip hot nhất <?php  echo $cat_name;?>" />                
<meta property="og:description" content="<?php  echo $cat_name;?> - Tất cả MV <?php  echo $cat_name;?> mới nhất được chọn lọc đầy đủ. Kho video clip <?php  echo $cat_name;?> chất lượng cao HD 720 1080" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php echo SITE_LINK."the-loai-video/".replace($cat_name)."/".en_id($id).".html";?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>

 <div class="wrapper-page"> <div class="wrap-body group page-artist-genre container">
 	 <div class="top_banner"><?=BANNER('top_banner_category','1006');?></div>
    <div class="wrap-2-col">
        <!-- .sidebar -->
        <div class="sidebar fn-sidebar-fixed">
<?php  include("./theme/box/cat_video.php");?>
        </div>
        <!-- END .sidebar -->
        <!--2-->
		        <div class="zcontent">
            <h1 class="title-section"><?=$cat_name;?></h1>
            <div class="tab-menu group">
    <ul>
        <li class="<?php  if($sort=='hot') echo 'active';?>"><a href="<?="the-loai-video/".replace($cat_name)."/".en_id($id).".html".'&sort=hot'.str_replace("".$cim2."","",$cim2);?>" title="Nổi bật">Nổi bật</a></li>
        <li class="<?php  if(!$sort) echo 'active'; if($sort=='total_play') echo 'active';?>"><a href="<?="the-loai-video/".replace($cat_name)."/".en_id($id).".html".'&sort=total_play'.str_replace("".$cim2."","",$cim2);?>" title="Nghe nhiều">Nghe nhiều</a></li>
        <li class="<?php  if($sort=='release_date') echo 'active';?>"><a href="<?="the-loai-video/".replace($cat_name)."/".en_id($id).".html".'&sort=release_date'.str_replace("".$cim2."","",$cim2);?>" title="Mới nhất">Mới nhất</a></li>
    </ul>
</div>
<?php if(!$sort | $sort=='total_play') { ?>
<div class="custom-filter pull-right">
    <span>Sắp xếp theo:</span>
    <ul>
        <li><a class="<?php  if(!$filter) echo 'active'; if($filter=='days') echo 'active';?>" href="<?="the-loai-video/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=days'.str_replace("".$cimf."","",$cimf);?>" title="Ngày qua">Ngày qua</a></li>
        <li><a class="<?php  if($filter=='week') echo 'active';?>" href="<?="the-loai-video/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=week'.str_replace("".$cimf."","",$cimf);?>" title="Tuần qua">Tuần qua</a></li>
        <li><a class="<?php  if($filter=='month') echo 'active';?>" href="<?="the-loai-video/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=month'.str_replace("".$cimf."","",$cimf);?>" title="Tháng qua">Tháng qua</a></li>
    </ul>
</div>
<?php } ?>

<div class="clearfix"></div>
            <div class="tab-pane">

<?php  
for($i=0;$i<count($arr_song);$i++) {
	$singer_name 	=	GetSingerName($arr_song[$i][2]);
	$get_singer = GetSinger($arr_song[$i][2]);
	$type = check_type($arr_song[$i][5],$arr_song[$i][0]);
	$video_url = url_link($arr_song[$i][1]."-".$singer_name,$arr_song[$i][0],'xem-video');
	$download = 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');
	if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"<div class=\"row\">";
		
	}
		if($i == 3 || $i == 7 || $i == 11 || $i == 15)	{
		$class2[$i]	=	"</div>";
	}
	if ($arr_song[$i][6] == '1') {
		$status_song = '<span class="badge hot" style="display:block;"></span>';
	}
	elseif ($arr_song[$i][7] == '1') {
		$status_song = '<span class="badge new"></span>'; 
	}
	else { $status_song = ''; }
?>
<?php  echo $class1[$i]; ?>
<div class="pone-of-four">
            <div class="item">
                <a href="<?php  echo $video_url; ?>" class="thumb" title="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>"> 
                    <img src="<?php  echo check_img($arr_song[$i][5]); ?>" width="182px" height="102px" alt="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" /> 
                    <span class="icon-circle-play otr"></span> 
                </a> 
                <div class="description">
                    <h3 class="title-item ellipsis">
                        <a href="<?php  echo $video_url; ?>" title="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" class="txt-primary"><?php  echo un_htmlchars($arr_song[$i][1]); ?></a>
                    </h3>
                    <div class="inblock ellipsis">
                        
                        <h4 class="title-sd-item">
                             <span class="txt-info"><?=$get_singer?></span>
                        </h4>
                    </div>
                </div>
                <?php echo $status_song;?>
            </div>
        </div><?php  echo $class2[$i]; ?>
<?php 	} ?>
 </div>
        </div>

<?php  echo $phantrang; ?>

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