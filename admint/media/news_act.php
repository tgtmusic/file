
     <section class="content">
          <div class="row">
            <div class="col-md-12">

              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Tin Tức - <small>Đăng Bài Viết Mới </small></h3>
                  <!-- tools box -->
                  <div class="pull-right box-tools">
                    <button class="btn btn-default btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-default btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>
                  </div><!-- /. tools -->
                </div><!-- /.box-header -->
                <div class="box-body pad">
 
               
                <form action="<?=$action;?>" method="post" enctype="multipart/form-data">

<button type="submit" name="submit" class="btn btn-info pull-right">ĐỒNG Ý</button>
<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Tên Bài Viết</label>
					  <input type="text" name="name" placeholder="Nhập Tên Bài Viết" value="<?php  echo $arrz[0][1];?>" class="form-control" id="inputSuccess">
					  </div>
	<div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Thể loại</label><br/>
				<?=acp_news_cat($arrz[0][3]);?>
                  </div><br/><br/><br/><br/><br/><br/>
	    <div class="form-group has-success">
                      <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>HÌNH ẢNH Bài Viết</label>
                    
                    <span class="input-group-addon"><input type="file" name="img" > <?php echo $arrz[0][6];?></span>
                 
				  </div>
	   <div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-danger"><i class="fa fa-picture-o"></i></button>
                    </div><!-- /btn-group -->
               <input name="img" type="text" placeholder="Nhập Link Ảnh Bài Viết" value="<?php echo $arrz[0][6];?>" class="form-control">
			</div><!-- /input-group --><br/>
				 <div class="form-group has-warning">
                     <label class="control-label" for="inputWarning"><i class="fa fa-bell-o"></i> Giới Thiệu Bài Viết Ngắn:</label>
			<textarea class="form-control" rows="3" placeholder="Giới Thiệu Bài Đăng ..." name="info"><?=un_htmlchars($arrz[0][5]);?></textarea>
                    </div>
               <div class="form-group has-warning">
                     <label class="control-label" for="inputWarning"><i class="fa fa-bell-o"></i>Nội Dung Bài Đăng:</label>
				<textarea class="ckeditor" name="infofull" id="infofull" rows="10" cols="80"><?=un_htmlchars($arrz[0][4]);?></textarea>
				</div>
		

		<div class="box-footer">
                    <button type="submit" name="submit" class="btn btn-primary">ĐỒNG Ý</button>
					<button type="submit" type="reset" class="btn btn-default">Nhập Lại</button>

                  </div>
	
   </form>
                </div>
              </div>
            </div><!-- /.col-->
          </div><!-- ./row -->
        </section><!-- /.content -->
