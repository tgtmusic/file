<?php
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
if ($_POST['loadTopsong']) {
   echo top_song($_POST['type'],$_POST['number']);
   exit();
}
elseif ($_POST['load_album']) {
   echo album_new($_POST['singer_type'],$_POST['album_type']);
   exit();
}
elseif ($_POST['load_video']) {
   echo video_new($_POST['singer_type']);
   exit();
}
elseif ($_POST['showcomment']) {
    echo cam_nhan($_POST['media_id'],$_POST['page'],$_POST['comment_type']);
	exit();
}

elseif ($_POST['comment']) {
    if (isFloodPost($_SESSION['prev_post'])) {
			echo "Bạn cần phải chờ thêm $wait_post giây nữa để có thể gửi thêm bình luận";
		exit();
	 }
	$warn = '';
	$media_id = (int)$_POST['media_id'];
	$comment_poster = $_POST['comment_poster'];
	$comment_type = $_POST['comment_type'];
	$comment_content = htmlchars(stripslashes(trim(urldecode($_POST['comment_content']))));
	if ($comment_content == ""){
	        echo "Bạn chưa nhập nội dung bình luận";
		exit();
	 }
	elseif ($media_id && $comment_poster && $comment_type && $comment_content){
	mysqli_query($link_music,"INSERT INTO table_comment (comment_media_id,comment_poster,comment_content,comment_time,comment_type) VALUES ('".$media_id."','".$comment_poster."','".$comment_content."','".NOW."','".$comment_type."')");
	}
	else{ 
	     $warn = "Bạn chưa nhập cảm nhận hoặc tên người gửi";
	}
	if ($warn) echo "<b>*Lỗi :</b> ".$warn;
	else echo "OK";
	$_SESSION['prev_message_post'] = time();
	exit();
}
elseif ($_POST['login_oki']) {
	$name = isset($_POST["name"]) ? htmlspecialchars($_POST["name"]) : '';
	$pass = isset($_POST["pass"]) ? htmlspecialchars($_POST["pass"]) : '';
	$remember = isset($_POST["remember"]) ? htmlspecialchars($_POST["remember"]) : '';
	if (empty($name) || empty($pass)) { 
		mss("Bạn chưa nhập đầy đủ thông tin !",SITE_LINK);
		}
	else {
	// check user
	$arr = $mlivedb->query(" userid, username, password, salt, pass_new ","user"," username = '".$name."'");
	$pass_new = md5(md5($pass) . $arr[0][3]);
	if (count($arr)<1) {
			mss("Tên đăng nhập không tồn tại !",SITE_LINK);
	}
	else if ($pass_new == $arr[0][4] || $pass_new == $arr[0][2]){
			$_SESSION["mlv_user_id"] = $arr[0][0];
			$_SESSION["mlv_user_name"] = $arr[0][1];
			if ($remember == 1) {
				_SETCOOKIE("member_id" , $arr[0][0] , 1);
				_SETCOOKIE("pass_hash" , $arr[0][2] , 1);
			}
			mss("Đăng nhập thành công !",SITE_LINK);
		}
	else {
			mss("Mật khẩu không đúng !",SITE_LINK);
	}
	}
}
?>