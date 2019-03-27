<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
include("./includes/functions_user.php");
$myFilter = new InputFilter();
if(isset($_GET["act"])) $act=$myFilter->process($_GET["act"]);
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);

if(!$_SESSION["mlv_user_id"])  mss("Bạn chưa đăng nhập vui lòng đăng nhập để sử dụng chức năng này.","".SITE_LINK."");

if($act == "myplaylist-edit") $name_seo = "Sửa Playlist";

if ($act=='') header("Location: ".SITE_LINK."404.html");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title><?php  echo $name_seo;?> của <?php  echo $_SESSION["mlv_user_name"];?> | <?=NAMEWEB?></title>
<meta name="title" content="<?php  echo $name_seo;?> của <?php  echo $_SESSION["mlv_user_name"];?> | <?=NAMEWEB?>" />
<meta name="keywords" content="<?php  echo $_SESSION["mlv_user_name"];?>, playlist, album, tong hop, chon loc, chia se" />
<meta name="description" content="Các <?php  echo $name_seo;?> của <?php  echo $_SESSION["mlv_user_name"];?> được <?php  echo $_SESSION["mlv_user_name"];?> sưu tầm chọn lọc chia sẻ trên <?=NAMEWEB?>" />
<?php  include("./theme/ip_java.php");?>
<script type="text/javascript" src="<?php echo SITE_LINK;?>theme/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<?php echo SITE_LINK;?>script/menu.jquery.js"></script> 
<script type="text/javascript" src="<?php echo SITE_LINK;?>script/jquery.cookie.js"></script>
<script type="text/javascript" src="<?php echo SITE_LINK;?>theme/js/jquery.boxy.js"></script>
</head>
<body>

<?php 
$album_id	=	del_id($id);
$arrz 		= 	$mlivedb->query(" album_id, album_name, album_info, album_song,album_img,album_cat ","album"," album_poster = '".$_SESSION["mlv_user_id"]."' AND album_id = '".$album_id."'");
?>


<div class="zcontent" style="padding:20px;">
             <div class="tab-pane">
                    <div class="row">
                        <div class="col-12">
                            <div class="list-item full-width">
 <center> <div id="response"></div></center>
 <ul id="LoadSongAlbum">
<?php 
if($arrz[0][3] != ''){
	$s = explode(',',$arrz[0][3]);
	foreach($s as $x=>$val) {
		$arr[$x] = $mlivedb->query(" m_id, m_title, m_singer, m_viewed ","data"," m_id = '".$s[$x]."'");
		$singer_name = GetSingerName($arr[$x][0][2]);
		$get_singer = GetSinger($arr[$x][0][2]);
		$stt	=	$x+1;
		$song_url 		= url_link(un_htmlchars($arr[$x][0][1])."-".$singer_name,$arr[$x][0][0],'nghe-bai-hat');
		
?>

 <li class="group" id="arrayorder_<?php  echo $arr[$x][0][0];?>" >
                                        <input type="hidden" name="item_id" value="<?php  echo en_id($arr[$x][0][0]);?>" />
                                        <div class="info-dp pull-left">
                                            <h3 class="txt-primary"><?php  echo $stt;?>. 
                                                <a href="<?php  echo $song_url;?>" title="Bài hát  <?php echo un_htmlchars($arr[$x][0][1]);?> - <?php  echo $singer_name;?>">
                                                    <?php echo rut_ngan(un_htmlchars(un_htmlchars($arr[$x][0][1])).' - '.$singer_name,9);?>
                                                </a>
                                            </h3>
                                        </div>
                                        <div class="bar-chart"><span class="fn-bar" title="<?php  echo $arr[$x][0][3];?>" style="width:<?php  echo $arr[$x][0][3]/50;?>%;"></span></div>                                    
                                        <div class="tool-song">
                                            <div class="i25 i-small remove"><a onClick="xSongAlbum(<?php  echo $arrz[0][0];?>,<?php  echo $arr[$x][0][0];?>);" title="Xóa" class="fn-rmitem" data-item="#song<?php  echo en_id($arr[$x][0][0]);?>"></a></div>
                                            <div class="i25 i-small drag"><a href="#"></a></div>
                                        </div>
                                    </li> 
	<?php  }} ?>
</ul>
 
 </div>
    </div>
                </div> 

</div>

<?php 
if($_POST['Save']) {
	$album_name 	= htmlchars(stripslashes($_POST['PLNAME']));
	$album_info 	= htmlchars(stripslashes($_POST['PLINFO']));
	$album_img 	= htmlchars(stripslashes($_POST['PLIMG']));
		$category 	= $_POST['cat_name'];
	if(!$album_name) mssBOX("Bạn chưa nhập tên album !",$_SERVER["REQUEST_URI"]);
	else {
	mysqli_query($link_music,"UPDATE table_album SET album_name = '".$album_name."',album_name_ascii = '".get_ascii($album_name)."', album_info = '".$album_info."', album_img = '".$album_img."',album_cat = '".$category."' WHERE album_id = '".$album_id."'");
	mssBOX("Playlist của bạn đã được lưu lại !","mymusic/myplaylist");
	}
}
?>
<input type="hidden" id="id_album" value="<?php  echo $album_id;?>">

<script type="text/javascript" src="<?php echo SITE_LINK;?>script/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){ 	
function slideout(){
  setTimeout(function(){
  $("#response").slideUp("slow", function () {
});
}, 500);}
    $("#response").hide();
	$(function() {
	$("ul").sortable({ opacity: 0.8, cursor: 'move', update: function() {
			var order = $(this).sortable("serialize") + '&update=update&id_album=<?php  echo $album_id;?>'; 
			$.post("update-album.php", order, function(theResponse){
				$("#response").html(theResponse);
				$("#response").slideDown('slow');
				slideout();
			}); 															 
		}								  
		});
	});

});
function xSongAlbum(album_id,remove_id) {
				 var order = "xSongAlbum=1&album_id="+album_id+'&remove_id='+remove_id;
				 $.post("update-album.php", order, function(theResponse){
						 	$('#LoadSongAlbum').html(theResponse);
						 });
}

</script>

</div>

</body>
</html>
