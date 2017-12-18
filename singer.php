<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/cache.php");
$myFilter = new InputFilter();
//$cache = new cache();
//if ( $cache->caching ) {
if(isset($_GET["name"])) $key = $myFilter->process($_GET['name']);
if(isset($_GET["act"])) $act = $myFilter->process($_GET['act']);
if(isset($_GET["sort"])) $sort = $myFilter->process($_GET['sort']);
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
$ky	 = $key;
$key_text	= str_replace (' ', '+', $key );
$key 		= replace($key);
$key		= str_replace ('-', ' ', $key );
$key		= htmlchars($key);
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
	// lấy thông tin ca sĩ
	$arr_singer = $mlivedb->query(" * ","singer"," singer_name_ascii = '".$key."' LIMIT 1");
	$singer_big_img = check_img2($arr_singer[0][4]);
	$singer_title = un_htmlchars($arr_singer[0][1]);
	$singer_imga = check_img($arr_singer[0][3]);
	$singer_infongan = un_htmlchars(rut_ngan($arr_singer[0][5],44));
	$singer_urla = SITE_LINK."nghe-si/".replace($singer_title)."/";
	for($s=0;$s<count($arr_singer);$s++) {
		$list_singer .= $arr_singer[$s][0].',';
		$singer_list = substr($list_singer,0,-1);
	}
	if(count($arr_singer)>0) {
	 $singer_seach = "m_singer LIKE '%,".$singer_list.",%'";
	 $singer_seach_album = "album_singer LIKE '%,".$singer_list.",%'";
	}
	mysqli_query($link_music,"UPDATE table_singer SET singer_viewed = singer_viewed+".NUMPLAY." WHERE singer_id = '".$arr_singer[0][0]."'");
	if (count($arr_singer)<1) header("Location: ".SITE_LINK."404.html");
if ($key=='') header("Location: ".SITE_LINK."404.html");
if(!$act) { $title_web = ''.$arr_singer[0][1].' | Nghệ sĩ | '.NAMEWEB.''; $des_web = 'Trang thông tin nghệ sĩ '.$arr_singer[0][1].', gồm tất cả bài hát, album, MV của '.$arr_singer[0][1].'.'; $key_web = 'bai hat '.replace($arr_singer[0][1]).', album '.replace($arr_singer[0][1]).', video clip '.replace($arr_singer[0][1]).', nhac '.replace($arr_singer[0][1]).'' ;}

elseif($act	== 'bai-hat') { $title_web = ''.$arr_singer[0][1].' | Bài hát | '.NAMEWEB.''; $des_web = 'Tất cả ca khúc mới hay nhất '.$arr_singer[0][1].' tuyển tập chọn lọc bài hát hot nhất '.$arr_singer[0][1].' nhạc 320 kb/s lossless'; $key_web = 'bai hat hay '.replace($arr_singer[0][1]).', ca khuc hot '.replace($arr_singer[0][1]).', nhac moi nhat '.replace($arr_singer[0][1]).', tuyen tap hay nhat' ;}

elseif($act	== 'album') { $title_web = ''.$arr_singer[0][1].' | Album | '.NAMEWEB.''; $des_web = 'Đầy đủ tất cả album mới hay nhất '.$arr_singer[0][1].' tuyển tập chọn lọc '.$arr_singer[0][1].' mới và nổi bật'; $key_web = 'album '.replace($arr_singer[0][1]).', '.replace($arr_singer[0][1]).' collection, the best of '.replace($arr_singer[0][1]).', tuyen tap hay nhat '.replace($arr_singer[0][1]).', '.replace($arr_singer[0][1]).' moi nhat, '.replace($arr_singer[0][1]).' hay nhat' ;}

elseif($act	== 'video') { $title_web = ''.$arr_singer[0][1].' | MV | '.NAMEWEB.''; $des_web = 'MV ca sĩ '.$arr_singer[0][1].'  tuyển tập MV hot chọn lọc đẹp nhất '.$arr_singer[0][1].' chất lượng cao HD'; $key_web = 'Video clip '.replace($arr_singer[0][1]).', MV '.replace($arr_singer[0][1]).', mv dep nhat '.replace($arr_singer[0][1]).', chat luong cao '.replace($arr_singer[0][1]).', video clip moi nhat '.replace($arr_singer[0][1]).'' ;}

elseif($act	== 'tieu-su') { $title_web = ''.$arr_singer[0][1].' | Nghệ sĩ | '.NAMEWEB.''; $des_web = 'Trang thông tin nghệ sĩ '.$arr_singer[0][1].', gồm tất cả bài hát, album, MV của '.$arr_singer[0][1].'.'; $key_web = 'bai hat '.replace($arr_singer[0][1]).', album '.replace($arr_singer[0][1]).', video clip '.replace($arr_singer[0][1]).', nhac '.replace($arr_singer[0][1]).'' ;}

?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $title_web;?> | <?php  echo NAMEWEB;?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="">
<meta name="title" content="<?php  echo $title_web;?> | <?php  echo NAMEWEB;?>" />
<meta name="description" content="<?php  echo $des_web;?> | <?php  echo NAMEWEB;?>" />
<meta name="keywords" content="<?php  echo $key_web;?> | <?php  echo NAMEWEB;?>" />
<meta property="og:title" content="<?php  echo $title_web;?> | <?php  echo NAMEWEB;?>" />                
<meta property="og:description" content="<?php  echo $des_web;?> | <?php  echo NAMEWEB;?>" />        
<meta property="og:image" content="<?php echo $singer_big_img;?>" />
<meta property="og:image:url" content="<?php echo $singer_big_img;?>" />
<meta property="og:url" content="<?php  echo $singer_urla.$act;?>" />
<link rel="image_src" href="<?php echo $singer_big_img;?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
<?php  include("./theme/ip_header.php");?>
 <div class="wrapper-page"> 

  <div class="full-banner">
   <div class="container">
        <img src="<?php echo $singer_big_img;?>" alt="<?php  echo $singer_title;?>" />
        <div class="box-info-artist">
            <div class="info-artist fluid">
                <div class="inside">
                    <img height="150" src="<?php echo $singer_imga;?>" alt="<?php  echo $singer_title;?>">
                        <div class="info-summary">
                            <h1><?php  echo $singer_title;?></h1>                      
                            <div class="zfb">
                                <div class="box-fb-like">
                                    <div class="fb-like" data-href="<?php  echo $singer_urla;?>tieu-su" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
<p><?php  echo $singer_infongan;?><a href="<?php  echo $singer_urla;?>tieu-su">Tiểu sử <?php  echo $singer_title;?></a></p>
                            
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="wrap-body group  page-artist-all page-artist container">    
    <div class="tab-menu group">
    <ul>
        <li class="<?php  if(!$act) echo 'active';?>"><a href="<?php  echo $singer_urla;?>"><i class="icon-radio"></i>Tất cả</a></li>
        <li class="<?php  if($act=='bai-hat') echo 'active';?>"><a href="<?php  echo $singer_urla;?>bai-hat">Bài hát</a></li>
        <li class="<?php  if($act=='album') echo 'active';?>"><a href="<?php  echo $singer_urla;?>album">Album</a></li>
        <li class="<?php  if($act=='video') echo 'active';?>"><a href="<?php  echo $singer_urla;?>video">Video</a></li>
        <li class="<?php  if($act=='tieu-su') echo 'active';?>"><a href="<?php  echo $singer_urla;?>tieu-su">Tiểu sử</a></li>
	</ul>
    
     <?php
// Like
$like_following = $mlivedb->query(" user_following ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_following LIKE '%,".$arr_singer[0][0].",%' ");
if($like_following != '') { ?>
<!-- user -->
   <div class="subcribe subcribed pull-right" id="Load_LikeSinger_<?=$arr_singer[0][0];?>">
 <a href="javascript:;" onclick="UNLIKE(<?=$arr_singer[0][0];?>,4,<?=$arr_singer[0][16];?>);" class="fn-follow _trackLink active" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arr_singer[0][16] ;?></s></span>
           </div>
<?php } else {?>
<!-- user -->
<div class="subcribe subcribed pull-right" id="Load_LikeSinger_<?=$arr_singer[0][0];?>">
 <a href="javascript:;" onclick="ADDLIKE(<?=$arr_singer[0][0];?>,4,<?=$arr_singer[0][16];?>);" class="fn-follow _trackLink" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arr_singer[0][16] ;?></s></span>
          </div>
<?php } ?>	
    
</div>    
 <div class="wrap-2-col">
        <div class="wrap-content">
					<?php 
                    $link = '/singer.php?';
                    if($_SERVER["QUERY_STRING"]) $link .= $_SERVER["QUERY_STRING"];
                    switch($act){
                        default					:include("./cat/nghe_si.php");break;
						case "nghe-si"			:include("./cat/nghe_si.php");break;
                        case "bai-hat"			:include("./cat/nghe_si_song.php");break;
                        case "album"			:include("./cat/nghe_si_album.php");break;
						case "video"			:include("./cat/nghe_si_video.php");break;
						case "tieu-su"			:include("./cat/nghe_si_tieu_su.php");break;
                    }
                    ?>
     	      
<div class="wrap-sidebar">
   <div class="widget widget-countdown">
           <?=BANNER('tim_kiem','300');?>
	</div>	   
<div class="widget widget-countdown">
    <h3 class="title-section sz-title-sm">Nghệ Sĩ Tương Tự</h3>
    <div class="widget-content with-action-follow no-padding no-border">
        <ul>
<?php 
$arr = $mlivedb->query(" * ","singer"," singer_type = '".$arr_singer[0][6]."' ORDER BY RAND() LIMIT 6");
for($z=0;$z<count($arr);$z++) {
$singer_name = un_htmlchars($arr[$z][1]);
$singer_url = 'nghe-si/'.replace($singer_name);
$singer_img	= check_img($arr[$z][3]);
?>
            <li>
                <a href="<?=$singer_url; ?>" title="<?=$singer_name; ?>" class="thumb pull-left">
                    <img width="50" src="<?=$singer_img; ?>" alt="<?=$singer_name; ?>" />
                </a>
                <h3 class="song-name"><a href="<?=$singer_url; ?>" title="<?=$singer_name; ?>" class="txt-primary"><?=rut_ngan($singer_name,4); ?></a></h3>
                <div class="singer-name"><a href="#" class="txt-info"><s class="fn-followed" data-id="<?=en_id($arr[$z][0]); ?>">0</s> quan tâm</a></div>
                <div id="Load_Singer_<?=$arr[$z][0];?>"><i onclick="ADDFAV(<?=$arr[$z][0];?>,4);" class="button-follow fn-follow" data-id="<?=en_id($arr[$z][0]); ?>" data-name="<?=$singer_name; ?>" data-type="artist"></i></div>

            </li>
<?php  } ?>
        </ul>
    </div>
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