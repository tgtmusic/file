<?php
if($sort == 'total_play') $sql_order = " ORDER BY album_viewed DESC";
	elseif($sort == 'release_date') $sql_order = " ORDER BY album_time DESC";
	elseif(!$sort) 					$sql_order = " ORDER BY album_id DESC";
	//else $sql_order = " ORDER BY album_id ";
if($sort) $cim2 = "&sort=$sort";
			$sql_where = $singer_seach_album;
			$link_s = 'nghe-si/'.$key_text.'/album'.$cim2;
	// phan trang
	
	$sql_tt = "SELECT album_id  FROM table_album WHERE $sql_where AND album_type = 0 $sql_order LIMIT ".LIMITSONG;
	$phantrang = linkPage($sql_tt,HOME_PER_PAGE,$page,$link_s."&p=#page#","");
	$result = mysqli_query($link_music,$sql_tt);
	$totalRecord = mysqli_num_rows($result);
	$rStar = HOME_PER_PAGE * ($page -1 );
	$arr_album = $mlivedb->query("album_id, album_name, album_singer, album_viewed, album_img, album_type, album_cat, album_poster, album_time, album_song, album_info","album"," $sql_where AND album_type = 0 $sql_order LIMIT ".$rStar .",". HOME_PER_PAGE,"");
			if ($arr_album) {?>   
            <div class="section mt0">
                <div class="func-title-section all-view">
                    <h1 class="title-section">Album <?php  echo $arrSinger[0][1];?></h1>                 
                    <a class="icon-play-all _trackLink" tracking="_frombox=artist_song_playall" title="Xem tất cả"></a>                    
                </div>
                <div class="custom-filter">
                    <span>Sắp xếp theo:</span>
                    <ul>
	<li><a class="<?php  if($sort=='release_date') echo 'active';?>" href="<?='nghe-si/',$key_text.'/album','&sort=release_date',str_replace("".$cim2."","",$cim2);?>">Mới nhất</a></li>
                 <li><a class="<?php if(!$sort) echo 'active'; if($sort=='total_play') echo 'active';?>" href="<?='nghe-si/',$key_text.'/album','&sort=total_play',str_replace("".$cim2."","",$cim2);?>">Lượt nghe</a></li>
                    </ul>
                </div>
                <div class="clearfix"></div>

<div>
<?php   
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
<?php  echo $phantrang; ?>

      <?php  } ?>
 </div>
 