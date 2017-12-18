<div class="megamenu submenu menu-col-4">
<?php 
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !"); 
$cat = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC");
for($z=0;$z<count($cat);$z++) {
	$cat_url = url_link($cat[$z][1],$cat[$z][0],'album-cat');
?>
<div class="subcol menu-col-1">
<div class="title-menu"><a href="<?=$cat_url;?>"><?=$cat[$z][1];?></a></div>
	        <?php
        $cats1 = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = '".$cat[$z][0]."' ORDER BY cat_order ASC LIMIT 7");
        for($i=0;$i<count($cats1);$i++) {
            $cats1_url = url_link($cats1[$i][1],$cats1[$i][0],'album-cat');
        ?>
<div class="subinner_item">
<ul>
<li>
<a href="<?=$cats1_url;?>"><?=$cats1[$i][1];?></a>
</li>
</ul>
</div>
<?php } ?>
</div>
<?php } ?>
</div>

 