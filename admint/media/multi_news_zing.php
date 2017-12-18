<section class="content">
          <div class="row">
            <div class="col-md-8">
			                
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Mutil Add News Zing </h3>
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
             
                  <p class="margin"><code>Vui lòng nhập link NEWS ZING muốn thêm</code>				  <br/>
+ Link post : http://news.zing.vn/giai-tri.html</p>

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
	$url_song = explode('<div class="cover">', $url);
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
				<?=acp_news_cat();?>
                  </div><br/><br/><br/><br/><br/><br/>
				  
<?php
for ($i=1;$i<=$total_links;$i++) {
	$play_url = explode('<a href="', $url_song[$i]);
	$play_url = explode('">', $play_url[1]);
    $url_news='http://news.zing.vn/'.$play_url[0];
	$url2 = file_get_contents($url_news);
	$infofull = explode('<p class="the-article-summary cms-desc">', $url2);
    $infofull = explode('<p class="the-article-tags">', $infofull[1]);
    $infofull = $infofull[0];
	$info = explode('<p class="the-article-summary cms-desc">', $url2);
    $info = explode('</p>', $info[1]);
    $info = $info[0];
    $song = explode('title="', $url_song[$i]);
    $song = explode('">', $song[1]);
    $song = $song[0];
	$images = explode('<img src="', $url_song[$i]);
    $images = explode('"', $images[1]);
    $images = $images[0];
?>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Bài Viết <?=$i?></label>
					  <input type="text" name=name[<?=$i?>] placeholder="Nhập Tên Bài Viết" value="<?=$song?>" class="form-control" id="inputSuccess">
					  </div>
<div class="input-group">
 <div class="input-group-btn">
<button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
</div><!-- /btn-group -->
<input name=img[<?=$i?>] type="text" value="<?=$images?>" placeholder="Nhập Link Ảnh cho Album" class="form-control">
</div><!-- /input-group --> <br/>
 <div class="form-group">
 <label>Thông Tin Ngắn</label>
 <textarea class="form-control" name=info[<?=$i?>] rows="3" placeholder="Nhập thông tin"><?=$info?></textarea>
</div>
<div class="form-group">
 <label>Nội Dung Bài Đăng</label>
<textarea class="form-control" name=infofull[<?=$i?>] rows="3" placeholder="Nội Dung Bài Đăng"><p><?=$infofull?></textarea>
               
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
	if ($_POST['new_singer'] && $_POST['singer_type']) {
		$singer = them_moi_singer($_POST['new_singer'],$_POST['singer_type']);
	}
	$cat = implode(',',$_POST['cat']);
	$cat = ",".$cat.",";
	$news_cat = $cat;
	for ($i=0;$i<=$total_links;$i++) {
		
		$news_title = htmlchars(stripslashes($_POST['name'][$i]));
	$news_title_ascii = replace($news_title);
	$news_title_ascii = str_replace('-'," ",$news_title_ascii);
	$news_title_ascii = strtolower(get_ascii($news_title_ascii));
		$img = stripslashes($_POST['img'][$i]);
		$info = $_POST['info'][$i];
		$infofull = $_POST['infofull'][$i];
		$user_id	 = $_SESSION['admin_id'];
		$arr = $mlivedb->query(" news_title ","news"," news_title = '".$news_title."'");
		if ($infofull && $news_title) {
			if (count($arr)>0) {
				$news_title .= $arr[0][0];
		} else {
		$news_singer = them_moi_singer($_POST['new_singer'][$i], $_POST['singer_type'][$i]);
		mysqli_query($link_music,"INSERT INTO table_news (news_title,news_title_ascii,news_cat,news_infofull,news_img,news_info,news_poster,news_time) VALUES ('".$news_title."','".$news_title_ascii."','".$cat."','".$infofull."','".$img."','".$info."','".$user_id."','".NOW."')");
		} }
	}
	mss ("ADD MEDIA Thành Công! ","index.php?act=list-news&mode=list-news");
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

