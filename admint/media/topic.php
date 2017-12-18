<?php
if ($del_id) {
	if ($_POST['submit']) {
		mysqli_query($link_music,"DELETE FROM table_topic WHERE topic_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-topic");
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
    <form method="post"><b>Bạn Muốn Xóa Thể Loại:</b>
	<div class="input-group margin">
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("topic","topic_name"," topic_id = '".$del_id."'"));?>" class="form-control">
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
			$topic_name		=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$stt			=	htmlchars(stripslashes(trim(urldecode($_POST['stt']))));
			$topic_name_ascii = replace($topic_name);
			$topic_name_ascii = str_replace('-'," ",$topic_name_ascii);
			$topic_name_ascii = strtolower(get_ascii($topic_name_ascii));
			$topic_sub			=	htmlchars(stripslashes(trim(urldecode($_POST['sub']))));
			$topic_sub2			=	htmlchars(stripslashes(trim(urldecode($_POST['sub_2']))));
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_TOPIC."/".NAMEWEB."-".time()."-".$_FILES['img']['name'])) {
			$img = LINK_TOPIC."/".NAMEWEB."-".time()."-".$_FILES['img']['name'];
			}else $img		=	$_POST['img'];
			$info			=	$_POST['info'];
			$hot			=	$_POST['hot'];
			$topic_name2		=	htmlchars(stripslashes(trim(urldecode($_POST['name2']))));
			$action		 	= 	"index.php?act=topic&mode=add";
			mysqli_query($link_music,"INSERT INTO table_topic (topic_name,topic_name_ascii,topic_order,topic_sub,topic_sub2,topic_type,topic_img,topic_info,topic_hot,topic_name2) 
			VALUES ('".$name."','".$topic_name_ascii."','".$stt."','".$topic_sub."','".$topic_sub2."','0','".$img."','".$info."','".$hot."','".$topic_name2."')");
			mss ("Thêm thể loại mới thành công ","index.php?act=list-topic&list-topic");
		}
	}
include("topic_act.php"); 
}
if($mode == 'edit') {
$arrz = $mlivedb->query(" * ","topic"," topic_id = '$id'");
$action			= "index.php?act=topic&mode=edit&id=".$id;
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}
			else {
		$topic_name		=	htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$stt			=	htmlchars(stripslashes(trim(urldecode($_POST['stt']))));
			$topic_name_ascii = replace($topic_name);
			$topic_name_ascii = str_replace('-'," ",$topic_name_ascii);
			$topic_name_ascii = strtolower(get_ascii($topic_name_ascii));
			$topic_sub			=	htmlchars(stripslashes(trim(urldecode($_POST['sub']))));
			$topic_sub2			=	htmlchars(stripslashes(trim(urldecode($_POST['sub_2']))));
			if(move_uploaded_file ($_FILES['img']['tmp_name'],FOLDER_TOPIC."/".NAMEWEB."-".time()."-".$_FILES['img']['name'])) {
			$img = LINK_TOPIC."/".NAMEWEB."-".time()."-".$_FILES['img']['name'];
			}else $img		=	$_POST['img'];
			$info			=	$_POST['info'];
			$hot			=	$_POST['hot'];
			$topic_name2		=	htmlchars(stripslashes(trim(urldecode($_POST['name2']))));	
mysqli_query($link_music,"UPDATE table_topic SET
topic_name		=  	'".$name."',
topic_name_ascii	=  	'".$topic_name_ascii."',
topic_order		=   '".$stt."',
topic_sub		=	'".$topic_sub."',
topic_sub2	=	'".$topic_sub2."',
topic_img	=	'".$img."',
topic_hot	=	'".$hot."',
topic_name2	=	'".$name2."',
topic_info	=	'".$info."'
 WHERE topic_id = '".$id."'");
mss ("sửa thể loại thành công ","index.php?act=list-topic&list-topic");
			}
		}
	include("topic_act.php");
}
?>
