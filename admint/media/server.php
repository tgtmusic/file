  <section class="content">          <div class="row">            <!-- left column -->           
<?php 
$q = mysqli_query($link_music,"SELECT * FROM table_local ORDER BY local_id ASC");
$total = mysqli_num_rows(mysqli_query($link_music,"SELECT local_id  FROM table_local"));
if (!$_POST['submit']) {
    ?> <form method="post">
        <?php  $i = 1;
        while ($r = mysqli_fetch_array($q)) { 
        ?>		 <div class="col-md-6">		<div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Quản Lý Server <?=$i?></h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header --><div class="box-body">		<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Link <?=$i?></label>                      <input type="text" name="local_link_[<?=$r['local_id']?>]" class="form-control" id="inputSuccess" value="<?=$r['local_link']?>" placeholder="Nhập Link Chứa Nhạc ..." />                    </div>
<div class="form-group has-warning">                      <label class="control-label" for="inputSuccess"><i class="fa fa-folder"></i> Folder chứa nhạc <?=$i?></label>                      <input type="text" name="local_folder_[<?=$r['local_id']?>]" placeholder="Nhập Folder chứa nhạc ..." value="<?=$r['local_folder']?>" class="form-control" id="inputSuccess" />                    </div>
<div class="form-group has-error">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> FTP <?=$i?></label>                      <input type="text" name="local_ftp_[<?=$r['local_id']?>]" placeholder="Nhập Địa Chỉ FTP ..." value="<?=$r['local_ftp']?>" class="form-control" id="inputSuccess" />                    </div>
<div class="form-group has-warning">                      <label class="control-label" for="inputSuccess"><i class="fa fa-user"></i> Tài khoản FTP <?=$i?></label>                      <input type="text" name="local_user_[<?=$r['local_id']?>]" placeholder="Nhập Tài khoản FTP ..." value="<?=$r['local_user']?>" class="form-control" id="inputSuccess" />                    </div><div class="form-group">                      <label class="control-label" for="inputSuccess"><i class="fa fa-lock"></i> Mật khẩu FTP <?=$i?></label>                      <input type="text" name="local_pass_[<?=$r['local_id']?>]" placeholder="Nhập Mật khẩu FTP ..." value="<?=$r['local_pass']?>" class="form-control" id="inputSuccess" />                    </div> </div> </div> </div><!-- /.col-->
		<?php  $i++; } ?><center>
        <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tổng Số Server </label>		<input size=4 name="local_total" value="<?=$total?>" onClick="this.select()">		<td class=fr><input class="btn btn-primary" type="submit" value="ĐỒNG Ý" name=submit ></td></center></form>
            </div><!-- ./row -->        </section><!-- /.content -->
    <?php 
    }
    else {
        $i = 1;    
        while ($r = mysqli_fetch_array($q)) {
            $id[$i] = $r['local_id'];
            $i++;
            if ($r['local_folder'] != $local_folder_[$r['local_id']]) {
                mysqli_query($link_music,"UPDATE table_local SET local_folder = '".$local_folder_[$r['local_id']]."' WHERE local_id IN (".$r['local_id'].")");
            }
            if ($r['local_link'] != $local_link_[$r['local_id']]) {
                mysqli_query($link_music,"UPDATE table_local SET local_link = '".$local_link_[$r['local_id']]."' WHERE local_id IN (".$r['local_id'].")");
            }
            if ($r['local_user'] != $local_user_[$r['local_id']]) {
                mysqli_query($link_music,"UPDATE table_local SET local_user = '".$local_user_[$r['local_id']]."' WHERE local_id IN (".$r['local_id'].")");
            }
            if ($r['local_pass'] != $local_pass_[$r['local_id']]) {
                mysqli_query($link_music,"UPDATE table_local SET local_pass = '".$local_pass_[$r['local_id']]."' WHERE local_id IN (".$r['local_id'].")");
            }
            if ($r['local_ftp'] != $local_ftp_[$r['local_id']]) {
                mysqli_query($link_music,"UPDATE table_local SET local_ftp = '".$local_ftp_[$r['local_id']]."' WHERE local_id IN (".$r['local_id'].")");
            }
		}
        if ($local_total > $total) {
            for ($i=$total+1; $i<=$local_total; $i++) {
                mysqli_query($link_music,"INSERT INTO table_local (local_folder, local_link, local_user, local_pass, local_ftp) VALUES ('','','','','')");
            }
        }
        elseif ($local_total < $total) {
            for ($i=$local_total+1; $i<=$total; $i++) {
                natsort($id);
                mysqli_query($link_music,"DELETE FROM table_local WHERE local_id IN (".$id[$i].")");
            }
        }
        echo "Đã sửa xong !<meta http-equiv='refresh' content='0;url=$link'>";
    }
?> 