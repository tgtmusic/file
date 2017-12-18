<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
include("../includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_POST["id"]) && !empty($_POST["id"])){
$id = del_id($_POST["id"]);
$query2 = mysqli_query($link_music,"SELECT * FROM table_album WHERE album_type = 0 AND album_id=$id ");
$row2 = mysqli_fetch_assoc($query2);
//count all rows except already displayed
$queryAll = mysqli_query($link_music,"SELECT COUNT(*) as num_rows FROM table_album WHERE album_cat = '".$row2['album_cat']."' AND album_type = 0 AND album_id>$id ORDER BY album_id ");
$row = mysqli_fetch_assoc($queryAll);
$allRows = $row['num_rows'];
$showLimit = 10;
//get rows query
$query = mysqli_query($link_music,"SELECT * FROM table_album WHERE album_cat = '".$row2['album_cat']."' AND album_type = 0 AND album_id>$id ORDER BY album_id LIMIT ".$showLimit);
//number of rows
$rowCount = mysqli_num_rows($query);
if($rowCount > 0){ 
    while($row = mysqli_fetch_assoc($query)){ 
    $tutorial_id = 	$row['album_id'];
	$album_name =	un_htmlchars($row['album_name']);
	$album_img_hot = check_img($row['album_img']);
	$singer_name	=	GetSingerName($row['album_singer']);
	$get_singer = GetSinger($row['album_singer']);
	$singer_img = GetSingerIMG($row['album_singer']);
	$album_url_hot 		= 	url_link($album_name.'-'.$singer_name,$row['album_id'],'nghe-album');
		?>
<li class="fn-item" id="playlistrec<?php echo en_id($tutorial_id);?>" data-id="<?php echo en_id($tutorial_id);?>">
    <a href="<?php echo $album_url_hot; ?>" title="Album <?php echo $album_name; ?> - <?php echo $singer_name; ?>" class="thumb fn-link _trackLink track-log" tracking="_frombox=playplaylist_suggestplaylist_">
        <img class="fn-thumb" width="90" src="<?php echo $album_img_hot;?>" alt="Album <?php echo $album_name; ?> - <?php echo $singer_name; ?>">
        <span class="icon-circle-play class otr"></span>
    </a>                    
    <h3 class="song-name"><a href="<?php echo $album_url_hot; ?>" title="Album <?php echo $album_name; ?> - <?php echo $singer_name; ?>" class="txt-primary fn-link fn-name _trackLink track-log" tracking="_frombox=playplaylist_suggestplaylist_"><?=un_htmlchars($album_name);?></a></h3>
    <div class="inblock ellipsis fn-artist_list">
        <h4 class="singer-name txt-info fn-artist"><?php echo $get_singer; ?></h4>
    </div>
</li>
<?php } ?>
<?php if($allRows > $showLimit){ ?>
<a style="display:none;" href="javascript:void(0);" id="<?php echo en_id($tutorial_id);?>" class="load-more fn-rec" data-item="#albumRec"><span>Xem thêm</span></a>
<?php } ?>  
<?php 
    } 
}
?>