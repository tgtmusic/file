<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
if ($_POST['xAlbumFAV']){
	$user_id	=	(int)$_POST['user_id'];
	$remove_id	=	(int)$_POST['remove_id'];
	$arr_old = $mlivedb->query(" user_like_album ","user"," userid = '".$user_id."'");
	
	if($remove_id === $arr_old[0][0]) $str = '';
	else{
		$z = explode(',',$arr_old[0][0]);
		if (in_array($remove_id,$z)) {
		unset($z[array_search($remove_id,$z)]);
			$str = implode(',',$z);
		}
	}
	// up du lieu moi
	mysqli_query($link_music,"UPDATE table_user SET user_like_album = '".$str."' WHERE userid = '".$user_id."'");
?>
<div class="zcontent">
            <h3 class="title-section">Album Yêu Thích</h3>
            <div class="tab-menu group">
                <ul>
                          <li><a href="./mymusic/favorites-song">Bài hát</a></li>
                    <li class="active"><a href="./mymusic/favorites-playlist">Playlist</a></li>                    
                    <li><a href="./mymusic/favorites-video">Video</a></li>
                </ul>
            </div><!-- END .tab-menu -->
            <div class="clearfix"></div>
<?php 
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
$fav_album 	= get_data("user","user_like_album","userid = '".$_SESSION["mlv_user_id"]."'");
?>
<form name="myform" method="post" action="./mymusic/favorites-playlist">

<div id="ask_ok" style="display:none;"></div>
<?php  if($fav_album == ',') {
	echo '<div style="padding-left: 10px;">Bạn chưa có playlist yêu thích nào.</div>';	
}else { ?>
<!--<div class="tab-menu group">
       <input class="zicon " type="checkbox" onClick="checkAllFields(1);" id="checkAll" name="checkAll" />
    <div class="func-display">

	  <li><button class="func-button" type="button" id="deleteBOX" value="Xóa" /><span class="icon-play-1"></span><span class="text-style-1">Xóa</span></button></li>
    </div>
</div>-->
 <?php 
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
if($fav_album != ','){
$list =  substr($fav_album,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$sql_tt = "SELECT album_id  FROM table_album WHERE  album_id IN ($list) ORDER BY album_id DESC LIMIT ".LIMITSONG;
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_album 		= $mlivedb->query(" album_id, album_name, album_singer, album_img, album_viewed, album_time ","album"," album_id IN ($list) ORDER BY album_id DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,"./mymusic/favorites-playlist&p=#page#","");
?>
            <div class="tab-pane">
<?php 
for($i=0;$i<count($arr_album);$i++) {
$singer_name = GetSingerName($arr_album[$i][2]);
$get_singer = GetSinger($arr_album[$i][2]);
$album_url		= url_link(un_htmlchars($arr_album[$i][1])."-".$singer_name,$arr_album[$i][0],'nghe-album');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"<div class=\"row\">";
		
	}
		elseif($i == 3 || $i == 7 || $i == 11 || $i == 15)	{
		$class2[$i]	=	"</div>";
	}
?>
<?php  echo $class1[$i]; ?>
        <div class="pone-of-four">
            <div class="item">
                <span class="thumb"> <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>"> 
                    <img width="200" class="img-responsive" src="<?php  echo check_img($arr_album[$i][3]);?>" alt="<?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" /> 
                    <span class="icon-circle-play otr"></span>  </a>
					 <span class="func-icon">
					 <a href="javascript:;" onClick="xAlbumFAV(<?php  echo $_SESSION["mlv_user_id"];?>,<?php  echo $arr_album[$i][0];?>);" class="zicon xicon fn-rmitem" data-item="#album<?php  echo en_id($arr_album[$i][0]);?>"  title="Xóa"></a>
					 <!--<input type="checkbox"  value="<?php  echo $arr_album[$i][0];?>" name="delAnn[]" onClick="checkAllFields(2);" />-->
					 
					 </span>
                </span>
                <div class="description">
                    <h3 class="title-item ellipsis">
                        <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" class="txt-primary"><?php  echo un_htmlchars($arr_album[$i][1]); ?></a>
                    </h3>
                    <div class="inblock ellipsis">
                        <h4 class="title-sd-item txt-info">
                           <?=$get_singer?>
                        </h4>
                    </div>

                </div>   
            </div>
        </div><?php  echo $class2[$i]; ?>
<?php  } ?>
			</div>
<?php  echo $phantrang; ?>
		</div>
<?php  } ?>
<?php  } ?>

</form>
</div>
<?php 
if (isset($_POST['deleteAll'])) {
	$all 	= $_POST['checkAll'];
	if($all)	{
		mysqli_query($link_music,"UPDATE table_user SET user_like_album = ',' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		mssBOX("Đã xóa xong !","./mymusic/favorites-playlist");
	}else {
	$arr 	= $_POST['delAnn'];
	$in_sql = implode(',',$arr);
	$p = explode(',',$in_sql);
	$song_id = explode(',',$fav_album);
	foreach($p as $y=>$ichphienpro) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$fav_upload = implode(',',$song_id);
			mysqli_query($link_music,"UPDATE table_user SET user_like_album = '".$fav_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			mssBOX("Đã xóa xong !","./mymusic/favorites-playlist");
		}
	
	}
	}
}
?>
<?php } ;?>

