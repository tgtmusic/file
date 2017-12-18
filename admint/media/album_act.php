		 <section class="content">          <div class="row">            <div class="col-md-12">           <div class="box box-danger">                              <div class="box-header">                  <h3 class="box-title">Sửa<small>/Album Media</small></h3>                  <!-- tools box -->                  <div class="pull-right box-tools">                    <button class="btn btn-info btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>                  </div><!-- /. tools -->                </div><!-- /.box-header -->                <div class="box-body pad">
                <form action="<?=$action;?>" method="post" enctype="multipart/form-data">
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên</label>					  <input type="text" name="name" placeholder="Nhập Tên Album" value="<?php  echo $arrz[0][1];?>" class="form-control" id="inputSuccess">					  </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>				<?=acp_cat($arrz[0][8]);?>                  </div><br/><br/><br/><br/><br/><br/>
  <div class="row"> <div class="col-xs-3 has-warning"> <label class="control-label" for="inputWarning"><i class="fa fa-sort-numeric-asc"></i>  Lượt nghe (Month)</label> <input type="text" name="s_nghe" value="<?php  echo $arrz[0][6];?>" class="form-control" placeholder="Nhập Số Lượt Nghe Bạn Muốn">                    </div> </div>
<div class="form-group has-warning">                      <label class="control-label" for="inputSuccess"><i class="fa fa-picture-o"></i> Hình Ảnh</label>					  <input type="file" name="img" > <br/><input type="text" class="form-control" id="inputSuccess" name="imgz" value="<?php  echo $arrz[0][4];?>" placeholder="Nhập URL ẢNH." />                    </div><div class="form-group has-warning">                      <label class="control-label" for="inputSuccess"><i class="fa fa-picture-o"></i> Ảnh Lớn</label>					  					  <input type="file" name="imgbig" > <br/>					  <input type="text" name="imgbigz" placeholder="Nhập Ảnh Lớn" value="<?=$arrz[0][14];?>" class="form-control" id="inputSuccess">					  </div>
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Trình bày:</label>					 <b> <?=GetSingerNameAdmin($arrz[0][3]);?></b>					  </div>					<?=them_moi_singer_form();?>
 <div class="form-group has-success">                      <label class="control-label" for="inputWarning"><i class="fa fa-info-circle"></i> Thông Tin</label><br/>					  <textarea class="form-control" rows="4" name="album_info" placeholder="Nhập thông tin ..."><?=un_htmlchars($arrz[0][5]);?></textarea></div>					  <div class="form-group"> <label>ID BÀI HÁT TRONG ALBUM (Không SỬA)</label><textarea class="form-control" rows="3" placeholder="ID Bài Hát"><?php  echo $arrz[0][10];?></textarea>               					</div>
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"> <i class="fa ion-clipboard"></i> Danh Sách Bài Hát<br/><font color="#FF0000"><i>Dùng chuột kéo thả để sắp xếp lại thứ tự bài hát</i></font></label>					  </div>   <!-- TO DO List -->                             <div class="box-body"> <center> <div id="response"></div></center><ul id="LoadSongAlbum" class="todo-list">
<?php if($arrz[0][10] != ''){
	$s = explode(',',$arrz[0][10]);
	foreach($s as $x=>$val)
      {
	$arr[$x] = $mlivedb->query(" m_id, m_title, m_singer ","data"," m_id = '".$s[$x]."'");
	$stt	=	$x+1;
?><li id="arrayorder_<?php  echo $arr[$x][0][0];?>">                      <!-- drag handle -->                      <span class="handle">                        <i class="fa fa-ellipsis-v"></i>                        <i class="fa fa-ellipsis-v"></i>                      </span>                      <!-- checkbox -->                      <input type="checkbox" value="" name="" />                      <!-- todo text -->                      <span class="text"><?php  echo $stt.". ".$arr[$x][0][1];?></span>                      <!-- Emphasis label -->                      <small class="label label-danger" ><i class="fa fa-clock-o"></i></small> 					  <?=GetSingerAdmin($arr[$x][0][2])?>                      <!-- General tools such as edit or delete-->                      <div class="tools">                        <a onClick="xSongAlbum(<?php  echo $id;?>,<?php  echo $arr[$x][0][0];?>);" style="cursor: pointer;"><i class="fa fa-trash-o"></i></a>                      </div>                    </li>
<?php  }} else { echo'<b>Album hiện chưa có bài hát!</b>';} ?>
</ul></div>                </div><!-- /.box-body -->              
<input type="hidden" id="id_album" value="<?php  echo $id;?>">
<script type="text/javascript">
$(document).ready(function(){ 	
function slideout(){
  setTimeout(function(){
  $("#response").slideUp("slow", function () {
});
}, 500);}
    $("#response").hide();
	$(function() {
	$("ul").sortable({ opacity: 0.8, cursor: 'move', update: function() {
			var order = $(this).sortable("serialize") + '&update=update&id_album=<?php  echo $id;?>'; 
			$.post("./media/update-album.php", order, function(theResponse){
				$("#response").html(theResponse);
				$("#response").slideDown('slow');
				slideout();
			}); 															 
		}								  
		});
	});
});
</script>
<div class="box-footer">                    <button type="submit" name="submit" class="btn btn-primary">ĐỒNG Ý</button>					<button type="submit" type="reset" class="btn btn-default">Nhập Lại</button>                  </div>				  </form>				   </div> <!-- /box-body -->				   </div> <!-- /box box-danger --></div></div></div></section>