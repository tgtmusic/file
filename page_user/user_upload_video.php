
			<?php 
$list =  substr($fav_video,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$link_s = 'u/'.$user_name.'/user-video';
	// phan trang

	$sql_tt = "SELECT m_id  FROM table_data WHERE m_poster = '".$user_id."' AND m_type = 2 AND m_mempost = 1 ORDER BY m_id DESC LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_viewed, m_img, m_type, m_cat, m_poster, m_time ","data"," m_poster = '".$user_id."' AND m_type = 2 AND m_mempost = 1 ORDER BY m_id DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
		$tong_so_bai_hat=mysqli_query($link_music,"$sql_tt") or die(mysqli_error());
	$bai_hat = mysqli_num_rows($tong_so_bai_hat);
?>  
            <div class="func-title-section all-view">
                    <h1 class="title-section ">Video của <?php  echo $user_name;?></h1>                 
                    <a class="icon-play-all _trackLink" tracking="_frombox=artist_song_playall" title="Xem tất cả"></a>                    
                </div>
<div class="nav-background group">							
                <div class="nav-title">
                    <ul class="nav-ul-title group">									
                        <li><a class="<?php  if($act=='video' || $act=='favorites-video') echo 'active';?>" href="./u/<?=$user_name?>/favorites-video">MV Yêu thích (<?php  if($fav_video == ',') { echo '0';}
						else { echo SoBaiHat(substr(substr($fav_video,1),0,-1)); }?>)</a></li>
                        <li><a class="<?php  if($act=='user-video') echo 'active';?>" href="./u/<?=$user_name?>/user-video">Upload (<?php  echo $bai_hat;?>)</a></li>
                    </ul>
                </div>	
            </div>
			<?php 
  if(!$arr_song) {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
                <div class="clearfix"></div>
<div class="section mt0">  

<?php   
echo '<div>';
for($i=0;$i<count($arr_song);$i++) {
	$video_name = un_htmlchars($arr_song[$i][1]);
	$singer_name = GetSingerName($arr_album[$i][2]);
	$song_url = url_link($video_name.'-'.$singer_name,$arr_song[$i][0],'xem-video');
	$get_singer = GetSinger($arr_song[$i][2]);
$stt2			= $z+1;
			if($i == 0 || $i == 4 || $i == 8 || $i == 12 || $i == 16  || $i == 20 )	{
		$class1[$i]	=	"</div><div class=\"row\">";
		
	}
		elseif($i == 3 || $i == 7 || $i == 11 || $i == 15 || $i == 19)	{
		$class2[$i]	=	"</div><!-- END .row -->";
	}
if($stt2 == 20)	$class	=	'border: none; margin: none;';
		$HTML_BOX	.= "$class1[$i]<div class=\"album-item col-3\">
                        <a title=\"Video $video_name - $singer_name\" href=\"$song_url\" class=\"thumb _trackLink\" tracking=\"_frombox=artist_mv_\">
                            <img width=\"200\" src=\"".check_img($arr_song[$i][4])."\" alt=\"Video $video_name - $singer_name\" class=\"img-responsive\" />
                            <span class=\"icon-circle-play otr\"></span>
                        </a>
                        <h3 class=\"title-item ellipsis\">
                            <a href=\"$song_url\" title=\"Video $video_name - $singer_name\" class=\"txt-primary _trackLink\" tracking=\"_frombox=artist_mv_\">$video_name</a></h3>
                        <div class=\"inblock ellipsis\">
                            <h4 class=\"title-sd-item txt-info\">$get_singer</h4>
                        </div>
                    </div><!-- END .album-item -->";
			
	}
	$HTML_BOX	.= "</div>";
?>
<?php  echo $HTML_BOX;?>
         </div>
<?php }?>
<?php  echo $phantrang; ?>

 </div>
 
 