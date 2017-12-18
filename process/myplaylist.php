<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
if ($_POST['xMyAlbum']){
	$album_id	=	(int)$_POST['album_id'];
	// up du lieu moi
	mysqli_query($link_music,"DELETE FROM table_album WHERE album_poster = '".$_SESSION["mlv_user_id"]."'  AND album_id = '".$album_id."'");
?>
<div class="zcontent">
            <h3 class="title-section">Playlist</h3>
            <div class="tab-menu group">
                <ul>
                          <li><a href="./mymusic/upload">Bài hát</a></li>
                    <li class="active"><a href="./mymusic/myplaylist">Playlist</a></li>                    
                    <li><a href="./mymusic/upload-video">Video</a></li>
                </ul>
            </div><!-- END .tab-menu -->
            <div class="clearfix"></div>
			 <div class="func-tool group">
                <div class="func-button">
                    <span class="icon-playlist-1"></span>
                    <span class="text-style-1"><a title="Tạo playlist mới" href="./mymusic/myplaylist/create">Tạo playlist mới</a></span>
                </div><!-- /.func-button -->
                <!--<div class="custom-filter">
                    <span>Sắp xếp theo:</span>
                    <ul>
                        <li><a class="" href="/mymusic/myplaylist">Mới nhất</a></li>
                        <li><a class="" href="/mymusic/myplaylist?sort=total_play">Lượt nghe</a></li>
                    </ul>
                </div>-->
            </div><!-- /.func-tool -->

            <div class="clearfix"></div>
<?php 
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}

	// phan trang
	$sql_tt = "SELECT album_id  FROM table_album WHERE  album_poster = '".$_SESSION["mlv_user_id"]."' AND album_type = 1 ORDER BY album_id DESC LIMIT ".LIMITSONG;

	$rStar = HOME_PER_PAGE * ($page -1 );
	$arrAlbum = $mlivedb->query(" album_id, album_name, album_singer,album_viewed,album_time,album_img,album_song ","album"," album_poster = '".$_SESSION["mlv_user_id"]."' AND album_type = 1 ORDER BY album_name DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,"./mymusic/myplaylist&p=#page#","");

?>
<form name="myform" method="post" action="mymusic/myplaylist">

<div id="ask_ok" style="display:none;"></div>
<?php  if(!$arrAlbum) {
	echo '<div style="padding-left: 10px;">Hiện tại bạn chưa có playlist nào.</div>';	
}else { ?>

		<!-- <div class="tab-menu group">
       <input  class="zicon " type="checkbox" onClick="checkAllFields(1);" id="checkAll" name="checkAll" />
    <div class="func-display">

	  <li><button class="func-button" type="button" id="deleteBOX" value="Xóa" /><span class="icon-play-1"></span><span class="text-style-1">Xóa</span></button></li>
    </div>
</div>	
<br/>-->
  <div class="tab-pane">
    <div class="row">
        <div class="col-12">
            <div class="list-item full-width list-item-canhan">                            
                <ul>
<?php 
for($i=0;$i<count($arrAlbum);$i++) {
$singer_name = GetSingerName($arrAlbum[$i][2]);
$get_singer = GetSinger($arrAlbum[$i][2]);
$album_url		= url_link(un_htmlchars($arrAlbum[$i][1]),$arrAlbum[$i][0],'nghe-album');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
		elseif($i == 3 || $i == 7 || $i == 11 || $i == 15)	{
		$class2[$i]	=	"</div>";
	}
?>
		                    <li id="playlist" >
                        <div class="e-item">
                            <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arrAlbum[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" class="thumb pull-left _trackLink" tracking="_frombox=mymusic_myplaylist_">
                                <img width="90" height="90" src="<?php  echo check_img($arrAlbum[$i][5]);?>" alt="<?php  echo un_htmlchars($arrAlbum[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" />
                            </a>
                            <h3 class="title-item ellipsis">
                                <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arrAlbum[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" class="txt-primary big-size _trackLink" tracking="_frombox=mymusic_myplaylist_"><?php  echo un_htmlchars($arrAlbum[$i][1]); ?></a>
                            </h3>
                            <p class="title-sd-item">
                                <span class="txt-info">
                                    Ngày tạo: <span data-date="<?php echo $arrAlbum[$i][4]; ?>"><?php  echo GetTIMEDATE($arrAlbum[$i][4]); ?></i></span>
                                    <span class="txt-info">Số bài hát: <?php if($arrAlbum[$i][6] != '') { echo SoBaiHat($arrAlbum[$i][6]);} else { echo'0';}?>
                                    </span>
                            </p>
                            <p class="title-sd-item"><span class="txt-info">Lượt nghe: <?php  echo $arrAlbum[$i][3]; ?></span></p>
                        </div><!-- END .e-item -->
                        <div class="item-tool">
                            <a title="Sửa playlist" href="./mymusic/myplaylist-edit/<?php  echo en_id($arrAlbum[$i][0]);?>" class="zicon icon-edit-1"></a>
                            <a href="javascript:;" onClick="xMyAlbum(<?php  echo $arrAlbum[$i][0];?>);" title="Xóa playlist" class="zicon icon-remove-2 fn-rmitem" data-item="#playlistIOUD0ZCA"></a>
                        </div>
                    </li>
<?php  };?>
</ul>

            </div><!-- END .list-item -->
        </div><!-- END .col-12 -->
    </div><!-- /.row -->
</div><!-- END .tab-pane -->
            <div class="clearfix"></div>
<?php  echo $phantrang; ?>
<?php  } ?>

</form>

</div>
<?php 
if (isset($_POST['deleteAll'])) {
	$all 	= $_POST['checkAll'];
	if($all)	{
		mysqli_query($link_music,"DELETE FROM table_album WHERE album_poster = '".$_SESSION["mlv_user_id"]."'  AND album_type = 1");
		mssBOX("Đã xóa xong !","mymusic/myplaylist");
	}else {
	$arr 	= $_POST['delAnn'];
	$in_sql = implode(',',$arr);
	mysqli_query($link_music,"DELETE FROM table_album WHERE album_poster = '".$_SESSION["mlv_user_id"]."'  AND album_id IN (".$in_sql.")");
	mssBOX("Đã xóa xong !","mymusic/myplaylist");
	}
}
?>
</div>
<?php } ;?>

