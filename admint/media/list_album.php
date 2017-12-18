<?php 
if($mode == 'list-album') {
	$sql_order = "album_id ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album&";
	$tim = "&mode=list-album";
}
elseif($mode == 'list-album-topic') {
	$sql_where = "album_topic != ''";
	$sql_order = "ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album-topic&";
	$tim = "&mode=list-album-topic";
}
elseif($mode == 'list-album-hot') {
	$sql_where = "album_hot = 1";
	$sql_order = "ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album-hot&";
	$tim = "&mode=list-album-hot";
}
elseif($mode == 'list-album-new') {
	$sql_where = "album_new = 1";
	$sql_order = "ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album-new&";
	$tim = "&mode=list-album-new";
}
elseif($mode == 'list-album-top-100') {
	$sql_where = "album_top100 = 1";
	$sql_order = "ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album-top-100&";
	$tim = "&mode=list-album-top-100";
}
elseif($mode == 'list-album-chon-loc') {
	$sql_where = "album_chonloc = 1";
	$sql_order = "ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album-chon-loc&";
	$tim = "&mode=list-album-chon-loc";
}
elseif($mode == 'list-album-member') {
	$sql_where = "album_type = 1";
	$sql_order = "ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album-member&";
	$tim = "&mode=list-album-member";
}
else {
	$sql_order = "album_id ORDER BY album_id DESC";
	$link_pages = "index.php?act=list-album&mode=list-album&";
}
if($search) {
	$search 	=  get_ascii($search);
	$sql_where_s 	= "album_name_ascii LIKE '%".$search."%' AND";
	$link_pages = "index.php?act=list-album".$tim."&search=".$search."&";
}
	$sql_tt = "SELECT album_id  FROM table_album WHERE $sql_where_s $sql_where $sql_order LIMIT 660";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
	/**
	$arr_songnew = $mlivedb->query(" album_id ","album"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	for($i=0;$i<count($arr_songnew);$i++) {
	 mysqli_query($link_music,"UPDATE table_album SET album_viewed = '4000',album_viewed_month = '3000',album_viewed_week = '2000',album_viewed_day = '1000' WHERE album_id ='".$arr_songnew[$i][0]."'");
	 } **/

?>     <section class="content">          <div class="row">            <div class="col-md-12">     <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Danh Sách MEDIA</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header --><div class="box-body">                  <div class="row">                    <div class="col-xs-3">                  <div class="input-group input-group-sm">                    <input id="m_id" type="text" value="" placeholder="ID Album Cần Sửa" class="form-control">                    <span class="input-group-btn">                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-album&mode=edit&id="+document.getElementById("m_id").value;'><span class="glyphicon glyphicon-search "></span></button>                    </span>                  </div></div>				   <div class="col-xs-4">                  <div class="input-group input-group-sm">                    <input id=m_del_id type="text" value="" placeholder="ID Album Cần Xóa" class="form-control">                    <span class="input-group-btn">                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-album&del_id="+document.getElementById("m_del_id").value;'><span class="glyphicon glyphicon-search "></span></button>                    </span>                  </div></div>				  	<div class="col-xs-5">                  <div class="input-group input-group-sm">                    <input id=search type="text" value="<?php  echo $search;?>" placeholder="Tìm Theo Tên Album" class="form-control">                    <span class="input-group-btn">                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-album<?php echo $tim;?>&search="+document.getElementById("search").value;'><span class="glyphicon glyphicon-search "></span></button>                    </span>                  </div></div>				  </div>                 </div>            <div class="box-body">			 <form name=media_list method=post action='<?php echo $link_pages;?>' onSubmit="return check_checkbox();"><section class="panel panel-default">						<div class="table-responsive">  <table class="table table-striped b-t b-light">			 <header class="panel-heading"><ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul></header>                   <thead>                         <tr>                         <th width="20"><input class=checkbox type=checkbox name=chkall id=chkall onclick=docheck(document.media_list.chkall.checked,0) value=checkall></th>                            <th class="th-sortable" data-toggle="class">ID</th>						  <th>Thumb</th>                          <th>Tên Album</th>						  <th>Ca Sĩ</th>
						<th>Hot/New</th>						<th>Time post</th>                        </tr>                      </thead>                      <tbody> 
<?php 
	$arr_album = $mlivedb->query("  album_id, album_name, album_singer, album_img, album_cat, album_poster,album_time,album_hot,album_new,album_topic  ","album"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");

	for($i=0;$i<count($arr_album);$i++) {
	$singer_name = get_data("singer","singer_name"," singer_id = '".$arr_album[$i][2]."'");
if ($arr_album[$i][3]!="") {	
if (preg_match("/(http|https):\/\/(.*?)$/i", $arr_album[$i][3]) > 0) {
$img_src = check_img($arr_album[$i][3]);
} else { $img_src = SITE_LINK.$arr_album[$i][3]; }
} else { $img_src = check_img($arr_album[$i][3]); }
if($arr_album[$i][7] == 1) { $status_hot = '<a href="index.php?act=album&bohot='.$arr_album[$i][0].'"><button type="button" class="btn btn-xs  btn-default"><i class="fa fa-star text-yellow"></i></button></a>'; }
	else { $status_hot = '<a href="index.php?act=album&sethot='.$arr_album[$i][0].'"><button type="button" class="btn btn-xs btn-default"><i class="fa fa-star-o text-yellow"></i></button></a>'; }
if($arr_album[$i][8] == 1) { $status_new = '<a href="index.php?act=album&bonew='.$arr_album[$i][0].'"><button type="button" class="btn btn-xs  btn-warning">new</button></a>'; }
	else { $status_new = '<a href="index.php?act=album&setnew='.$arr_album[$i][0].'"><button type="button" class="btn btn-xs btn-default">new</button></a>'; }
	if($mode == 'list-album-topic') {
		$tl_topic = GetTopicAdmin($arr_album[$i][9]);
		$tl_topic = '<i><b><font color="black">Chủ Đề</font>: <font color="green">'.$tl_topic.'</font></b></i><br>';
	}
?><tr onMouseOver="bgColor='#c9daf6'" onMouseOut="bgColor='#FFFFFF'">		<td><input class=checkbox type=checkbox id=checkbox onclick=docheckone() name=checkbox[] value=<?php  echo $arr_album[$i][0];?>></td>  <td>#<?php  echo $arr_album[$i][0];?></td>					    <td><img style="width:54px;height:54px" src="<?php  echo $img_src;?>"></td> <td align="left" style="padding-left: 10px;max-width:250px;" ><a href="index.php?act=album&mode=edit&id=<?php  echo en_id($arr_album[$i][0]);?>" title="Sửa <?php  echo $arr_album[$i][1];?>"><b><?php  echo $arr_album[$i][1];?></b></a><br><?php  echo $tl_topic;?>
 <i><strong>Người gửi :</strong> <?php  echo get_user($arr_album[$i][5]);?></i></td>						  <td style="max-width:200px;" ><b><?php  echo GetSingerAdmin($arr_album[$i][2]);?></b></td>
							 <td><?php  echo $status_hot;?> <?php  echo $status_new;?></td>						   <td><b><?php  echo GetTIMEDATE($arr_album[$i][6]);?></b></td><td align=right><b><a href="index.php?act=topic-album&mode=edit&id=<?php  echo en_id($arr_album[$i][0]);?>" title="Đưa Vào Chủ Đề" ><span class="btn bg-olive btn-xs">Chủ Đề</a></span></b>
<b><a href="index.php?act=album&del_id=<?php  echo en_id($arr_album[$i][0]);?>" title="Xóa" ><button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></a></b></td>						</tr>
<?php  } ?></tbody>                </table>                </div>				 <footer class="panel-footer">                  <div class="row">				   <div class="col-sm-4 hidden-xs">				<select name="selected_option" class="input-sm form-control input-s-sm inline v-middle"><option value="del">Xóa</option><option value="duyet">Duyệt Album Thành Viên</option><option value=",1,9,">Đưa vào Chủ Đề Nổi Bật</option><option value="set-top">Đưa vào Top Hot</option><option value="bo-top">Bỏ khỏi Top Hot</option>
<option value="set-top100">Đưa vào Top 100</option>
<option value="bo-top100">Bỏ Khỏi Top 100</option>
<option value="set-chonloc">Đưa vào Album Chọn Lọc</option>
<option value="bo-chonloc">Bỏ khỏi Album Chọn Lọc</option><option value="set-album-bt">Album Bình Thường</option></select> <input class="btn btn-sm btn-default" type="submit" name="do" value="Apply"></form>			                      </div>                                  <thead> <ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul>                  </div>                </footer>  </form>              </section>            </div><!-- /.col-->         </div></div> </div><!-- ./row -->        </section><!-- /.content -->
<?php 
if ($_POST['do']) {
	$arr = $_POST['checkbox'];
	if (!count($arr)) die('Lỗi');
	if ($_POST['selected_option'] == 'del') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"DELETE FROM table_album WHERE album_id IN (".$in_sql.")");
		mss ("Xóa thành công ","index.php?act=list-album&mode=list-album");
	}		
	elseif ($_POST['selected_option'] == 'set-album-bt') {		$in_sql = implode(',',$arr);		mysqli_query($link_music,"UPDATE table_album  SET album_type = 0 WHERE album_id IN (".$in_sql.")");		mss ("Update thành công ","index.php?act=list-album&mode=list-album");	}	elseif ($_POST['selected_option'] == ',1,9,') {		$in_sql = implode(',',$arr);		mysqli_query($link_music,"UPDATE table_album  SET album_topic = '".$_POST['selected_option']."' WHERE album_id IN (".$in_sql.")");		mss ("Update thành công ","index.php?act=list-album&mode=list-album");	}
	elseif ($_POST['selected_option'] == 'set-top') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album  SET album_hot = 1 WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-hot");
	}
	elseif ($_POST['selected_option'] == 'bo-top') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album SET album_hot = 0 WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-hot");
	}
	elseif ($_POST['selected_option'] == 'duyet') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album SET album_type = 0 WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-member");
	}
		elseif ($_POST['selected_option'] == 'set-top100') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album SET album_top100 = 1 WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-hot");
	}
			elseif ($_POST['selected_option'] == 'bo-top100') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album SET album_top100 = '' WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-hot");
	}
			elseif ($_POST['selected_option'] == 'set-chonloc') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album SET album_chonloc = 1 WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-chon-loc");
	}
			elseif ($_POST['selected_option'] == 'bo-chonloc') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_album SET album_chonloc = '' WHERE album_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-album&mode=list-album-chon-loc");
	}
	exit();
}
?>