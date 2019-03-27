<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();

// phan trang

if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);

if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}

if($search) {
	$search 	=  get_ascii($search);
	$sql_where 	= "news_title_ascii LIKE '%".$search."%'";
	$link_pages = "list_news.php?search=".$search."&";
}

else {
	$sql_order = "news_id ORDER BY news_id DESC";
	$link_pages = "tin-tuc";
}
	$sql_tt = "SELECT news_id  FROM table_news WHERE $sql_where $sql_order";
	$phan_trang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_pages."&p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title>Tin Tức Mới | <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">

<meta name="title" content="Tin Tức Mới | <?php  echo NAMEWEB;?>" />
<meta name="description" content="Cập nhật tin tức mới và nóng nhất về Đời sống - Xã hội, Kinh tế, Thế giới, Thể thao, Giải trí, Công nghệ và nhiều lĩnh vực khác…" />
<meta name="keywords" content="<?php  echo NAMEWEB;?>, Tin tức, Báo, Việt Nam, Hà Nội, Hồ Chí Minh, Đà Nẵng, Đời sống, Phóng sự, Pháp luật, Thế giới, Khám phá, Thị trường, Chứng khoán, Kinh tế, Bất động sản, Giáo dục, Tuyển sinh, Teen, Thể thao, Ngoại hạng, Champion, La liga, Công nghệ, điện thoại, Oto, Xe Máy, Giải trí, Showbiz, Sao Việt, Âm nhạc, VPOP, KPOP, Phim ảnh, Điện ảnh, Đẹp, Thời trang, Làm đẹp, Người Đẹp, Tình yêu, Du lịch, Ẩm thực, Sách, Cười" />
<meta property="og:title" content="Tin Tức Mới | <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="Cập nhật tin tức mới và nóng nhất về Đời sống - Xã hội, Kinh tế, Thế giới, Thể thao, Giải trí, Công nghệ và nhiều lĩnh vực khác…" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php  echo SITE_LINK."tin-tuc";?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
<?php  include("./theme/ip_header.php");?>

   <div class="wrapper-page"> <div class="wrap-body group page-bxh container">
<?=BANNER('top_banner_category','1006');?>
    <div class="wrap-content">
<div class="section">
            <div class="title-filter group">
                <div class="wrap-filter pull-left">
                    <h1 class="title-section">Tin Tức ÂM NHẠC</h1>                    
                </div><!-- END .wrap-filter -->

            </div><!-- END .title-filter -->
            <div class="row">
			<ul class="item-list album-list">
    <?php  

$arr = $mlivedb->query(" news_id, news_title, news_title_ascii, news_img, news_viewed, news_time, news_info  ","news"," $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
if (count($arr)<1) header("Location: ".SITE_LINK."the-loai/404.html");
	for($z=0;$z<count($arr);$z++) {
$news_title		= un_htmlchars($arr[$z][1]);
$news_img		= check_img($arr[$z][3]);
$news_viewed	= $arr[$z][4];
$news_info		= $arr[$z][6];
$news_url 		= check_url_news($arr[$z][1],$arr[$z][0]);
$stt2			= $z+1;
if($stt2	< 3)	$classb[$z]	=	"fjx";

?>
 <li class="item">
            <a href="<?php echo $news_url;?>" class="thumb">
                <img width="180" height="180" src="<?php echo check_img($news_img);?>" alt="<?php echo $news_title;?>" />
                <span class="icon-circle-play otr"></span>
            </a>
            <h3>
                <a href="<?php echo $news_url;?>" title="<?php echo $news_title;?>"><?php echo $news_title;?>
            </h3>

            <div class="info-meta"> 
                <ul>
                    <li>Lượt Xem: <?php echo $news_viewed;?></li>
                   
                </ul>
				<p class="ellipsis-3"><?php echo $news_info;?></p>
            </div> 
            <p class="ellipsis-3"></p></a>
        </li>
<?php 	} ?>
			  </ul>  
    


<?php  echo $phan_trang; ?>

		</div>				
</div></div>
 	 

    <div class="wrap-sidebar">
        	<?=BANNER('play_right','345');?>
          <div class="widget widget-video-countdown">
            <h3 class="title-section sz-title-sm">Tin tức khác <i class="icon-arrow"></i></h3>
			<?php  
$arr = $mlivedb->query("news_id, news_title, news_cat, news_img, news_info, news_viewed","news"," news_hot = '0' OR news_hot = '1' ORDER BY RAND() LIMIT 10");
for($z=0;$z<count($arr);$z++) {
$news_title		= un_htmlchars($arr[$z][1]);
$news_img		= check_img($arr[$z][3]);
$news_viewed	= $arr[$z][5];
$news_info		= $arr[$z][4];
$news_url		 = check_url_news($arr[$z][1],$arr[$z][0]);
$stt2			= $z+1;
if($stt2 == 20)	$class	=	'border: none; margin: none;';
		$HTML_BOX	.= "<div class=\"widget-content no-padding no-border\">
				<ul class=\"fn-list\">
				<li class=\"fn-item\">
				<a href=\"$news_url\" title=\"$news_title\" class=\"thumb fn-link\">
				<img class=\"fn-thumb\" width=\"110\" src=\"$news_img\" alt=\"$news_title\">
				</a>
				<h3 class=\"song-name ellipsis-2\"><a href=\"$news_url\" title=\"$news_title\" class=\"txt-primary fn-link fn-name\">$news_title</a></h3>
				<div class=\"inblock ellipsis fn-artist_list\">
				<h4 class=\"singer-name txt-info fn-artist\">
				$news_info
				</h4>
				</div>
				</li>
                </ul>
				</div>";
			
	}
	
?>
<?php  echo $HTML_BOX;?>
</div>  
</div>  
</div>
</div>
       <?php  include("./theme/ip_footer.php");?>
</body>
</html>
