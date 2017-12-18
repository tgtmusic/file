     <section class="content">          <div class="row">            <div class="col-md-7">			                 <div class="box box-info">                <div class="box-header with-border">                  <h3 class="box-title">Thêm/Sửa ADS QUẢNG CÁO</h3>                  <div class="box-tools pull-right">                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>                  </div>                </div><!-- /.box-header -->				<div class="box-body">
<form action="<?php echo $action;?>" method="post" enctype="multipart/form-data"><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên ADS</label><input type="text" class="form-control" id="inputSuccess" name="ten_banner" value="<?php echo $arrz[0][1];?>" placeholder="Nhập Tên ADS." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-link"></i> Liên kết</label><input type="text" class="form-control" id="inputSuccess" name="link_banner" value="<?php echo $arrz[0][4];?>" placeholder="Nhập Liên Kết." />                    </div><div class="form-group has-warning">                      <label class="control-label" for="inputSuccess"><i class="fa fa-picture-o"></i> URL ẢNH</label>					  <input type="file" name="img" > <br/><input type="text" class="form-control" id="inputSuccess" name="img" value="<?php echo $arrz[0][3];?>" placeholder="Nhập URL ẢNH." />                    </div><div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Phân loại</label>
<select class="btn btn-warning dropdown-toggle" name="phan_loai">
	<option value=0<?php  if($arrz[0][5]==0) echo ' selected';?>>Ảnh</option>
    <option value=1<?php  if($arrz[0][5]==1) echo ' selected';?>>Flash</option>
</select> </div>
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Vị trí hiển thị </label>
<select class="btn btn-warning dropdown-toggle" name="vitri">
<option value="top_banner_home"<?php  if($arrz[0][2]=='top_banner_home') echo ' selected';?>>Top banner (Trang chủ) (1006 x auto)</option>
<option value="top_banner_play_mp3"<?php  if($arrz[0][2]=='top_banner_play_mp3') echo ' selected';?>>Top banner (Trang Play Mp3) (1006 x auto)</option>
<option value="top_banner_play_video"<?php  if($arrz[0][2]=='top_banner_play_video') echo ' selected';?>>Top banner (Trang Play Video) (1006 x auto)</option>
<option value="top_banner_play_album"<?php  if($arrz[0][2]=='top_banner_play_album') echo ' selected';?>>Top banner (Trang Play Album) (1006 x auto)</option>
<option value="top_banner_category"<?php  if($arrz[0][2]=='top_banner_category') echo ' selected';?>>Top banner (Trang Thể Loại) (1006 x auto)</option>
<option value="top_banner_search"<?php  if($arrz[0][2]=='top_banner_search') echo ' selected';?>>Top banner (Trang Tìm kiếm) (1006 x auto)</option>
<option value="top_banner_bxh"<?php  if($arrz[0][2]=='top_banner_bxh') echo ' selected';?>>Top banner (Trang Bảng Xếp Hạng) (1006 x auto)</option>
<option value="banner_footer"<?php  if($arrz[0][2]=='banner_footer') echo ' selected';?>>Footer banner (Dưới footer) (1006 x auto)</option>
	<option value="play_mp3"<?php  if($arrz[0][2]=='play_mp3') echo ' selected';?>>Play MP3 (633 x auto)</option>
	<<option value="play_video"<?php  if($arrz[0][2]=='play_video') echo ' selected';?>>Play VIDEO (633 x auto)</option>
	<option value="home_left"<?php  if($arrz[0][2]=='home_left') echo ' selected';?>>Trang chủ - Left(140 x auto)</option>
    <option value="home_center_1"<?php  if($arrz[0][2]=='home_center_1') echo ' selected';?>>Trang chủ - Center 1(485 x auto)</option>
    <option value="home_center_2"<?php  if($arrz[0][2]=='home_center_2') echo ' selected';?>>Trang chủ - Center 2(485 x auto)</option>
    <option value="home_right_1"<?php  if($arrz[0][2]=='home_right_1') echo ' selected';?>>Trang chủ - Right 1(345 x auto)</option>
    <option value="home_right_2"<?php  if($arrz[0][2]=='home_right_2') echo ' selected';?>>Trang chủ - Right 2(345 x auto)</option>
    <option value="play_right"<?php  if($arrz[0][2]=='play_right') echo ' selected';?>>Trang nghe nhạc - Right (345 x auto)</option>
    <option value="the_loai"<?php  if($arrz[0][2]=='the_loai') echo ' selected';?>>Trang Thể loại - Right (345 x auto)</option>
    <option value="tim_kiem"<?php  if($arrz[0][2]=='tim_kiem') echo ' selected';?>>Trang Tìm kiếm - Right (300 x auto)</option>
</select> </div>
<div class="form-group has-success">                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Trạng thái</label>
<select class="btn btn-warning dropdown-toggle" name="status">
	<option value="0"<?php  if($arrz[0][7]==0) echo ' selected';?>>Hiện</option>
    <option value="1"<?php  if($arrz[0][7]==1) echo ' selected';?>>Ẩn</option>
</select>
</div>  <div class="row">
 <div class="col-xs-3 has-warning"> <label class="control-label" for="inputWarning"><i class="fa fa-sort-numeric-asc"></i>  Số thứ tự</label> <input type="text" name="stt" value="<?php echo $arrz[0][6];?>" class="form-control" placeholder="Nhập Số Thứ Tự">                    </div> </div> <center><div class="box-footer">					<input class="btn btn-primary" type="submit" name="submit" value="ĐỒNG Ý">					<input class="btn btn-primary" type="reset" value="NHẬP LẠI">                  </div>				  </center></form></tbody>                    </table>                  </div><!-- /.table-responsive -->                </div><!-- /.box-body -->             </div><!-- /.col-->          </div><!-- ./row -->        </section><!-- /.content -->