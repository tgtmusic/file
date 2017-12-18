<?php 
if($mode == 'singer') {
	$sql_where = "singer_id";
	$sql_order = " ORDER BY singer_id DESC";
	$link_pages = "index.php?act=list-singer&mode=singer&";
	$tim = "&mode=singer";
}elseif($mode == 'singer-hot') {	$sql_where = "singer_hot = 1";	$sql_order = "ORDER BY singer_id DESC";	$link_pages = "index.php?act=list-singer&mode=singer-hot&";
	$tim = "&mode=singer-hot";}
else {
	$sql_order = "singer_id ORDER BY singer_id DESC";
	$link_pages = "index.php?act=list-singer&mode=singer&";
}
if($search) {
	$search 	=  get_ascii($search);
	$sql_where_s 	= "singer_name_ascii LIKE '%".$search."%' AND ";
	$link_pages = "index.php?act=list-singer&search=".$search."&";
}
	$sql_tt = "SELECT singer_id  FROM table_singer WHERE $sql_where_s $sql_where $sql_order LIMIT 660";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
/**
	$arr_singer2 = $mlivedb->query(" singer_id, singer_name, singer_img, singer_hot  ","singer"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
for($i=0;$i<count($arr_singer2);$i++) {
	$new_singer =  htmlchars(stripslashes($arr_singer2[$i][1]));
	$singer_ascii = replace($new_singer);
		$singer_ascii = str_replace('-'," ",$singer_ascii);
		$singer_ascii = strtolower(get_ascii($singer_ascii));
	mysqli_query($link_music,"UPDATE table_singer SET singer_name_ascii = '".$singer_ascii."' WHERE singer_id ='".$arr_singer2[$i][0]."'");
	} **/
?>     <section class="content">          <div class="row">            <div class="col-md-12">			                 <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Danh Sách Ca Sĩ</h3>                  <div class="box-tools pull-right">	<button type="submit" class="btn btn-info " onclick='window.location.href = "index.php?act=singer&mode=add"'>Thêm Ca Sĩ Mới</button>                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">                  <div class="row">                    <div class="col-xs-3">                  <div class="input-group input-group-sm">                    <input id="m_id" type="text" value="" placeholder="ID Ca Sĩ Cần Sửa" class="form-control">                    <span class="input-group-btn">                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=singer&mode=edit&id="+document.getElementById("m_id").value;'><span class="glyphicon glyphicon-search "></span></button>                    </span>                  </div></div>				   <div class="col-xs-4">                  <div class="input-group input-group-sm">                    <input id=m_del_id type="text" value="" placeholder="ID Ca Sĩ Cần Xóa" class="form-control">                    <span class="input-group-btn">                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=singer&del_id="+document.getElementById("m_del_id").value;'><span class="glyphicon glyphicon-search "></span></button>                    </span>                  </div></div>				  	<div class="col-xs-5">                  <div class="input-group input-group-sm">                    <input id=search type="text" value="<?php  echo $search;?>" placeholder="Tìm Theo Tên Ca Sĩ" class="form-control">                    <span class="input-group-btn">                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-singer<?php  echo $tim;?>&search="+document.getElementById("search").value;'><span class="glyphicon glyphicon-search "></span></button>                    </span>                  </div></div>				  </div>                 </div><section class="panel panel-default"><tbody> 				<div class="table-responsive">                <form name=media_list method=post action='<?php echo $link_pages;?>' onSubmit="return check_checkbox();"> <table class="table table-striped b-t b-light">			 <header class="panel-heading"><ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul></header>                   <thead>                       <tr>                        <th width="20"><input class=checkbox type=checkbox name=chkall id=chkall onclick=docheck(document.media_list.chkall.checked,0) value=checkall></th>                            <th class="th-sortable" data-toggle="class">ID</th>						  <th>Thumb</th>                          <th>Tên Ca Sĩ</th>						   <th>Hot</th>                       </tr>                    </thead>                    <tbody>
<?php 
$arr_singer = $mlivedb->query(" singer_id, singer_name, singer_img, singer_hot  ","singer"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
for($i=0;$i<count($arr_singer);$i++) {
	if($arr_singer[$i][3] == 1) { $status = '<a href="index.php?act=singer&bohot='.$arr_singer[$i][0].'"><button type="button" class="btn btn-xs  btn-default"><i class="fa fa-star text-yellow"></i></button></a>'; }
	else { $status = '<a href="index.php?act=singer&sethot='.$arr_singer[$i][0].'"><button type="button" class="btn btn-xs btn-default"><i class="fa fa-star-o text-yellow"></i></button></a>'; }
if ($arr_singer[$i][2]!="") {	
if (preg_match("/(http|https):\/\/(.*?)$/i", $arr_singer[$i][2]) > 0) {
$img_src = check_img($arr_singer[$i][2]);
} else { $img_src = SITE_LINK.$arr_singer[$i][2]; }
} else { $img_src = check_img($arr_singer[$i][2]); }
?> <tr> <td><input class=checkbox type=checkbox id=checkbox onclick=docheckone() name=checkbox[] value=<?php  echo $arr_singer[$i][0];?>></td>                     <td>#<?php  echo $arr_singer[$i][0];?></td>					 <td><img style="width:40px;height:40px" src="<?php  echo $img_src;?>"></td>                          <td><a href="index.php?act=singer&mode=edit&id=<?php  echo $arr_singer[$i][0];?>" title="Sửa <?php  echo $arr_singer[$i][1];?>"><span class="btn bg-olive "><?php  echo $arr_singer[$i][1];?></span></td>                         <td><?php  echo $status;?></td>						  <td align=right><a href="index.php?act=singer&del_id=<?php  echo en_id($arr_singer[$i][0]);?>" title="Xóa" ><button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></a></td>						</tr>
<?php  } ?></table>                </div>				 <footer class="panel-footer">                  <div class="row">                    <div class="col-sm-4 hidden-xs">               	 <div><select name="selected_option" class="input-sm form-control input-s-sm inline v-middle">         <option value="del">Xóa</option>		<option value="set-hot">Set HOT</option>		<option value="bo-hot">Bỏ HOT</option>
		<option value="set-am">Âu Mỹ</option> </select> <input class="btn btn-sm btn-default" type="submit" name="do" value="Apply"> </div>                        </form>					                      </div>                                    <thead> <ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul>                  </div>                </footer>              </section>            </div><!-- /.col-->         </div></div> </div><!-- ./row -->        </section><!-- /.content -->
<?php 
if ($_POST['do']) {
	$arr = $_POST['checkbox'];
	if (!count($arr)) die('Lỗi');
	if ($_POST['selected_option'] == 'del') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"DELETE FROM table_singer WHERE singer_id IN (".$in_sql.")");
		mss ("Xóa thành công ","index.php?act=list-singer&mode=singer");
	}		
	if ($_POST['selected_option'] == 'hot') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"UPDATE table_singer SET singer_hot = 1 WHERE singer_id IN (".$in_sql.")");
		mss ("Update thành công ","index.php?act=list-singer&mode=singer-hot");
	}			if ($_POST['selected_option'] == 'bohot') {		$in_sql = implode(',',$arr);		mysqli_query($link_music,"UPDATE table_singer SET singer_hot = '' WHERE singer_id IN (".$in_sql.")");		mss ("Update thành công ","index.php?act=list-singer&mode=singer-hot");	}	if ($_POST['selected_option'] == 'set-am') {		$in_sql = implode(',',$arr);		mysqli_query($link_music,"UPDATE table_singer SET singer_type = '2' WHERE singer_id IN (".$in_sql.")");		mss ("Update thành công ","index.php?act=list-singer&mode=singer");	}

	exit();
}
?>