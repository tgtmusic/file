<?php 

if($mode == 'album') {
	$sql_where = "charts_type = 2";
	$sql_order = "ORDER BY charts_id DESC";
	$link_pages = "index.php?act=list-bxh&mode=album&";
	$tim = "&mode=album";
}
elseif($mode == 'social') {
	$sql_where = "charts_type = 4";
	$sql_order = "ORDER BY charts_id DESC";
	$link_pages = "index.php?act=list-bxh&mode=social&";
	$tim = "&mode=social";
}
elseif($mode == 'video') {
	$sql_where = "charts_type = 3";
	$sql_order = "ORDER BY charts_id DESC";
	$link_pages = "index.php?act=list-bxh&mode=video&";
	$tim = "&mode=video";
}
elseif($mode == 'songs') {
	$sql_where = "charts_type = 1";
	$sql_order = "ORDER BY charts_id DESC";
	$link_pages = "index.php?act=list-bxh&mode=songs&";
	$tim = "&mode=songs";
}
else {
	$sql_order = "charts_id ORDER BY charts_id DESC";
	$link_pages = "index.php?act=list-bxh&";
}
if($search) {
	$sql_where_s = "charts_name_ascii LIKE '%".$search."%' AND ";
	$link_pages = "index.php?act=list-bxh".$tim."&search=".$search."&";
}
	$sql_tt = "SELECT charts_id  FROM table_charts WHERE $sql_where_s $sql_where $sql_order LIMIT 660";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
	echo $sql_where_s .$sql_where;
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
                    <input id="m_id" type="text" value="" placeholder="ID BXH Cần Sửa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=bxh&mode=edit&id="+document.getElementById("m_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				   <div class="col-xs-4">
                  <div class="input-group input-group-sm">
                    <input id=m_del_id type="text" value="" placeholder="ID BXH Cần Xóa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=bxh&del_id="+document.getElementById("m_del_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				  	<div class="col-xs-5">
                  <div class="input-group input-group-sm">
                    <input id=search type="text" value="<?php  echo $search;?>" placeholder="Tìm Theo Tên BXH" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-bxh<?php echo $tim;?>&search="+document.getElementById("search").value;'><span class="glyphicon glyphicon-search "></span></button>
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

                        <th class="th-sortable" data-toggle="class">ID</th>
                        <th>Type</th>
                        <th>Tên</th>
                        <th>Thể Loại</th>
						<th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
			<?php 
	$arr_bxh = $mlivedb->query(" * ","charts"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	for($i=0;$i<count($arr_bxh);$i++) {
	if($arr_bxh[$i][6] == 3) $status = '<i style="color:red;" class="fa fa-youtube-play"></i>';
	elseif($arr_bxh[$i][6] == 2) $status = '<i style="color:green;" class="fa fa-list"></i>';
	elseif($arr_bxh[$i][6] == 1) $status = '<i style="color:#3399FF;" class="fa fa-music"></i>';
	elseif($arr_bxh[$i][6] == 4) $status = '<i style="color:#660099;" class="fa fa-users"></i>';
	if($arr_bxh[$i][5] == 3) $tl = 'Châu Á';
	elseif($arr_bxh[$i][5] == 2) $tl = 'Âu Mỹ';
	elseif($arr_bxh[$i][5] == 1) $tl = 'Việt Nam';

?><tr>
                            <td>#<?php  echo $arr_bxh[$i][0];?></td>
							 <td><?php  echo $status;?></td>
							<td><b><a href="index.php?act=bxh&mode=edit&id=<?php  echo $arr_bxh[$i][0];?>" title="Sửa BXH <?php  echo un_htmlchars($arr_bxh[$i][1]);?>"><?php  echo $arr_bxh[$i][1];?></a></b></td>
							<td><b><?php  echo $tl;?></b></td>
							<td><b><?php  echo $arr_bxh[$i][10];?></b></td>
                                            </tr>
<?php  } ?>

                  </table>
                </div>
				 <footer class="panel-footer">
                  <div class="row">
                    <div class="col-sm-4 hidden-xs">
    
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
