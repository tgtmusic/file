		<div class="slide fn-slide-show" >	<div id="bigPic">
		 <div class="slide-body non-opacity"> <div class="slide-scroll fn-slide">
		
				<?php 
                    $slider = $mlivedb->query("slider_id, slider_name, slider_link, slider_img","slider"," slider_id ORDER BY slider_id ASC LIMIT 5");
						for($i=0;$i<count($slider);$i++) {
						?>
				<a 
href="<?=$slider[$i][2]?>" target="_self" title="<?=un_htmlchars($slider[$i][1]);?>" >
				<img width="100%" height="274" src="<?=check_img($slider[$i][3])?>" alt="<?=un_htmlchars($slider[$i][1]);?>" ></a>

				<?php  } ?>
			</div></div></div>
			<div 
class="slide-thumb">
			<ul id="thumbs">
	<?php 
                    $slider = $mlivedb->query("slider_id, slider_name, slider_link, slider_img","slider"," slider_id ORDER BY slider_id ASC LIMIT 5");
						for($i=0;$i<count($slider);$i++) {
						?>	
			<li class="dot active" rel="<?=$i+1?>"><img width="124" height="50" 
src="<?=check_img($slider[$i][3])?>" alt="<?=un_htmlchars($slider[$i][1]);?>" /></li>

<?php  } ?>	
			</ul>
		</div>	</div>
<div class="clearfix"></div>
