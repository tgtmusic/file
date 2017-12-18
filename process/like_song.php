<?php
define('MLive-Channel',true);
include("../includes/configurations.php");
if(isset($_POST["id"]) && !empty($_POST["id"])){
$id = del_id($_POST["id"]);
$song_like = $mlivedb->query(" m_title, m_singer, m_cat, m_img, m_poster, m_viewed, m_lyric, m_kbs, m_sang_tac, m_url,m_is_local,m_lrc,m_official,m_hq,m_hot,m_like,m_album,m_mempost ","data"," m_id = '".$id."' ORDER BY m_id DESC ");
// Like
$like_song = $mlivedb->query(" user_song_like ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_song_like LIKE '%,".$id.",%' ");
if($like_song != '') { ?>
                <a class="fn-btn" href="javascript:;" onclick="UNLIKE(<?php echo $id;?>,1,<?php echo $song_like[0][15];?>);"><span class="zicon"></span>Bỏ Thích</a>
                <span><i></i><b></b><s class="fn-count"><?php echo $song_like[0][15];?></s></span>
<?php } else { ?>
                <a class="fn-btn"  href="javascript:;" onclick="ADDLIKE(<?php echo $id;?>,1,<?php echo $song_like[0][15];?>);"><span class="zicon"></span>Thích</a>
                <span><i></i><b></b><s class="fn-count"><?php echo $song_like[0][15];?></s></span>

<?php } };?>
	<?php
// Like
$like_song = $mlivedb->query(" user_song_like ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_song_like LIKE '%,".$id_media.",%' ");
if($like_song != '') { ?>
<div class="zlike fn-zlike" like-song data-id="<?php echo en_id($id_media);?>">
                <a class="fn-btn" href="javascript:;" onclick="UNLIKE(<?=$id_media;?>,1,<?=$song[0][15];?>);"><span class="zicon"></span>Bỏ Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$song[0][15];?></s></span>
            </div>
<?php } else {?>
<div class="zlike fn-zlike" like-song data-id="<?php echo en_id($id_media);?>">
                <a class="fn-btn" href="javascript:;" onclick="ADDLIKE(<?=$id_media;?>,1,<?=$song[0][15];?>);"><span class="zicon"></span>Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$song[0][15];?></s></span>
            </div>
<?php } ?>


