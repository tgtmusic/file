<?php 
if($mode == 'list-news') {
	$sql_order 	= "news_id ORDER BY news_id DESC";
	$link_pages = "index.php?act=list-news&mode=list-news&";
	$tim = "&mode=list-news";
}
else {
	$sql_order = "news_id ORDER BY news_id DESC";
	$link_pages = "index.php?act=list-news&";
}
if($search) {
	$search 	=  get_ascii($search);
	$sql_where_s 	= "news_title_ascii LIKE '%".$search."%' AND ";
	$link_pages = "index.php?act=list-news".$tim."&search=".$search."&";
}
	$sql_tt = "SELECT news_id  FROM table_news WHERE $sql_where_s $sql_where $sql_order";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
?>

     <section class="content">
          <div class="row">
            <div class="col-md-12">
			                
 <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Danh Sách Tin Tức</h3>
                  <div class="box-tools pull-right">
				   <button type="submit" class="btn btn-info " onclick='window.location.href = "index.php?act=news&mode=add"'>Đăng Bài Mới</button>
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div><!-- /.box-header -->
				<div class="box-body">
                  <div class="row">
                    <div class="col-xs-3">
                  <div class="input-group input-group-sm">
                    <input id="m_id" type="text" value="" placeholder="ID Bài Viết Cần Sửa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=news&mode=edit&id="+document.getElementById("m_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				   <div class="col-xs-4">
                  <div class="input-group input-group-sm">
                    <input id=m_del_id type="text" value="" placeholder="ID Bài Viết Cần Xóa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=news&del_id="+document.getElementById("m_del_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				  	<div class="col-xs-5">
                  <div class="input-group input-group-sm">
                    <input id=search type="text" value="<?php  echo $search;?>" placeholder="Tìm Theo Tên Bài Viết" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-news<?php  echo $tim;?>&search="+document.getElementById("search").value;'><span class="glyphicon glyphicon-search "></span></button>
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
                        <th>Tên Bài Đăng</th>
                        <th>Time post</th>
                      </tr>
                    </thead>
                    <tbody>
					  <?php 
	$arrz = $mlivedb->query(" news_id, news_title, news_title_ascii, news_img,news_time  ","news"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	for($i=0;$i<count($arrz);$i++) {
if ($arrz[$i][3]!="") {	
if (preg_match("/(http|https):\/\/(.*?)$/i", $arrz[$i][3]) > 0) {
$img_src = check_img($arrz[$i][3]);
} else { $img_src = SITE_LINK.$arrz[$i][3]; }
} else { $img_src = check_img($arrz[$i][3]); }
?>
<tr>
<td><input class=checkbox type=checkbox id=checkbox onclick=docheckone() name=checkbox[] value=<?php echo $arrz[$i][0];?>></td>
                    <td>#<?php  echo $arrz[$i][0];?></td>
 <td><img style="width:90px;height:54px" src="<?php  echo $img_src;?>"></td>
 <td><b><a href="index.php?act=news&mode=edit&id=<?php  echo en_id($arrz[$i][0]) ?>" title="Chỉnh Sửa Bài <?php  echo $arrz[$i][1];?>"><span class="btn bg-olive btn-sm margin"><?php  echo $arrz[$i][1];?></span></td>
<td><b><?php  echo GetTIMEDATE($arrz[$i][4]);?></b></td>
<td align=right><b><a href="index.php?act=news&del_id=<?php  echo en_id($arrz[$i][0]);?>" title="Xóa danh mục này" ><button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></a></td>
						</tr>
<?php  } ?>
                  </table>
                </div>
				 <footer class="panel-footer">
                  <div class="row">
                    <div class="col-sm-4 hidden-xs">
               	 <div>
<select name="selected_option" class="input-sm form-control input-s-sm inline v-middle">
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

<?php 
if ($_POST['do']) {
	$arr = $_POST['checkbox'];
	if (!count($arr)) die('Lỗi');
	if ($_POST['selected_option'] == 'del') {
		$in_sql = implode(',',$arr);
		$str = ",".$in_sql.",";
		$sea = ",1,";
		$sea2 = ",2,";
		$posi = strpos($str, $sea);
		$posi2 = strpos($str, $sea2);
		if (is_numeric($posi) || is_numeric($posi2)) mss ("Trong danh sách có ca sĩ không thể xóa ","index.php?act=list-news&mode=list-news");
		else {
		mysqli_query($link_music,"DELETE FROM table_news WHERE news_id IN (".$in_sql.")");
		mss ("Xóa thành công ","index.php?act=list-news&mode=list-news");
		
		}
	}		
	exit();
}
?>