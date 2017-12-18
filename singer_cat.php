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

if($page > 0 && $page!= "")
	$start=($page-1) * 30;
else{
	$page = 1;
	$start=0;
}

	// phan trang
	$sql_tt = "SELECT singer_id  FROM table_singer WHERE singer_cat LIKE '%,".$id.",%' ORDER BY singer_hot DESC,singer_id ASC LIMIT 750";

	$rStar = 30 * ($page -1 );
	$arr_singer = $mlivedb->query(" singer_id, singer_name, singer_img, singer_type, singer_cat,singer_viewed,singer_like ","singer"," singer_cat LIKE '%,".$id.",%' ORDER BY singer_hot DESC,singer_id ASC LIMIT ".$rStar .", 30");
	$cat_name = get_data("theloai","cat_name"," cat_id = '".$id."'");

	$link_s = "the-loai-nghe-si/".replace($cat_name)."/".en_id($id).".html"."&p=#page#";
	$phantrang = linkPage($sql_tt,30,$page,$link_s,"");
	$name_key = str_replace ('-', ' ',replace($cat_name));
	if (count($arr_singer)<1) header("Location: ".SITE_LINK."the-loai/404.html");

?>

<!DOCTYPE html>
<html lang="vi">
    <head>
        <title>Thể loại nghệ sĩ <?php  echo $cat_name;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">

<meta name="title" content="Thể loại nghệ sĩ <?php  echo $cat_name;?>" />
<meta name="description" content="Danh mục nghệ sĩ <?php  echo $cat_name;?> các ca sĩ hot nhất, nhóm nhạc nổi tiếng nhất <?php  echo $cat_name;?> sắp xếp theo hot và alphabet cập nhật liên tục" />
<meta name="keywords" content="nghe si <?php  echo $name_key;?>, the loai, nghe si, ca si, nhom nhac, ban nhac, noi tieng, alphabet" />
<meta property="og:title" content="Thể loại nghệ sĩ <?php  echo $cat_name;?>" />                
<meta property="og:description" content="Danh mục nghệ sĩ <?php  echo $cat_name;?> các ca sĩ hot nhất, nhóm nhạc nổi tiếng nhất <?php  echo $cat_name;?> sắp xếp theo hot và alphabet cập nhật liên tục" />     
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php echo SITE_LINK."the-loai-nghe-si/".replace($cat_name)."/".en_id($id).".html";?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>

    <div class="wrapper-page"> <div class="wrap-body group page-artist-genre container">

    <div class="wrap-2-col">
        <!-- .sidebar -->
        <div class="sidebar fn-sidebar-fixed">
<?php  include("./theme/box/cat_album.php");?>
        </div>
        <!-- END .sidebar -->
        <!--2-->
 <div class="zcontent">
            <h1 class="title-section">Nghệ Sĩ <?=$cat_name;?></h1>


<div class="clearfix"></div>
            <div class="tab-pane">
<?php  
echo '<div>';
for($i=0;$i<count($arr_singer);$i++) {
	$singer_name 	=	un_htmlchars($arr_singer[$i][1]);
	$singer_img = check_img($arr_singer[$i][2]);
	$singer_url = 'nghe-si/'.replace($singer_name);
		if($i == 0 || $i == 5 || $i == 10 || $i == 15 || $i == 20 || $i == 25 || $i == 30 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
	}
?><?php  echo $class1[$i]; ?>
               <div class="pone-of-five" id="artist<?=en_id($arr_singer[$i][0])?>" data-from="fav" data-name="<?=$singer_name?>" data-type="artist" data-id="<?=en_id($arr_singer[$i][0])?>">
            <div class="item" >
             <span class="thumb"> <a href="<?php echo $singer_url;?>" class="thumb" title="Nghệ sĩ <?=$singer_name?>" >
                   <img src="<?=$singer_img?>" alt="Nghệ sĩ <?=$singer_name?>" /></a>
                    <span class="func-icon">
                     <b class="zicon xicon fn-rmitem none" data-item="#artist<?=en_id($arr_singer[$i][0])?>" title="Xóa"></b>
<div id="Load_SingerA_<?=$arr_singer[$i][0]?>"><a href="javascript:void(0);" onclick="ADDFAV(<?=$arr_singer[$i][0]?>,4);" class="zicon addicon fn-follow" data-id="<?=en_id($arr_singer[$i][0])?>" data-name="<?=$singer_name; ?>" data-type="artist"></a></div>	             
				   </span> 
                </span> 
                <div class="description text-center">
                    <h3 class="title-item fw7"><a href="<?=$singer_url?>" title="Nghệ sĩ <?=$singer_name?>" class="txt-primary"><?=$singer_name?></a></h3>
                    <span class="txt-info"><s ><?=$arr_singer[$i][6]?></s> quan tâm</span>								
                </div><!-- END .description -->
            </div><!-- END .item -->

        </div><!-- END .pone-of-five -->

<?php } echo '</div>'; ?>
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