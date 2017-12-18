<?php 
if($sethot) {
	mysqli_query($link_music,"UPDATE table_album SET album_hot = 1 WHERE album_id = '".$sethot."'");
	$arr_s = $mlivedb->query(" album_type ","album"," album_id = '".$sethot."'");
			mss ("Update xong ","index.php?act=list-album&mode=list-album");
}
if($bohot) {
	mysqli_query($link_music,"UPDATE table_album SET album_hot = 0 WHERE album_id = '".$bohot."'");
		$arr_s = $mlivedb->query(" album_type ","album"," album_id = '".$bohot."'");
			mss ("Update xong ","index.php?act=list-album&mode=list-album");
}
if($setnew) {
	mysqli_query($link_music,"UPDATE table_album SET album_new = 1 WHERE album_id = '".$setnew."'");
	$arr_s = $mlivedb->query(" album_type ","album"," album_id = '".$sethot."'");
mss ("Update xong ","index.php?act=list-album&mode=list-album");
}
if($bonew) {
	mysqli_query($link_music,"UPDATE table_album SET album_new = 0 WHERE album_id = '".$bonew."'");
		$arr_s = $mlivedb->query(" album_type ","album"," album_id = '".$bohot."'");
mss ("Update xong ","index.php?act=list-album&mode=list-album");
}
if ($del_id) {
	if ($_POST['submit']) {
		$del_id	= del_id($del_id);
		$arr_img = $mlivedb->query(" album_img ","album"," album_id = '".$del_id."'");
		delFile($arr_img[0][0]);
		mysqli_query($link_music,"DELETE FROM table_album WHERE album_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-album&mode=list-album");
	}
	?>
     <section class="content">
          <div class="row">
            <div class="col-md-6">     
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">DELETE</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div><!-- /.box-header -->
				<div class="box-body">
    <table align="center" width="100%" style="border: 1px solid red;">
    <form method="post"><b>Bạn Muốn Xóa ALBUM:</b>
	<div class="input-group margin">
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("album","album_name"," album_id = '".del_id($del_id)."'"));?>" class="form-control">
                    <span class="input-group-btn">
                      <input class="btn btn-danger btn-flat" name=submit type=submit value="Có!">
                    </span>
                  </div><!-- /input-group -->

	</form>
    </table>
	 </div><!-- /.box-body -->
 
            </div><!-- /.col-->
          </div><!-- ./row -->
        </section><!-- /.content -->

<?php 
}
if($mode == 'edit') {
		$id	  =	del_id($id);
		$arrz = $mlivedb->query(" * ","album"," album_id = '$id'");
		$action			= "index.php?act=album&mode=edit&id=".en_id($id);
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}
			else {
					$album		 = htmlchars(stripslashes(trim(urldecode($_POST['name']))));
					$s_nghe		 = htmlchars(stripslashes(trim(urldecode($_POST['s_nghe']))));
					$imgbig		 = htmlchars(stripslashes(trim(urldecode($_POST['imgbig']))));

	$album_ascii = replace($album);
	$album_ascii = str_replace('-'," ",$album_ascii);
	$album_ascii = strtolower(get_ascii($album_ascii));
					if($_POST['new_singer'] && $_POST['singer_type']) {
						$new_singer 	 = htmlchars(stripslashes(trim(urldecode($_POST['new_singer']))));
						$singer_type = $_POST['singer_type'];
						$singer = them_moi_singer($new_singer,$singer_type);
					}
					else $singer 	 = $_POST['singer'];
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_ALBUM."/".replace(NAMEWEB)."-".time()."-".$_FILES['img']['name'])) {
						delFile($arrz[0][4]);
						$img = LINK_ALBUM."/".replace(NAMEWEB)."-".time()."-".$_FILES['img']['name'];
					}else { $img		=	$_POST['imgz']; }
					
			if(move_uploaded_file ($_FILES['imgbig']['tmp_name'],FOLDER_ALBUM."/".NAMEWEB."-".time()."-".$_FILES['imgbig']['name'])) {
						delFile($arrz[0][14]);
						$imgbig = LINK_ALBUM."/".NAMEWEB."-".time()."-".$_FILES['imgbig']['name'];
					} else { $imgbig		=	$_POST['imgbigz']; } 
					$album_info	=	$_POST['album_info'];
					$cat		 = implode(',',$_POST['cat']);
					$cat		 = ",".$cat.",";
					@mysqli_query($link_music,"UPDATE table_album SET
						album_cat			= 	'".$cat."',
						album_name			=  	'".$album."',
						album_name_ascii 	= 	'".$album_ascii."',
						album_singer		= 	'".$singer."',
						album_viewed	= 	'".$s_nghe."',
						album_img			= 	'".$img."',
						album_info			=	'".$album_info."',
						album_topic			=	'".$topic."',
						album_img_big		=	'".$imgbig."' WHERE album_id = '".$id."'");
				mss ("Update thành công ","index.php?act=list-album&mode=list-album");			}
		}
	include("album_act.php");
}
?>
