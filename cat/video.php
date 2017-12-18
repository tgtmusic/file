        <div class="sidebar fn-sidebar-fixed">
<?php  include("./theme/box/cat_video.php");?>
        </div>
        <!-- END .sidebar -->
        <!--2-->
 <div class="zcontent">

<?php
$cat = $mlivedb->query("cat_id, cat_name","theloai"," sub_id = 0 ORDER BY cat_order ASC");
for($z=0;$z<count($cat);$z++) {
	$cat_id = $cat[$z][0];
	$cat_name = un_htmlchars($cat[$z][1]);
	$cat_url = url_link($cat_name,$cat_id,'video-cat');
	$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_viewed ,m_time, m_img, m_hot, m_new ","data","  m_cat LIKE '%,".$cat_id.",%'  AND m_type = 2  ORDER BY m_id DESC LIMIT 8");
	if ($arr_song){

?>
			 <h2 class="title-section">
    <a href="<?php echo $cat_url;?>"><?php echo un_htmlchars($cat_name);?> <i class="icon-arrow"></i></a>
</h2>
			  <div class="clearfix"></div>
            <div class="tab-pane">
<?php 
echo "<div>";
for($i=0;$i<count($arr_song);$i++) {
	$singer_name 	=	GetSingerName($arr_song[$i][2]);
	$get_singer = GetSinger($arr_song[$i][2]);
	$type = check_type($arr_song[$i][5],$arr_song[$i][0]);
	$video_url = url_link(un_htmlchars($arr_song[$i][1])."-".$singer_name,$arr_song[$i][0],'xem-video');
	$download = 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');
	if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
	if ($arr_song[$i][6] == '1') {
		$status_song = '<span class="badge hot" style="display:block;"></span>';
	}
	elseif ($arr_song[$i][7] == '1') {
		$status_song = '<span class="badge new"></span>'; 
	}
	else { $status_song = ''; }
?>
					<?php  echo $class1[$i]; ?>
<div class="pone-of-four">
            <div class="item">
                <a href="<?php  echo $video_url; ?>" class="thumb" title="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>"> 
                    <img src="<?php  echo check_img($arr_song[$i][5]); ?>" width="182px" height="102px" alt="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" /> 
                    <span class="icon-circle-play otr"></span> 
                </a> 
                <div class="description">
                    <h3 class="title-item ellipsis">
                        <a href="<?php  echo $video_url; ?>" title="<?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo un_htmlchars($singer_name); ?>" class="txt-primary"><?php  echo un_htmlchars($arr_song[$i][1]); ?></a>
                    </h3>
                    <div class="inblock ellipsis">
                        
                        <h4 class="title-sd-item">
                           <span class="txt-info"><?=$get_singer?></span>
                        </h4>
                    </div>
                </div>
<?php echo $status_song;?>
            </div>
        </div>
<?php	} ?>
      </div></div>
<?php	} } ;?>  
                     </div>
