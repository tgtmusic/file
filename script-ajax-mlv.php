<?php
define('MLive-Channel',true);
include("./includes/configurations.php");
if(isset($_POST['Login'])) {
	// kiểm tra đăng nhập
	$cookie = array();
	$cookie['USERID'] 	 = intval(_GETCOOKIE('member_id'));
	$cookie['USERPASS']  = _GETCOOKIE('pass_hash');
	if ($cookie['USERID'] != "" && $cookie['USERPASS'] != "") {
		$arrcookie	=	$mlivedb->query("username,avatar","user","userid = '".$cookie['USERID']."' AND password = '".$cookie['USERPASS']."'");
		if ($arrcookie) {
			$_SESSION["mlv_user_id"] 	= $cookie['USERID'];
			$_SESSION["mlv_user_name"] 	= $arrcookie[0][0];
			$_SESSION["mlv_user_avatar"] 	= $arrcookie[0][1];
			$user_url = url_link($_SESSION["mlv_user_name"],$act,'users');
		}
	}
	else {
			$_SESSION["mlv_user_id"] = "";
			$_SESSION["mlv_user_name"] = "";
	}

	// login
	if($_SESSION["mlv_user_id"]) {
		echo ' <div class="user-section pull-right fn-userbox"><a href="#" class="zicon icon-vip fn-vip none"></a> 
<div class="user-jump">
 <img height="20px" class="fn-thumb" src="'.check_avt($_SESSION["mlv_user_avatar"]).'">
 <a href="javascript:void(0);" class="name-log"> Cá nhân <i class="icon-s-arrow"></i> </a> 
 <div class="tip-dropdown"> 
 <span class="arr-top" style="left:230px;"></span> 
 <div class="avt-header"> 
 <a class="fn-profile" href="'.$user_url.'" rel="nofollow" title="Trang cá nhân"> 
 <img width="80px" height="80px" class="fn-thumb" src="'.check_avt($arrcookie[0][1]).'"> </a> 
 </div>
 <ul> <li>
 <a class="fn-profile" target="_blank" rel="nofollow" href="'.$user_url.'" title="Trang cá nhân"> 
 <i class="zicon icon-human-round"></i> Trang cá nhân </a> </li>
 <li> <a class="fn-edit" rel="nofollow" href="./thanh-vien/doi-thong-tin.html" title="Cập nhật thông tin"> <i class="zicon icon-pen"></i> Cập nhật thông tin </a> </li> 
 <!--<li> <a class="fn-privacy" target="_blank" rel="nofollow" href="#" title="Cài đặt riêng tư"> <i class="zicon icon-tools"> </i> Cài đặt riêng tư </a> </li> -->
 <li> <a class="fn-pwd" rel="nofollow" href="./thanh-vien/doi-mat-khau.html" title="Đổi mật khẩu"> <i class="zicon icon-lock"></i> Đổi mật khẩu </a> </li> 
 <li> <a class="fn-logout" href="./thanh-vien/thoat.html" title="Thoát"> <i class="zicon icon-door"></i> Thoát </a> </li> 
 </ul> 
 <a href="'.$user_url.'" target="_blank" class="btn-upgrade-vip fn-viprequire" data-step="2"> CÁ NHÂN </a> </div> 
 </div> <i class="fn_zme_info" style="display: none;" data_uid="1001628171" data-thumb="#userBox .fn-thumb" data-thumbsize="120"></i> </div>
		<script>var LoginMLV = \'YES\';</script>
		';
		exit();
	} else { 
		echo '<div class="nav-account pull-right fn-guestbox"> <a class="fn-login" href="javascript:void(0);" onclick="Login_Box();" title="Đăng nhập">Đăng nhập</a> <span class="slash">/</span> <a href="thanh-vien/dang-ky.html" title="Đăng ký">Đăng ký</a> </div><script>var LoginMLV = \'NO\';</script>';
		exit();
	}
}
elseif(isset($_POST['liked']) && $_SESSION["mlv_user_id"]) {
$add_id = (int)$_POST['add_id'];
$type	= (int)$_POST['type'];
$like_song 	= get_data("user","user_song_like","userid = '".$_SESSION["mlv_user_id"]."'");
$like_album = get_data("user","user_album_like","userid = '".$_SESSION["mlv_user_id"]."'");
$like_video = get_data("user","user_video_like","userid = '".$_SESSION["mlv_user_id"]."'");
$like_following = get_data("user","user_following","userid = '".$_SESSION["mlv_user_id"]."'");
	if($type == 1){
$song = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_id = '".$add_id."'");
$row_song = mysqli_fetch_array($song);
$n_song = $row_song['m_like']+1;
			if(!$like_song) {
			mysqli_query($link_music,"INSERT INTO table_user (user_song_like) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_song);
			if (!in_array($add_id,$z)) {
			$like_s	=	$like_song.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_song_like = '".$like_s."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
			mysqli_query($link_music,"UPDATE table_data SET m_like='".$n_song."' WHERE m_id = '".$add_id."'");
	}
	elseif($type == 2){
$album = mysqli_query($link_music,"SELECT * FROM table_album WHERE album_id = '".$add_id."'");
$row_album = mysqli_fetch_array($album);
$n_album = $row_album['m_like']+1;
			if(!$like_album) {
			mysqli_query($link_music,"INSERT INTO table_user (user_album_like) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_album);
			if (!in_array($add_id,$z)) {
			$like_a	=	$like_album.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_album_like = '".$like_a."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
			mysqli_query($link_music,"UPDATE table_album SET album_like='".$n_album."' WHERE album_id = '".$add_id."'");
	}
		elseif($type == 3){
$video = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_id = '".$add_id."'");
$row_video = mysqli_fetch_array($video);
$n_video = $row_video['m_like']+1;
			if(!$like_video) {
			mysqli_query($link_music,"INSERT INTO table_user (user_video_like) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_video);
			if (!in_array($add_id,$z)) {
			$like_s	=	$like_video.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_video_like = '".$like_s."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
			mysqli_query($link_music,"UPDATE table_data SET m_like='".$n_video."' WHERE m_id = '".$add_id."'");
	}
			elseif($type == 4){
$singer = mysqli_query($link_music,"SELECT * FROM table_singer WHERE singer_id = '".$add_id."'");
$row_singer = mysqli_fetch_array($singer);
$n_singer = $row_singer['m_like']+1;
			if(!$like_following) {
			mysqli_query($link_music,"INSERT INTO table_user (user_following) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_following);
			if (!in_array($add_id,$z)) {
			$like_s	=	$like_following.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_following = '".$like_s."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
			mysqli_query($link_music,"UPDATE table_singer SET singer_like='".$n_singer."' WHERE singer_id = '".$add_id."'");
	}
exit();
}
elseif(isset($_POST['unliked']) && $_SESSION["mlv_user_id"]) {
$add_id = (int)$_POST['add_id'];
$type	= (int)$_POST['type'];
$like_song 	= get_data("user","user_song_like","userid = '".$_SESSION["mlv_user_id"]."'");
$like_album = get_data("user","user_album_like","userid = '".$_SESSION["mlv_user_id"]."'");
$like_video = get_data("user","user_video_like","userid = '".$_SESSION["mlv_user_id"]."'");
$like_following = get_data("user","user_following","userid = '".$_SESSION["mlv_user_id"]."'");
	if($type == 1){
$song = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_id='".$add_id."'");
$row_song = mysqli_fetch_array($song);
$n_song = $row_song['m_like']-1;		
		if(!$like_song) {
			mysqli_query($link_music,"INSERT INTO table_user (user_song_like) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_song);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_song_like = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
			mysqli_query($link_music,"UPDATE table_data SET m_like='".$n_song."' WHERE m_id='".$add_id."'");
		}
	elseif($type == 2){
$album = mysqli_query($link_music,"SELECT * FROM table_album WHERE album_id='".$add_id."'");
$row_album = mysqli_fetch_array($album);
$n_album = $row_album['album_like']-1;		
		if(!$like_album) {
			mysqli_query($link_music,"INSERT INTO table_album (user_album_like) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_album);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_album_like = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
			mysqli_query($link_music,"UPDATE table_album SET album_like='".$n_album."' WHERE album_id='".$add_id."'");
		}	
	elseif($type == 3){
$video = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_id='".$add_id."'");
$row_video = mysqli_fetch_array($video);
$n_video = $row_video['m_like']-1;		
		if(!$like_video) {
			mysqli_query($link_music,"INSERT INTO table_user (user_video_like) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_video);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_video_like = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
			mysqli_query($link_music,"UPDATE table_data SET m_like='".$n_video."' WHERE m_id='".$add_id."'");
		}
	elseif($type == 4){
$singer = mysqli_query($link_music,"SELECT * FROM table_singer WHERE singer_id='".$add_id."'");
$row_singer = mysqli_fetch_array($singer);
$n_singer = $row_singer['singer_like']-1;		
		if(!$like_following) {
			mysqli_query($link_music,"INSERT INTO table_user (user_following) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_following);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_following = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
			mysqli_query($link_music,"UPDATE table_singer SET singer_like='".$n_singer."' WHERE singer_id='".$add_id."'");
		}			
exit();
}
elseif(isset($_POST['checkPL'])) {
	$number	=	$_POST['number'];
	if($_SESSION["mlv_user_id"]) echo '<a class="i25 i-small download" style="cursor:pointer;" onclick="_load_box('.$number.');"></a>';
	else echo '<a class="i25 i-small addlist" onclick="Login_Box();" style="cursor:pointer;"></a>';	
}

elseif(isset($_POST['song_id']) && $_SESSION["mlv_user_id"]) {
	$song_id = (int)$_POST['song_id'];
	$arr = $mlivedb->query(" album_id, album_name ","album"," album_poster = '".$_SESSION["mlv_user_id"]."' AND album_type = 1 ORDER BY album_name ASC");
	echo '<span class="arr-top"><i></i></span><ul> <li><span>Thêm vào Playlist</span></li><div class="section-hidden"> ';
	echo '<div class="fn-list"><li class="fn-fav none"><a class="fn-add" href="javascript:;" onclick="ADDFAV('.$song_id.',1);"> Yêu thích</a></li><li class="fn-item none"><a class="fn-add" href="javascript:;" onclick="ADDFAV('.$song_id.',1);"><input type="checkbox"> <label class="fn-name"></label></a></li><li class="fn-fav" id="0"><a class="fn-add" title="Yêu Thích" href="javascript:;" onclick="ADDFAV('.$song_id.',1);" ><i class="icon-heart"></i>Yêu Thích</a></li>';
	for($z=0;$z<count($arr);$z++) {
	echo '<li class="fn-item" id="'.$song_id.'"><a class="fn-add" data-type="song" data-id="0" title="" onclick="THEMPLAYLIST('.$arr[$z][0].','.$song_id.');" data-pid="'.$song_id.'" data-from="playlist" data-item="#'.$song_id.' .fn-add" data-name="'.$arr[$z][1].'" data-title="'.$arr[$z][1].'"><input type="checkbox"> <label class="fn-name">'.$arr[$z][1].'</label></a></li>';
	}
	echo '</div><li class="line-top fn-btnnew"><a class="fn-showhide" data-show="#playlistBox .fn-new" data-hide="#playlistBox .fn-btnnew" onclick="_CREATPLAYLIST('.$song_id.',0);">Tạo Playlist mới</a></li>';
	echo '<li id="_CREATPLAYLIST_'.$song_id.'" class="line-top fn-new"> <form class="fn-playlist" id="_CREATPLAYLIST_'.$song_id.'"></form></li>';
	echo '</div>';
}
elseif(isset($_POST['CreatPlaylist']) && $_SESSION["mlv_user_id"]) {
	$album_name 	= htmlchars(stripslashes($_POST['album_name']));
	$id_song 		= (int)$_POST['id'];
	$checkAL 		= get_data("album","album_id"," album_name = '".$album_name."'");
	if($album_name && !$checkAL) {
		mysqli_query($link_music,"INSERT INTO table_album (album_name,album_name_ascii,album_singer,album_poster,album_song,album_type,album_time) VALUES ('".$album_name."','".get_ascii($album_name)."','1','".$_SESSION["mlv_user_id"]."','".$id_song."','1','".NOW."')");
		echo 0;
	}else {
		echo 1;
	}
	exit();
}
elseif(isset($_POST['FAV']) && $_SESSION["mlv_user_id"]) {
$add_id = (int)$_POST['add_id'];
$type	= (int)$_POST['type'];
$like_song 	= get_data("user","user_like_song","userid = '".$_SESSION["mlv_user_id"]."'");
$like_album = get_data("user","user_like_album","userid = '".$_SESSION["mlv_user_id"]."'");
$like_video = get_data("user","user_like_video","userid = '".$_SESSION["mlv_user_id"]."'");
$like_following = get_data("user","user_following","userid = '".$_SESSION["mlv_user_id"]."'");
$like_song_check 	= get_data("user","user_like_song","userid = '".$_SESSION["mlv_user_id"]."' AND user_like_song LIKE ',".$add_id.",' ");
	if($type == 1){
			if(!$like_song) {
			mysqli_query($link_music,"INSERT INTO table_user (user_like_song) VALUES (',".$add_id.",')");
		}else {
			
			$z = explode(',',$like_song);
			if (!in_array($add_id,$z)) {
			$like_s	=	$like_song.$add_id.',';
			if(!$like_song_check) {
mysqli_query($link_music,"UPDATE table_user SET user_like_song = '".$like_s."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
				echo 'no';
	}
			}
	
		}
	}
	elseif($type == 2){
			if(!$like_album) {
			mysqli_query($link_music,"INSERT INTO table_user (user_like_album) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_album);
			if (!in_array($add_id,$z)) {
			$like_a	=	$like_album.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_like_album = '".$like_a."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
	}
		elseif($type == 3){
			if(!$like_video) {
			mysqli_query($link_music,"INSERT INTO table_user (user_like_video) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_video);
			if (!in_array($add_id,$z)) {
			$like_s	=	$like_video.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_like_video = '".$like_s."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
	}
			elseif($type == 4){
			if(!$like_following) {
			mysqli_query($link_music,"INSERT INTO table_user (user_following) VALUES (',".$add_id.",')");
		}else {
			$z = explode(',',$like_following);
			if (!in_array($add_id,$z)) {
			$like_s	=	$like_following.$add_id.',';
mysqli_query($link_music,"UPDATE table_user SET user_following = '".$like_s."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
			}
		}
	}
exit();
}
elseif(isset($_POST['UNFAV']) && $_SESSION["mlv_user_id"]) {
$add_id = (int)$_POST['add_id'];
$type	= (int)$_POST['type'];
$like_song 	= get_data("user","user_like_song","userid = '".$_SESSION["mlv_user_id"]."'");
$like_album = get_data("user","user_like_album","userid = '".$_SESSION["mlv_user_id"]."'");
$like_video = get_data("user","user_like_video","userid = '".$_SESSION["mlv_user_id"]."'");
$like_following = get_data("user","user_following","userid = '".$_SESSION["mlv_user_id"]."'");
	if($type == 1){		
		if(!$like_song) {
			mysqli_query($link_music,"INSERT INTO table_user (user_like_song) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_song);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_like_song = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
		}
	elseif($type == 2){	
		if(!$like_album) {
			mysqli_query($link_music,"INSERT INTO table_album (user_like_album) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_album);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_like_album = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
		}	
	elseif($type == 3){	
		if(!$like_video) {
			mysqli_query($link_music,"INSERT INTO table_user (user_like_video) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_video);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_like_video = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
		}
	elseif($type == 4){	
		if(!$like_following) {
			mysqli_query($link_music,"INSERT INTO table_user (user_following) VALUES (',".$add_id.",')");
		}else {
	$p = explode(',',$add_id);
	$song_id = explode(',',$like_following);
	foreach($p as $y=>$mlivechannel) {
		if (in_array($p[$y],$song_id)) {
			unset($song_id[array_search($p[$y],$song_id)]);
			$like_song_upload = implode(',',$song_id);
mysqli_query($link_music,"UPDATE table_user SET user_following = '".$like_song_upload."' WHERE userid = '".$_SESSION["mlv_user_id"]."'");
		}
		}
		}
		}			
exit();
}
elseif (isset($_POST['ADDPLAYLIST']) && $_SESSION["mlv_user_id"]) {
	$album_id 	= (int)$_POST['add_id'];
	$song_id	= (int)$_POST['bh_id'];
	$album_song 	= get_data("album","album_song"," album_id = '".$album_id."'");
			if($album_song != '' ) {
					$z = explode(',',$album_song);
	if (!in_array($song_id,$z)) {
		$fav_s	=	$album_song.','.$song_id;
		mysqli_query($link_music,"UPDATE table_album SET album_song = '".$fav_s."' WHERE album_id = '".$album_id."'");
	}	
		}else {
	mysqli_query($link_music,"UPDATE table_album SET album_song = '".$song_id."' WHERE album_id = '".$album_id."'");
		}

	echo 'oki!';
	exit();
}
elseif(isset($_POST['AddFAVAlbum'])) {
	$add_id 	= (int)$_POST['add_id'];
	$fav_album 	= get_data("user","user_like_album","userid = '".$_SESSION["mlv_user_id"]."' ");	
	$z 			= explode($fav_album,',');
	if (in_array($z,$add_id)) echo 'no';
	else echo 'oki';
	exit();
}
elseif(isset($_POST['AddFAVVideo'])) {
	$add_id 	= (int)$_POST['add_id'];
	$fav_video 	= get_data("user","user_like_video","userid '".$_SESSION["mlv_user_id"]."'");	
	$z 			= explode($fav_video,',');
	if (in_array($z,$add_id)) echo 'no';
	else echo 'oki';
	exit();
}
elseif(isset($_POST['AddFAVSinger'])) {
	$add_id 	= (int)$_POST['add_id'];
	$fav_following 	= get_data("user","user_following","userid = '".$_SESSION["mlv_user_id"]."'");		
	$z 			= explode($fav_following,',');
	if (in_array($z,$add_id)) echo 'no';
	else echo 'oki';
	exit();
}
elseif($_POST['SendError']) {
	$id_media 	 = (int)$_POST['media_id'];
	$errortxt	 = htmlchars(stripslashes($_POST['errortxt']));
	$type		 = (int)$_POST['type'];
	if(strlen($errortxt) > 250) {
		echo 1;
		exit();
	}else {
		mysqli_query($link_music,"UPDATE table_data SET m_is_broken = 1 WHERE m_id = '".$id_media."'");
		mysqli_query($link_music,"INSERT INTO table_error (er_id,er_text,er_type) VALUES ('".$id_media."','".$errortxt."','".$type."')");
		echo 2;
		exit();
	}	
}
?>