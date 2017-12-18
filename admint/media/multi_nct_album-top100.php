<?php
function loaibo($str) {
	$chars = array(""	=>	array("<![CDATA[","]]>"));  
	foreach ($chars as $key => $arr)
		foreach ($arr as $val)
			$str = str_replace($val,$key,$str);
	return $str;
}
?>

     <section class="content">
          <div class="row">
            <div class="col-md-8">
			                
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Mutil Add Album NCT</h3>
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
+ Link post : http://www.nhaccuatui.com/playlist/nhu-phut-ban-dau-single-noo-phuoc-thinh.61Yh2M5DlVYT.html</p>

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
	$source = explode('player.peConfig.xmlURL = "',$url);
    $source = explode('"',$source[1]);
	$source = file_get_contents($source[0]);
	
	$url_song = explode(' id="itemSong_', $url);
	$total_linksx = count($url_song);
    $total_links = $total_linksx-1;
	$album_z = explode('<div class="name_title"><h1 itemprop="name">', $url);
	$album_z = explode('</h1>', $album_z[1]);
	$singer_z = explode('<h2 class="name-singer" style="color: #000;">', $url);
	$singer_z = explode('</h2>', $singer_z[1]);
    $album_z = $album_z[0];
    $singer_z = $singer_z[0];
	$album_info = explode('<div id="_divDescription">', $url);
	$album_info = explode('</div>', $album_info[1]);
	$album_info = str_replace('NhacCuaTui.com',"".NAMEWEB."",$album_info[0]);
	$album_info = str_replace("   ","",str_replace("     ","",str_replace("    ","",$album_info)));
	$album_img  = explode('<link rel="image_src" href="', $url);
	$album_img  = explode('"', $album_img[1]);
	$album_img	= $album_img[0];
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
<br/>
<div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-success">Tên Album </button>
                    </div><!-- /btn-group --> 
					<div class="col-xs-5">
                    <input type="text" name="new_album" placeholder="Nhập Tên Album" value="<?=$album_z?>" class="form-control">
					</div>
					<div class="col-xs-3">
    	<select class="form-control" name="singer_type_a" onChange="new_stype(this.value)">
			<option value=1>Album VN</option>
			<option value=2>Album AM</option>
            <option value=3>Album CA</option>
		</select>
		</div>
                  </div><br/>
				  
 <div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-warning">Tên CA SĨ <?=$i?></button>
                    </div><!-- /btn-group --> 
                    <input type="text" id="new_singer_a" name="new_singer_a" placeholder="Nhập Tên Ca Sĩ" value="<?=$singer_z?>" class="form-control">
                  </div>
				  <br/>
 <div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
                    </div><!-- /btn-group -->
                   <input name=album_img type="text" value="<?php echo $album_img;?>" placeholder="Nhập Link Ảnh cho Album" class="form-control">
                  </div><!-- /input-group --><br/>
	<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>
				<?=acp_cat();?>
                  </div> 
<br/><br/><br/><br/><br/><br/>

<div class="form-group">
 <label>Thông Tin Album</label>
<textarea class="form-control" name=album_info rows="3" placeholder="Thông Tin Album"><?=un_htmlchars($album_info)?></textarea>
					</div><br/>

<?php

for ($i=1;$i<=$total_links;$i++) {
	$play_url = explode('<a href="http://www.nhaccuatui.com/bai-hat/', $url_song[$i]);
	$play_url = explode('"', $play_url[1]);
    #$play_url = loaibo($play_url[0]);
	$play_url='http://www.nhaccuatui.com/bai-hat/'.$play_url[0];
    $song = explode('title="Nghe bài hát ', $url_song[$i]);
    $song = explode(' - ', $song[1]);
    $song = loaibo($song[0]);
	$singer = explode('title="Nghe bài hát '.$song.' - ', $url_song[$i]);
    $singer = explode(' ở cửa sổ mới"', $singer[1]);
    $singer = loaibo($singer[0]);
	$url2 = file_get_contents($play_url);
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
<div class="input-group ">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-warning">Tên CA SĨ <?=$i?></button>
                    </div><!-- /btn-group --> 
                   <div class="col-xs-5"> <input type="text" name="new_singer[<?=$i?>]" id="new_singer_[<?=$i?>]" placeholder="Nhập Tên Ca Sĩ" value="<?=$singer?>" class="form-control">
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
                    <input type="text" name=url[<?=$i?>] placeholder="Nhập Link MEDIA" value="<?=$play_url?>" class="form-control">
                  </div><br/>
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
	$singer = them_moi_singer($_POST['new_singer_a'], $_POST['singer_type_a']);
	$cat = implode(',',$_POST['cat']);
	$cat		 = ",".$cat.",";
	$new_album = $_POST['new_album'];

	$t_cat = $cat;
	for ($i=0;$i<=$total_links;$i++) {
		$t_title = htmlchars(stripslashes($_POST['title'][$i]));
		$t_url = stripslashes($_POST['url'][$i]);
		//$t_type = acp_type($t_url);
	$t_title_ascii = replace($t_title);
	$t_title_ascii = str_replace('-'," ",$t_title_ascii);
	$t_title_ascii = strtolower(get_ascii($t_title_ascii));
			$t_lyric = $_POST['lyric'][$i];
		$t_type = $_POST['singer_type'][$i];
		$arr = $mlivedb->query(" m_url,m_title ","data"," m_title = '".$t_title."' AND m_url = '".$t_url."'");
		if ($t_url && $t_title) {
			if (count($arr)>0) {
				$t_url .= $arr[0][0];
				$t_title .= $arr[0][1];
		} else {
		$t_singer = them_moi_singer($_POST['new_singer'][$i], $_POST['singer_type'][$i]);
		mysqli_query($link_music,"INSERT INTO table_data (m_singer,m_cat,m_url,m_type,m_title,m_title_ascii,m_is_local,m_poster,m_img,m_lyric,m_time) VALUES ('".$t_singer."','".$t_cat."','".$t_url."','1','".$t_title."','".$t_title_ascii."','0','".$_SESSION['admin_id']."','".$img."','".$t_lyric."','".NOW."')");
		}}
	}
	// add album
	$arr = $mlivedb->query("m_id","data"," m_id ORDER BY m_id DESC LIMIT ".$total_links);
	$album_type = $_POST['singer_type_a'];
	for($x=0;$x<count($arr);$x++) {
	$list .=  $arr[$x][0].',';
	$album_song = substr($list,0,-1);

	} 
	$new_album = $_POST['new_album'];
	if ($new_album) {

			$album 			= them_moi_album($new_album,$singer,$_POST['album_img'],$cat,$album_song,$_POST['album_info'],$_SESSION['admin_id']);
			}
	//mss ("Ok ! ","media.php?mode=multi_zing");
	echo "Thành công<meta http-equiv='refresh' content='0;url=index.php?act=media&mode=multi-nct-album'>";
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

