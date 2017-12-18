
			<?php 
$list =  substr($fav_song,1); // Cắt chuối con từ vị trí 1 đến hết chuỗi
$list = substr($list,0,-1); //Cắt từ vị trí số 6 đếm từ cuối chuỗi đến hết chuỗi
$link_s = 'u/'.$user_name.'/upload';
	// phan trang

	$sql_tt = "SELECT m_id  FROM table_data WHERE m_poster = '".$user_id."' AND m_type = 1 AND m_mempost = 1 ORDER BY m_id DESC LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_viewed, m_img, m_type, m_cat, m_poster, m_time ","data"," m_poster = '".$user_id."' AND m_type = 1 AND m_mempost = 1 ORDER BY m_id DESC LIMIT ".$rStar .",". HOME_PER_PAGE,"");
	$tong_so_bai_hat=mysqli_query($link_music,"$sql_tt") or die(mysqli_error());
	$bai_hat = mysqli_num_rows($tong_so_bai_hat);
			?>
            <div class="section mt0">
            <div class="func-title-section all-view">
                    <h1 class="title-section ">Bài hát của <?php  echo $user_name;?></h1>                 
                    <a class="icon-play-all _trackLink" tracking="_frombox=artist_song_playall" title="Xem tất cả"></a>                    
                </div>
<div class="nav-background group">							
                            <div class="nav-title">
                                <ul class="nav-ul-title group">									
                                    <li><a class="<?php  if($act=='bai-hat' || $act=='favorites-song') echo 'active';?>" href="./u/<?=$user_name?>/favorites-song">Yêu thích (<?php  if($fav_song == ',') { echo '0';}
						else { echo SoBaiHat(substr(substr($fav_song,1),0,-1)); }?>)</a></li>
                                    <li><a class="<?php  if($act=='upload') echo 'active';?>" href="./u/<?=$user_name?>/upload">Upload (<?php  echo $bai_hat;?>)</a></li>                                    
                                </ul>
                            </div>	
                        </div>
<?php 
  if(!$arr_song) {
	echo '<div class="section-empty"><p>Chuyên mục đang được cập nhật</p></div>';	
}else { ?>
                <div class="clearfix"></div>

                <div class="row">
                    <div class="col-12">
                        <div class="list-item full-width">
<ul>
<?php 
for($i=0;$i<count($arr_song);$i++) {
$singer_name = GetSingerName($arr_song[$i][2]);
$get_singer = GetSinger($arr_song[$i][2]);
	$type = check_type($arr_song[$i][5],$arr_song[$i][0]);
	$song_url = url_link(un_htmlchars($arr_song[$i][1])."-".$singer_name,$arr_song[$i][0],'nghe-bai-hat');
	$download = 'down.php?id='.$arr_song[$i][0].'&key='.md5($arr_song[$i][0].'tgt_music');
?>
	<li id="song<?php  echo en_id($arr_song[$i][0]); ?>" class="group fn-song" data-type="song" data-id="<?php  echo en_id($arr_song[$i][0]); ?>" data-code="knxHTkHsSkbVJVStZbJyFnkn" data-active="show-tool">
                                    <div class="info-dp pull-left">
                                        <h3 class="txt-primary ellipsis">
                                            <a href="<?php  echo $song_url; ?>" title="Bài Hát <?php  echo un_htmlchars($arr_song[$i][1]); ?> - <?php  echo $singer_name; ?>" class="_trackLink" tracking="_frombox=artist_all_song_">
                                                <?php  echo un_htmlchars($arr_song[$i][1]); ?> - <span><?=$singer_name?></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="bar-chart">
                                        <span class="fn-bar" style="width:<?php  echo $arr_song[$i][3]/50; ?>%;"></span>
                                    </div>
                                    <div class="tool-song">
                                        <div class="i25 i-small download">
                                            <a title="Tải về" class="fn-dlsong" data-item="#song<?php  echo en_id($arr_song[$i][0]); ?>" href="<?php  echo $download;?>"></a>
                                        </div>
<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?=$arr_song[$i][0]?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?=$arr_song[$i][0]?>);"></a></div>
<!-- End playlist ADD -->
                                        <div class="i25 i-small share">
                                            <a title="Chia sẻ" class="fn-share" data-item="#song<?php  echo en_id($arr_song[$i][0]); ?>" href="<?php  echo $song_url; ?>"></a>
                                        </div>
                                    </div>
                                </li>
<?php 	} ?>
 </ul>
                        </div><!-- END .list-item -->
                    </div><!-- END .col-6 -->
                </div><!-- END .row -->
				<?php 	} ?>
            </div>
      <?php  echo $phantrang; ?>

 </div>
 
