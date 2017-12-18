
		 <section class="content">
          <div class="row">
            <div class="col-md-12">
          
 <div class="box box-danger">
                              <div class="box-header">
                  <h3 class="box-title">Thêm Media<small> / vào Album</small></h3>
                  <!-- tools box -->
                  <div class="pull-right box-tools">
                    <button class="btn btn-info btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>
                  </div><!-- /. tools -->
                </div><!-- /.box-header -->
                <div class="box-body pad">
<?php 
if (!$_GET['id']) die('ERROR');
if(isset($_GET["id"])) $id=$myFilter->process($_GET["id"]);
if (!$_POST['submit']) {
?><form method=post enctype="multipart/form-data">
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Các bài hát trong album</label>
					  <br/>

	<?php 
	$in_sql = $id;
	$arr = $mlivedb->query(" m_title ","data"," m_id IN (".$in_sql.")");	
	for($i=0;$i<count($arr);$i++) {
	?>+ <b><?php echo $arr[$i][0];?></b><br>
	<?php  } ?>
 </div>
<tr>
	<td class=fr width=30%><b>Chọn Album</b></td>
	<td class=fr_2><?=acp_album_list(NULL,1)?></td>
</tr>
<tr><td class=fr colspan=2 align=center><input type=submit name=submit class=submit value="Sửa"></td></tr>
  </form>
				   </div> <!-- /box-body -->
				   </div> <!-- /box box-danger -->
				   
</div>
</div>
</section>
<?php 
}
else {
	if ($_POST['album']) {
			$arr = $mlivedb->query(" album_song ","album"," album_id = '".$_POST['album']."' ");			
			$list_song = $id.",".$arr[0][0];
			mysqli_query($link_music,"UPDATE table_album SET album_song = '".$list_song."' WHERE album_id = '".$_POST['album']."'");
			}
	mss ("Đã thêm xong ! ","index.php?act=list-album&mode=list-album");
}
?>