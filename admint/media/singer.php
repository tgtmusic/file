<?php 
if($sethot) {
	mysqli_query($link_music,"UPDATE table_singer SET singer_hot = 1 WHERE singer_id = '".$sethot."'");
	mss ("Update xong ","index.php?act=list-singer&mode=singer-hot");
}
if($bohot) {
	mysqli_query($link_music,"UPDATE table_singer SET singer_hot = 0 WHERE singer_id = '".$bohot."'");
	mss ("Update xong ","index.php?act=list-singer&mode=singer-hot");
}
if ($del_id) {
	if ($_POST['submit']) {
		$del_id	= del_id($del_id);
		$arr_img = $mlivedb->query(" singer_img ","singer"," singer_id = '".$del_id."'");
		delFile($arr_img[0][0]);
		mysqli_query($link_music,"DELETE FROM table_singer WHERE singer_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-singer&mode=singer");
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
    <form method="post"><b>Bạn Muốn Xóa Singer:</b>
	<div class="input-group margin">
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("singer","singer_name"," singer_id = '".del_id($del_id)."'"));?>" class="form-control">
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
// ADD SONGS
if($mode == 'add') {
	if(isset($_POST['submit'])) {
		if($_POST['name'] == "") {
			mss ("Chưa nhập đầy đủ thông tin ");
		}
		if($_POST['name']) { 	
			$singer			=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
		$singer_ascii = replace($singer);
		$singer_ascii = str_replace('-'," ",$singer_ascii);
		$singer_ascii = strtolower(get_ascii($singer_ascii));
		$type			=	$_POST['singer_type'];
		$info			=	htmlchars($_POST['info']);
		$singer_tenthat = $_POST['singer_tenthat'];
		$singer_ngaysinh = $_POST['singer_ngaysinh'];
		$singer_quocgia = $_POST['singer_quocgia'];
		$singer_quequan = $_POST['singer_quequan'];
			$cat		 = implode(',',$_POST['cat']);
			$cat		 = ",".$cat.",";
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_SINGER."/".WEB_NAME."-".time()."-".$_FILES['img']['name'])) {
			$img = LINK_SINGER."/".WEB_NAME."-".time()."-".$_FILES['img']['name'];
			}else $img		=	$_POST['imgz'];
			if(move_uploaded_file ($_FILES['imgbig']['tmp_name'],FOLDER_SINGER."/".WEB_NAME."-".time()."-".$_FILES['imgbig']['name'])) {
			$imgbig = LINK_SINGER."/".WEB_NAME."-".time()."-".$_FILES['imgbig']['name'];
			} else $imgbig		=	$_POST['imgbigz'];
			$action		 	= "index.php?act=singer&mode=add";
			mysqli_query($link_music,"INSERT INTO table_singer (singer_name,singer_name_ascii,singer_img,singer_type,singer_info,singer_tenthat,singer_ngaysinh,singer_quocgia,singer_quequan,singer_cat,singer_big_img) 
						 VALUES ('".$singer."','".$singer_ascii."','".$img."','".$type."','".$info."','".$singer_tenthat."','".$singer_ngaysinh."','".$singer_quocgia."','".$singer_quequan."','".$singer_cat."','".$imgbig."')");
			mss ("Thêm ca sĩ mới thành công ","index.php?act=list-singer&mode=list-singer");
		}
	}
include("singer_act.php"); }
if($mode == 'edit') {
$arrz = $mlivedb->query(" * ","singer"," singer_id = '$id'");
		$action			= "index.php?act=singer&mode=edit&id=".$id;
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}
			else { 	
		$singer			=	htmlchars(stripslashes($_POST['name']));
		$singer_ascii = replace($singer);
		$singer_ascii = str_replace('-'," ",$singer_ascii);
		$singer_ascii = strtolower(get_ascii($singer_ascii));
		$type			=	$_POST['singer_type'];
		$info			=	htmlchars($_POST['info']);
		$singer_tenthat = $_POST['singer_tenthat'];
		$singer_ngaysinh = $_POST['singer_ngaysinh'];
		$singer_quocgia = $_POST['singer_quocgia'];
		$singer_quequan = $_POST['singer_quequan'];
			$cat		 = implode(',',$_POST['cat']);
			$cat		 = ",".$cat.",";
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_SINGER."/".replace(NAMEWEB)."-".time()."-".$_FILES['img']['name'])) {
						delFile($arrz[0][3]);
						$img = LINK_SINGER."/".replace(NAMEWEB)."-".time()."-".$_FILES['img']['name'];
					}else { $img		=	$_POST['imgz']; }
					
			if(move_uploaded_file ($_FILES['imgbig']['tmp_name'],FOLDER_SINGER."/".NAMEWEB."-".time()."-".$_FILES['imgbig']['name'])) {
						delFile($arrz[0][4]);
						$imgbig = LINK_SINGER."/".NAMEWEB."-".time()."-".$_FILES['imgbig']['name'];
					} else { $imgbig		=	$_POST['imgbigz']; } 
				mysqli_query($link_music,"UPDATE table_singer SET
						singer_name			=  	'".$singer."',
						singer_name_ascii 	= 	'".$singer_ascii."',
						singer_img			= 	'".$img."',
						singer_type			= 	'".$type."',
						singer_cat			= 	'".$cat."',
						singer_info			= 	'".$info."',
						singer_tenthat			= 	'".$singer_tenthat."',
						singer_ngaysinh			= 	'".$singer_ngaysinh."',
						singer_quocgia			= 	'".$singer_quocgia."',
						singer_quequan			= 	'".$singer_quequan."',
						singer_big_img		= 	'".$imgbig."'
						WHERE singer_id 	= 	'".$id."'");
				mss ("sửa ca sĩ thành công ","index.php?act=list-singer&mode=singer");
			}
		}
include("singer_act.php");
}
if($mode == 'multi-singer-nhacvn') {
	include("multi_singer_nhacvn.php");
}
if($mode == 'multi-singer-nct') {
	include("multi_singer_nct.php");
}
?>
