<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["key"])) $key = $myFilter->process($_GET['key']);
if(isset($_GET["type"])) $type = $myFilter->process($_GET['type']);
if(isset($_GET["filter"])) $f = $myFilter->process($_GET['filter']);
if(isset($_GET["sort"])) $sort = $myFilter->process($_GET['sort']);
if(isset($_GET["upload"])) $up = $myFilter->process($_GET['upload']);
if(isset($_GET["t"])) $t = $myFilter->process($_GET['t']);
if(isset($_GET["genre"])) $g = $myFilter->process($_GET['genre']);
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
	$arr_singer = $mlivedb->query(" singer_id ","singer"," singer_name_ascii LIKE '%".$key."%' ");
	for($s=0;$s<count($arr_singer);$s++) {
		$list_singer .= $arr_singer[$s][0].',';
		$singer_list = substr($list_singer,0,-1);
	}
	if(count($arr_singer)>0) {
	 $singer_seach = " OR m_singer LIKE '%,".$singer_list.",%' ";
	 $singer_seach_album = "OR album_singer LIKE '%,".$singer_list.",%'";
	}
if($f == 'hits') $filter = "AND m_hot = 1 ";
	elseif($f == 'hit') 	$filter = "AND m_hq = 1 ";
	elseif($f == 'official') 	$filter = "AND m_type = 2 ";
	
	if($g == '1') $genre = "AND m_cat LIKE '%,1,%' ";
	elseif($g == '2') 	$genre = "AND m_cat LIKE '%,2,%' ";
	elseif($g == '3') 	$genre = "AND m_cat LIKE '%,3,%' ";
	elseif($g == '4') 	$genre = "AND m_cat LIKE '%,4,%' ";
	
	if($t == 'singer')	$tim = $singer_seach;
	elseif($t == 'composer')	$tim = "OR m_sang_tac_ascii LIKE '%".$key."%' ";
	elseif($t == 'title')	$tim = "OR m_title LIKE '%".$key."%' ";
	elseif(!$t) $tim = $singer_seach;
			
	if ($sort&$up) { 
	if($sort == 'total_play') $sql_s = ",m_viewed DESC";
	elseif($sort == 'down') 	$sql_s = ",m_downloaded DESC";
	elseif($sort == 'created_date') 	$sql_s = ",m_time DESC";
	elseif(!$sort) 			$sql_s = ",m_viewed DESC";
	
	if($up == 'today') 	$sql_order = "ORDER BY m_viewed_day DESC $sql_s";
	elseif($up == 'week') 	$sql_order = "ORDER BY m_viewed_week DESC $sql_s";
	elseif($up == 'month') 	$sql_order = "ORDER BY m_viewed_month DESC $sql_s";
	elseif($up == 'year') 	$sql_order = "ORDER BY m_viewed DESC $sql_s";
	elseif(!$up) 	$sql_order = "ORDER BY m_viewed DESC $sql_s";
	//elseif(!$sort) 			$sql_order = " ORDER BY m_id DESC";
	} else { 
	if($sort == 'total_play') $sql_order = " ORDER BY m_viewed DESC";
	elseif($sort == 'down') 	$sql_order = " ORDER BY m_downloaded DESC";
	elseif($sort == 'created_date') 	$sql_order = " ORDER BY m_time DESC";
	elseif(!$sort) 			$sql_order = " ORDER BY m_viewed DESC";
	
	if($up == 'today') 	$sql_order = "ORDER BY m_viewed_day DESC";
	elseif($up == 'week') 	$sql_order = "ORDER BY m_viewed_week DESC";
	elseif($up == 'month') 	$sql_order = "ORDER BY m_viewed_month DESC";
	elseif($up == 'year') 	$sql_order = "ORDER BY m_viewed DESC";
	//elseif(!$sort) 			$sql_order = " ORDER BY m_id DESC";
	}
	
	if($t) $cim1 = "&t=$t";
	if($sort) $cim2 = "&sort=$sort";
	if($f) $cim3 = "&filter=$f";
	if($g) $cim4 = "&genre=$g";
	if($up) $cim5 = "&upload=$up";
				$sql_where = "m_title_ascii LIKE '%".$key."%' AND m_type = 2 ".$filter." ".$genre." ".$tim;
				$link_s = 'video.html?key='.$key_text.$cim1.$cim2.$cim3.$cim4.$cim5;
				
	// phan trang
	
	$sql_tt = "SELECT m_id  FROM table_data WHERE ".$sql_where." ".$filter." ".$genre." AND m_type = 2 ".$sql_order." LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query(" * ","data","".$sql_where." ".$filter." ".$genre." AND m_type = 2 ".$sql_order." LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $ky;?> | Trang <?php echo $page;?> - <?=NAMEWEB?></title>
<meta name="title" content="<?php  echo $ky;?> | Trang <?php echo $page;?> - <?=NAMEWEB?>" />
<meta name="description" content="bài hát hay, album hot tải nhạc chất lượng cao" />
<meta name="keywords" content="<?php  echo $ky;?>, video, ngay mai, video, clip, mv, chat luong cao, hd" />
<meta property="og:title" content="<?php  echo $ky;?> | Trang <?php echo $page;?> - <?=NAMEWEB?>" />                
<meta property="og:description" content="bài hát hay, album hot tải nhạc chất lượng cao" />        
<meta property="og:image" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:image:url" content="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<meta property="og:url" content="<?php echo $link_s;?>" />
<link rel="image_src" href="<?php  echo SITE_LINK;?>theme/images/logo_600x600.png" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>
  <div class="wrapper-page"> 
<div id="song-search-rs" class="wrap-body group page-search container">  
<?=BANNER('top_banner_search','1006');?>   
    <div class="wrap-content">
        <div class="tab-menu group">
    <ul>
        <li><a href="tim-kiem.html?key=<?php  echo $key_text;?>">Tất cả</a></li>
        <li><a href="playlist.html?key=<?php  echo $key_text;?>">Playlist</a></li>
        <li class="active"><a href="video.html?key=<?php  echo $key_text;?>">Video</a></li>
    </ul>
      <span class="toggle-filter pull-right fn-show" data-box=".fn-options" >Lọc kết quả<i></i></span>
</div><!-- END .tab-menu -->

<div class="section panel-filter medium-margin-top fn-options none">
    <div class="row">
        <div class="pone-of-five">
            <h5>Tìm theo</h5>
            <ul>
                <li class="icon-check <?php  if(!$t) echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5;?>" class="fn-param" data-param="t">Mặc định</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($t=='title') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,'&t=title',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5;?>"" class="fn-param" >Tiêu đề</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($t=='singer') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,'&t=singer',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5;?>"" class="fn-param" >Tên ca sĩ</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($t=='composer') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,'&t=composer',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5;?>" class="fn-param" >Tên nhạc sĩ</a>
                    <i></i>
                </li>
            </ul>
        </div>
        <div class="pone-of-five">
            <h5>Sắp xếp theo</h5>
            <ul>
                <li class="icon-check <?php  if(!$sort) echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5;?>" class="fn-param" data-param="sort">Mặc định</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($sort=='total_play') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,'&sort=total_play',str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5;?>" class="fn-param" >Nghe nhiều nhất</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($sort=='created_date') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,'&sort=created_date',str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5;?>" class="fn-param" >Mới nhất</a>
                    <i></i>
                </li>
            </ul>
        </div>
       <div class="pone-of-five">
            <h5>Thời gian đăng</h5>
            <ul>
                <li class="icon-check <?php  if(!$up) echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5);?>" class="fn-param" data-param="upload">Mọi lúc</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($up=='today') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=today',str_replace("".$cim5."","",$cim5);?>" class="fn-param" >Trong ngày</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($up=='week') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=week',str_replace("".$cim5."","",$cim5);?>" class="fn-param" >Trong tuần</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($up=='month') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=month',str_replace("".$cim5."","",$cim5);?>" class="fn-param" >Trong tháng</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($up=='year') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=year',str_replace("".$cim5."","",$cim5);?>" class="fn-param" >Trong năm</a>
                    <i></i>
                </li>
            </ul>
        </div>
        <div class="pone-of-five">
            <h5>Lọc theo</h5>
            <ul>
                <li class="<?php  if($f=='official') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'&filter=official',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>" class="fn-param" data-op="add" data-param="filter" data-value="official">Official</a>
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>"><i class="fn-param" data-href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>"  data-op="remove" data-param="filter" data-value="lyrics">                       
                    </i></a>
                </li>
                <li class="<?php  if($f=='lyrics') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'&filter=lyrics',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>" class="fn-param" data-op="add" data-param="filter" data-value="lyrics">Có lyrics</a>
                     <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>"><i class="fn-param" data-href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>"  data-op="remove" data-param="filter" data-value="lyrics">                       
                    </i></a>
                </li>
                <li class="<?php  if($f=='hit') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'&filter=hit',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>" class="fn-param" data-op="add" data-param="filter" data-value="hit">Hits</a>
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>"><i class="fn-param" data-href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,'',str_replace("".$cim3."","",$cim3),$cim4,$cim5;?>"  data-op="remove" data-param="filter" data-value="hit">                       
                    </i></a>
                </li>
            </ul>
        </div>
        <div class="pone-of-five">
            <h5>Thể loại</h5>
            <ul>
                <li class="icon-check <?php  if($g=='1') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,'&genre=1',str_replace("".$cim4."","",$cim4),$cim5;?>" class="fn-param" data-param="genre" data-value="1">Việt Nam</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($g=='2') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,'&genre=2',str_replace("".$cim4."","",$cim4),$cim5;?>" class="fn-param" data-param="genre" data-value="2">Âu Mỹ</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($g=='3') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,'&genre=3',str_replace("".$cim4."","",$cim4),$cim5;?>" class="fn-param" data-param="genre" data-value="3">Châu Á</a>
                    <i></i>
                </li>
                <li class="icon-check <?php  if($g=='4') echo 'selected';?>">
                    <a href="<?='tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,'&genre=4',str_replace("".$cim4."","",$cim4),$cim5;?>" class="fn-param" data-param="genre" data-value="4">Hòa Tấu</a>
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="sta-result group">
    <div class="pull-left"><h1>Video / MV <?php  echo $ky; ?></h1> có <span class="fn-number"><?php  echo $totalRecord; ?></span> kết quả</div>
    <div class="filter-display">
        <ul>
            <!-- display type -->
<?php  if($t=='title') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,'&t=title',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="title">Tiêu đề</a><a href="video.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($t=='singer') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,'&t=singer',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="singer">Tên ca sĩ</a><a href="video.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($t=='composer') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,'&t=composer',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="composer">Tên nhạc sĩ</a><a href="video.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
            <!-- end type -->
            <!-- display sort -->
<?php  if($sort=='total_play') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,'&sort=total_play',str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="total_play">Lượt nghe</a><a href="tim-kiem.html?key=',$key_text,$cim1,str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($sort=='created_date') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,'&sort=created_date',str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="time">Mới nhất</a><a href="tim-kiem.html?key=',$key_text,$cim1,str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
            <!-- end sort -->
            <!-- display time --> 
<?php  if($up=='today') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=today',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="today">Trong ngày</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>
<?php  if($up=='week') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=week',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="week">Trong ngày</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>	
<?php  if($up=='month') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=month',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="month">Trong ngày</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>	
<?php  if($up=='year') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=year',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="year">Trong ngày</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>					
            <!-- end time -->
            <!-- display filter -->
<?php  if($f=='official') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,'&filter=official',str_replace("".$cim3."","",$cim3),$cim4,$cim5.'" class="fn-param" data-param="filter" data-value="official">Official</a><a href="video.html?key=',$key_text,$cim1,$cim2,str_replace("".$cim3."","",$cim3),$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($f=='lyrics') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,'&filter=lyrics',str_replace("".$cim3."","",$cim3),$cim4,$cim5.'" class="fn-param" data-param="filter" data-value="lyrics">Có lyrics</a><a href="video.html?key=',$key_text,$cim1,$cim2,str_replace("".$cim3."","",$cim3),$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($f=='hit') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,'&filter=hit',str_replace("".$cim3."","",$cim3),$cim4,$cim5.'" class="fn-param" data-param="filter" data-value="hit">HQ</a><a href="video.html?key=',$key_text,$cim1,$cim2,str_replace("".$cim3."","",$cim3),$cim4,$cim5.'"><i></i></a></li>';?>
            <!-- end filter -->
            <!-- genre -->
<?php  if($g=='1') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=1',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="1">Việt Nam</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>
<?php  if($g=='2') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=2',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="2">Âu Mỹ</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>
<?php  if($g=='3') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=3',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="3">Châu Á</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>	
<?php  if($g=='4') echo '<li class="icon-check selected"><a href="video.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=4',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="4">Hòa Tấu</a><a href="video.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>	
            <!-- end genre -->
        </ul>
    </div>
</div>
        <div class="section medium-margin-top">
    <ul class="item-list video-list">
<?php 
for($i=0;$i<count($arr_song);$i++) {
	$song_id = en_id($arr_song[$i][0]);
	$song_idd = $arr_song[$i][0];
	$gettime = GetTIMEDATE($arr_song[$i][16]);
	$luotxem = number_format($arr_song[$i][13]);
	$getcat = GetTheLoai($arr_song[$i][7]);
	$singer_name = GetSingerName($arr_song[$i][3]);
	$get_singer = GetSinger($arr_song[$i][3]);
	$user_name = get_user($arr_song[$i][4]);
	$type = check_type($arr_song[$i][11],$arr_song[$i][0]);
	$song_url = url_link(un_htmlchars($arr_song[$i][1]).'-'.$singer_name,$arr_song[$i][0],'xem-video');
	$user_name = un_htmlchars(get_data("user","username"," userid = '".$arr_song[$i][4]."'"));
	$user_url = url_link($user_name,$arr_song[$i][4],'user');
	$download = 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');
?>

					        <li class="item">					
            <a title="<?php echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo $singer_name; ?>" href="<?php  echo $song_url; ?>" class="thumb track-log" order="5">
                <img width="200" src="<?php  echo check_img($arr_song[$i][19]);?>" alt="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo $singer_name; ?>">
            </a>
            <h3>
                <a href="<?php  echo $song_url; ?>" class="track-log" order="5">
                    <?php  echo un_htmlchars($arr_song[$i][1]); ?> 
                </a>
                <a> - </a>						
                <?=$get_singer?>
            </h3>
            <div class="info-meta">
                <span>Thể loại:</span>
                <div class="inline">
                    <h4><?php  echo $getcat;?></h4>
                </div>
                <span class="bull">&bull;</span>
                
                <span>Lượt xem <span class="fn-number"><?php  echo $luotxem;?></span></span>
            </div>
            <div class="info-meta">
			<?php if($arr_song[$i][11] == 2) { ?> <strong class="offcial-label">official</strong><?php } ?>
<?php if($arr_song[$i][21]) { ?> 
		  <span>Đăng bởi: </span>
            <a class="fn-dname" href="<?php  echo $user_url;?>"><?php  echo $user_name;?></a>
            <i class="fn_zme_info" style="display: none;" data_uname="<?php  echo $user_name;?>" data-dname="#song<?php  echo $song_id; ?> .fn-dname" data-link="#song<?php  echo $song_id; ?> .fn-dname" data-thumbsize="50"></i>
			   <?php } ?>	
                <span class="bull">&bull;</span>
 <!--<span class="fn-date"></span>--> <span><?php  echo $gettime; ?></span>
            </div>
        </li>
<?php	} ?>
</ul>
</div>
      <?php  echo $phantrang; ?>
       
      
 </div>
 <div class="wrap-sidebar">
   <div class="widget widget-countdown">
           <?=BANNER('tim_kiem','300');?>
	</div>	   


        </div>
  </div>
    </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>