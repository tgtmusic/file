        <div class="sidebar fn-sidebar-fixed">

<?php  include("./theme/box/cat_album.php");?>
        </div>
        <!-- END .sidebar -->
        <!--2-->
 <div class="zcontent">

<?php
$cat = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC");
for($z=0;$z<count($cat);$z++) {
	$cat_id = $cat[$z][0];
	$cat_name = un_htmlchars($cat[$z][1]);
	$cat_url = url_link($cat_name,$cat_id,'singer-cat');
	$arr_singer = $mlivedb->query(" singer_id, singer_name, singer_img, singer_type, singer_cat,singer_viewed,singer_like ","singer"," singer_cat LIKE '%,".$cat_id.",%' ORDER BY singer_hot DESC LIMIT 10");
	if ($arr_singer){
?>
			 <h2 class="title-section">
    <a href="<?php echo $cat_url;?>"><?php echo un_htmlchars($cat_name);?> <i class="icon-arrow"></i></a>
</h2>
			  <div class="clearfix"></div>
             <div class="tab-pane">
<?php  
echo '<div>';
for($i=0;$i<count($arr_singer);$i++) {
	$singer_name 	=	un_htmlchars($arr_singer[$i][1]);
	$singer_img = check_img($arr_singer[$i][2]);
	$singer_url = 'nghe-si/'.replace($singer_name);
		if($i == 0 || $i == 5 || $i == 10 || $i == 15 || $i == 20 || $i == 25 || $i == 30 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
	}
?><?php  echo $class1[$i]; ?>
               <div class="pone-of-five">
            <div class="item">
             <span class="thumb"> <a href="<?php echo $singer_url;?>" class="thumb" title="Nghệ sĩ <?=$singer_name?>" >
                   <img src="<?=$singer_img?>" alt="Nghệ sĩ <?=$singer_name?>" /></a>
                    <span class="func-icon">
                     <b class="zicon xicon fn-rmitem none" data-item="#artist<?=en_id($arr_singer[$i][0])?>" title="Xóa"></b>
<div id="Load_SingerA_<?=$arr_singer[$i][0]?>"><a href="javascript:void(0);" onclick="ADDFAV(<?=$arr_singer[$i][0]?>,4);" class="zicon addicon fn-follow" data-id="<?=en_id($arr_singer[$i][0])?>" data-name="<?=$singer_name; ?>" data-type="artist"></a></div>	             
				   </span> 
                </span> 
                <div class="description text-center">
                    <h3 class="title-item fw7"><a href="<?=$singer_url?>" title="Nghệ sĩ <?=$singer_name?>" class="txt-primary"><?=$singer_name?></a></h3>
                    <span class="txt-info"><s ><?=$arr_singer[$i][6]?></s> quan tâm</span>								
                </div><!-- END .description -->
            </div><!-- END .item -->

        </div><!-- END .pone-of-five -->

<?php } echo '</div>'; ?>
</div>
<?php } };?>  

                     </div>
