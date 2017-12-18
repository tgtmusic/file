<?php 
if ($mode = 'list-user'){
	$sql_where = " userid ";
	$sql_order = " ORDER BY userid DESC";
	$link_pages = "index.php?act=list-user&mode=list-user&";
	$tim = "&mode=list-user";
}
else {
	$sql_order = "userid ORDER BY userid DESC";
	$link_pages = "index.php?act=list-user&";
}
	if($search) {
	$search 	=  get_ascii($search);
	$sql_where_s 	= "username LIKE '%".$search."%' AND ";
	$link_pages = "index.php?act=list-user".$tim."&mode=search=".$search."&";
}
	$sql_tt = "SELECT userid  FROM table_user WHERE $sql_where_s $sql_where $sql_order LIMIT 660";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
?>      <section class="content">          <div class="row">            <div class="col-md-12">			                <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Danh Sách Thành Viên</h3>                  <div class="box-tools pull-right">				  <button type="submit" class="btn btn-info " onclick='window.location.href = "index.php?act=user&mode=add"'>Thêm Thành Viên</button>                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                 </div>                </div><!-- /.box-header -->
								<div class="box-body">
                  <div class="row">
                    <div class="col-xs-3">
                  <div class="input-group input-group-sm">
                    <input id="m_id" type="text" value="" placeholder="ID Member Cần Sửa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=user&mode=edit&id="+document.getElementById("m_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				   <div class="col-xs-4">
                  <div class="input-group input-group-sm">
                    <input id=m_del_id type="text" value="" placeholder="ID Member Cần Xóa" class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=user&del_id="+document.getElementById("m_del_id").value;'><span class="glyphicon glyphicon-search "></span></button>
                    </span>
                  </div></div>
				  	<div class="col-xs-5">
                  <div class="input-group input-group-sm">
                    <input id=search type="text" value="<?php  echo $search;?>" placeholder="Tìm Theo Tên Member " class="form-control">
                    <span class="input-group-btn">
                      <button class="btn btn-info btn-flat" type="button" onclick='window.location.href = "index.php?act=list-user<?php  echo $tim;?>&search="+document.getElementById("search").value;'><span class="glyphicon glyphicon-search "></span></button>
                 </span>
                  </div></div>
				  </div>
                 </div><div class="box-body">	 <section class="panel panel-default"><div class="table-responsive">				<form name="media_list" method=post action='<?php echo $link_pages;?>' onSubmit="return check_checkbox();">                  <table class="table table-striped b-t b-light">                    <thead>  <ul class="pagination pagination-sm m-t-none m-b-none">                      <?php  echo $phan_trang;?>                      </ul>                      <tr>      <!--<th width="20"><input class=checkbox type=checkbox name=chkall id=chkall onclick=docheck(document.media_list.chkall.checked,0) value=checkall></th>-->                <th class="th-sortable" data-toggle="class">ID</th>						<th>Avatrar</th>                        <th>Username</th>                        <th>Chức vụ</th>                        <th>Media</th>                <th>Fb ID Email</th>
                        <th>Ngày Đăng ký</th>                      </tr>                    </thead>                    <tbody>		
<?php 	$arr_user = $mlivedb->query("  *  ","user"," $sql_where_s $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");	for($i=0;$i<count($arr_user);$i++) {
	if($arr_user[$i][5] == 3) $mod = '<font color="red"><b>Administrator</b></font>';
	else	$mod = '<b>Thành Viên</b>';
		if($arr_user[$i][5] == 3) $user_name = '<font color="red"><b>'.$arr_user[$i][1].'</b></font>';
	else	$user_name = '<font color="black"><b><b>'.$arr_user[$i][1].'</b></font>';

	$t_upload=mysqli_query($link_music,"SELECT m_id  FROM table_data WHERE m_poster = ".$arr_user[$i][0]."") or die(mysqli_error());
	$tong_upload = mysqli_num_rows($t_upload);
?>	<tr>				<!--<td><input class=checkbox type=checkbox id=checkbox onclick=docheckone() name=checkbox[] value=<?php  echo $arr_user[$i][0];?>></td>-->				<td>#<?php  echo $arr_user[$i][0];?></td>				<td><img style="width:30px;height:30px" src="<?php  echo check_img($arr_user[$i][7]);?>"></td> 				<td><a href='index.php?act=user&mode=edit&id=<?php  echo $arr_user[$i][0];?>'><b><?php  echo $user_name;?></b></a></td>				<td><?php  echo $mod;?></td>				<td><?php  echo $tong_upload;?></td>
				<td><?php  echo $arr_user[$i][3];?></td>				<td><?php  echo date('d-m-Y',$arr_user[$i][9]);?></td>				<td align=right><a href="index.php?act=user&del_id=<?php  echo $arr_user[$i][0];?>" title="Xóa" ><button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></a></td>				</tr>
<?php  } ?>                  </table>                </div> <footer class="panel-footer"> <div><select name="selected_option" class="input-sm form-control input-s-sm inline v-middle">  <option value="del">Xóa</option> </select> <input class="btn btn-sm btn-default" type="submit" name="do" value="Apply">			                   </form>					                      </div>                                       <div class="col-sm-4 text-right text-center-xs">                                      <ul class="pagination pagination-sm m-t-none m-b-none">                      <?php  echo $phan_trang;?>                      </ul>                    </div>                  </div>                </footer>              </section>	              </div><!-- /.col-->         </div></div> </div><!-- ./row -->        </section><!-- /.content -->
<?php 
if ($_POST['do']) {
	$arr = $_POST['checkbox'];
	if (!count($arr)) die('Lỗi');
	if ($_POST['selected_option'] == 'del') {
		$in_sql = implode(',',$arr);
		mysqli_query($link_music,"DELETE FROM table_user WHERE userid IN (".$in_sql.")");
		mss ("Xóa thành công ","index.php?act=list-user");
	}		
	exit();
}
?>