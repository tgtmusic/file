     <section class="content">          <div class="row">            <div class="col-md-7">			                 <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Danh Sách Thể Loại Tin Tức</h3>                  <div class="box-tools pull-right">	<button type="submit" class="btn btn-info " onclick='window.location.href = "index.php?act=cat-news&mode=add"'>Thêm Thể Loại Mới</button>                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">
<?php 
echo "<table width=100% align=center cellpadding=2 cellspacing=2><form method=post>";$cat_news_query = mysqli_query($link_music,"SELECT * FROM table_catnews WHERE (cat_news_sub_id IS NULL OR cat_news_sub_id = 0) ORDER BY cat_news_order ASC");
		while ($cat_news = mysqli_fetch_array($cat_news_query)) {
			echo "<tr align=center><td colspan=2 class=cat_title>".$cat_news['cat_news_title']."</td></tr>";
			$iz = $cat_news['cat_news_order'];
			echo "<tr><td align=center class=fr><input onclick=this.select() type=text name='o".$cat_news['cat_news_id']."' value=$iz size=2 style='text-align:center'></td><td class=fr_2><a href='index.php?act=cat-news&del_id=".$cat_news['cat_news_id']."'>Xóa</a> - <a href='index.php?act=cat-news&mode=edit&id=".$cat_news['cat_news_id']."'><b>".$cat_news['cat_news_name']."</b></a></td></tr>";
			$cat_news_sub_query = mysqli_query($link_music,"SELECT * FROM table_catnews WHERE cat_news_sub_id = '".$cat_news['cat_news_id']."' AND cat_news_sub_id_2 = 0 ORDER BY cat_news_order ASC");
			if (mysqli_num_rows($cat_news_sub_query)) echo "<tr><td class=fr_2>&nbsp;</td><td class=fr><table width=100% cellpadding=2 cellspacing=0 class=border>";
			while ($cat_news_sub = mysqli_fetch_array($cat_news_sub_query)) {
				$s_o = $cat_news_sub['cat_news_order'];
				echo "<tr><td align=center class=fr width=5%><input onclick=this.select() type=text name='o".$cat_news_sub['cat_news_id']."' value=$s_o size=2 style='text-align:center'></td><td class=fr_2 colspan=\"2\"><a href='index.php?act=cat-news&del_id=".$cat_news_sub['cat_news_id']."'>Xóa</a> - <a href='index.php?act=cat-news&mode=edit&id=".$cat_news_sub['cat_news_id']."'><b>".$cat_news_sub['cat_news_name']."</b></a></td></tr>";
						$cat_news_sub_2 = mysqli_query($link_music,"SELECT * FROM table_catnews WHERE cat_news_sub_id != 0 AND cat_news_sub_id_2 = '".$cat_news_sub['cat_news_id']."' ORDER BY cat_news_order ASC");
						while ($cat_news_sub2 = mysqli_fetch_array($cat_news_sub_2)) {
							$s_o_2 = $cat_news_sub2['cat_news_order'];
							echo "<tr><td></td><td align=center class=fr width=5%><input onclick=this.select() type=text name='o".$cat_news_sub2['cat_news_id']."' value=$s_o_2 size=2 style='text-align:center'></td><td class=fr_2><a href='index.php?act=cat-news&del_id=".$cat_news_sub2['cat_news_id']."'>Xóa</a> - <a href='index.php?act=cat-news&mode=edit&id=".$cat_news_sub2['cat_news_id']."'><b>".$cat_news_sub2['cat_news_name']."</b></a></td></tr>";
						}
			}
			if (mysqli_num_rows($cat_news_sub_query)) echo "</table></td></tr>";
		}
echo '<tr><td colspan="2" align="center"><input class="btn btn-primary" type="submit" name="sbm" class=submit value="Sửa thứ tự"></td></tr>';
echo '</form></table>';
if ($_POST['sbm']) {
	$z = array_keys($_POST);
	$q = mysqli_query($link_music,"SELECT cat_news_id FROM table_catnews");
	for ($i=0;$i<mysqli_num_rows($q);$i++) {
		$id = split('o',$z[$i]);
		$od = ${$z[$i]};
		mysqli_query($link_music,"UPDATE table_catnews SET cat_news_order = '$od' WHERE cat_news_id = '".$id[1]."'");
		echo "<script language='JavaScript'>{ window.parent.location='index.php?act=list-cat-news&' }</script>";
	}
}
?>
   </tbody>                    </table>                  </div><!-- /.table-responsive -->                </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content -->