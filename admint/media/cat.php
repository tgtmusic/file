<?php
if ($del_id) {
	if ($_POST['submit']) {
		mysqli_query($link_music,"DELETE FROM table_theloai WHERE cat_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-cat&mode=list");
	}
	?>     <section class="content">          <div class="row">            <div class="col-md-6">      <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">DELETE</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">    <table align="center" width="100%" style="border: 1px solid red;">    <form method="post"><b>Bạn Muốn Xóa Thể Loại:</b>	<div class="input-group margin">                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("theloai","cat_name"," cat_id = '".$del_id."'"));?>" class="form-control">                    <span class="input-group-btn">                      <input class="btn btn-danger btn-flat" name=submit type=submit value="Có!">                    </span>                  </div><!-- /input-group -->	</form>    </table>	 </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content -->	<?php
}
// ADD SONGS
if($mode == 'add') {
	if(isset($_POST['submit'])) {
		if($_POST['name'] == "") {
			mss ("Chưa nhập đầy đủ thông tin ");
		}
			else {
			$cat_name		=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$stt			=	htmlchars(stripslashes(trim(urldecode($_POST['stt']))));
			$cat_name_ascii	=	strtolower(get_ascii($cat_name));
			$sub			=	htmlchars(stripslashes(trim(urldecode($_POST['sub']))));
			$sub_2			=	htmlchars(stripslashes(trim(urldecode($_POST['sub_2']))));
			$action		 	= 	"index.php?act=cat&mode=add";
			mysqli_query($link_music,"INSERT INTO table_theloai (cat_name,cat_order,sub_id,sub_id_2,cat_type) 
					VALUES ('".$name."','".$stt."','".$sub."','".$sub_2."','sub')");
			mss ("Thêm thể loại mới thành công ","index.php?act=list-cat&mode=list");
		}
	}
include("cat_act.php"); 
}
if($mode == 'edit') {
		$arrz = $mlivedb->query(" * ","theloai"," cat_id = '$id'");
		$action			= "index.php?act=cat&mode=edit&id=".$arrz[0][0];
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}
				else {
					$cat_name		=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
					$stt			=	htmlchars(stripslashes(trim(urldecode($_POST['stt']))));
					$cat_name_ascii	=	strtolower(get_ascii($cat_name));
					$sub			=	htmlchars(stripslashes(trim(urldecode($_POST['sub']))));
					$sub_2			=	htmlchars(stripslashes(trim(urldecode($_POST['sub_2']))));
				mysqli_query($link_music,"UPDATE table_theloai SET
					cat_name		=  	'".$name."',
					cat_order 		= 	'".$stt."',
					sub_id			=	'".$sub."',
					sub_id_2			=	'".$sub_2."' WHERE cat_id = '".$id."'");
				mss ("sửa thể loại thành công ","index.php?act=list-cat&mode=list");
			}
		}
	include("cat_act.php");
}
?>

