<section class="content">          <div class="row">            <div class="col-md-7">			                 <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Danh Sách Thể Loại Media</h3>                  <div class="box-tools pull-right">				  	<button type="submit" class="btn btn-info " onclick='window.location.href = "index.php?act=cat&mode=add"'>Thêm Thể Loại Mới</button>                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">
<?php 
echo "<table width=100% align=center cellpadding=2 cellspacing=2><form method=post>";
	$cat_query = mysqli_query($link_music,"SELECT * FROM table_theloai WHERE (sub_id IS NULL OR sub_id = 0) ORDER BY cat_order ASC");
		while ($cat = mysqli_fetch_array($cat_query)) {
			echo "<tr align=center><td colspan=2 class=cat_title>".$cat['cat_title']."</td></tr>";
			$iz = $cat['cat_order'];
			echo "<tr><td align=center ><input onclick=this.select() type=text name='o".$cat['cat_id']."' value=$iz size=2 style='text-align:center'></td><td class=fr_2><a href='index.php?act=cat&del_id=".$cat['cat_id']."'>Xóa</a> - <a href='index.php?act=cat&mode=edit&id=".$cat['cat_id']."'><b>".$cat['cat_name']."</b></a></td></tr>";
			$sub_query = mysqli_query($link_music,"SELECT * FROM table_theloai WHERE sub_id = '".$cat['cat_id']."' AND sub_id_2 = 0 ORDER BY cat_order ASC");
			if (mysqli_num_rows($sub_query)) echo "<tr><td class=fr_2>&nbsp;</td><td class=fr><table width=100% cellpadding=2 cellspacing=0 class=border>";
			while ($sub = mysqli_fetch_array($sub_query)) {
				$s_o = $sub['cat_order'];
				echo "<tr><td align=center class=fr width=5%><input onclick=this.select() type=text name='o".$sub['cat_id']."' value=$s_o size=2 style='text-align:center'></td><td class=fr_2 colspan=\"2\"><a href='index.php?act=cat&del_id=".$sub['cat_id']."'>Xóa</a> - <a href='index.php?act=cat&mode=edit&id=".$sub['cat_id']."'><b>".$sub['cat_name']."</b></a></td></tr>";
						$sub_2 = mysqli_query($link_music,"SELECT * FROM table_theloai WHERE sub_id != 0 AND sub_id_2 = '".$sub['cat_id']."' ORDER BY cat_order ASC");
						while ($sub2 = mysqli_fetch_array($sub_2)) {
							$s_o_2 = $sub2['cat_order'];
							echo "<tr><td></td><td align=center class=fr width=5%><input onclick=this.select() type=text name='o".$sub2['cat_id']."' value=$s_o_2 size=2 style='text-align:center'></td><td class=fr_2><a href='index.php?act=cat&del_id=".$sub2['cat_id']."'>Xóa</a> - <a href='index.php?act=cat&mode=edit&id=".$sub2['cat_id']."'><b>".$sub2['cat_name']."</b></a></td></tr>";
						}
			}
			if (mysqli_num_rows($sub_query)) echo "</table></td></tr>";
		}
echo '<tr><td colspan="2" align="center"><input type="submit" class="btn btn-primary" name="sbm" class=submit value="Sửa thứ tự"></td></tr>';
echo '</form></table>';
if ($_POST['sbm']) {
	$z = array_keys($_POST);
	$q = mysqli_query($link_music,"SELECT cat_id FROM table_theloai");
	for ($i=0;$i<mysqli_num_rows($q);$i++) {
		$id = split('o',$z[$i]);
		$od = ${$z[$i]};
		mysqli_query($link_music,"UPDATE table_theloai SET cat_order = '$od' WHERE cat_id = '".$id[1]."'");
		echo "<script language='JavaScript'>{ window.parent.location='?act=list-cat&' }</script>";
	}
}
?>
</tbody>                    </table>                  </div><!-- /.table-responsive -->                </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content --> 