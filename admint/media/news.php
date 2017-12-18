<?php 

if ($del_id) {
	if ($_POST['submit']) {
		$del_id	= del_id($del_id);
		if($del_id == 1 || $del_id == 2) mss ("Không thể xóa tin tức này ","list_news.php");
		else {
			$arr_img = $mlivedb->query(" news_img ","news"," news_id = '".$del_id."'");
		$img_az = $_SERVER["DOCUMENT_ROOT"] ."/news/".$arr_img[0][0];
		delFile($img_az);
		mysqli_query($link_music,"DELETE FROM table_news WHERE news_id = '".$del_id."'");
		mss ("Đã xóa bài viết ","index.php?act=list-news&mode=list-news");
		}
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
    <form method="post"><b>Bạn Muốn Xóa Bài Đăng:</b>
	<div class="input-group margin">
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("news","news_title"," news_id = '".del_id($del_id)."'"));?>" class="form-control">
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
		if($_POST['name'] == "" || $_POST['infofull'] == "") {
			mss ("Chưa nhập đầy đủ thông tin ");
		}
			if($_POST['name'] && $_POST['infofull']) { 	
			$news_title		 = htmlchars(stripslashes(trim(urldecode($_POST['name']))));
	$news_title_ascii = replace($news_title);
	$news_title_ascii = str_replace('-'," ",$news_title_ascii);
	$news_title_ascii = strtolower(get_ascii($news_title_ascii));
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_NEWS."/".NAMEWEB."-".time()."-".$_FILES['img']['name'])) {
			$img = LINK_NEWS."/".NAMEWEB."-".time()."-".$_FILES['img']['name'];
			}else $img		=	$_POST['img'];
			$infofull			=	$_POST['infofull'];
			$info			=	$_POST['info'];
			$cat		 = implode(',',$_POST['cat']);
			$cat		 = ",".$cat.",";
			$user_id	 = $_SESSION['admin_id'];
			$action		 	= "index.php?act=news&mode=add";
			mysqli_query($link_music,"INSERT INTO table_news (news_title,news_title_ascii,news_cat,news_infofull,news_img,news_info,news_poster,news_time) 
						 VALUES ('".$news_title."','".$news_title_ascii."','".$cat."','".$infofull."','".$img."','".$info."','".$user_id."','".NOW."')");
			mss ("Thêm tin tức mới thành công ","index.php?act=list-news&mode=list-news");
		}
	}
include("news_act.php"); 
}

if($mode == 'edit') {
	$id	= del_id($id);
		$arrz = $mlivedb->query(" * ","news"," news_id = '$id'");
		$action			= "index.php?act=news&mode=edit&id=".en_id($id);
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}

			else {
			$news_title			=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
	$news_title_ascii = replace($news_title);
	$news_title_ascii = str_replace('-'," ",$news_title_ascii);
	$news_title_ascii = strtolower(get_ascii($news_title_ascii));
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_NEWS."/".NAMEWEB."-".time()."-".$_FILES['img']['name'])) {
			$img = LINK_NEWS."/".NAMEWEB."-".time()."-".$_FILES['img']['name'];
			}else $img		=	$_POST['img'];
			$infofull			=	$_POST['infofull'];	
			$cat		 = implode(',',$_POST['cat']);
			$cat		 = ",".$cat.",";
			$info			=	$_POST['info'];
			$action		 	= "index.php?act=news&mode=edit";

					mysqli_query($link_music,"UPDATE table_news SET
						news_title			=  	'".$news_title."',
						news_title_ascii 	= 	'".$news_title_ascii."',
						news_cat			= 	'".$cat."',
						news_infofull		= 	'".$infofull."',
						news_img			= 	'".$img."',
						news_info			= 	'".$info."'						
						WHERE news_id 	= 	'".$id."'");
				mss ("Sửa tin tức thành công ","index.php?act=list-news&mode=list-news");
			}
		}
	include("news_act.php");
}
if($mode == 'multi-news-zing') {
	include("multi_news_zing.php");
}
?>