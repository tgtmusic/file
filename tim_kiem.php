<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["key"])) $key = $myFilter->process($_GET['key']);
if(isset($_GET["type"])) $type = $myFilter->process($_GET['type']);
if(isset($_GET["ks"])) $ks = $myFilter->process($_GET['ks']);
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
	$arr_singer = $mlivedb->query(" singer_id ","singer"," singer_name_ascii LIKE '%".$key."%'");
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
	elseif($f == 'lyrics') 	$filter = "AND m_lyric != '' ";
	elseif($f == 'official') 	$filter = "AND m_official != '' ";

	if($g == '1') $genre = "AND m_cat LIKE '%,1,%' ";
	elseif($g == '2') 	$genre = "AND m_cat LIKE '%,2,%' ";
	elseif($g == '3') 	$genre = "AND m_cat LIKE '%,3,%' ";
	elseif($g == '4') 	$genre = "AND m_cat LIKE '%,4,%' ";
	
	if($t == 'singer')	$tim = $singer_seach;
	elseif($t == 'composer')	$tim = "OR m_sang_tac_ascii LIKE '%".$key."%' ";
	elseif($t == 'title')	$tim = "OR m_title_ascii LIKE '%".$key."%' ";
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
				$sql_where = "m_title_ascii LIKE '%".$key."%' AND m_type = 1 ".$filter." ".$genre." ".$tim;
				$link_s = 'tim-kiem.html?key='.$key_text.$cim1.$cim2.$cim3.$cim4.$cim5;
	// phan trang
	
	$sql_tt = "SELECT m_id  FROM table_data WHERE ".$sql_where." ".$filter." ".$genre." AND m_type = 1 ".$sql_order." LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query("  m_id, m_title, m_singer, m_viewed, m_img, m_type, m_cat, m_poster, m_time, m_hq, m_official, m_mempost,m_hot ","data",$sql_where." ".$filter." ".$genre." AND m_type = 1 ".$sql_order."  LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	//if (count($arr_song)<1) header("Location: ".SITE_LINK."404.html");

?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php  echo $ky;?> | Trang <?php echo $page;?> - <?=NAMEWEB?></title>
<meta name="title" content="<?php  echo $ky;?> | Trang <?php echo $page;?> - <?=NAMEWEB?>" />
<meta name="description" content="bài hát hay, album hot tải nhạc chất lượng cao" />
<meta name="keywords" content="<?php  echo $ky;?>, bai hat, nhac mp3, 320kb, lossless, HD" />
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
        <li class="active"><a href="tim-kiem.html?key=<?php  echo $key_text;?>">Tất cả</a></li>
        <li><a href="playlist.html?key=<?php  echo $key_text;?>">Playlist</a></li>
        <li><a href="video.html?key=<?php  echo $key_text;?>">Video</a></li>
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
    <div class="pull-left"><h1><?php  echo $ky; ?></h1> có <span class="fn-number"><?php  echo $totalRecord; ?></span> kết quả</div>
    <div class="filter-display">
        <ul>
            <!-- display type -->
<?php  if($t=='title') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,'&t=title',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="title">Tiêu đề</a><a href="tim-kiem.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($t=='singer') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,'&t=singer',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="singer">Tên ca sĩ</a><a href="tim-kiem.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($t=='composer') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,'&t=composer',str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="composer">Tên nhạc sĩ</a><a href="tim-kiem.html?key=',$key_text,str_replace("".$cim1."","",$cim1),$cim2,$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
            <!-- end type -->
            <!-- display sort -->
<?php  if($sort=='total_play') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,'&sort=total_play',str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="total_play">Lượt nghe</a><a href="tim-kiem.html?key=',$key_text,$cim1,str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($sort=='created_date') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,'&sort=created_date',str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'" class="fn-param" data-param="sort" data-value="time">Mới nhất</a><a href="tim-kiem.html?key=',$key_text,$cim1,str_replace("".$cim2."","",$cim2),$cim3,$cim4,$cim5.'"><i></i></a></li>';?>
            <!-- end sort -->
            <!-- display time --> 
<?php  if($up=='today') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=today',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="today">Trong ngày</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>
<?php  if($up=='week') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=week',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="week">Trong ngày</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>	
<?php  if($up=='month') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=month',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="month">Trong ngày</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>	
<?php  if($up=='year') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,$cim4,'&upload=year',str_replace("".$cim5."","",$cim5).'" class="fn-param" data-param="genre" data-value="year">Trong ngày</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,$cim4,str_replace("".$cim5."","",$cim5).'"><i></i></a></li>';?>					
            <!-- end time -->
            <!-- display filter -->
<?php  if($f=='official') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,'&filter=official',str_replace("".$cim3."","",$cim3),$cim4,$cim5.'" class="fn-param" data-param="filter" data-value="official">Official</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,str_replace("".$cim3."","",$cim3),$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($f=='lyrics') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,'&filter=lyrics',str_replace("".$cim3."","",$cim3),$cim4,$cim5.'" class="fn-param" data-param="filter" data-value="lyrics">Có lyrics</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,str_replace("".$cim3."","",$cim3),$cim4,$cim5.'"><i></i></a></li>';?>
<?php  if($f=='hit') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,'&filter=hit',str_replace("".$cim3."","",$cim3),$cim4,$cim5.'" class="fn-param" data-param="filter" data-value="hit">HQ</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,str_replace("".$cim3."","",$cim3),$cim4,$cim5.'"><i></i></a></li>';?>
            <!-- end filter -->
            <!-- genre -->
<?php  if($g=='1') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=1',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="1">Việt Nam</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>
<?php  if($g=='2') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=2',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="2">Âu Mỹ</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>
<?php  if($g=='3') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=3',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="3">Châu Á</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>	
<?php  if($g=='4') echo '<li class="icon-check selected"><a href="tim-kiem.html?key='.$key_text,$cim1,$cim2,$cim3,'&genre=4',str_replace("".$cim4."","",$cim4),$cim5.'" class="fn-param" data-param="genre" data-value="4">Hòa Tấu</a><a href="tim-kiem.html?key=',$key_text,$cim1,$cim2,$cim3,str_replace("".$cim4."","",$cim4),$cim5.'"><i></i></a></li>';?>	
            <!-- end genre -->
        </ul>
    </div>
</div>


        <div class="section medium-margin-top">   
      <?php 
$arrSinger = $mlivedb->query(" singer_id, singer_name, singer_img, singer_big_img, singer_info,singer_viewed,singer_type,singer_like  ","singer"," singer_name_ascii = '".$key."' AND singer_name_ascii LIKE '%".$key."%' LIMIT 1");
for($i=0;$i<count($arrSinger);$i++) {
	$singer_url = 'nghe-si/'.replace(un_htmlchars(un_htmlchars($arrSinger[0][1])));

 ?>

    <div class="box-artist">
        <a href="<?php  echo $singer_url;?>" title="<?php  echo un_htmlchars(un_htmlchars($arrSinger[0][1]));?>" class="track-log" data-id="<?php  echo en_id($arrSinger[0][0]);?>">
            <img class="thumb-art" width="110" src="<?=check_img($arrSinger[0][2]);?>" alt="<?php  echo un_htmlchars($arrSinger[0][1]);?>">
        </a>
        <div class="artist-info">
            <h2>
                <a title="<?php  echo un_htmlchars($arrSinger[0][1]);?>" href="<?php  echo $singer_url;?>" class="track-log" data-id="<?php  echo en_id($arrSinger[0][0]);?>"><?php  echo un_htmlchars($arrSinger[0][1]);?></a>
            </h2>
			<?php
// Like
$like_following = $mlivedb->query(" user_following ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_following LIKE '%,".$arrSinger[0][0].",%' ");
if($like_following != '') { ?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$arrSinger[0][0];?>">	
 <a href="javascript:;" onclick="UNLIKE(<?=$arrSinger[0][0];?>,4,<?=$arrSinger[0][7];?>);" class="fn-follow _trackLink active" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arrSinger[0][7] ;?></s></span>
            </div>
<?php } else {?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$arrSinger[0][0];?>">	
 <a href="javascript:;" onclick="ADDLIKE(<?=$arrSinger[0][0];?>,4,<?=$arrSinger[0][7];?>);" class="fn-follow _trackLink" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arrSinger[0][7] ;?></s></span>
            </div>
<?php } ?>	
        </div><!-- END .artist-info -->
        <div class="artist-info-text" id="comments-show">            
            <p><?php  echo un_htmlchars(rut_ngan($arrSinger[0][4],40));?>
                <a href="#" onclick="showComm('comments');return false;" rel="nofollow" class="readmore pull-right fn-showhide" 
                   >
                    Xem toàn bộ
                </a>
            </p>
        </div><!-- END .artist.biography.cut -->
        <div class='hide-content' id='comments' class="none">            
            <div class="artist-info-text">                
                <p><?php  echo un_htmlchars($arrSinger[0][4]);?>
                </p>
                <h2 class="title-section title-section-inside">Nghệ sĩ liên quan</h2>
                <div class="row">                
<?php 
$arr = $mlivedb->query(" * ","singer"," singer_type = '".$arrSinger[0][6]."' ORDER BY RAND() LIMIT 5");
for($z=0;$z<count($arr);$z++) {
$singer_name = un_htmlchars($arr[$z][1]);
$singer_url = 'nghe-si/'.replace($singer_name);
$singer_img	= check_img($arr[$z][3]);
?>
                    <div class="pone-of-five">
                        <div class="item">
                            <a href="<?=$singer_url; ?>" title="<?=$singer_name; ?>" class="thumb">
                                <img src="<?=$singer_img; ?>" alt="Nghệ sĩ <?=$singer_name; ?>" />
                            </a>
                            <div class="description">
                                <h3 class="title-item">
                                    <a href="<?=$singer_url; ?>" title="<?=$singer_name; ?>" class="txt-primary">
                                        <?=$singer_name; ?>
                                    </a>
                                </h3>
                                <span class="txt-info">
                                    <s class="fn-followed" data-id="<?=en_id($arr[$z][0]); ?>"><?=$arr[$z][7]; ?></s>
                                    quan tâm
                                </span>
                            </div><!-- END .description -->
                        </div><!-- END .item -->
                    </div>
<?php  } ?>
                                    
                </div>
  <a href="#"  onclick="showComm('comments');return false;" rel="nofollow" class="readmore pull-right fn-showhide" >Rút gọn</a>
            </div>
        </div>
    </div>

<?php  } ?>
</div>
<?php   

	if($f == 'hit') $filter1 = " ";
	elseif($f == 'hq') 	$filter1 = " ";
	elseif($f == 'lyrics') 	$filter1 = " ";
	elseif($f == 'official') 	$filter1 = " ";
	
	if($g == '1') $genre1 = "AND album_cat LIKE '%,1,%' ";
	elseif($g == '2') 	$genre1 = "AND album_cat LIKE '%,2,%' ";
	elseif($g == '3') 	$genre1 = "AND album_cat LIKE '%,3,%' ";
	elseif($g == '4') 	$genre1 = "AND album_cat LIKE '%,4,%' ";
	
	if($t == 'singer')	$tim1 = $singer_seach_album;
	elseif($t == 'composer')	$tim1 = $singer_seach_album;
	elseif($t == 'title')	$tim1 = "OR album_name LIKE '%".$key."%' ";
	elseif(!$t) $tim1 = $singer_seach_album;
			
	if($sort == 'total_play') $sql_order1 = " ORDER BY album_viewed DESC";
	elseif($sort == 'time') 	$sql_order1 = " ORDER BY album_time DESC";
	elseif($up == 'today') 	$sql_order1 = "ORDER BY album_viewed DESC";
	elseif($up == 'week') 	$sql_order1 = "ORDER BY album_viewed DESC";
	elseif($up == 'month') 	$sql_order1 = "ORDER BY album_viewed DESC";
	elseif($up == 'year') 	$sql_order1 = "ORDER BY album_viewed DESC";
	//elseif(!$sort) 			$sql_order = " ORDER BY album_id DESC";
	elseif(!$sort) 			$sql_order1 = " ORDER BY album_viewed DESC";
$sql_album = "album_name_ascii LIKE '%".$key."%' ".$filter1." ".$genre1." ".$tim1;
$arr_album = $mlivedb->query(" * ","album",$sql_album." ".$filter1." ".$genre1." $sql_order1 LIMIT 4");
if ($arr_album && $page == 1) { 
?>
	  <div class="section">
    <h2 class="title-section">
        <a href="playlist.html?key=<?php  echo $key_text;?>" title="Album/playlist <?php  echo $ky; ?>" 
           class="ellipsis">ALBUM / PLAYLIST <?php  echo $ky; ?> <i class="icon-arrow"></i>
        </a>
    </h2>
    <div class="row">
<?php  for($i=0;$i<count($arr_album);$i++) {
$singer_name = GetSingerName($arr_album[$i][3]);
$get_singer = GetSinger($arr_album[$i][3]);
$album_url = url_link(un_htmlchars($arr_album[$i][1]).'-'.$singer_name,$arr_album[$i][0],'nghe-album');
?>

		        <div class="album-item des-inside otr col-3">
            <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]).' - '.$singer_name; ?>" class="thumb track-log" order="0">
                <img src="<?=check_img($arr_album[$i][4]); ?>" alt="Album <?php  echo un_htmlchars($arr_album[$i][1]).' - '.$singer_name; ?>" class="img-responsive" />
                <span class="icon-circle-play"></span>
                <div class="des">
                    <h3 class="title-item txt-primary ellipsis"><?php  echo un_htmlchars($arr_album[$i][1]);?></h3>
                    <h4 class="title-sd-item txt-info ellipsis"><?=$singer_name?></h4>
                </div><!-- /.des -->
                <span class="item-mask"></span>
            </a>
        </div>
<?php  } ?>
</div>
</div> <?php  } ?>
<?php   
$sql_where2 = " m_title_ascii LIKE '%".$key."%' AND m_type = 2 ".$filter." ".$genre." ".$tim;
$arr_video = $mlivedb->query("  m_id, m_title, m_singer, m_img ","data",$sql_where2." ".$filter." ".$genre." AND m_type = 2 $sql_order LIMIT 4");
if ($arr_video && $page == 1) {
?><div class="section border-bottom">
    <h2 class="title-section">
        <a href="video.html?key=<?php  echo $key_text;?>" title="MV <?php  echo $ky; ?>" class="ellipsis">Video / MV <?php  echo $ky; ?> 
            <i class="icon-arrow"></i>
        </a>
    </h2>
    <div class="row">
<?php  for($i=0;$i<count($arr_video);$i++) {
$singer_name = GetSingerName($arr_video[$i][2]);
$get_singer = GetSinger($arr_video[$i][2]);
$song_url = url_link(un_htmlchars($arr_video[$i][1]).'-'.$singer_name,$arr_video[$i][0],'xem-video');
?>
<div class="album-item col-3">
            <a href="<?php  echo $song_url; ?>" title="Video <?php  echo un_htmlchars($arr_video[$i][1]).' - '.$singer_name; ?>" class="thumb track-log" order="0">
                <img src="<?=check_img($arr_video[$i][3]); ?>" alt="Video <?php  echo un_htmlchars($arr_video[$i][1]).' - '.$singer_name; ?>" class="img-responsive" />
                <span class="icon-circle-play otr"></span>
            </a>                    
            <h3 class="title-item ellipsis">
                <a href="<?php  echo $song_url; ?>" title="Video <?php  echo un_htmlchars($arr_video[$i][1]).' - '.$singer_name; ?>" class="txt-primary track-log" order="0">
                    <?php  echo un_htmlchars($arr_video[$i][1]); ?>
                </a>
            </h3>
            <h4 class="title-sd-item ellipsis txt-info"><?=$get_singer?></h4>					
        </div><!-- END .video-item -->	
<?php  } ?>
</div></div>
        <?php  } ?>
<?php if ($arr_song) {?>
<div class="section medium-margin-top">
<?php 

for($i=0;$i<count($arr_song);$i++) {
	$song_id = en_id($arr_song[$i][0]);
	$song_idd = $arr_song[$i][0];
	$gettime = GetTIMEDATE($arr_song[$i][8]);
	$luotxem = number_format($arr_song[$i][3]);
	$getcat = GetTheLoai($arr_song[$i][6]);
$singer_name = GetSingerName($arr_song[$i][2]);
$get_singer = GetSinger($arr_song[$i][2]);
	$user_name = get_user($arr_song[$i][7]);
	$type = check_type($arr_song[$i][5],$arr_song[$i][0]);
	$song_url = url_link(un_htmlchars($arr_song[$i][1]).'-'.$singer_name,$arr_song[$i][0],'nghe-bai-hat');
	$user_name = un_htmlchars(get_data("user","username"," userid = '".$arr_song[$i][7]."'"));
	$user_url = url_link($user_name,$arr_song[$i][7],'user');
	$download = 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');


?>
    <div class="item-song" id="song<?php  echo $song_id;?>" data-type="song" data-id="<?php  echo $song_id;?>" data-code="ZmJmykHaQaNFWWZTZFJyvHZm">
        <div class="title-song">
            <h3>
                <a href="<?php  echo $song_url; ?>"  title="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo $singer_name; ?>" class="txt-primary fn-highlight track-log" 
                   data-highlight="<?php  echo $singer_name; ?>" order="0">
                    <?php  echo un_htmlchars($arr_song[$i][1]); ?>
                </a>
                - <?=$get_singer?>
            </h3>       
			<?php if($arr_song[$i][9]) { ?>
            <span class="quanlity-hq text-center">HQ</span>	
<?php } ?>
<?php if($arr_song[$i][12]) { ?>			
 <span class="quanlity-hq text-center">Top</span>
 <?php } ?>
        </div>
        <div class="info-meta">
            <span>Thể loại:</span>
            <div class="inline">
                <h4>
                   <?php  echo $getcat;?>
                </h4>
               
            </div>
            <span class="bull">&bull;</span>
            Lượt nghe: <span class="fn-number"><?php  echo $luotxem;?></span>
        </div>
        <div class="info-meta">
          <?php if($arr_song[$i][10]) { ?> <strong class="offcial-label">official</strong><?php } ?>	
<?php if($arr_song[$i][11]) { ?> 
		  <span>Đăng bởi: </span>
            <a class="fn-dname" href="<?php  echo $user_url;?>"><?php  echo $user_name;?></a>
            <i class="fn_zme_info" style="display: none;" data_uname="<?php  echo $user_name;?>" data-dname="#song<?php  echo $song_id; ?> .fn-dname" data-link="#song<?php  echo $song_id; ?> .fn-dname" data-thumbsize="50"></i>
			   <?php } ?>	
			   <span class="bull">&bull;</span>
<!--<span class="fn-date"></span>--><span><?php  echo $gettime; ?></span>
          
        </div>
        <div class="tool-song">
            <div class="i25 i-small video none"><a href="#"></a></div>

            <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#song<?php  echo $song_id;?>" href="<?php  echo $download;?>"></a></div>
				<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$song_idd?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$song_idd?>);"></a></div>
<!-- End playlist ADD -->
  <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" data-item="#song<?php  echo $song_id;?>" href="<?php  echo $song_url;?>"></a></div>
        </div><!-- END .tool-song -->
    </div>
<?php 	} ?>
</div><?php 	} ?>
        <?php  echo $phantrang; ?>
        
		</div>
 <div class="wrap-sidebar">
   <div class="widget widget-countdown">
        <?=BANNER('tim_kiem','300');?>
        </div>
    </div>
</div> </div>
    <?php  include("./theme/ip_footer.php");?>
</body>
</html>