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
if(isset($_GET["sort"])) $sort = $myFilter->process($_GET['sort']);
if(isset($_GET["filter"])) $filter = $myFilter->process($_GET['filter']);

if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}

	if($filter == 'days') $sql_f = " album_viewed_day DESC,";
	elseif($filter == 'week') 	$sql_f = " album_viewed_week DESC,";
	elseif($filter == 'month') 	$sql_f = " album_viewed_month DESC,";
	elseif(!$filter) 	$sql_f = " album_viewed_day DESC,";
	if($sort == 'total_play') {	
	if($filter == 'days') $sql_f = " album_viewed_day DESC,";
	elseif($filter == 'week') 	$sql_f = " album_viewed_week DESC,";
	elseif($filter == 'month') 	$sql_f = " album_viewed_month DESC,";
	elseif(!$filter) 	$sql_f = " album_viewed_day DESC,"; 	
	$sql_order = " ORDER BY $sql_f album_viewed DESC";}
	elseif($sort == 'release_date') $sql_order = " ORDER BY album_id DESC";
	elseif($sort == 'hot') 	$sql_order = " ORDER BY album_hot DESC";
	elseif(!$sort) 			$sql_order = " ORDER BY $sql_f album_viewed DESC";
	if($sort) $cimf = "&filter=$filter";
		if($sort) $cim2 = "&sort=$sort";
	// phan trang
	$sql_tt = "SELECT album_id  FROM table_album WHERE  album_cat LIKE '%,".$id.",%' AND album_type = 0 $sql_order LIMIT ".LIMITSONG;

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_album = $mlivedb->query(" album_id, album_name, album_singer, album_viewed, album_img, album_type, album_cat, album_poster, album_time, album_song,album_hot,album_new ","album"," album_cat LIKE '%,".$id.",%' AND album_type = 0 $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$cat_name = un_htmlchars(get_data("theloai","cat_name"," cat_id = '".$id."'"));
	$link_s = "the-loai-album/".replace($cat_name)."/".en_id($id).".html".$cim2.$cimf."&p=#page#";
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s,"");
	$name_key = str_replace ('-', ' ',replace($cat_name));
	if (count($arr_album)<1) header("Location: ".SITE_LINK."404.html");

?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $cat_name;?> | Album mới hay nhất nhạc <?php  echo $cat_name;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $cat_name;?> | Album mới hay nhất nhạc <?php  echo $cat_name;?> " />
<meta name="description" content="<?php  echo $cat_name;?> - Tất cả album <?php  echo $cat_name;?>  mới phát hành được chọn lọc đầy đủ. Kho nhạc <?php  echo $cat_name;?>  hay nhất cập nhật thường xuyên nhanh nhất" />
<meta name="keywords" content="<?php  echo $name_key;?> , nhac <?php  echo $name_key;?> , album <?php  echo $name_key;?> , album moi nhat, album hay nhat, <?php  echo $name_key;?>  chon locs" />
<meta property="og:title" content="<?php  echo $cat_name;?> | Album mới hay nhất nhạc <?php  echo $cat_name;?> " />                
<meta property="og:description" content="<?php  echo $cat_name;?> - Tất cả album <?php  echo $cat_name;?>  mới phát hành được chọn lọc đầy đủ. Kho nhạc <?php  echo $cat_name;?>  hay nhất cập nhật thường xuyên nhanh nhất" />
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php echo SITE_LINK."the-loai-album/".replace($cat_name)."/".en_id($id).".html";?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
    <div class="wrapper-page"> <div class="wrap-body group page-artist-genre container">
	<?=BANNER('top_banner_category','1006');?>
    <div class="wrap-2-col">
        <!-- .sidebar -->
        <div class="sidebar fn-sidebar-fixed">
<?php  include("./theme/box/cat_album.php");?>
        </div>
        <!-- END .sidebar -->
        <!--2-->
 <div class="zcontent">
            <h1 class="title-section"><?=$cat_name;?></h1>
            <div class="tab-menu group">
    <ul>
        <li class="<?php  if($sort=='hot') echo 'active';?>"><a href="<?="the-loai-album/".replace($cat_name)."/".en_id($id).".html".'&sort=hot'.str_replace("".$cim2."","",$cim2);?>" title="Nổi bật">Nổi bật</a></li>
        <li class="<?php  if(!$sort) echo 'active'; if($sort=='total_play') echo 'active';?>"><a href="<?="the-loai-album/".replace($cat_name)."/".en_id($id).".html".'&sort=total_play'.str_replace("".$cim2."","",$cim2);?>" title="Nghe nhiều">Nghe nhiều</a></li>
        <li class="<?php  if($sort=='release_date') echo 'active';?>"><a href="<?="the-loai-album/".replace($cat_name)."/".en_id($id).".html".'&sort=release_date'.str_replace("".$cim2."","",$cim2);?>" title="Mới nhất">Mới nhất</a></li>
    </ul>
    <div class="func-display">
        <a  class="zicon icon-list "></a>
        <a  class="zicon icon-grid  active "></a>
    </div>
</div>
<?php if(!$sort | $sort=='total_play') { ?>
<div class="custom-filter pull-right">
    <span>Sắp xếp theo:</span>
    <ul>
        <li><a class="<?php  if(!$filter) echo 'active'; if($filter=='days') echo 'active';?>" href="<?="the-loai-album/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=days'.str_replace("".$cimf."","",$cimf);?>" title="Ngày qua">Ngày qua</a></li>
        <li><a class="<?php  if($filter=='week') echo 'active';?>" href="<?="the-loai-album/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=week'.str_replace("".$cimf."","",$cimf);?>" title="Tuần qua">Tuần qua</a></li>
        <li><a class="<?php  if($filter=='month') echo 'active';?>" href="<?="the-loai-album/".replace($cat_name)."/".en_id($id).".html".$cim2.'&filter=month'.str_replace("".$cimf."","",$cimf);?>" title="Tháng qua">Tháng qua</a></li>
    </ul>
</div>
<?php } ?>
<div class="clearfix"></div>
            <div class="tab-pane">
<?php 
for($i=0;$i<count($arr_album);$i++) {
	$singer_name 	=	GetSingerName($arr_album[$i][2]);
	$get_singer = GetSinger($arr_album[$i][2]);
	$user_name = get_user($arr_album[$i][7]);
	$album_url = url_link($arr_album[$i][1].'-'.$singer_name,$arr_album[$i][0],'nghe-album');
	$user_url = url_link($user_name,$arr_album[$i][7],'user');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"<div class=\"row\">";
		
	}
		elseif($i == 3 || $i == 7 || $i == 11 || $i == 15)	{
		$class2[$i]	=	"</div>";
	}
	if ($arr_album[$i][10] == '1') {
		$status_album = '<span class="badge hot" style="display:block;"></span>';
	}
	elseif ($arr_album[$i][11] == '1') {
		$status_album = '<span class="badge new"></span>'; 
	}
	else { $status_album = ''; }
?><?php  echo $class1[$i]; ?>
        <div class="pone-of-four">
            <div class="item">
                <a href="<?php  echo $album_url; ?>" class="thumb" title="Album <?php  echo $arr_album[$i][1]; ?> - <?php  echo un_htmlchars($singer_name);?>"> 
                    <img width="200" class="img-responsive" src="<?php  echo check_img($arr_album[$i][4]);?>" alt="<?php  echo $arr_album[$i][1]; ?> - <?php  echo un_htmlchars($singer_name);?>" /> 
                    <span class="icon-circle-play otr"></span> 
                </a> 
                <div class="description">
                    <h3 class="title-item ellipsis">
                        <a href="<?php  echo $album_url; ?>" title="Album <?php  echo $arr_album[$i][1]; ?> - <?php  echo un_htmlchars($singer_name);?>" class="txt-primary"><?php  echo $arr_album[$i][1]; ?></a>
                    </h3>
                    <div class="inblock ellipsis">
                        <h4 class="title-sd-item">
                            <span class="txt-info"><?=$get_singer?></span>
                        </h4>
                    </div>
                </div>
                
                <?php echo $status_album;?>
                
            </div>
        </div><?php  echo $class2[$i]; ?>
<?php 	} ?>
</div>


<?php  echo $phantrang; ?>

  
                     </div>
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