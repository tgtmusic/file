<?php
if ($del_id) {
	mysqli_query($link_music,"DELETE FROM table_comment WHERE comment_id = '".$del_id."'");
		mss ("Đã xóa xong ","index.php?act=list-comment&");
}

	$sql_order = "comment_id ORDER BY comment_id DESC";
	$link_pages = "index.php?act=list-comment&";
	$sql_tt = "SELECT comment_id  FROM table_comment WHERE $sql_where $sql_order LIMIT 660";
	$phan_trang = linkPageAdmin($sql_tt,HOME_PER_PAGE,$page,$link_pages."p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
?>     <section class="content">          <div class="row">            <div class="col-md-12">			                <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Danh Sách Bình Luận</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header --><section class="panel panel-default"><tbody> 				<div class="table-responsive">
<form name=media_list method=post action='<?php echo $link_pages;?>' onSubmit="return check_checkbox();">               <table class="table table-striped b-t b-light">			 <header class="panel-heading"><ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul></header>                   <thead>                       <tr>                          <th width="20"><input class=checkbox type=checkbox name=chkall id=chkall onclick=docheck(document.media_list.chkall.checked,0) value=checkall></th>                          <th>ID</th>						  <th>Avatar</th>                          <th>Thành Viên</th>
						  <th>Bình luận</th>                        </tr>                      </thead>                      <tbody>
<?php 
	$arr_cm = $mlivedb->query("  *  ","comment"," $sql_where $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");	for($i=0;$i<count($arr_cm);$i++) {	$avatarcm	=	get_data("user","avatar","userid = '".$arr_cm[$i][2]."'");
?><tr><td><input class=checkbox type=checkbox id=checkbox onclick=docheckone() name=checkbox[] value=<?php echo $arr_cm[$i][0];?>></td> <td>#<?=$arr_cm[$i][0];?></td> <td><img style="width:40px;height:40px" src="<?=check_avt($avatarcm);?>"></td> <td><span class="btn btn-xs btn-success"><?=get_user($arr_cm[$i][2]);?></span></td> 	 <td><span class="btn btn-sm btn-info"><?=text_tidy($arr_cm[$i][3]);?></span></td>	 <td align=right> <a href="index.php?act=list-comment&del_id=<?=$arr_cm[$i][0];?>" title="Xóa bình luận này" ><button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button></a></td></tr>
<?php  } ?></table>                </div>				 <footer class="panel-footer">                  <div class="row">                    <div class="col-sm-4 hidden-xs">               	 <div><select name="selected_option" class="input-sm form-control input-s-sm inline v-middle"><option value="del">Xóa</option>  </select> <input class="btn btn-sm btn-default" type="submit" name="do" value="Apply"> </div>                        </form>					                      </div>                                    <thead> <ul class="pagination pagination-sm no-margin pull-right"><?php  echo $phan_trang;?></ul>                  </div>                </footer>              </section>            </div><!-- /.col-->         </div></div> </div><!-- ./row -->        </section><!-- /.content -->
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
		if (is_numeric($posi) || is_numeric($posi2)) mss ("Trong danh sách có bl không thể xóa ","index.php?act=list-comment&");
		else {
		mysqli_query($link_music,"DELETE FROM table_comment WHERE comment_id IN (".$in_sql.")");
		mss ("Xóa thành công ","index.php?act=list-comment&");
		
		}
	}		
	exit();
}
?>