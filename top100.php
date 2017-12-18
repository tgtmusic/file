<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id = $myFilter->process($_GET['id']); $id = del_id($id);

if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}

	// phan trang
	$sql_tt = "SELECT album_id  FROM table_album WHERE  album_cat LIKE '%,".$id.",%' AND album_top100 = '1' AND album_type = 0 ORDER BY album_id DESC LIMIT 1";

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_album = $mlivedb->query(" * ","album"," album_cat LIKE '%,".$id.",%' AND album_top100 = '1' AND album_type = 0 ORDER BY album_id DESC LIMIT 1");
	$album_url 		= url_link(un_htmlchars($arr_album[0][1]),$arr_album[0][0],'nghe-album');
	$cat = $mlivedb->query(" * ","theloai"," cat_id = '".$id."'");
	$cat_name = get_data("theloai","cat_name"," cat_id = '".$id."'");
	$cat_name_1 = get_data("theloai","cat_name"," cat_id = '".$cat[0][4]."'");
	$cat_sub = get_data("theloai","sub_id"," cat_id = '".$id."'");
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,"top100/".replace($cat_name)."/".en_id($id)."-#page#","");
	$name_key = str_replace ('-', ' ',replace($cat_name));
	$sx = explode(',',$arr_album[0][10]);
	$arr_sx = $mlivedb->query(" m_id, m_title, m_singer, m_viewed, m_hot, m_hq,m_downloaded,m_img,m_official,m_album ","data"," m_id = '".$sx[0]."' AND m_type = 1 ORDER BY m_viewed_month DESC LIMIT 1");
	$singer_imgz = GetSingerIMGBIG($arr_sx[0][2]);
	if (count($arr_album)<1) header("Location: ".SITE_LINK."the-loai/404.html");
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title>Top 100 bài hát <?php  echo $cat_name;?> - <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="Top 100 bài hát <?php  echo $cat_name;?> - <?php  echo NAMEWEB;?>" />
<meta name="description" content="Top 100 bài hát nổi bật của thể loại <?php  echo $cat_name;?> , cập nhật liên tục mỗi ngày." />
<meta name="keywords" content="top 100, <?php  echo $name_key;?> , bài hát, hay nhất" />
<meta property="og:title" content="Top 100 bài hát <?php  echo $cat_name;?> - <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="Top 100 bài hát nổi bật của thể loại <?php  echo $cat_name;?> , cập nhật liên tục mỗi ngày." />        
<meta property="og:image" content="<?php  echo $singer_imgz;?>" />
<meta property="og:image:url" content="<?php  echo $singer_imgz;?>" />
<meta property="og:url" content="<?php echo SITE_LINK."top100/".replace($cat_name)."/".en_id($id).".html";?>" />
<link rel="image_src" href="<?php  echo $singer_imgz;?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
      <div class="wrapper-page"> <div class="wrap-body page-bxh page-top-100 container group"> 
	  <div class="wrap-content">
        <div class="section">
            <div class="title-filter group">
                <div class="wrap-filter pull-left">
                    <h1 class="title-section">Top 100 nhạc <?=$cat_name_1?></h1>                    
                </div><!-- END .wrap-filter -->

            </div><!-- END .title-filter -->

					            <div class="row">
                <div class="col-12">
                    <div class="intro">
 <p>TOP 100 là danh sách 100 ca khúc hot nhất hiện tại của từng thể loại nhạc, được hệ thống tự động đề xuất dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên cả desktop và mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục.</p>
                    </div>
					 <div class="tab-menu group"> <ul> 
		<?php
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = '".$cat_sub."' ORDER BY cat_order ASC LIMIT 6");
        for($i=0;$i<count($cats1);$i++) {
            $cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'top-100');
        ?>
					 <li class="<?php  if($cats1[$i][0]==$id) echo 'active';?>"><a href="<?=$cats1_url?>"><?=$cats1[$i][1];?></a></li> 
		<?php };?>
<?php
			$cats2 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = '".$cat_sub."' ORDER BY cat_order ASC LIMIT 6,15");
			if ($cats2){
				?>
					 <li class="<?php for($i=0;$i<count($cats2);$i++) { if($cats2[$i][0]==$id) echo 'active' ;}?>"> <a href="#">&bullet;&bullet;&bullet;</a> <div class="dropdown"> <span class="arr-top"><i></i></span> <ul> 
	<?php
for($i=0;$i<count($cats2);$i++) {
            $cats2_url = url_link($cats2[$i][1],$cats2[$i][0],'top-100');
		?>
					 <li class="<?php  if($cats2[$i][0]==$id) echo 'active';?>"><a href="<?=$cats2_url?>"><?=$cats2[$i][1];?></a></li> 
<?php }?>
 </ul> </div>
</li><?php }?>
</ul> </div>
                    <div class="table-list">    
                        <div class="header-bar">
                            <h1 class="header-title-small">100 bài hát <?php  echo $cat_name;?> hay nhất</h1>
                            <div class="box-social">
                                <div class="fb-like" data-href="<?php echo $bxh_link;?>" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>									
                                <div class="g-plusone" data-size="medium"></div>
                            </div><!-- END .box-social -->
                            <a href="<?php echo $album_url;?>" class="play-all"><i class="zicon icon-play"></i>Nghe tất cả</a>
                        </div><!-- EMD .table-header -->
                        <div class="table-body "> 

 <ul>
			    <?php 
				if ($arr_album[0][10]!= ''){
            $s = explode(',',$arr_album[0][10]);
            foreach($s as $x=>$val) {
				$arr[$x] = $mlivedb->query(" m_id, m_title, m_singer, m_viewed, m_hot, m_hq,m_downloaded,m_img,m_official,m_album ","data"," m_id = '".$s[$x]."' AND m_type = 1 ORDER BY m_viewed_month DESC LIMIT 100");
			$singer_name 	=	GetSingerName($arr[$x][0][2]);
			$get_singer = GetSinger($arr[$x][0][2]);
			$singer_img = GetSingerIMG($arr[$x][0][2]);
            $download 			= 'down.php?id='.$arr[$x][0][0].'&key='.md5($arr[$x][0][0].'tgt_music');
            $song_url 			= url_link($arr[$x][0][1].'-'.$singer_name,$arr[$x][0][0],'nghe-bai-hat');
			$number = $x+1;
 ?>
 <li id="songZW787EA9" class="fn-item po-<?php if ($x < 9) { echo '0'.$number;} else { echo $number;}?> group" data-type="song" data-id="ZW787EA9" data-code="LHJHtZHNQsJpDWNyZDxyvmZm" data-active="show-tool">
        <span class="txt-rank fn-order"><?php if ($x < 9) { echo '0'.$number;} else { echo $number;}?></span>
        <div class="e-item">
            <a href="<?=$song_url?>" title="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" class="thumb pull-left fn-link">
                <img class="fn-thumb" width="60" height="60" src="<?=$singer_img?>" alt="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" />
                <span class="icon-circle-play icon-small"></span>
            </a>
            <h3 class="title-item ellipsis">
                <a class="fn-link fn-name" href="<?php  echo $song_url;?>" title="<?php  echo un_htmlchars($arr[$x][0][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" class="txt-primary"><?php  echo un_htmlchars($arr[$x][0][1]); ?></a>
            </h3>
            <div class="inblock ellipsis">
                <div class="fn-artist_list pull-left">
                    
                    <h4 class="title-sd-item fn-artist txt-info"><?=$get_singer?></h4>
                                                               
                </div>
<?php 
if ($arr[$x][0][9]) {
		$album_l = $mlivedb->query(" album_id, album_name, album_singer","album"," album_id = '".$arr[$x][0][9]."'");
		$singer_name 	=	GetSingerName($album_l[0][2]);			
			$album_url_l 	= url_link($album_l[0][1].'-'.$singer_name,$album_l[0][0],'nghe-album');
			
			?>
                <span class="bull fn-has_album ">&bull;</span>
                <h4 class="title-sd-item txt-info  fn-has_album">
                    <a href="<?=$album_url_l?>" title="<?=$album_l[0][1]?>" class="fn-album_link fn-album_name"><?=$album_l[0][1]?></a>
                </h4>
<?php } ?>
            </div>
        </div>
        <div class="tool-song">
<?php		
		$arr_video = $mlivedb->query(" m_id, m_title, m_singer, m_viewed","data"," m_id = '".$arr[$x][0][8]."'");
		$singer_name 	=	GetSingerName($arr_video[0][2]);
			$video_url 		= url_link($arr_video[0][1].'-'.$singer_name,$arr_video[0][0],'xem-video');
		if ($arr_video){
?>		
            <div class="i25 i-small video "><a class="fn-video_link" title="Xem <?=$arr_video[0][1]?> - <?=$singer_name?>" href="<?=$video_url?>"></a></div>
<?php  } ?>
<div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#song<?=en_id($arr[$x][0][0])?>" href="<?php  echo $download;?>"></a></div>
 <!-- Playlist ADD -->
				<div class="i25 i-small addlist" id="playlist_<?=$arr[$x][0][0]?>"><a href="javascript:;" title="Thêm vào" class="fn-addto" data-item="#songnew<?=$arr[$x][0][0]?>" onclick="_load_box(<?=$arr[$x][0][0]?>);"></a></div>
                <!-- End playlist ADD -->
            <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#songZW787EA9" href="<?php  echo $song_url;?>"></a></div>
        </div>
    </li>
				<?php  } }?>
						 </ul>
                        </div><!-- END .table-body -->
                    </div><!-- END .table-list -->
                </div><!-- END .col-12 -->
            </div><!-- END .row -->
        </div><!-- END .section -->
    </div><!-- END .wrap-content -->
                   <div class="wrap-sidebar">
						<div class="widget widget-tab ">
					        	<?=BANNER('home_right_1','322');?>
						</div>
				<div class="widget widget-list-thumb widget-non-border"> <h3 class="title-section sz-title-sm">Top 100 thể loại khác</h3> <div class="widget-content">  <ul>
<?php 
if ($cat_sub	== IDCATAM || $cat_sub	== IDCATCA || $cat_sub	== 4) {
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 1 ORDER BY cat_order ASC LIMIT 5");
        for($i=0;$i<count($cats1);$i++) {
		$cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'top-100');
$album_img100[$i] = check_img(get_data("album","album_img"," album_cat LIKE '%,".$cats1[$i][0].",%' AND album_top100 = 1 "));

?><li> <a href="<?=$cats1_url?>" class="thumb"> <img width="50" src="<?php echo $album_img100[$i];?>" alt="Top 100 <?=$cats1[$i][1];?>" /> </a> <h2><a href="<?=$cats1_url?>" title="Top 100 <?=$cats1[$i][1];?>" class="txt-primary">Top 100 <?=$cats1[$i][1];?></a></h2> </li> 
		<?php } };?>
<?php 
if ($cat_sub	== IDCATVN || $cat_sub	== IDCATCA || $cat_sub	== 4) {
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 2 ORDER BY cat_order ASC LIMIT 4");
        for($i=0;$i<count($cats1);$i++) {
		$cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'top-100');
$album_img100[$i] = check_img(get_data("album","album_img"," album_cat LIKE '%,".$cats1[$i][0].",%' AND album_top100 = 1 "));

?><li> <a href="<?=$cats1_url?>" class="thumb"> <img width="50" src="<?php echo $album_img100[$i];?>" alt="Top 100 <?=$cats1[$i][1];?>" /> </a> <h2><a href="<?=$cats1_url?>" title="Top 100 <?=$cats1[$i][1];?>" class="txt-primary">Top 100 <?=$cats1[$i][1];?></a></h2> </li> 
<?php } } ;?>
<?php 
if ($cat_sub	== IDCATAM || $cat_sub	== IDCATVN || $cat_sub	== 4) {
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 3 ORDER BY cat_order ASC LIMIT 3");
        for($i=0;$i<count($cats1);$i++) {
		$cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'top-100');
$album_img100[$i] = check_img(get_data("album","album_img"," album_cat LIKE '%,".$cats1[$i][0].",%' AND album_top100 = 1 "));

?><li> <a href="<?=$cats1_url?>" class="thumb"> <img width="50" src="<?php echo $album_img100[$i];?>" alt="Top 100 <?=$cats1[$i][1];?>" /> </a> <h2><a href="<?=$cats1_url?>" title="Top 100 <?=$cats1[$i][1];?>" class="txt-primary">Top 100 <?=$cats1[$i][1];?></a></h2> </li> 
<?php } };?>
<?php 
if ($cat_sub	== IDCATAM || $cat_sub	== IDCATCA || $cat_sub	== IDCATVN) {
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 4 ORDER BY cat_order ASC LIMIT 3");
        for($i=0;$i<count($cats1);$i++) {
		$cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'top-100');
$album_img100[$i] = check_img(get_data("album","album_img"," album_cat LIKE '%,".$cats1[$i][0].",%' AND album_top100 = 1 "));

?><li> <a href="<?=$cats1_url?>" class="thumb"> <img width="50" src="<?php echo $album_img100[$i];?>" alt="Top 100 <?=$cats1[$i][1];?>" /> </a> <h2><a href="<?=$cats1_url?>" title="Top 100 <?=$cats1[$i][1];?>" class="txt-primary">Top 100 <?=$cats1[$i][1];?></a></h2> </li> 
<?php } } ;?>
				</ul>     </div> </div>
</div><!-- END .wrap-sidebar -->

</div><!-- END .container -->
<div class="clearfix"></div>
</div>
    <?php  include("./theme/ip_footer.php");?>

</body>
</html>