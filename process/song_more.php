<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_POST["id"]) && !empty($_POST["id"])){
$id = del_id($_POST["id"]);
$query2 = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_type = 1 AND m_id=$id ");
$row2 = mysqli_fetch_assoc($query2);
//count all rows except already displayed
$queryAll = mysqli_query($link_music,"SELECT COUNT(*) as num_rows FROM table_data WHERE m_cat = '".$row2['m_cat']."' AND m_type = 1 AND m_id>$id ORDER BY m_id ");
$row = mysqli_fetch_assoc($queryAll);
$allRows = $row['num_rows'];
$showLimit = 10;
//get rows query
$query = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_cat = '".$row2['m_cat']."' AND m_type = 1 AND m_id>$id ORDER BY m_id LIMIT ".$showLimit);
//number of rows
$rowCount = mysqli_num_rows($query);
if($rowCount > 0){ 
    while($row = mysqli_fetch_assoc($query)){ 
    $tutorial_id = 	$row['m_id'];
	$song_name =	un_htmlchars($row['m_title']);
	$singer_name	=	GetSingerName($row['m_singer']);
	$get_singer = GetSinger($row['m_singer']);
	$singer_img = GetSingerIMG($row['m_singer']);
	$song_url 		= 	url_link($song_name.'-'.$singer_name,$row['m_id'],'nghe-bai-hat');
	$download		= 'down.php?id='.$arr[$z][0].'&key='.md5($arr[$z][0].'tgt_music');
		?>
   <li id="songrec<?php echo en_id($tutorial_id);?>" class="fn-item" >
    <a href="<?php echo $song_url; ?>" title="<?php echo $song_name; ?> - <?php echo $singer_name;?>" class="thumb fn-link _trackLink track-log">
        <img width="50" height="50" class="fn-thumb" src="<?php echo $singer_img;?>" alt="Bài hát <?php echo $song_name; ?> - <?php echo $singer_name;?>">
        <span class="icon-circle-play icon-small"></span>
    </a>                    
    <h3 class="song-name ellipsis"><a href="<?php echo $song_url; ?>" title="Bài hát <?php echo $song_name; ?> - <?php echo $singer_name;?>" class="txt-primary fn-link fn-name _trackLink track-log"><?php echo $song_name;?></a></h3>
    <div class="inblock ellipsis fn-artist_list">

            <h4 class="singer-name txt-info fn-artist"><?php echo $get_singer;?></h4>
    </div>
    <div class="tool-song log-vote-recommend">
        <div class="i25 i-small download"><a title="Tải về" class="fn-dlsong" data-item="#songrec<?php echo $tutorial_id; ?>" href="<?php  echo $download;?>"></a></div>
			<!-- Playlist ADD -->
<div class="i25 i-small addlist" id="playlist_<?php echo $tutorial_id; ?>"><a href="javascript:;"  title="Thêm vào" class="fn-addto" onclick="_load_box(<?php echo $tutorial_id; ?>);"></a></div>
                <!-- End playlist ADD -->
        <div class="i25 i-small share"><a title="Chia sẻ" class="fn-share" href="<?php echo $song_url; ?>"></a></div>        
    </div>
</li>
<?php } ?>
<?php if($allRows > $showLimit){ ?>
 <a style="display:none;" href="javascript:void(0);" class="load-more fn-rec" id="<?php echo en_id($tutorial_id);?>" data-item="#songRec"><span>Xem thêm</span></a>
<?php } ?>  
<?php 
    } 
}
?>