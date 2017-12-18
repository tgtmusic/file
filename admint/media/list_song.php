<?php 
if($mode == 'songs') {
	$sql_where = " m_type = 1 ";
	$sql_order = " ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=songs&";
	$tim = "&mode=songs";
}
elseif($mode == 'video') {
	$sql_where = "m_type = 2";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=video&";
	$tim = "&mode=video";
}
elseif($mode == 'songs-broken') {
	$sql_where = "m_is_broken = 1 AND m_type = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=songs-broken&";
	$tim = "&mode=songs-broken";
}
elseif($mode == 'video-broken') {
	$sql_where = "m_is_broken = 1 AND m_type = 2";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=video-broken&";
	$tim = "&mode=video-broken";
}
elseif($mode == 'top-hot-songs') {
	$sql_where = "m_hot = 1 AND m_type = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=top-hot-songs&";
	$tim = "&mode=top-hot-songs";
}
elseif($mode == 'top-hot-video') {
	$sql_where = "m_hot = 1 AND m_type = 2";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=top-hot-video&";
	$tim = "&mode=top-hot-video";
}
elseif($mode == 'new-songs') {
	$sql_where = "m_new = 1 AND m_type = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=new-songs&";
	$tim = "&mode=new-songs";
}
elseif($mode == 'hq') {
	$sql_where = "m_hq = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=hq&";
	$tim = "&mode=hq";
}
elseif($mode == 'new-songs') {
	$sql_where = "m_new = 1 AND m_type = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=new-songs&";
	$tim = "&mode=new-songs";
}
elseif($mode == 'member-upload') {
	$sql_where = "m_mempost = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=member-upload&";
	$tim = "&mode=member-upload";
}
elseif($mode == 'lyric') {
	$sql_where = "m_lyric_user = 1";
	$sql_order = "ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&mode=lyric&";
	$tim = "&mode=lyric";
}
else {
	$sql_order = "m_id ORDER BY m_id DESC";
	$link_pages = "index.php?act=list-media&";
}
if($search) {
	$search 	=  get_ascii($search);
	$sql_where_s = " m_title_ascii LIKE '%".$search."%' AND";
	$link_pages = "index.php?act=list-media".$tim."&search=".$search."&";
}
	$sql_tt = "SELECT m_id  FROM table_data WHERE $sql_where_s $sql_where $sql_order LIMIT 660";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 ); 
/**
	$arr_songnew = $mlivedb->query(" m_id, m_title, m_singer, m_type, m_cat, m_is_broken, m_is_local, m_time,m_img,m_lyric,m_hot,m_new  ","data"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	for($i=0;$i<count($arr_songnew);$i++) {
	echo $new_namesong =  un_htmlchars($arr_songnew[$i][1]);
	 mysqli_query($link_music,"UPDATE table_data SET m_title = '".$new_namesong."' WHERE m_id ='".$arr_songnew[$i][0]."'");
	 } **/


?>

     <section class="content">
          <div class="row">
            <div class="col-md-12">
			                
<div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Danh Sách MEDIA</h3>
                  <div class="box-tools pull-right">
				  <button type="submit" class="btn btn-info " onclick='window.location.href = "index.php?act=media&mode=add"'>Thêm MEDIA Mới</button>
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div><!-- /.box-header -->
<div class="box-body">
                  <div class="row">
                    <div class="col-xs-3">
                  <div class="input-group input-group-sm">
                    <input id="m_id" type="text" value="" placeholder="ID Media Cần Sửa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=media&mode=edit&id="+document.getElementById("m_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				   <div class="col-xs-4">
                  <div class="input-group input-group-sm">
                    <input id=m_del_id type="text" value="" placeholder="ID Media Cần Xóa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=media&del_id="+document.getElementById("m_del_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				  	<div class="col-xs-5">
                  <div class="input-group input-group-sm">
                    <input id=search type="text" value="<?php  echo $search;?>" placeholder="Tìm Theo Tên Bài Hát" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-media<?php echo $tim;?>&search="+document.getElementById("search").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				  </div>
                 </div>
            <div class="box-body">
<section class="panel panel-default">
<tbody> 
				<div class="table-responsive">
				 <form name=media_list method=post action='<?php echo $link_pages;?>' onSubmit="return check_checkbox();">
				 
                  <table class="table table-striped b-t b-light">
			 <header class="panel-heading"><ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul></header>
                   <thead> 
                      <tr>
                        <th width="20"><input class=checkbox type=checkbox name=chkall id=chkall onclick=docheck(document.media_list.chkall.checked,0) value=checkall></th>
                        <th class="th-sortable" data-toggle="class">ID</th>
                        <th>Thumb</th>
                        <th>Tên Media</th>
                        <th>Ca sĩ</th>
                        <th>Lỗi</th>
						<th>Hot/New</th>
                        <th>Time post</th>
                
                      </tr>
                    </thead>
                    <tbody>
			<?php 
	$arr_song = $mlivedb->query("  m_id, m_title, m_singer, m_type, m_cat, m_is_broken, m_is_local, m_time,m_img,m_lyric,m_hot,m_new  ","data"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	for($i=0;$i<count($arr_song);$i++) {
if ($arr_song[$i][8]!="") {	
if (preg_match("/(http|https):\/\/(.*?)$/i", $arr_song[$i][8]) > 0) {
$img_src = check_img($arr_song[$i][8]);
} else { $img_src = SITE_LINK.$arr_song[$i][8]; }
} else { $img_src = check_img($arr_song[$i][8]); }
if($arr_song[$i][3] == 2) $status = '<img style="width:90px;height:54px" class="img_video" src="'.$img_src.'">';
	else	$status = '<button type="button" class="btn btn-sm btn-info"><i class="fa fa-music"></i></button>';
	$song_broken 	= ($arr_song[$i][5] == 0)?'<button type="button" class="btn btn-xs btn-success"><i class="fa fa-check"></i></button>':'<button type="button" class="btn btn-xs btn-warning"><i class="fa fa-warning"></i></button>';
	$arrER	= $mlivedb->query("er_name, er_text","error"," er_id = '".$arr_song[$i][0]."'");
		if($arr_song[$i][3] == 2) $song_url		= url_link(replace($arr_song[$i][1]).'-'.replace($singer_name),$arr_song[$i][0],'xem-video');
	else	$song_url		= url_link(replace($arr_song[$i][1]).'-'.replace($singer_name),$arr_song[$i][0],'nghe-bai-hat');
	if($arr_song[$i][10] == 1) { $status_hot = '<a href="index.php?act=media&bohot='.$arr_song[$i][0].'"><button type="button" class="btn btn-xs  btn-default"><i class="fa fa-star text-yellow"></i></button></a>'; }
	else { $status_hot = '<a href="index.php?act=media&sethot='.$arr_song[$i][0].'"><button type="button" class="btn btn-xs btn-default"><i class="fa fa-star-o text-yellow"></i></button></a>'; }
	
	if($arr_song[$i][11] == 1) { $status_new = '<a href="index.php?act=media&bonew='.$arr_song[$i][0].'"><button type="button" class="btn btn-xs  btn-warning">new</button></a>'; }
	else { $status_new = '<a href="index.php?act=media&setnew='.$arr_song[$i][0].'"><button type="button" class="btn btn-xs btn-default">new</button></a>'; }
	
?><tr>
                            <td> <input class=checkbox type=checkbox id=checkbox onclick=docheckone() name=checkbox[] value=<?php  echo $arr_song[$i][0];?>></td>
                            <td>#<?php  echo $arr_song[$i][0];?></td>
							 <td><?php  echo $status;?></td>

							<td style="width:30%"><b><a href="index.php?act=media&mode=edit&id=<?php  echo en_id($arr_song[$i][0]);?>" title="Sửa media <?php  echo un_htmlchars($arr_song[$i][1]);?>"><?php  echo un_htmlchars(rut_ngan($arr_song[$i][1],20));?></a></b></a>
							  <br/>  <?php  if($mode == 'broken') { ?>
					  <strong>Nguyên Nhân lỗi : </strong><?php  echo un_htmlchars($arrER[0][1]);?><br>
                       <a href="<?php  echo $song_url;?>" target="_blank">[Kiểm tra bài hát]</a>
                      <?php  } ?>
							</td>
                            <td><b><?php  echo GetSingerAdmin($arr_song[$i][2]);?></b></td>
                           
							<td><b><?php  echo $song_broken;?></b></td>
							 <td><?php  echo $status_hot;?> <?php  echo $status_new;?></td>
<td><b><?php  echo GetTIMEDATE($arr_song[$i][7]);?></td>
                           <td align=right> <?php  if($arr_song[$i][3] == '2') { ?> 
							<b><a href="index.php?act=topic-video&mode=edit&id=<?php  echo en_id($arr_song[$i][0]);?>" title="Đưa Vào Chủ Đề" ><span class="btn bg-olive btn-xs">Chủ Đề</a></span></b><?php  } ?>
							 <b><a href="index.php?act=media&del_id=<?php  echo en_id($arr_song[$i][0]);?>" title="Xóa" ><button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></a></b></td>
</tr>
<?php  } ?>

                  </table>
                </div>
				 <footer class="panel-footer">
                  <div class="row">
                    <div class="col-sm-4 hidden-xs">
               	 <div>
<select name="selected_option" class="input-sm form-control input-s-sm inline v-middle">
 <option value="add_album">Tạo Album Mới</option>
        <option value="add_song_album">Thếm bài hát vào Album</option>
        <option value="normal">Thôi báo lỗi</option>
        <option value="set-top">Top HOT</option>
        <option value="bo-top">Bỏ Top HOT</option>
        <option value="TV">Duyệt bài thành viên</option>
        <!--<option value="LYRIC">Duyệt lời nhạc TV up</option>-->
        <option value="hq">HQ</option>
        <option value="set-new">Top bài hát mới</option>
        <option value="bo-new">Bỏ Top bài hát mới</option>
		<option value=",1,5,">Chủ Đề Nổi Bật</option>
		<option value="bo-topic">Bỏ chủ đề</option>
		 <option value="del">Xóa</option>
 </select>
 <input class="btn btn-sm btn-default" type="submit" name="do" value="Apply">
      </div>       
                 </form>					  
                    </div>
                   
                 <thead> <ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul>
                  </div>
                </footer>

              </section>

            </div><!-- /.col-->
         </div></div> </div><!-- ./row -->
        </section><!-- /.content -->

<script>
function ask(){
	if (confirm("Cảnh báo \nTất cả nội dung và chủ đề thuộc chủ đề này sẽ mất hết \nBạn chắc chắn muốn xóa nội dung này ?")) return true;
	return false ;
}
</script>
<?php 
if ($_POST['do']) {
	$arr = $_POST['checkbox'];
	if (!count($arr)) die('Lỗi');
	if ($_POST['selected_option'] == 'del') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"DELETE FROM table_data WHERE m_id IN (".$in_sql.")");
		mss ("Xóa thành công ","index.php?act=list-media&mode=songs&");
	}		
	elseif ($_POST['selected_option'] == 'add_album') {
		$arr = implode(',',$arr);
		header("Location: ./index.php?act=multi-add-album&id=".$arr);
	}
	elseif ($_POST['selected_option'] == 'add_song_album') {
		$arr = implode(',',$arr);
		header("Location: ./index.php?act=add-song-album&id=".$arr);
	}
	elseif ($_POST['selected_option'] == 'normal') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data SET m_is_broken = 0 WHERE m_id IN (".$in_sql.")");
		mysqli_query($link_music,"DELETE FROM table_error WHERE er_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=songs&");
	}
	elseif ($_POST['selected_option'] == 'LYRIC') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data SET SET m_lyric_user = 0 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=lyric");
	}
	elseif ($_POST['selected_option'] == 'TV') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data SET m_mempost = 0 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=member-upload");
	}
	elseif ($_POST['selected_option'] == 'set-top') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data  SET m_hot = 1 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=top-hot");
	}
		elseif ($_POST['selected_option'] == 'bo-top') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data SET m_hot = 0 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=top-hot");
	}
		elseif ($_POST['selected_option'] == 'set-new') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data  SET m_new = 1 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=new-songs");
	}
		elseif ($_POST['selected_option'] == 'bo-new') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data SET m_new = 0 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=new-songs");
	}
			elseif ($_POST['selected_option'] == 'bo-topic') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data  SET m_topic = '' WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=video");
	}
	elseif ($_POST['selected_option'] == 'hq') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data SET m_hq = 1 WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=hq");
	}
	elseif ($_POST['selected_option'] == ',1,5,') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_data  SET m_topic = '".$_POST['selected_option']."' WHERE m_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-media&mode=video&");
	}

	exit();
}
?>