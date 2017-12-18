<?php 
if($sort == 'total_play') $sql_order = " ORDER BY m_viewed DESC";
	elseif($sort == 'release_date') 	$sql_order = " ORDER BY m_time DESC";
	//elseif(!$sort) 			$sql_order = " ORDER BY m_id DESC";
	elseif(!$sort) 			$sql_order = " ORDER BY m_id DESC";
	

	if($sort) $cim2 = "&sort=$sort";
				$sql_where = $singer_seach;
				$link_s = 'nghe-si/'.$key_text.'/video'.$cim2;
	// phan trang
	
	$sql_tt = "SELECT m_id  FROM table_data WHERE ".$sql_where." AND m_type = 2 AND m_mempost = 0 ".$sql_order." LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_song = $mlivedb->query("  m_id, m_title, m_singer, m_viewed, m_img, m_type, m_cat, m_poster, m_time  ","data",$sql_where." AND m_type = 2 AND m_mempost = 0 ".$sql_order." LIMIT ".$rStar .",". HOME_PER_PAGE,"");
if ($arr_song) {?>      
            <div class="section mt0">
                <div class="func-title-section all-view">
                    <h1 class="title-section">Video <?php  echo $singer_title;?></h1>                 
                    <a class="icon-play-all _trackLink" tracking="_frombox=artist_song_playall" title="Xem tất cả"></a>                    
                </div>
                <div class="custom-filter">
                    <span>Sắp xếp theo:</span>
                    <ul>
	<li><a class="<?php  if($sort=='release_date') echo 'active';?>" href="<?='nghe-si/',$key_text.'/video','&sort=release_date',str_replace("".$cim2."","",$cim2);?>">Mới nhất</a></li>
                 <li><a class="<?php if(!$sort) echo 'active'; if($sort=='total_play') echo 'active';?>" href="<?='nghe-si/',$key_text.'/video','&sort=total_play',str_replace("".$cim2."","",$cim2);?>">Lượt nghe</a></li>
                    </ul>
                </div>
                <div class="clearfix"></div>
<div>
<?php 
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
<?php  echo $phantrang; ?>
       
      <?php  } ?>
 </div>
 