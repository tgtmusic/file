     <section class="content">
          <div class="row">
            <div class="col-md-8">
			                
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Mutil Add Video Youtube</h3>
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
             
                  <p class="margin"><code>Vui lòng nhập số link Media muốn thêm</code>				  <br/>
+ Link post : https://www.youtube.com/results?search_query=dan+truong</p>

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
	$url_song = explode('<div class="yt-lockup-dismissable yt-uix-tile"><div class="yt-lockup-thumbnail contains-addto"><a aria-hidden="true"', $url);
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
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>Tên Ca Sĩ</label>
<?=acp_singer();?> <?=them_moi_singer_form();?>
					  </div>
		<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>
				<?=acp_cat();?>
                  </div><br/><br/><br/><br/><br/><br/>
				  <div class="form-group has-success">
<label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Server MEDIA</label>
				 <?=acp_server(0)?>
                  </div>
				  <div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Định Dạng MEDIA</label>
				 <?=acp_type(2);?> 
                  </div>
<?php
for ($i=1;$i<=$total_links;$i++) {
	$play_url = explode('href="/watch?v=', $url_song[$i]);
	$play_url = explode('"', $play_url[1]);
    $txt2='http://youtube.com/watch?v='.$play_url[0];
    $song = explode('9uZw"  title="', $url_song[$i]);
    $song = explode('" rel="spf-prefetch"', $song[1]);
    $song = $song[0];
	$singer = explode('9uZw"  title="', $url_song[$i]);
    $singer = explode('" rel="spf-prefetch"', $singer[1]);
    $singer = $singer[0];
	$images = explode('href="/watch?v=', $url_song[$i]);
    $images = explode('"', $images[1]);
    $images = 'http://i2.ytimg.com/vi/'.$images[0].'/0.jpg';
?>

<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên MEDIA <?=$i?></label>
                    <input type="text" name=title[<?=$i?>] placeholder="Nhập Tên MEDIA" value="<?=$song?>" class="form-control">
                  </div>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Link MEDIA <?=$i?></label>
                    <input type="text" name=url[<?=$i?>] placeholder="Nhập Link MEDIA" value="<?=$txt2?>" class="form-control">
                  </div>
<div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
                    </div><!-- /btn-group -->
                   <input name=img[<?=$i?>] type="text" value="<?=$images?>" placeholder="Nhập Link Ảnh cho Album" class="form-control">
					
                  </div><!-- /input-group -->
				  <br/>

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

		for ($z=1; $z<=$total_sv; $z++) {

        if ($_POST['local_url_'.$z][$i])

        $t_local = $z;

        }

		$arr = $mlivedb->query(" m_url,m_title ","data"," m_title = '".$t_title."' AND m_url = '".$t_url."'");
		if ($t_url && $t_title) {
			if (count($arr)>0) {
				$t_url .= $arr[0][0];
				$t_title .= $arr[0][1];
		} else {
			mysqli_query($link_music,"INSERT INTO table_data (m_singer,m_cat,m_url,m_type,m_title,m_title_ascii,m_is_local,m_poster,m_img,m_time) VALUES ('".$t_singer."','".$t_cat."','".$t_url."','".$type."','".$t_title."','".$t_title_ascii."','".$t_local."','".$_SESSION['admin_id']."','".$t_img."','".NOW."')");
		} }
	}
	$arr = $mlivedb->query("m_id","data"," m_id ORDER BY m_id DESC LIMIT ".$total_links);
	for($x=0;$x<$total_links;$x++) {
	$list .=  $arr[$x][0].',';
	}
	$album_song = substr($list,0,-1);
	if ($new_album) {
			if(move_uploaded_file ($_FILES['album_img']['tmp_name'],FOLDER_ALBUM."/[TLDi-music]-".time()."-".$_FILES['album_img']['name']))
			$album_img = LINK_ALBUM."/[TLDi-music]-".time()."-".$_FILES['album_img']['name'];
			else $album_img = $_POST['album_img'];
			$album = them_moi_album($new_album,$singer,$album_img,$cat,$album_song,$album_info);
			}
	mss ("ADD MEDIA Thành Công! ","index.php?act=media&mode=multi-you");
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

