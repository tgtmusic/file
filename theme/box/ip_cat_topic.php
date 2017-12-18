<div class="megamenu submenu menu-col-4">
<?php 
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
$topic = $mlivedb->query("topic_id, topic_name","topic"," topic_sub = 0 ORDER BY topic_order ASC");
for($z=0;$z<count($topic);$z++) {
	$topic_url = url_link(un_htmlchars($topic[$z][1]),$topic[$z][0],'chu-de');
?>
<div class="subcol menu-col-1">
<div class="title-menu"><a href="<?=$topic_url;?>"><?=un_htmlchars($topic[$z][1]);?></a></div>
	        <?php
        $topic1 = $mlivedb->query("topic_id, topic_name2","topic"," topic_sub = '".$topic[$z][0]."' ORDER BY topic_order ASC LIMIT 5");
        for($i=0;$i<count($topic1);$i++) {
            $topic1_url = url_link(un_htmlchars($topic1[$i][1]),$topic1[$i][0],'chu-de');
        ?>
<div class="subinner_item">
<ul>
<li>
<a href="<?=$topic1_url;?>"><?=un_htmlchars($topic1[$i][1]);?></a>
</li>
</ul>
</div>
<?php } ?>
</div>
<?php } ?>
</div>

 