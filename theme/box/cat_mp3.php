<ul class="data-list ">
    <li class="active"><h1><a href="the-loai-nhac.html">Nhạc Hot</a></h1></li>
</ul>
<div class="fn-scrollbar">
<?php 
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
$cat = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC");
for($z=0;$z<count($cat);$z++) {
	$cat_url = url_link($cat[$z][1],$cat[$z][0],'the-loai');
?>
<ul class="data-list">
        <li class="<?php  if($cat[$z][0]==$id) echo 'active';?>"><a title="<?=$cat[$z][1];?>" href="<?=$cat_url;?>"><?=$cat[$z][1];?></a>
            <ul>
	        <?php
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = '".$cat[$z][0]."' ORDER BY cat_order ASC");
        for($i=0;$i<count($cats1);$i++) {
            $cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'the-loai');
        ?>
                 <li class="<?php  if($cats1[$i][0]==$id) echo 'active';?>"><a title="<?=$cats1[$i][1];?>" href="<?=$cats1_url;?>"><?=$cats1[$i][1];?></a></li>
<?php } ?>
            </ul>
        </li>

    </ul><?php } ?>
</div>
