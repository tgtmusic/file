            <div class="func-title-section">
                <h3 class="title-section">Tiểu sử <?php  echo un_htmlchars($arr_singer[0][1]);?></h3>
            </div><!-- END .func-title-section -->
            <div class="clearfix"></div>
			    <?php 
					$singer_info	=	un_htmlchars($arr_singer[0][5]);
					$singer_info	= 	text_tidy($singer_info);
					$singer_type	=	un_htmlchars($arr_singer[0][6]);
					$singer_type	= 	text_tidy($singer_type);
					$singer_tenthat	=	un_htmlchars($arr_singer[0][9]);
					$singer_ngaysinh	=	un_htmlchars($arr_singer[0][10]);
					$singer_quocgia	=	un_htmlchars($arr_singer[0][11]);
					$singer_congty	=	un_htmlchars($arr_singer[0][12]);
					$singer_fanpage	=	un_htmlchars($arr_singer[0][13]);
					$singer_quequan	=	un_htmlchars($arr_singer[0][14]);
					$singer_cat	= GetTheLoai($arr_singer[0][15],'nghe-si');
					if($singer_info) {
					?>   
            <div class="row">    
	          <div class="col-12">
                    <div class="entry">
                        <ul class="hoz-list">
						<?php if($singer_tenthat) { ?>
						<li>Tên thật: <?php  echo $singer_tenthat;?></li><?php } ?>
							<?php if($singer_ngaysinh) { ?>
                            <li>Ngày sinh: <?php  echo $singer_ngaysinh;?></li><?php } ?>
                            <?php if($singer_ngaysinh) { ?>
                            <li>Thể loại: <?php  echo $singer_cat;?></li><?php } ?>
                            <?php if($singer_quocgia) { ?>
                            <li>Quốc Gia: <?php  echo $singer_quocgia;?></li><?php } ?>
							<?php if($singer_quequan) { ?>
							<li>Quê Quán: <?php  echo $singer_quequan;?></li><?php } ?>
							<?php if($singer_congty) { ?>
							<li>Công Ty Đại Diện: <?php  echo $singer_congty;?></li><?php } ?>
							<?php if($singer_fanpage) { ?>
							<li>Fanpage: <?php  echo $singer_fanpage;?></li><?php } ?>
                        </ul>
<br/><br/><br/><br/>
                       <?php  echo $singer_info;?>
					   </div><!-- /.entry -->

                </div><!-- END .col-12 -->
            </div><!-- END .row -->
            <?php  } ?>
        </div>
