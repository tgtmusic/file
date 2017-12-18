
<?php 
if($sort == 'total_play') $sql_order = " ORDER BY m_viewed DESC";
	elseif($sort == 'release_date') 	$sql_order = " ORDER BY m_time DESC";
	//elseif(!$sort) 			$sql_order = " ORDER BY m_id DESC";
	elseif(!$sort) 			$sql_order = " ORDER BY m_id DESC";

	if($sort) $cim2 = "&sort=$sort";
				$sql_where = $singer_seach;
				$link_s = 'nghe-si/'.$key_text.'/bai-hat'.$cim2;
	// phan trang
	
	$sql_tt = "SELECT m_id  FROM table_data WHERE ".$sql_where." AND m_type = 1 AND m_mempost = 0 ".$sql_order." LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_viewed, m_img, m_type, m_cat, m_poster, m_time ","data",$sql_where." AND m_type = 1 AND m_mempost = 0 ".$sql_order." LIMIT ".$rStar .",". HOME_PER_PAGE,"");
			if ($arr_song) {?>
            <div class="section mt0">
                <div class="func-title-section all-view">
                    <h1 class="title-section">Bài hát <?php  echo $singer_title;?></h1>                 
                    <a class="icon-play-all _trackLink" tracking="_frombox=artist_song_playall" title="Xem tất cả"></a>                    
                </div>
                <div class="custom-filter">
                    <span>Sắp xếp theo:</span>
                    <ul>
				<li><a class="<?php  if($sort=='release_date') echo 'active';?>" href="<?='nghe-si/',$key_text.'/bai-hat','&sort=release_date',str_replace("".$cim2."","",$cim2);?>">Mới nhất</a></li>
                 <li><a class="<?php if(!$sort) echo 'active'; if($sort=='total_play') echo 'active';?>" href="<?='nghe-si/',$key_text.'/bai-hat','&sort=total_play',str_replace("".$cim2."","",$cim2);?>">Lượt nghe</a></li>
                    </ul>
                </div>
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
            </div>
      <?php  echo $phantrang; ?>
       
      <?php  } ?>
 </div>
 