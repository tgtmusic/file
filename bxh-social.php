<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id = $myFilter->process($_GET['id']); $id = del_id($id);
if(isset($_GET["name"])) $name = $myFilter->process($_GET['name']);
if(isset($_GET["w"])) $w = $myFilter->process($_GET['w']);
if(isset($_GET["y"])) $y = $myFilter->process($_GET['y']);
if($id	== IDCATVN) { 
$cat_bxh = "AND charts_cat = '1' ";
$title = 'Bảng Xếp Hạng Social';
$title_2 = 'BXH Social Việt Nam'; 
$title_3 = 'Bảng Xếp Hạng Social Việt Nam';  
$intro = 'BXH Social là bảng xếp hạng nghệ sĩ Việt Nam được cập nhật vào mỗi Thứ Hai hàng tuần, dựa trên thống kê về lượt tương tác nội dung từ '.NAMEWEB.' của các nghệ sĩ trên các mạng xã hội (VD: lượt chia sẻ lên Zalo, Facebook...) và tần suất tên nghệ sĩ đó được nhắc đến trên các kênh tin tức, báo chí, diễn đàn... trong tuần qua.'; 
$bxh_link = 'bang-xep-hang/top-40-social/'.en_id($id).'.html';
$title_web = 'Top 40 Social - Nghệ sĩ hot nhất tuần qua | '.NAMEWEB.''; 
$des_web = 'BXH Social là bảng xếp hạng nghệ sĩ Việt Nam được cập nhật vào mỗi Thứ Hai hàng tuần, dựa trên thống kê về lượt tương tác nội dung từ '.NAMEWEB.' của các nghệ sĩ trên các mạng xã hội (VD: lượt chia sẻ lên Zalo, Facebook...) và tần suất tên nghệ sĩ đó được nhắc đến trên các kênh tin tức, báo chí, diễn đàn... trong tuần qua.'; 
$key_web = 'bxh nhac viet nam, bxh zing, bxh bai hat viet nam, top bai hat viet nam, ca khuc nhac viet nam hot, diem z, z-score' ;}
	if($w != '') $sql_w = " AND charts_week = '".$w."'";
if($y != '') $sql_y = " AND charts_year = '".$y."'";
		if($w) $cim1 = "&w=$w";
		if($w) $cim2 = "&y=$y";

	// phan trang
	$sql_tt = "SELECT charts_id  FROM table_charts WHERE  charts_type = '4' $cat_bxh $sql_w $sql_y ORDER BY charts_id DESC LIMIT 1";
	$up = $mlivedb->query(" * ","charts"," charts_type = '4' $cat_bxh $sql_w $sql_y ORDER BY charts_id DESC LIMIT 1");
$album_url 		= url_link($up[0][1],$up[0][7],'nghe-album');
	if (!$w || !$y){
	$hotSinger = $mlivedb->query(" singer_id, singer_name, singer_img, singer_like,singer_viewed, singer_big_img  ","singer"," singer_id ORDER BY singer_like DESC LIMIT 1");
	$singer_imgz = check_img($hotSinger[0][5]);
	}
	if ($w !='' || $y !=''){
	$s = explode(',',$up[0][2]);
	$hotSinger = $mlivedb->query(" singer_id, singer_name, singer_img, singer_like,singer_viewed, singer_big_img ","singer"," singer_id = '".$s[0]."'  LIMIT 1");
	  $singer_imgz = check_img($hotSinger[0][5]);
	 }
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $title_web;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $title_web;?>" />
<meta name="description" content="<?php  echo $des_web;?>" />
<meta name="keywords" content="<?php  echo $key_web;?>" />
<meta property="og:title" content="<?php  echo $title_web;?>" />                
<meta property="og:description" content="<?php  echo $des_web;?>" />        
<meta property="og:image" content="<?php  echo $singer_imgz;?>" />
<meta property="og:image:url" content="<?php  echo $singer_imgz;?>" />
<meta property="og:url" content="<?php echo SITE_LINK.$bxh_link;?>" />
<link rel="image_src" href="<?php  echo $singer_imgz;?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
        <div class="wrapper-page"> <div class="wrap-body page-bxh page-bxh-social container">
		<?=BANNER('top_banner_bxh','1006');?>
    <div class="wrap-content">
        <div class="section">
            <div class="title-filter group">
                <div class="wrap-filter pull-left">
                    <h1 class="title-section"><?php  echo $title;?></h1>                    
                </div><!-- END .wrap-filter -->
                <div class="weekly-show">
 <p class="pull-left">
                        <strong><?php echo 'Tuần '.$up[0][8];?>:</strong>
                        <span><?php echo $up[0][3];?></span>
                    </p>
                    <input type="hidden" name="inputDate" id="inputDate" value=""/>
                    <i class="icon-calendar cur-p" id="btnCalendar"></i>
<?php
$cz = $mlivedb->query(" * ","charts"," charts_type = '4' $cat_bxh AND charts_id = '".$up[0][0]."' ");
$next = $mlivedb->query(" * ","charts"," charts_type = '4' $cat_bxh AND charts_id > '".$up[0][0]."'");
$prev = $mlivedb->query(" * ","charts"," charts_type = '4' $cat_bxh AND charts_id < '".$up[0][0]."'");
$week = ($up[0][8])-1;
$year = ($up[0][9]);
?>
<?php if (!$next) { echo '<a href="'.$bxh_link.'&w='.$up[0][8].'&y='.$up[0][9].'" class="w-nav w-next disabled"></a>'; } else { echo '<a href="'.$bxh_link.'&w='.$next[0][8].'&y='.$next[0][9].'" class="w-nav w-next "></a>';}?>
<?php if (!$prev) { echo '<a href="'.$bxh_link.'&w='.$week.'&y='.$year.'" class="w-nav w-prev disabled"></a>'; } else { echo '<a href="'.$bxh_link.'&w='.$week.'&y='.$year.'" class="w-nav w-prev "></a>';}?>
                </div><!--END .weekly-show -->
            </div><!-- END .title-filter -->

            <div class="row">
                <div class="col-12">
                    <div class="intro">
 <p><?php  echo $intro ;?></p>
                    </div>
                            <div class="box-social-bxh">
                                <div class="fb-like" data-href="<?=SITE_LINK?><?php echo $bxh_link;?><?php if ($w !=''){ echo $cim1;}?><?php if ($y !=''){ echo $cim2;}?>" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>									
                                <div class="g-plusone" data-size="medium"></div>
                            </div><!-- END .box-social -->
                    <div class="table-list">                        
                        <div class="table-body">
                            <ul>
    <?php 
if (!$w || !$y){
				  $hotSinger = $mlivedb->query("  singer_id, singer_name, singer_img, singer_like,singer_viewed  ","singer"," singer_id ORDER BY singer_like DESC LIMIT 40");
				  if (count($hotSinger)<1) header("Location: ".SITE_LINK."bang-xep-hang/index.html");	
				for($i=0;$i<count($hotSinger);$i++) {
					$list_social	.=	$hotSinger[$i][0].',';
					$list_social_ = 	substr($list_social,0,-1);
				mysqli_query($link_music,"UPDATE table_charts SET charts_value ='".$list_social_."' WHERE charts_id = '".$up[0][0]."'");
					$singer_name = un_htmlchars($hotSinger[$i][1]);
					$singer_img = check_img($hotSinger[$i][2]);
					$singer_url = 'nghe-si/'.replace($singer_name);
                $number = $i+1;
					if($i == 0 || $i == 1 || $i == 2 || $i == 3 || $i == 4  || $i == 5  || $i == 6  || $i == 7  || $i == 8  || $i == 9 )	{
		$number0[$i]	=	"0";
	}
 ?>
<li class="po-<?php if ($i < 9) { echo '0'.$number;} else { echo $number;}?> group" id="artist<?php  echo en_id($hotSinger[$i][0]);?>" data-from="fav" data-name="<?php  echo $singer_name;?>" data-type="artist" data-id="<?php  echo en_id($hotSinger[$i][0]);?>" data-week="30" data-year="2<?php if ($i < 9) { echo '0'.$number;} else { echo $number;}?>6" data-active="show-tool">
                                    <div class="row-display group po-r">
                                        <span class="txt-rank"><?php if ($i < 9) { echo '0'.$number;} else { echo $number;}?></span>
                                        <span class="statistics up"><i></i><?php  echo $hotSinger[$i][4];?></span>
                                        <div class="e-item">
                                            <a href="<?=$singer_url;?>" title="<?php  echo $singer_name;?>" class="thumb pull-left _trackLink" tracking="_frombox=chartartist_vietnam_<?php if ($i < 9) { echo '0'.$number;} else { echo $number;}?>">
                                                <img width="60" height="60" src="<?php  echo $singer_img;?>" alt="<?php  echo $singer_name;?>" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="<?=$singer_url;?>" title="<?php  echo $singer_name;?>" class="txt-primary _trackLink" tracking="_frombox=chartartist_vietnam_<?php if ($i < 9) { echo '0'.$number;} else { echo $number;}?>"><?php  echo $singer_name;?></a>
                                            </h3>										
                                            <h4 class="title-sd-item">
                                                <span class="txt-info">
                                                    <s class="fn-followed fn-number" data-id="<?php  echo en_id($hotSinger[$i][0]);?>" data-type="artist" data-name="<?php  echo $singer_name;?>"><?php  echo $hotSinger[$i][3];?></s> quan tâm
                                                </span>
                                            </h4>
                                        </div>
<?php
// Like
$like_following = $mlivedb->query(" user_following ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_following LIKE '%,".$hotSinger[$i][0].",%' ");
if($like_following != '') { ?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$hotSinger[$i][0];?>">	
 <a href="javascript:;" onclick="UNLIKE(<?=$hotSinger[$i][0];?>,4,<?=$hotSinger[$i][3];?>);" class="fn-follow _trackLink active" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a>
            </div>
<?php } else {?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$hotSinger[$i][0];?>">	
 <a href="javascript:;" onclick="ADDLIKE(<?=$hotSinger[$i][0];?>,4,<?=$hotSinger[$i][3];?>);" class="fn-follow _trackLink" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a>
            </div>
<?php } ?>	
                                        <div class="tool-song">
                                            <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#artist<?php  echo en_id($hotSinger[$i][0]);?>" href="<?=$singer_url;?>"></a></div>
                                        </div>
                                        <div class="txt-info rank-score pull-right">                                        																						
                                            <span class="score fn-number" data-box="#artist<?php  echo en_id($hotSinger[$i][0]);?> .fn-stats"><?php  echo $hotSinger[$i][3];?></span>
                                        </div>
                                        <!--<a href="#" class="whatshot fn-showtopshared" data-item="#artist<?php  echo en_id($hotSinger[$i][0]);?>">Có gì hot?</a>-->
                                    </div>
                                </li>
<?php  }
				$date = date('Y-m-d');
				while (date('w', strtotime($date)) != 1) {
				$tmp = strtotime('-1 day', strtotime($date));
				$date = date('Y-m-d', $tmp);
				}
				$week = 'Tuần '.date('W', strtotime($date));
				$week = str_replace('Tuần 0','',$week);
				$name_cff = $title_3.' - Tuần '.$week.', '.date("Y");
				 $cf_ascii = strtolower(get_ascii(str_replace('-'," ",replace($name_cff))));	
				if(date("w") == 0 && $up[0][4] == '1') {
				mysqli_query($link_music,"INSERT INTO table_charts (charts_value,charts_name,charts_name_ascii,charts_type,charts_cat,charts_date_old,charts_up,charts_date,charts_week,charts_year,charts_album,charts_time) 
						 VALUES ('".$list_social_."','".$name_cff."','".$cf_ascii."','4','".$up[0][5]."','".date("d/m/Y")." - ".tinh_tuan(7)."','0','".date("d/m")." - ".w_m_noyear(7)."','".$week."','".date("Y")."','".$up[0][7]."','".NOW."')");
				}
 }?>

    <?php 
if ($w !='' || $y !=''){
			$s = explode(',',$up[0][2]);
            foreach($s as $x=>$val) {
				  $hotSinger[$x] = $mlivedb->query("  singer_id, singer_name, singer_img, singer_like,singer_viewed  ","singer"," singer_id = '".$s[$x]."'  LIMIT 40");
				  if (count($hotSinger[$x])<1) header("Location: ".SITE_LINK."bang-xep-hang/index.html");	
					$singer_name = un_htmlchars($hotSinger[$x][0][1]);
					$singer_img = check_img($hotSinger[$x][0][2]);
					$singer_url = 'nghe-si/'.replace($singer_name);
                $number = $x+1;

 ?>
<li class="po-<?php if ($x < 9) { echo '0'.$number;} else { echo $number;}?> group" id="artist<?php  echo en_id($hotSinger[$x][0][0]);?>" data-from="fav" data-name="<?php  echo $singer_name;?>" data-type="artist" data-id="<?php  echo en_id($hotSinger[$x][0][0]);?>" data-week="30" data-year="2<?php if ($i < 9) { echo '0'.$number;} else { echo $number;}?>6" data-active="show-tool">
                                    <div class="row-display group po-r">
                                        <span class="txt-rank"><?php if ($x < 9) { echo '0'.$number;} else { echo $number;}?></span>
                                        <span class="statistics up"><i></i><?php  echo $hotSinger[$x][0][4];?></span>
                                        <div class="e-item">
                                            <a href="<?=$singer_url;?>" title="<?php  echo $singer_name;?>" class="thumb pull-left _trackLink" tracking="_frombox=chartartist_vietnam_<?php if ($x < 9) { echo '0'.$number;} else { echo $number;}?>">
                                                <img width="60" height="60" src="<?php  echo $singer_img;?>" alt="<?php  echo $singer_name;?>" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="<?=$singer_url;?>" title="<?php  echo $singer_name;?>" class="txt-primary _trackLink" tracking="_frombox=chartartist_vietnam_<?php if ($x < 9) { echo '0'.$number;} else { echo $number;}?>"><?php  echo $singer_name;?></a>
                                            </h3>										
                                            <h4 class="title-sd-item">
                                                <span class="txt-info">
                                                    <s class="fn-followed fn-number" data-id="<?php  echo en_id($hotSinger[$x][0][0]);?>" data-type="artist" data-name="<?php  echo $singer_name;?>"><?php  echo $hotSinger[$x][0][3];?></s> quan tâm
                                                </span>
                                            </h4>
                                        </div>
<?php
// Like
$like_following = $mlivedb->query(" user_following ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_following LIKE '%,".$hotSinger[$x][0][0].",%' ");
if($like_following != '') { ?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$hotSinger[$x][0][0];?>">	
 <a href="javascript:;" onclick="UNLIKE(<?=$hotSinger[$x][0][0];?>,4,<?=$hotSinger[$x][0][3];?>);" class="fn-follow _trackLink active" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a>
            </div>
<?php } else {?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$hotSinger[$x][0][0];?>">	
 <a href="javascript:;" onclick="ADDLIKE(<?=$hotSinger[$x][0][0];?>,4,<?=$hotSinger[$x][0][3];?>);" class="fn-follow _trackLink" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a>
            </div>
<?php } ?>	
                                        <div class="tool-song">
                                            <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#artist<?php  echo en_id($hotSinger[$x][0][0]);?>" href="<?=$singer_url;?>"></a></div>
                                        </div>
                                        <div class="txt-info rank-score pull-right">                                        																						
                                            <span class="score fn-number" data-box="#artist<?php  echo en_id($hotSinger[$x][0][0]);?> .fn-stats"><?php  echo $hotSinger[$x][0][3];?></span>
                                        </div>
                                        <!--<a href="#" class="whatshot fn-showtopshared" data-item="#artist<?php  echo en_id($hotSinger[$x][0][0]);?>">Có gì hot?</a>-->
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
<?php if($id	== IDCATCA || $id	== IDCATAM) { ?>						
<div class="widget widget-tab "> 
<h2 class="title-section sz-title-sm"> <a href="bang-xep-hang/index.html">BXH Việt Nam <i class="icon-arrow"></i></a>
   <a title="Xem tất cả" href="#" class="none icon-play-all pull-right fn-play_link"></a>
</h2> 
			<h2>
			 <ul class="tab-nav" id="tab_click_bxh_page_2">
			<li><a class="active fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE_2('bxh_vn',10,this); return false;">Bài Hát</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE_2('bxhal_vn',5,this); return false;">Album</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE_2('bxhv_vn',5,this); return false;">Video</a></li>
			</ul>
			</h2>
			 <div id="_chart_2" class="tab-pane widget-song-countdown">
 <div class="widget-content no-padding no-border "> 
 <ul class="fn-list" id="load_bxh_page_2">   
                    <?=top_song('bxh_vn',10);?>
</ul>
			</div></div></div>
<?php }?>
<?php if($id	== IDCATCA || $id	== IDCATVN) { ?>		
<div class="widget widget-tab "> 
<h2 class="title-section sz-title-sm"> <a href="bang-xep-hang/index.html">BXH Âu Mỹ <i class="icon-arrow"></i></a>
   <a title="Xem tất cả" href="#" class="none icon-play-all pull-right fn-play_link"></a>
</h2> 
			<h2>
			 <ul class="tab-nav" id="tab_click_bxh_page">
			<li><a class="active fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE('bxh_am',10,this); return false;">Bài Hát</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE('bxhal_am',5,this); return false;">Album</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE('bxhv_am',5,this); return false;">Video</a></li>
			</ul>
			</h2>
			 <div id="_chart" class="tab-pane widget-song-countdown">
 <div class="widget-content no-padding no-border "> 
 <ul class="fn-list" id="load_bxh_page">   
                    <?=top_song('bxh_am',10);?>
</ul>
			</div></div></div>
<?php }?>
						<div class="widget widget-tab ">
					        	<?=BANNER('home_right_2','322');?>
						</div>
<?php if($id	== IDCATAM || $id	== IDCATVN) { ?>		
<div class="widget widget-tab "> 
<h2 class="title-section sz-title-sm"> <a href="bang-xep-hang/index.html">BXH Châu Á <i class="icon-arrow"></i></a>
   <a title="Xem tất cả" href="#" class="none icon-play-all pull-right fn-play_link"></a>
</h2> 
			<h2>
			 <ul class="tab-nav" id="tab_click_bxh_page_1">
			<li><a class="active fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE_1('bxh_ca',10,this); return false;">Bài Hát</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE_1('bxhal_ca',5,this); return false;">Album</a></li>
			<li><a class="fn-chart" href="javascript:void(0);" onClick="return BXH_PAGE_1('bxhv_ca',5,this); return false;">Video</a></li>
			</ul>
			</h2>
			 <div id="_chart_1" class="tab-pane widget-song-countdown">
 <div class="widget-content no-padding no-border "> 
 <ul class="fn-list" id="load_bxh_page_1">   
                    <?=top_song('bxh_ca',10);?>
</ul>
			</div></div></div>
	<?php }?>				
</div><!-- END .wrap-sidebar -->

</div><!-- END .container -->
<div class="clearfix"></div>
</div>
    <?php  include("./theme/ip_footer.php");?>

</body>
</html>