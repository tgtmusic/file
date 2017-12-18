		 <section class="content">          <div class="row">            <div class="col-md-12">           <div class="box box-danger">                              <div class="box-header">                  <h3 class="box-title">Tạo<small>/Album Mới</small></h3>                  <!-- tools box -->                  <div class="pull-right box-tools">                    <button class="btn btn-info btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>                  </div><!-- /. tools -->                </div><!-- /.box-header -->                <div class="box-body pad">
<?php
if (!$_GET['id']) die('ERROR');
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);
if (!$_POST['submit']) {
?>
<form method=post enctype="multipart/form-data"><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Các bài hát trong album</label>
	<br/>
	<?php
	$in_sql = $id;$arr = $mlivedb->query(" m_title ","data"," m_id IN (".$in_sql.")");for($i=0;$i<count($arr);$i++) {?>+ <b><?php echo $arr[$i][0];?></b><br><?php }?> </div><td class=fr width=30%>
		<b>Tạo Album</b>
		<br>Vui lòng điền đầy đủ thông tin</td>
  <div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Album</label>					  <input type="text" name="new_album" placeholder="Nhập Tên Album" class="form-control" id="inputSuccess">					  </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Ca sĩ (Album)</label>					<input name=new_singer_a class="form-control" id="inputSuccess" placeholder="Nhập Tên Ca Sĩ (Album).">					  </div>
<div class="form-group has-warning">                      <label class="control-label" for="inputSuccess"><i class="fa fa-picture-o"></i>Ảnh Hình Ảnh</label>					  <input type="file" name="album_img" > <br/><input type="text" class="form-control" id="inputSuccess" name="album_img" placeholder="Nhập URL ẢNH." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>
	<?=acp_cat(NULL,1)?>    </div><br/><br/><br/><br/><br/><br/>
<div class="form-group"> <label>Thông Tin Album</label><textarea class="form-control" name=album_info rows="3" placeholder="Thông Tin Album"></textarea>					</div><br/><div class="box-footer">                    <input type="submit" name="submit" class="btn btn-primary" value="Thêm Album">				                  </div>				  </form>				   </div> <!-- /box-body -->				   </div> <!-- /box box-danger -->				   </div></div></div></section>
<?php
}
else {
	$cat = implode(',',$_POST['cat']);
	$cat		 = ",".$cat.",";
	$singer = them_moi_singer($_POST['new_singer_a'], $_POST['singer_type_a']);
	if ($_POST['new_album']) {
			if(move_uploaded_file ($_FILES['album_img']['tmp_name'],FOLDER_ALBUM."/".NAMEWEB."-".time()."-".$_FILES['album_img']['name']))
			$album_img = LINK_ALBUM."/".NAMEWEB."-".time()."-".$_FILES['album_img']['name'];
			else $album_img = $_POST['album_img'];
			$album = them_moi_album($_POST['new_album'],$singer,$album_img,$cat,$id,$_POST['album_info'],$_SESSION['admin_id']);
			}
	mss ("Đã thêm xong ! ","index.php?act=list-album&mode=list-album");
}
?>