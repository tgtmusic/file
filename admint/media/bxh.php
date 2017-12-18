<?php 
if ($del_id) {
	if ($_POST['submit']) {
		mysqli_query($link_music,"DELETE FROM table_charts WHERE charts_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-bxh&mode=songs");
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
    <form method="post"><b>Bạn Muốn Xóa Thành Viên:</b>
	<div class="input-group margin">
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("charts","charts_name"," charts_id = '".$del_id."'"));?>" class="form-control">
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
function acp_catbxh($cat) {
	$html = "<select class='btn btn-danger' name=cat>".
		"<option value=1".(($cat==1)?' selected':'').">Việt Nam</option>".
		"<option value=2".(($cat==2)?' selected':'').">Âu Mỹ</option>".
		"<option value=3".(($cat==3)?' selected':'').">Châu Á</option>".
	"</select>";
	return $html;
}
function acp_phanloai($type) {
	$html = "<select class='btn btn-danger' name=phanloai>".
		"<option value=1".(($type==1)?' selected':'').">Bài Hát</option>".
		"<option value=2".(($type==2)?' selected':'').">Album</option>".
		"<option value=3".(($type==3)?' selected':'').">Video</option>".
		"<option value=4".(($type==4)?' selected':'').">Social</option>".
	"</select>";
	return $html;
}
// ADD SONGS
if($mode == 'add') {
	if(isset($_POST['submit'])) {
		if($_POST['name'] == "") {
			mss ("Chưa nhập đầy đủ thông tin ");
		}
			if($_POST['name']) { 	
			$name		 = htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$name_ascii = replace($song);
			$name_ascii = str_replace('-'," ",$song_ascii);
			$name_ascii = strtolower(get_ascii($song_ascii));
			$phanloai			 = htmlchars(stripslashes(trim(urldecode($_POST['phanloai']))));
			$cat			 = htmlchars(stripslashes(trim(urldecode($_POST['cat']))));
			$week			 = htmlchars(stripslashes(trim(urldecode($_POST['week']))));
			$album			 = htmlchars(stripslashes(trim(urldecode($_POST['album']))));
			$date			 = htmlchars(stripslashes(trim(urldecode($_POST['date']))));
			$year			 = htmlchars(stripslashes(trim(urldecode($_POST['year']))));
			$list_song			 = htmlchars(stripslashes(trim(urldecode($_POST['idsong']))));
			$up			 = htmlchars(stripslashes(trim(urldecode($_POST['up']))));
			$old			 = htmlchars(stripslashes(trim(urldecode($_POST['old']))));				
			$action		 	= "index.php?act=bxh&mode=add";
			mysqli_query($link_music,"INSERT INTO table_charts (charts_name,charts_name_ascii,charts_value,charts_date,charts_up,charts_cat,charts_type,charts_album,charts_week,charts_year,charts_date_old,charts_time) 
						 VALUES ('".$name."','".$name_ascii."','".$list_song."','".$date."','".$up."','".$cat."','".$phanloai."','".$album."','".$week."','".$year."','".$old."','".NOW."')");
			mss ("Thêm thành viên mới thành công ","index.php?act=list-bxh&mode=songs");
		}
	}
include("bxh_act.php"); 
}

if($mode == 'edit') {
		$arrz = $mlivedb->query(" * ","charts"," charts_id = '$id'");
		$action			= "index.php?act=bxh&mode=edit&id=".$id;
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}

			else {
			$name		 = htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$name_ascii = replace($song);
			$name_ascii = str_replace('-'," ",$song_ascii);
			$name_ascii = strtolower(get_ascii($song_ascii));
			$phanloai			 = htmlchars(stripslashes(trim(urldecode($_POST['phanloai']))));
			$cat			 = htmlchars(stripslashes(trim(urldecode($_POST['cat']))));
			$week			 = htmlchars(stripslashes(trim(urldecode($_POST['week']))));
			$album			 = htmlchars(stripslashes(trim(urldecode($_POST['album']))));
			$date			 = htmlchars(stripslashes(trim(urldecode($_POST['date']))));
			$year			 = htmlchars(stripslashes(trim(urldecode($_POST['year']))));
			$list_song			 = htmlchars(stripslashes(trim(urldecode($_POST['idsong']))));
			$up			 = htmlchars(stripslashes(trim(urldecode($_POST['up']))));
			$old			 = htmlchars(stripslashes(trim(urldecode($_POST['old']))));	
					mysqli_query($link_music,"UPDATE table_charts SET
						charts_name			=  	'".$name."',
						charts_name_ascii	=  	'".$name_ascii."',
						charts_type			=  	'".$phanloai."',
						charts_cat			=  	'".$cat."',
						charts_week			=  	'".$week."',
						charts_album		=  	'".$album."',
						charts_date			=  	'".$date."',
						charts_year			=  	'".$year."',
						charts_value		=  	'".$list_song."',
						charts_up			=  	'".$up."',
						charts_date_old		= 	'".$old."'						
						WHERE charts_id 	= 	'".$id."'");
				mss ("Sửa thông tin BXH thành công ","index.php?act=list-bxh&mode=songs");
			}
		}
	include("bxh_act.php");
}
?>
