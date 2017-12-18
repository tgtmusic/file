<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_POST["id"]) && !empty($_POST["id"])){
$id = del_id($_POST["id"]);
$query2 = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_type = 2 AND m_id=$id ");
$row2 = mysqli_fetch_assoc($query2);
//count all rows except already displayed
$queryAll = mysqli_query($link_music,"SELECT COUNT(*) as num_rows FROM table_data WHERE m_cat = '".$row2['m_cat']."' AND m_type = 2 AND m_id>$id ORDER BY m_id ");
$row = mysqli_fetch_assoc($queryAll);
$allRows = $row['num_rows'];
$showLimit = 10;
//get rows query
$query = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_cat = '".$row2['m_cat']."' AND m_type = 2 AND m_id>$id ORDER BY m_id LIMIT ".$showLimit);
//number of rows
$rowCount = mysqli_num_rows($query);
if($rowCount > 0){ 
    while($row = mysqli_fetch_assoc($query)){ 
    $tutorial_id = 	$row['m_id'];
	$video_name =	un_htmlchars($row['m_title']);
	$video_img = check_img($row['m_img']);
	$singer_name	=	GetSingerName($row['m_singer']);
	$get_singer = GetSinger($row['m_singer']);
	$singer_img = GetSingerIMG($row['m_singer']);
	$video_url 		= 	url_link($video_name.'-'.$singer_name,$row['m_id'],'xem-video');
		?>
      <li class="fn-item" data-id="<?php echo $tutorial_id;?>" data-name="<?php echo $video_name; ?>" data-artist="<?php echo $singer_name; ?>" id="songrec<?php echo $tutorial_id;?>" data-code="LmxGtLmsQJBXFsNtZDxyDmZm">
    <a href="<?php echo $video_url; ?>" title="<?php echo $video_name; ?> - <?=$singer_name; ?>" class="thumb fn-link _trackLink" tracking="_frombox=playvideo_suggestvideo_">
        <img width="110" height="62" class="fn-thumb" src="<?php echo $video_img;?>" alt="<?php echo $video_name; ?> - <?php echo $singer_name; ?>">
        <span class="icon-circle-play otr"></span>
    </a>
    <h3 class="song-name"><a href="<?php echo $video_url; ?>" title="<?php echo $video_name; ?> - <?php echo $singer_name; ?>" class="txt-primary fn-link fn-name _trackLink" tracking="_frombox=playvideo_suggestvideo_"><?php echo $video_name; ?></a></h3>                    
    <div class="inblock ellipsis fn-artist_list"><h4 class="singer-name txt-info fn-artist"><?php echo $get_singer; ?></h4></div>
</li>
<?php } ?>
<?php if($allRows > $showLimit){ ?>
<a href="javascript:void(0);" id="<?php echo en_id($tutorial_id);?>" class="load-more fn-rec" data-item="#videoRec"><span>Xem thêm</span></a>
<?php } ?>  
<?php 
    } 
}
?>