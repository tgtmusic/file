
     <section class="content">
          <div class="row">
            <div class="col-md-8">
			                
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Mutil Add Singer </h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div><!-- /.box-header -->
				<div class="box-body">
<?php

if ((!$_POST['ok']) AND (!$_POST['submit'])) {
?>
<form method=post>
 <!-- Input addon -->
             
                  <p class="margin"><code>Vui lòng nhập link Thể Loại Singer muốn thêm</code>				  <br/>
+ Link post : http://www.nhaccuatui.com/nghe-si/a.html</p>

                  <div class="input-group input-group-sm">
                  <input name="total_songs" value="" class="form-control">	
                    <span class="input-group-btn">
			<input type="submit" name="ok" class="btn btn-info btn-flat" value="Đồng Ý">
			
                    </span>
                  </div><!-- /input-group -->
</form><div class="cover">
<?php
}
else
{
$total_links = $_POST['total_songs'];
if (!$_POST['submit']) {
    $url = file_get_contents($total_links);
	$url_song = explode('<li><a title="', $url);
	$total_linksx = count($url_song);
    $total_links = $total_linksx-1;
?>

<script>
var total = <?=$total_links?>;
function check_local(status){
	for(i=1;i<=total;i++)
		document.getElementById("local_url_"+i).checked=status;
}
function new_stype(id){
    for(i=1;i<=total;i++)
   	    document.getElementById("singer_type_["+i+"]").value=id;
}
</script>
<form method=post enctype="multipart/form-data">
<input type="submit" name="submit" class="btn btn-info pull-right" value="Đồng Ý"><br/>

	<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>
				<?=acp_cat();?>
                  </div><br/><br/><br/><br/><br/><br/>
				  <?=acp_type_s(1);?>
<?php
for ($i=1;$i<=$total_links;$i++) {
	$play_url = explode('" href="http://www.nhaccuatui.com/nghe-si-', $url_song[$i]);
	$play_url = explode('"', $play_url[1]);

    $url_news='http://www.nhaccuatui.com/nghe-si-'.$play_url[0];
	$url2 = file_get_contents($url_news);
	$s_name = explode('<title>', $url2);
    $s_name = explode(':', $s_name[1]);
    $s_name = $s_name[0];
	$info = explode('<div style="line-height: 1.5" id="divDescription" class="">', $url2);
    $info = explode('</div>', $info[1]);
    $info = $info[0];
    $img = explode('<img src="http://avatar.nct.nixcdn.com/singer/avatar/', $url2);
    $img = explode('"', $img[1]);
	$img ='http://avatar.nct.nixcdn.com/singer/avatar/'.$img[0];
	  #$img = $img[0];
	$big_img = explode('<div class="singer-right-cover"><img src="', $url2);
    $big_img = explode('"', $big_img[1]);
    $big_img = $big_img[0];
	$tenthat = explode('<p>Tên thật: ', $url2);
    $tenthat = explode('</p>', $tenthat[1]);
    $tenthat = $tenthat[0];
	$ngaysinh = explode('<p>Sinh nhật: ', $url2);
    $ngaysinh = explode('</p>', $ngaysinh[1]);
    $ngaysinh = $ngaysinh[0];
	$quocgia = explode('<p>Quốc gia: ', $url2);
    $quocgia = explode('</p>', $quocgia[1]);
    $quocgia = $quocgia[0];
	$quequan = explode('<p>Quê quán: ', $url2);
    $quequan = explode('</p>', $quequan[1]);
    $quequan = $quequan[0];
?>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Singer <?=$i?></label>
					  <input type="text" name=singer_name[<?=$i?>] placeholder="Nhập Tên Singer" value="<?=$s_name?>" class="form-control" id="inputSuccess">
					  </div>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Thật <?=$i?></label>
					  <input type="text" name=singer_tenthat[<?=$i?>] placeholder="Nhập Tên Thật" value="<?=$tenthat?>" class="form-control" id="inputSuccess">
					  </div>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Ngày Sinh <?=$i?></label>
					  <input type="text" name=singer_ngaysinh[<?=$i?>] placeholder="Nhập Ngày Sinh" value="<?=$ngaysinh?>" class="form-control" id="inputSuccess">
					  </div>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Quốc Gia <?=$i?></label>
					  <input type="text" name=singer_quocgia[<?=$i?>] placeholder="Nhập Quốc Gia" value="<?=$quocgia?>" class="form-control" id="inputSuccess">
					  </div>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Quê Quán <?=$i?></label>
					  <input type="text" name=singer_quequan[<?=$i?>] placeholder="Nhập Quê Quán" value="<?=$quequan?>" class="form-control" id="inputSuccess">
					  </div>
<div class="input-group">
 <div class="input-group-btn">
<button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
</div><!-- /btn-group -->
<input name=singer_img[<?=$i?>] type="text" value="<?=$img?>" placeholder="Nhập Link Ảnh Nhỏ" class="form-control">
</div><!-- /input-group --> <br/>
<div class="input-group">
 <div class="input-group-btn">
<button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
</div><!-- /btn-group -->
<input name=singer_big_img[<?=$i?>] type="text" value="<?=$big_img?>" placeholder="Nhập Link Ảnh To Rộng" class="form-control">
</div><!-- /input-group --> <br/>
 <div class="form-group">
 <label>Thông Tin </label>
 <textarea class="form-control" name=singer_info[<?=$i?>] rows="3" placeholder="Nhập thông tin"><?=$info?></textarea>
</div>

<?php
}
?>
<center>

<div class="box-footer">
<input type=hidden name=total_songs value=<?=$total_links?>><input type=hidden name=ok value=Submit>
<input type="submit" name="submit" class="btn btn-info " value="Đồng Ý">
               
                  </div><!-- /.box-footer -->
</center>
</form>
<?php
}
else {

	$cat = implode(',',$_POST['cat']);
	$cat = ",".$cat.",";
	$singer_cat = $cat;
	$singer_type = $_POST['singer_type'];
	for ($i=0;$i<=$total_links;$i++) {

		$singer_name = htmlchars(stripslashes($_POST['singer_name'][$i]));
	$singer_ascii = replace($singer_name);
	$singer_ascii = str_replace('-'," ",$singer_ascii);
	$singer_ascii = strtolower(get_ascii($singer_ascii));
		$singer_img = stripslashes($_POST['singer_img'][$i]);
		$singer_info = $_POST['singer_info'][$i];
		$singer_big_img = $_POST['singer_big_img'][$i];
		$singer_tenthat = $_POST['singer_tenthat'][$i];
		$singer_ngaysinh = $_POST['singer_ngaysinh'][$i];
		$singer_quocgia = $_POST['singer_quocgia'][$i];
		$singer_quequan = $_POST['singer_quequan'][$i];
		if ($singer_img && $singer_name) {

		mysqli_query($link_music,"INSERT INTO table_singer (singer_name,singer_name_ascii,singer_cat,singer_info,singer_img,singer_big_img,singer_type,singer_tenthat,singer_ngaysinh,singer_quocgia,singer_quequan) VALUES ('".$singer_name."','".$singer_ascii."','".$singer_cat."','".$singer_info."','".$singer_img."','".$singer_big_img."','".$singer_type."','".$singer_tenthat."','".$singer_ngaysinh."','".$singer_quocgia."','".$singer_quequan."')");
		}
	}
	mss ("ADD Singer Thành Công! ","index.php?act=singer&mode=multi-singer-nct");
}
}
?>

</tbody>
                    </table>
                  </div><!-- /.table-responsive -->
                </div><!-- /.box-body -->
 
            </div><!-- /.col-->
          </div><!-- ./row -->
        </section><!-- /.content -->
