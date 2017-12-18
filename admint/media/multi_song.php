     <section class="content">          <div class="row">            <div class="col-md-8">			                 <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Thêm Nhiều MEDIA</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">
<?php if ((!$_POST['ok']) AND (!$_POST['submit'])) { ?>
<form method=post> <!-- Input addon -->                  <p class="margin"><code>Vui lòng nhập số lượng Media muốn thêm</code></p>                  <div class="input-group input-group-sm">                  <input name="total_songs" value="" class="form-control">	                    <span class="input-group-btn">			<input type="submit" name="ok" class="btn btn-info btn-flat" value="Đồng Ý">                    </span>                  </div><!-- /input-group -->
</form>
<?php
} else {
$total_links = $_POST['total_songs'];
$total_sv = mysqli_num_rows(mysqli_query($link_music,"SELECT local_id  FROM table_local"));
if (!$_POST['submit']) {
?>
<script>
var total = <?=$total_links?>;function new_server(id){    for(i=1;i<=total;i++)   	    document.getElementById("server_["+i+"]").value=id;}
function new_stype(id){    for(i=1;i<=total;i++)   	    document.getElementById("singer_type_["+i+"]").value=id;}
</script>
<form enctype="multipart/form-data" method=post><input type="submit" name="submit" class="btn btn-info pull-right" value="Đồng Ý"><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Album</label>					  <input type="text" name="new_album" placeholder="Nhập Tên Album" class="form-control" id="inputSuccess">					  </div>
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>Ca Sĩ</label>    	<select class="form-control" name="singer_type_a" onChange="new_stype(this.value)">			<option value=1>Việt Nam</option>			<option value=2>Âu Mỹ</option>            <option value=3>Châu Á</option>		</select>		<?=them_moi_singer_form();?>					  </div>
				   <div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>HÌNH ẢNH Album</label>					<input type="file" name="album_img" size=50> <br/>		<div class="input-group">                    <div class="input-group-btn">                      <button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>                    </div><!-- /btn-group -->                   <input name="album_img" type="text" placeholder="Nhập Link Ảnh cho Album" class="form-control">					                  </div><!-- /input-group -->				  </div> <div class="form-group has-warning">                     <label class="control-label" for="inputWarning"><i class="fa fa-bell-o"></i> Thông Tin Album:</label>			<textarea class="form-control" rows="3" placeholder="Nhập Thông Tin Album...." name="album_info"></textarea>                    </div>
					<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>				<?=acp_cat($arrz[0][3]);?>                  </div><br/><br/><br/><br/><br/><br/>
</tr>

<div class="form-group has-success"><label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Server MEDIA</label><select class='input-sm form-control input-s-sm inline v-middle' name='server_a' onChange='new_server(this.value)'><option value=0>---Không chọn---</option><?php $arr = $mlivedb->query(" * ","local"," local_id ORDER BY local_id ASC");	for($z=0;$z<count($arr);$z++) { ?><option value="<?php echo $arr[$z][0];?>" >Server <?php echo $arr[$z][0];?></option>	<?php } ?></select>	                  </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Định Dạng MEDIA</label>				 <?=acp_type(1);?>                   </div>
<?php for ($i=1;$i<=$total_links;$i++) { ?><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên MEDIA <?=$i?></label>                    <input type="text" name=title[<?=$i?>] placeholder="Nhập Tên MEDIA" value="" class="form-control">                  </div>
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Link MEDIA <?=$i?></label>                    <input type="text" name=url[<?=$i?>] placeholder="Nhập Link MEDIA" value="" class="form-control">                  </div><div class="input-group ">                    <div class="input-group-btn">                      <button type="button" class="btn btn-warning">Tên CA SĨ <?=$i?></button>                    </div><!-- /btn-group -->                    <div class="col-xs-5"> <input type="text" name="new_singer[<?=$i?>]" id="new_singer_[<?=$i?>]" placeholder="Nhập Tên Ca Sĩ" value="<?=$singer?>" class="form-control">                    </div>						<div class="col-xs-3">					<select class="form-control"  name="singer_type[<?=$i?>]" id="singer_type_[<?=$i?>]">			<option value=1>Việt Nam</option>			<option value=2>Âu Mỹ</option>            <option value=3>Châu Á</option>		</select>		 </div>				  </div><br/>
<div class="form-group has-success"><label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Server MEDIA <?=$i?></label><select class='input-sm form-control input-s-sm inline v-middle' name='server_[<?=$i?>]' id='server_[<?=$i?>]'><option value=0>---Không chọn---</option><?php $arr = $mlivedb->query(" * ","local"," local_id ORDER BY local_id ASC");	for($z=0;$z<count($arr);$z++) { ?><option value="<?php echo $arr[$z][0];?>" >Server <?php echo $arr[$z][0];?></option>	<?php } ?>	</select>                  </div>
<?php } ?>
<center>
<div class="box-footer"><input type=hidden name=total_songs value=<?=$total_links?>><input type=hidden name=ok value=Submit><input type="submit" name="submit" class="btn btn-info " value="Đồng Ý">                  </div><!-- /.box-footer --></center>
</form>

<?php
}
else {
	if ($_POST['new_singer'] && $_POST['singer_type']) {
		$singer = them_moi_singer($_POST['new_singer'],$_POST['singer_type']);
	}
	else $singer = $_POST['singer'];
	$cat		 = implode(',',$_POST['cat']);
	$cat		 = ",".$cat.",";
	$type 		 = $_POST['type'];
	$new_album   = $_POST['new_album'];
	$t_singer    = $singer;
	$t_cat 		 = $cat;
	for ($i=0;$i<=$total_links;$i++) {
		$t_url 			= stripslashes($_POST['url'][$i]);
		$t_title 		= htmlchars(stripslashes($_POST['title'][$i]));
		$t_img	 		= $_POST['img_video'][$i];
		$t_title_ascii 	= strtolower(get_ascii($t_title));
        $t_local = $_POST['server_'][$i];
        
		if ($t_url && $t_title) {
			#mysqli_query($link_music,"INSERT INTO table_data (m_singer,m_cat,m_url,m_type,m_title,m_title_ascii,m_is_local,m_poster,m_img,m_time) VALUES ('".$t_singer."','".$t_cat."','".$t_url."','".$type."','".$t_title."','".$t_title_ascii."','".$t_local."','".$_SESSION['admin_id']."','".$t_img."','".NOW."')");			$t_singer = them_moi_singer($_POST['new_singer'][$i], $_POST['singer_type'][$i]);			$song_id = them_moi_media($t_singer, $t_cat, $t_url,'1',$t_title,$t_local,'0',$_SESSION['admin_id'],$img,$t_lyric);
		}		$list .=  $song_id;
	}

	$album_song = substr($list,0,-1);
	if ($new_album) {
			if(move_uploaded_file ($_FILES['album_img']['tmp_name'],FOLDER_ALBUM."/[TLDi-music]-".time()."-".$_FILES['album_img']['name']))
			$album_img = LINK_ALBUM."/[TLDi-music]-".time()."-".$_FILES['album_img']['name'];
			else $album_img = $_POST['album_img'];
			$album = them_moi_album($new_album,$singer,$album_img,$cat,$album_song,$album_info);
			}
	mss ("oki! ","index.php?act=media&mode=multi-add-song");
}
}
?>
</tbody>                    </table>                  </div><!-- /.table-responsive -->                </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content -->
