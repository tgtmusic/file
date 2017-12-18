<?php 
if($del_id) {
		$arr_img = $mlivedb->query(" adv_img ","adv"," adv_id = '".$del_id."'");
		delFile($arr_img[0][0]);
		mysqli_query($link_music,"DELETE FROM table_adv WHERE adv_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-ads&mode=list-ads");
}
elseif($mode == 'add') {
	$action	=	'index.php?act=ads&mode=add';
	if($_POST['submit']) {
		$ten_banner 	 = stripslashes(trim(urldecode($_POST['ten_banner'])));
		$link_banner 	 = stripslashes(trim(urldecode($_POST['link_banner'])));
		$phan_loai 	 	 = stripslashes(trim(urldecode($_POST['phan_loai'])));
		$vitri 	 	 	 = stripslashes(trim(urldecode($_POST['vitri'])));
		$stt 	 	 	 = stripslashes(trim(urldecode($_POST['stt'])));
		$status		 	 = stripslashes(trim(urldecode($_POST['status'])));		$file_name = str_replace(' ',"",NAMEWEB);
		if(move_uploaded_file ($_FILES['img']['tmp_name'],ADV_FOLDER_ABSOLUTE."/ADS-".$file_name."-".time()."-".$_FILES['img']['name'])) {
			$file = ADV_FOLDER."/ADS-".$file_name."-".time()."-".$_FILES['img']['name'];		}else $file		=	$_POST['img'];
		mysqli_query($link_music,"INSERT INTO table_adv (adv_name,adv_vitri,adv_img,adv_url,adv_phanloai,adv_stt,adv_status) 
							 VALUES ('".$ten_banner."','".$vitri."','".$file."','".$link_banner."','".$phan_loai."','".$stt."','".$status."')");
			mss('Đã thêm xong','index.php?act=list-ads&mode=list-ads');
	}
	include("ads_act.php");
}
elseif($mode == 'edit') {
	$action	=	'index.php?act=ads&mode=edit&id='.$id;
	$arrz	=	$mlivedb->query(" * ","adv"," adv_id = '".$id."' ");
	if($_POST['submit']) {
		$ten_banner 	 = stripslashes(trim(urldecode($_POST['ten_banner'])));
		$link_banner 	 = stripslashes(trim(urldecode($_POST['link_banner'])));
		$phan_loai 	 	 = stripslashes(trim(urldecode($_POST['phan_loai'])));
		$vitri 	 	 	 = stripslashes(trim(urldecode($_POST['vitri'])));
		$stt 	 	 	 = stripslashes(trim(urldecode($_POST['stt'])));
		$status		 	 = stripslashes(trim(urldecode($_POST['status'])));				$file_name = str_replace(' ',"",NAMEWEB);			if(move_uploaded_file ($_FILES['img']['tmp_name'],ADV_FOLDER_ABSOLUTE."/ADS-".$file_name.time()."-".$_FILES['img']['name'])) {			$file = ADV_FOLDER."/ADS-".$file_name.time()."-".$_FILES['img']['name'];			}else $file		=	$_POST['img'];
		mysqli_query($link_music,"UPDATE table_adv SET 	adv_name 		= '".$ten_banner."',
												adv_url			= '".$link_banner."',
												adv_phanloai	= '".$phan_loai."',
												adv_vitri		= '".$vitri."',
												adv_stt			= '".$stt."',
												adv_status		= '".$status."',
												adv_img			= '".$file."' WHERE adv_id	=	'".$id."'");
		mss("Đã sửa xong !","index.php?act=list-ads&mode=list-ads");
	}
	include("ads_act.php");
}
elseif($mode == "status") {
	if(isset($_GET["status"])) $status = $myFilter->process($_GET["status"]);
	mysqli_query($link_music,"UPDATE table_adv SET adv_status = '".$status."' WHERE adv_id = '".$id."'");
	header("Location: index.php?act=list-ads&mode=list-ads");
	exit();
}
?>