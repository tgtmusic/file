<?php
$link_s = 'u/'.$user_name.'/user-playlist';
	$sql_tt = "SELECT album_id  FROM table_album WHERE album_poster = '".$user_id."' AND album_type = 1 ORDER BY album_id DESC LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_album = $mlivedb->query("album_id, album_name, album_singer, album_viewed, album_img, album_type, album_cat, album_poster, album_time, album_song, album_info","album"," album_poster = '".$user_id."' AND album_type = 1 ORDER BY album_id DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
		$tong_so_bai_hat=mysqli_query($link_music,"$sql_tt") or die(mysqli_error());
	$bai_hat = mysqli_num_rows($tong_so_bai_hat);
			?>    

<h2 class="title-section ellipsis">Playlist của <?php  echo $user_name;?></h2>
<div class="nav-background group">							
                <div class="nav-title">
                    <ul class="nav-ul-title group">									
                        <li><a class="<?php  if($act=='playlist' || $act=='favorites-playlist') echo 'active';?>" href="./u/<?=$user_name?>/favorites-playlist">Playlist yêu thích (<?php  if($fav_album == ',') { echo '0';}
						else { echo  SoBaiHat(substr(substr($fav_album,1),0,-1)); }?>)</a></li>
                        <li><a class="<?php  if($act=='user-playlist') echo 'active';?>" href="./u/<?=$user_name?>/user-playlist">Playlist cá nhân (<?php  echo $bai_hat;?>)</a></li>
                    </ul>
                </div>	
            </div>
			<?php 
  if(!$arr_album) {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
                <div class="clearfix"></div>
<div class="section mt0">  
<?php  
echo '<div>';
for($i=0;$i<count($arr_album);$i++) {
	$album_name = un_htmlchars($arr_album[$i][1]);
	$singer_name = GetSingerName($arr_album[$i][2]);
	$album_url = url_link($album_name."-".$singer_name,$arr_album[$i][0],'nghe-album');
	$get_singer = GetSinger($arr_album[$i][2]);
$stt2			= $z+1;
			if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16  || $i == 20 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
		elseif($i == 3 || $i == 7 || $i == 11 || $i == 15 || $i == 19)	{
		$class2[$i]	=	"</div><!-- END .row -->";
	}
if($stt2 == 20)	$class	=	'border: none; margin: none;';
		$HTML_BOX	.= "$class1[$i]<div class=\"album-item otr des-inside col-3\">
                        <a title=\"Album $album_name - $singer_name\" href=\"$album_url\" class=\"thumb _trackLink\" tracking=\"_frombox=artist_album_0\">
                            <img width=\"200\" src=\"".check_img($arr_album[$i][4])."\" alt=\"Album $album_name - $singer_name\" class=\"img-responsive\" />
                            <span class=\"icon-circle-play\"></span>
                            <div class=\"des\">
                                <h3 class=\"title-item txt-primary ellipsis\">$album_name</h3>
                                <div class=\"inblock ellipsis\">
                                    <h4 class=\"title-sd-item txt-info\">$singer_name</h4>
                                   <h4 class=\"title-sd-item txt-info\">Lượt xem: ".$arr_album[$i][3]."</h4>                             
                                </div>
                            </div>
                            <span class=\"item-mask\"></span>
                        </a>
                        <span class=\"\"></span>
                    </div>";
			
	}
	$HTML_BOX	.= "</div>";
?>
<?php  echo $HTML_BOX;?>
            </div>
			<?php }?>
<?php  echo $phantrang; ?>

 </div>
 