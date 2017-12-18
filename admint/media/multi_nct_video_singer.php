
     <section class="content">
          <div class="row">
            <div class="col-md-8">
			                
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Mutil Add NTC THỂ LOẠI VIDEO</h3>
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
             
                  <p class="margin"><code>Vui lòng nhập link Media muốn thêm</code>				  <br/>
+ Link post : http://www.nhaccuatui.com/tim-kiem/mv?q=mr+siro&b=singer</p>

                  <div class="input-group input-group-sm">
                  <input name="total_songs" value="" class="form-control">	
                    <span class="input-group-btn">
			<input type="submit" name="ok" class="btn btn-info btn-flat" value="Đồng Ý">
			
                    </span>
                  </div><!-- /input-group -->
</form>
<?php
}
else
{
$total_links = $_POST['total_songs'];
if (!$_POST['submit']) {
    $url = file_get_contents($total_links);
	$url_song = explode('<div class="box_absolute">', $url);
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
<label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể Loại Singer</label><br/>
<div class="col-xs-3">
    	<select class="form-control" name="singer_type_a" onChange="new_stype(this.value)">
			<option value=1>Việt Nam</option>
			<option value=2>Âu Mỹ</option>
            <option value=3>Châu Á</option>
		</select>
		</div>
		</div>
			<?=them_moi_singer_form();?>
		<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>
				<?=acp_cat();?>
                  </div><br/><br/><br/><br/><br/><br/>
				  <div class="form-group has-success">
<label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Server MEDIA</label>
				 <?=acp_server(0)?>
                  </div>

<?php
for ($i=1;$i<=$total_links;$i++) {
	$play_url = explode('<a href="http://www.nhaccuatui.com/video/', $url_song[$i]);
	$play_url = explode('"', $play_url[1]);
    $txt2='http://www.nhaccuatui.com/video/'.$play_url[0];
    $song = explode('class="name_song">', $url_song[$i]);
    $song = explode('</a>', $song[1]);
    $song = $song[0];
	 $url2 = file_get_contents($txt2);
	$singer = explode('<title>'.$song.' - ', $url2);
    $singer = explode(' | ', $singer[1]);
    $singer = $singer[0];
	$images = explode('data-src="', $url_song[$i]);
    $images = explode('"', $images[1]);
     $images = $images[0];
	$lyric = explode('<p id="divLyric" class="pd_lyric trans" style="height:auto;max-height:255px;overflow:hidden;">', $url2);
    $lyric = explode('</p>', $lyric[1]);
    $lyric = $lyric[0];
	if (preg_match("/(Hiện chưa có lời bài hát nào cho)/i", $lyric) > 0) {
		$lyric = "";
	} else {
	$lyric = str_replace("     ","",str_replace("    ","",str_replace("<br />","", $lyric)));
	}
?>

<div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-success">Tên MEDIA <?=$i?></button>
                    </div><!-- /btn-group --> 
                    <input type="text" name=title[<?=$i?>] placeholder="Nhập Tên MEDIA" value="<?=$song?>" class="form-control">
                  </div><br/>
<div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-warning">Tên CA SĨ <?=$i?></button>
                    </div><!-- /btn-group --> 
                   <div class="col-xs-5">
				   <input type="text" id="new_singer_[<?=$i?>]" name=new_singer[<?=$i?>] placeholder="Nhập Tên Ca Sĩ" value="<?=$singer?>" class="form-control">
 </div>
					<div class="col-xs-3">
					<select class="form-control"  name="singer_type[<?=$i?>]" id="singer_type_[<?=$i?>]">
       		<option value=1>Ca sĩ VN</option>
        	<option value=2>Ca sĩ AM</option>
       		<option value=3>Ca sĩ CA</option>
		</select>
		 </div>
					</div><br/>
<div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-info">LINK MEDIA <?=$i?></button>
                    </div><!-- /btn-group --> 
                    <input type="text" name=url[<?=$i?>] placeholder="Nhập Link MEDIA" value="<?=$txt2?>" class="form-control">
                  </div><br/>
<div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
                    </div><!-- /btn-group -->
                   <input name=img[<?=$i?>] type="text" value="<?=$images?>" placeholder="Nhập Link Ảnh cho Album" class="form-control">
					
                  </div><!-- /input-group -->
				  <br/>
				  <div class="form-group">
 <label>Lyric Bài Đăng</label>
<textarea class="form-control" name=lyric[<?=$i?>] rows="3" placeholder="Lời Bài Hát"><?=un_htmlchars($lyric)?></textarea>
               
					</div> <br/>

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
	if ($_POST['new_singer'] && $_POST['singer_type']) {
		$singer = them_moi_singer($_POST['new_singer'],$_POST['singer_type']);
	}
	$cat = implode(',',$_POST['cat']);
	$cat = ",".$cat.",";
	$t_cat = $cat;
	for ($i=0;$i<=$total_links;$i++) {
		
		$t_title = htmlchars(stripslashes($_POST['title'][$i]));
		$t_url = stripslashes($_POST['url'][$i]);
		$t_img = stripslashes($_POST['img'][$i]);
	$t_title_ascii = replace($t_title);
	$t_title_ascii = str_replace('-'," ",$t_title_ascii);
	$t_title_ascii = strtolower(get_ascii($t_title_ascii));
		$t_lyric = $_POST['lyric'][$i];
		
		$arr = $mlivedb->query(" m_url,m_title ","data"," m_title = '".$t_title."' AND m_url = '".$t_url."'");
		if ($t_url && $t_title) {
			if (count($arr)>0) {
				$t_url .= $arr[0][0];
				$t_title .= $arr[0][1];
		} else {	
		$t_singer = them_moi_singer($_POST['new_singer'][$i], $_POST['singer_type'][$i]);
		mysqli_query($link_music,"INSERT INTO table_data (m_singer,m_cat,m_url,m_type,m_title,m_title_ascii,m_is_local,m_poster,m_img,m_lyric,m_time) VALUES ('".$t_singer."','".$t_cat."','".$t_url."','2','".$t_title."','".$t_title_ascii."','0','".$_SESSION['admin_id']."','".$t_img."','".$t_lyric."','".NOW."')");
		}}
	}
	echo "ADD VIDEO Thành công !<meta http-equiv='refresh' content='0;url=index.php?act=media&mode=multi-nct-video-singer'>";
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

