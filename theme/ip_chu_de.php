			<div class="widget widget-link-list">
			<h3 class="title-section sz-title-sm">Chủ Đề Hot <i class="icon-arrow"></i></h3>
			<div id="topic-hot" class="widget widget-cate"> 
			<ul class="clearfix"> 
			<?php
            $arr = $mlivedb->query(" * ","topic"," topic_hot = 1 ORDER BY topic_id ASC LIMIT 5");
            for($z=0;$z<count($arr);$z++) {
				$chude_url = url_link(un_htmlchars($arr[$z][1]),$arr[$z][0],'chu-de');
            ?>
			<li> <a href="<?php echo $chude_url;?>" title="<?php echo un_htmlchars($arr[$z][1]);?>" class="_trackLink" tracking="_frombox=home_topic_1"> 
 <img src="<?php echo check_img($arr[$z][7]);?>" class="img-responsive" alt="<?php echo un_htmlchars($arr[$z][1]);?>"> </a> 
 </li>  
			<?php } ?>
			</ul>
			</div> 
  <a class="view-more" title="Xem thêm Chủ Đề khác" href="./chu-de">Xem thêm Chủ Đề khác</a> <div class="clearfix"></div></div>
			
