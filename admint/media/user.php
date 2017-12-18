<?php 
if ($del_id) {
	if ($_POST['submit']) {
		mysqli_query($link_music,"DELETE FROM table_user WHERE userid = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-user&mode=list-user");
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
                    <input type="text" value="<?php echo $name = un_htmlchars(get_data("user","username"," userid = '".$del_id."'"));?>" class="form-control">
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
function acp_level($lv) {
	$html = "<select class='btn btn-danger' name=lv>".
		"<option value=1".(($lv==1)?' selected':'').">Thành Viên</option>".
		"<option value=3".(($lv==3)?' selected':'').">Quản Trị Viên</option>".
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
			$user_name		 = htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$user_pass		 = htmlchars(stripslashes(trim(urldecode($_POST['pass']))));
			$user_email		 = htmlchars(stripslashes(trim(urldecode($_POST['email']))));
			$lv			 = htmlchars(stripslashes(trim(urldecode($_POST['lv']))));
			$st			 = rand(1000,9999);
			$pwd		 = md5(md5($user_pass) . $st);
			$action		 	= "index.php?act=user&mode=add";
			mysqli_query($link_music,"INSERT INTO table_user (username,password,email,user_level,salt,time) 
						 VALUES ('".$user_name."','".$pwd."','".$user_email."','".$lv."','".$st."','".NOW."')");
			mss ("Thêm thành viên mới thành công ","index.php?act=list-user&mode=list-user");
		}
	}
include("user_act.php"); 
}

if($mode == 'edit') {

		$arrz = $mlivedb->query(" * ","user"," userid = '$id'");
		$action			= "index.php?act=user&mode=edit&id=".$id;
		if(isset($_POST['submit'])) {
			if($_POST['name'] == "") {
				mss ("Chưa nhập đầy đủ thông tin ");
			}

			else {
			$user_name		 = htmlchars(stripslashes(trim(urldecode($_POST['name']))));
			$user_pass		 = htmlchars(stripslashes(trim(urldecode($_POST['pass']))));
			$user_email		 = htmlchars(stripslashes(trim(urldecode($_POST['email']))));
			$lv			 = htmlchars(stripslashes(trim(urldecode($_POST['lv']))));
						if($_POST['pass'] == "") {
				$pwd = $arrz[0][2];
			}
			else {
				$st			 = $arrz[0][4];
				$pwd		 = md5(md5($pass) . $st);
			}
					mysqli_query($link_music,"UPDATE table_user SET
						username			=  	'".$user_name."',
						password 	= 	'".$pwd."',
						email		= '".$user_email."',
						user_level	= '".$lv."',
						info			= 	'".$info."'						
						WHERE userid 	= 	'".$id."'");
				mss ("Sửa thông tin thành viên thành công ","index.php?act=list-user&mode=list-user");
			}
		}
	include("user_act.php");
}
?>
