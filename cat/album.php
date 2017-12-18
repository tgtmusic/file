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
	$cat_url = url_link($cat_name,$cat_id,'album-cat');
	$arr_album = $mlivedb->query(" album_id, album_name, album_singer, album_viewed, album_img, album_type, album_cat, album_poster, album_time, album_song,album_hot,album_new ","album"," album_cat LIKE '%,".$cat_id.",%' AND album_type = '0'  ORDER BY album_id DESC LIMIT 8");
	if ($arr_album){
?>
			 <h2 class="title-section">
      <a href="<?php echo $cat_url;?>"><?php echo un_htmlchars($cat_name);?> <i class="icon-arrow"></i></a>
</h2>
			  <div class="clearfix"></div>
            <div class="tab-pane">
<?php 
echo "<div>";
for($i=0;$i<count($arr_album);$i++) {
	$singer_name 	=	GetSingerName($arr_album[$i][2]);
	$get_singer = GetSinger($arr_album[$i][2]);
	$user_name = get_user($arr_album[$i][7]);
	$album_url = url_link(un_htmlchars($arr_album[$i][1]).'-'.$singer_name,$arr_album[$i][0],'nghe-album');
	$user_url = url_link($user_name,$arr_album[$i][7],'user');
		if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
	if ($arr_album[$i][10] == '1') {
		$status_album = '<span class="badge hot" style="display:block;"></span>';
	}
	elseif ($arr_album[$i][11] == '1') {
		$status_album = '<span class="badge new"></span>'; 
	}
	else { $status_album = ''; }
?>
					<?php  echo $class1[$i]; ?>
        <div class="pone-of-four">
            <div class="item">
                <a href="<?php  echo $album_url; ?>" class="thumb" title="Album <?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>"> 
                    <img width="200" class="img-responsive" src="<?php  echo check_img($arr_album[$i][4]);?>" alt="<?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" /> 
                    <span class="icon-circle-play otr"></span> 
                </a> 
                <div class="description">
                    <h3 class="title-item ellipsis">
                        <a href="<?php  echo $album_url; ?>" title="Album <?php  echo un_htmlchars($arr_album[$i][1]); ?> - <?php  echo un_htmlchars($singer_name);?>" class="txt-primary"><?php  echo un_htmlchars($arr_album[$i][1]); ?></a>
                    </h3>
                    <div class="inblock ellipsis">
                        <h4 class="title-sd-item">
                            <span class="txt-info"><?=$get_singer?></span>
                        </h4>
                    </div>
                </div>

               <?php echo $status_album;?>
                
            </div>
        </div>
<?php	} ?>
      </div></div>
<?php	} } ;?>  

                     </div>
