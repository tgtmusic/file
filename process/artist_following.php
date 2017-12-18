<?php 
define('MLive-Channel',true);
include("../includes/configurations.php");
if ($_POST['xArtistFollowing']){
	$user_id	=	(int)$_POST['user_id'];
	$remove_id	=	(int)$_POST['remove_id'];
	$arr_old = $mlivedb->query(" user_following ","user"," userid = '".$user_id."'");
	
	if($remove_id === $arr_old[0][0]) $str = '';
	else{
		$z = explode(',',$arr_old[0][0]);
		if (in_array($remove_id,$z)) {
		unset($z[array_search($remove_id,$z)]);
			$str = implode(',',$z);
		}
	}
	// up du lieu moi
	mysqli_query($link_music,"UPDATE table_user SET user_following = '".$str."' WHERE userid = '".$user_id."'");
?>
<div class="zcontent">
            <h3 class="title-section">Quan Tâm</h3>

            <div class="clearfix"></div>
<?php 
if(isset($_GET["p"])) $page=$myFilter->process($_GET["p"]);
$fav_following 	= get_data("user","user_following","userid = '".$_SESSION["mlv_user_id"]."'");
?>
<form name="myform" method="post" action="mymusic/following-artist">

<div id="ask_ok" style="display:none;"></div>
<?php  if($fav_following == ',') {
	echo '<div style="padding-left: 10px;">Bạn chưa có nghệ sĩ yêu thích nào.</div>';	
}else { ?>

			<!-- <div class="tab-menu group">
       <input  class="zicon " type="checkbox" onClick="checkAllFields(1);" id="checkAll" name="checkAll" />
    <div class="func-display">

	  <li><button class="func-button" type="button" id="deleteBOX" value="Xóa" /><span class="icon-play-1"></span><span class="text-style-1">Xóa</span></button></li>
    </div>
</div>	-->
 <?php 
if($page > 0 && $page!= "")
	$start=($page-1) * HOME_PER_PAGE;
else{
	$page = 1;
	$start=0;
}
if($fav_following != ','){
$list =  substr($fav_following,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$sql_tt = "SELECT singer_id  FROM table_singer WHERE  singer_id IN ($list) ORDER BY singer_id DESC LIMIT ".LIMITSONG;
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_singer 		= $mlivedb->query(" singer_id, singer_name, singer_img, singer_type, singer_cat,singer_viewed ","singer"," singer_id IN ($list) ORDER BY singer_id DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,"./mymusic/following-artist&p=#page#","");
?>
<div class="tab-pane ">

<?php  
echo '<div>';
for($i=0;$i<count($arr_singer);$i++) {
	$singer_name 	=	un_htmlchars($arr_singer[$i][1]);
	$singer_img = check_img($arr_singer[$i][2]);
	$singer_url = 'nghe-si/'.replace($singer_name);
		if($i == 0 || $i == 5 || $i == 10 || $i == 15 || $i == 20 || $i == 25 || $i == 30 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
	}
?><?php  echo $class1[$i]; ?>
               <div class="pone-of-five" id="artist<?=en_id($arr_singer[$i][0])?>" data-from="fav" data-name="<?=$singer_name?>" data-type="artist" data-id="<?=en_id($arr_singer[$i][0])?>">
            <div class="item">
               <span class="thumb"> <a href="<?=$singer_url?>" title="Nghệ sĩ <?=$singer_name?>" >
                    <img src="<?=$singer_img?>" alt="Nghệ sĩ <?=$singer_name?>" /></a>
                    <span class="func-icon">
					<!--<input  type="checkbox"  value="<?php  echo $arr_singer[$i][0];?>" name="delAnn[]" onClick="checkAllFields(2);" />-->
					<a href="javascript:;" onClick="xArtistFollowing(<?php  echo $_SESSION["mlv_user_id"];?>,<?php  echo $arr_singer[$i][0];?>);" class="zicon xicon fn-rmitem" data-item="#artist<?=en_id($arr_singer[$i][0])?>" title="Xóa"></a>
						
                    </span>
                </span>
                <div class="description text-center">
                    <h3 class="title-item fw7"><a href="<?=$singer_url?>" title="Nghệ sĩ <?=$singer_name?>" class="txt-primary"><?=$singer_name?></a></h3>
                    <span class="txt-info"><s ><?=$arr_singer[$i][5]?></s> quan tâm </span>								
                </div><!-- END .description -->
            </div><!-- END .item -->
        </div><!-- END .pone-of-five -->
	
<?php } echo '</div>'; ?>
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
		mysqli_query($link_music,"UPDATE table_user SET user_following = ',' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		mssBOX("Đã xóa xong !","./mymusic/following-artist");
	}else {
	$arr 	= $_POST['delAnn'];
	$in_sql = implode(',',$arr);
	$p = explode(',',$in_sql);
	$song_id = explode(',',$fav_following);
	foreach($p as $y=>$ichphienpro) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$fav_upload = implode(',',$song_id);
			mysqli_query($link_music,"UPDATE table_user SET user_following = '".$fav_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			mssBOX("Đã xóa xong !","./mymusic/following-artist");
		}
	
	}
	}
}
?>
<?php } ;?>

