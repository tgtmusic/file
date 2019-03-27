<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_media = $myFilter->process($_GET['id']);
$id_media	=	del_id($id_media);
mysqli_query($link_music,"UPDATE table_news SET news_viewed = news_viewed+1 WHERE news_id = '".$id_media."'");
$news = $mlivedb->query("news_id, news_title, news_cat, news_img, news_info, news_viewed, news_poster, news_infofull","news"," news_id = '".$id_media."' ORDER BY news_id DESC ");
$news_title	=	un_htmlchars($news[0][1]);
$news_info      =       $news[0][7];
$news_info_ngan      =       $news[0][4];
$new_img = check_img($news[0][3]);
$luotnghe = get_data("news","news_viewed"," news_id = '".$news[0][5]."'");
$cat = get_data("catnews","cat_name"," cat_id = '".$news[0][2]."'");
$news_url = url_link($news_title.'-'.$title,$news[0][0],'tin-tuc');
if (count($news)<1) header("Location: ".SITE_LINK."the-loai/404.html");
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php echo $news_title;?> | <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php echo $news_title;?> | <?php  echo NAMEWEB;?>" />
<meta name="description" content="<?php echo $news_info_ngan;?>" />
<meta name="keywords" content="<?php echo $news_info_ngan;?>" />
<meta property="og:title" content="<?php echo $news_title;?> | <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="<?php echo $news_info_ngan;?>" />        
<meta property="og:image" content="<?php  echo $new_img;?>" />
<meta property="og:image:url" content="<?php  echo $new_img;?>" />
<meta property="og:url" content="<?php  echo $news_url;?>" />
<link rel="image_src" href="<?php  echo $new_img;?>" />
<?php  include("./theme/ip_java.php");?>

</head>
<body>
<?php  include("./theme/ip_header.php");?>

   <div class="wrapper-page">
<div class="container">
<?=BANNER('top_banner_home','1006');?>
    <div class="wrap-content">
        <div class="section mt0">

            <div class="title-filter group">
                <div class="wrap-filter pull-left">
                    <h1 class="title-section"><?php  echo $news_title; ?></h1>                    
                </div><!-- END .wrap-filter -->

            </div><!-- END .title-filter -->
          <div class="padding">

<div style="font-weight: bold; padding-bottom:20px;">[M Live] - <?php  echo $news_info_ngan; ?></div>

<?php  echo $news_info; ?>

</div>
</div>
<!--- Binh luan --->
<div class="section box-comment">
<h3 class="title-section"> <div style="float:right">
				<a class="active fn-chart" href="javascript:;" id="btnCommentFB">FB</a>
				| <a class="fn-chart" href="javascript:;" id="btnCommentSite">WEBSITE</a>
				</div></h3>	
			</div>
<div id="divFBBox" class="tab-pane-cm ">
<div class="fb-comments" data-href="<?=$news_url?>" data-width="650" data-numposts="5"></div>
</div>
<div id="divWEBBox" class="tab-pane-cm none">
<?=cam_nhan($id_media,1,4);?>
</div>
<!-- end binh luan -->
<br/>
</div>
	
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
				<img class=\"fn-thumb\" width=\"110\"  height=\"70\" src=\"$news_img\" alt=\"$news_title\">
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

</div></div>
       <?php  include("./theme/ip_footer.php");?>


</body>
</html>