<?php
$web_name			=	getConfig('web_name');
$web_key			=	getConfig('web_key');
$domain				=	getConfig('domain');
$cat_vn				=	getConfig('cat_vn');
$cat_ca				=	getConfig('cat_ca');
$cat_am				=	getConfig('cat_am');
$passii				=	getConfig('passii');
$upload				=	getConfig('upload');
$play				=	getConfig('play');$web_des		=	getConfig('web_des');
if(isset($_POST['add'])) {
		$web_name			=	$_POST['web_name'];
		$web_key			=	$_POST['web_key'];
		$domain				=	$_POST['domain'];
		$cat_vn				=	$_POST['cat_vn'];
		$cat_ca				=	$_POST['cat_ca'];
		$cat_am				=	$_POST['cat_am'];
		$passii				=	$_POST['passii'];
		$upload				=	$_POST['server'];
		$play				=	$_POST['play'];		$web_des		=	$_POST['web_des'];
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$web_name."' WHERE cf_name = 'web_name'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$web_key."' WHERE cf_name = 'web_key'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$domain."' WHERE cf_name = 'domain'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$cat_vn."' WHERE cf_name = 'cat_vn'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$cat_ca."' WHERE cf_name = 'cat_ca'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$cat_am."' WHERE cf_name = 'cat_am'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$passii."' WHERE cf_name = 'passii'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$upload."' WHERE cf_name = 'upload'");
		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$play."' WHERE cf_name = 'play'");		@mysqli_query($link_music,"UPDATE table_config SET cf_value = '".$web_des."' WHERE cf_name = 'web_des'");
		mss("Đã sửa xong!","index.php?act=cau-hinh");
		exit();
	}
?>     <section class="content">          <div class="row">            <div class="col-md-6">           <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Cấu Hình WEBSITE</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">
			<form name="add" method="post" enctype="multipart/form-data">
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Mật khẩu Admin</label>                      <input type="text" name="passii"  value="<?=$passii;?>" class="form-control" id="inputSuccess" placeholder="Nhập Mật Khẩu Admin ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> URL Website</label>                      <input type="text" name="domain"  value="<?=$domain;?>" class="form-control" id="inputSuccess" placeholder="Nhập URL Website ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Website</label>                      <input type="text" name="web_name"  value="<?=$web_name;?>" class="form-control" id="inputSuccess" placeholder="Nhập Tên Website ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>Description/Mô tả </label>                      <input size="5" type="text" name="web_des"  value="<?=$web_des;?>" class="form-control" id="inputSuccess" placeholder="Description Website ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Từ khóa Website</label>                      <input type="text" name="web_key"  value="<?=$web_key;?>" class="form-control" id="inputSuccess" placeholder="Từ khóa Website ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> ID Thể Loại Nhạc Việt Nam</label>                      <input type="text" name="cat_vn"  value="<?=$cat_vn;?>" class="form-control" id="inputSuccess" placeholder="ID Thể Loại Nhạc Việt Nam ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> ID Thể Loại Nhạc Âu Mỹ</label>                      <input type="text" name="cat_am"  value="<?=$cat_am;?>" class="form-control" id="inputSuccess" placeholder="ID Thể Loại Nhạc Âu Mỹ ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> ID Thể Loại Nhạc Châu Á</label>                      <input type="text" name="cat_ca"  value="<?=$cat_ca;?>" class="form-control" id="inputSuccess" placeholder="ID Thể Loại Nhạc Châu Á ..." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Server Upload Cho Thành Viên</label>                     <?=acp_server($upload)?>                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Số Lần + Cho 1 Lần Nghe Nhạc</label>                      <input size="5" type="text" name="play"  value="<?=$play;?>" class="form-control" id="inputSuccess" placeholder="Số Lần + Cho 1 Lần Nghe Nhạc ..." />                    </div>
	<center>
				<input type="submit" class="btn btn-primary" name="add" value=" ĐỒNG Ý "></center>
				    </form>
          </tbody>                    </table>                  </div><!-- /.table-responsive -->                </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content -->