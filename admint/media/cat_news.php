<?php
if ($del_id) {
	if ($_POST['submit']) {
		mysqli_query($link_music,"DELETE FROM table_catnews WHERE cat_news_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-cat-news&mode=list-cat");
	}?>     <section class="content">          <div class="row">            <div class="col-md-6">      <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">DELETE</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">    <table align="center" width="100%" style="border: 1px solid red;">    <form method="post"><b>Bạn Muốn Xóa Thể Loại Tin Tức:</b>	<div class="input-group margin">                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("catnews","cat_news_name"," cat_news_id = '".$del_id."'"));?>" class="form-control">                    <span class="input-group-btn">                      <input class="btn btn-danger btn-flat" name=submit type=submit value="Có!">                    </span>                  </div><!-- /input-group -->	</form>    </table>	 </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content --><?php }
// ADD THỂ LOẠI
if($mode == 'add') {if(isset($_POST['submit'])) {
		if($_POST['name'] == "") {
			mss ("Chưa nhập đầy đủ thông tin ");	}	else {
			$cat_news_name		=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$stt			=	htmlchars(stripslashes(trim(urldecode($_POST['stt']))));
			$cat_news_name_ascii	=	strtolower(get_ascii($cat_news_name));
			$cat_news_sub			=	htmlchars(stripslashes(trim(urldecode($_POST['sub']))));
			$cat_news_sub_2			=	htmlchars(stripslashes(trim(urldecode($_POST['sub_2']))));
			$action		 	= 	"index.php?act=cat-news&mode=add";
			mysqli_query($link_music,"INSERT INTO table_catnews (cat_news_name,cat_news_order,cat_news_sub_id,cat_news_sub_id_2,cat_news_type) 			VALUES ('".$name."','".$stt."','".$cat_news_sub."','".$cat_news_sub_2."','sub')");			mss ("Thêm thể loại mới thành công ","index.php?act=list-cat-news&mode=list-cat");
		}	}
include("cat_news_act.php"); 
}if($mode == 'edit') {$arrz = $mlivedb->query(" * ","catnews"," cat_news_id = '$id'");$action			= "index.php?act=cat-news&mode=edit&id=".$arrz[0][0];if(isset($_POST['submit'])) {if($_POST['name'] == "") {mss ("Chưa nhập đầy đủ thông tin ");}else {$cat_news_name		=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));$stt			=	htmlchars(stripslashes(trim(urldecode($_POST['stt']))));$cat_news_name_ascii	=	strtolower(get_ascii($cat_news_name));$cat_news_sub			=	htmlchars(stripslashes(trim(urldecode($_POST['sub']))));$cat_news_sub_2			=	htmlchars(stripslashes(trim(urldecode($_POST['sub_2']))));mysqli_query($link_music,"UPDATE table_catnews SETcat_news_name		=  	'".$name."',cat_news_order 		= 	'".$stt."',cat_news_sub_id		=	'".$cat_news_sub."',cat_news_sub_id_2	=	'".$cat_news_sub_2."' WHERE cat_news_id = '".$id."'");mss ("sửa thể loại thành công ","index.php?act=list-cat-news&mode=list-cat");
			}
		}
	include("cat_news_act.php");
}
?>

