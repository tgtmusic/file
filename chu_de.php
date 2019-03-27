<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/cache.php");
$cache = new cache();
//if ( $cache->caching ) {
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title>Nhạc Theo Chủ Đề | <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">

<meta name="title" content="Nhạc Theo Chủ Đề | <?php  echo NAMEWEB;?>" />
<meta name="description" content="Nhạc Hot chọn lọc, nhạc bất hủ, the best of theo chủ đề. Tuyển tập danh sách bài hát và MV hay nhất nghe nhiều nhất từ trước đến nay được cập nhật liên tục" />
<meta name="keywords" content="chu de, nhac hot, nhac bat hu, the best of, music collection, bai hat hay nhat, mv hay nhat, nhac nghe nhieu nhat" />
<meta property="og:title" content="Nhạc Theo Chủ Đề | <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="Nhạc Hot chọn lọc, nhạc bất hủ, the best of theo chủ đề. Tuyển tập danh sách bài hát và MV hay nhất nghe nhiều nhất từ trước đến nay được cập nhật liên tục" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/topic_cover.jpg" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/topic_cover.jpg" />
<meta property="og:url" content="<?php  echo SITE_LINK."chu-de";?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/topic_cover.jpg" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
    <div class="top_banner"><?=BANNER('top_banner_bxh','1006');?></div>
	<div class="wrapper-page"> <div class="top-banner-cate" style="background: #001131;"> <div class="container"> <img src="<?php  echo SITE_LINK;?>theme/images/topic_cover.jpg" class="img-responsive" alt="Nhạc theo chủ đề" /> <div class="caption"> <h2>Nhạc theo chủ đề</h2> <p>Nhạc hay nhất theo chủ đề được <?php  echo NAMEWEB;?> chọn lọc kỹ càng và cập nhật liên tục. Bạn đang vui hay buồn, đang tiệc tùng hay trên đường đi phượt, lúc thức dậy hay đang vào giấc ngủ ... những gì bạn cần đều có ở đây!</p> </div> </div></div><div class="wrap-body page-hottopic container"> <div class="wrap-content-cate">  <div class="part-cate"> <h1 class="title-section otr">Nổi Bật</h1> <div class="part-cate-inside"> <ul class="clearfix">  
	
	<?php 
	
                    $topic1 = $mlivedb->query("topic_id, topic_name, topic_img, topic_info","topic"," topic_sub = 1 ORDER BY topic_order DESC LIMIT 12");
						for($i=0;$i<count($topic1);$i++) {
						$topic_name	=	$topic1[$i][1];
						$topic_info	=	rut_ngan($topic1[$i][3],20);
						$topic_img		=	check_img($topic1[$i][2]);
						$topic_url		= url_link(replace($topic_name),$topic1[$i][0],'chu-de');
						?>
	<li>
    <a href="<?php echo $topic_url;?>" title="<?php echo $topic_name;?>" class="_trackLink" tracking="_frombox=topicall_topic_">
        
        <img src="<?php echo $topic_img;?>" class="img-responsive" alt="<?php echo $topic_name;?>" />
        
        <span class="des">    
            <span class="sum-pci"><?php echo $topic_info;?></span>
        </span>
    </a>
</li>
						<?php }?>
</ul> </div> </div> 

<div class="part-cate"> <h1 class="title-section otr">Âm Nhạc Theo Tâm Trạng</h1> <div class="part-cate-inside"> <ul class="clearfix">
	<?php 
	
                    $topic1 = $mlivedb->query("topic_id, topic_name, topic_img, topic_info","topic"," topic_sub = 2 ORDER BY topic_order DESC LIMIT 12");
						for($i=0;$i<count($topic1);$i++) {
						$topic_name	=	un_htmlchars($topic1[$i][1]);
						$topic_info	=	rut_ngan($topic1[$i][3],20);
						$topic_img		=	check_img($topic1[$i][2]);
						$topic_url		= url_link(replace($topic_name),$topic1[$i][0],'chu-de');
						?>
	<li>
    <a href="<?php echo $topic_url;?>" title="<?php echo $topic_name;?>" class="_trackLink" tracking="_frombox=topicall_topic_">
        
        <img src="<?php echo $topic_img;?>" class="img-responsive" alt="<?php echo $topic_name;?>" />
        
        <span class="des">    
            <span class="sum-pci"><?php echo $topic_info;?></span>
        </span>
    </a>
</li>
<?php }?>
</ul> </div> </div> 

<div class="part-cate"> <h1 class="title-section otr">Âm Nhạc Theo Sự Kiện</h1> <div class="part-cate-inside"> <ul class="clearfix">
	<?php 
	
                    $topic1 = $mlivedb->query("topic_id, topic_name, topic_img, topic_info","topic"," topic_sub = 4 ORDER BY topic_order DESC LIMIT 12");
						for($i=0;$i<count($topic1);$i++) {
						$topic_name	=	un_htmlchars($topic1[$i][1]);
						$topic_info	=	rut_ngan($topic1[$i][3],20);
						$topic_img		=	check_img($topic1[$i][2]);
						$topic_url		= url_link(replace($topic_name),$topic1[$i][0],'chu-de');
						?>
	<li>
    <a href="<?php echo $topic_url;?>" title="<?php echo $topic_name;?>" class="_trackLink" tracking="_frombox=topicall_topic_">
        
        <img src="<?php echo $topic_img;?>" class="img-responsive" alt="<?php echo $topic_name;?>" />
        
        <span class="des">    
            <span class="sum-pci"><?php echo $topic_info;?></span>
        </span>
    </a>
</li>
<?php }?>
</ul> </div> </div> 

</div></div>
 </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>
<?php  
//} $cache->close();
?>