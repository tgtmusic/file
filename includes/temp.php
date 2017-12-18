<?php 
if (!defined('MLive-Channel')) die("Mọi chi tiết về code liên hệ fb: fb.com/mlive.channel !");
function cam_nhan($media_id,$page,$type){
    global $link_music,$mlivedb; 
	$num=10;
	$num = intval($num);
	$page = intval($page);
	if (!$page) $page = 1;
	$limit = ($page-1)*$num;
	if($limit<0) $limit=0;
	$arr = $mlivedb->query(" * ","comment"," comment_media_id = '".$media_id."' AND comment_type = '".$type."' ORDER BY comment_time DESC LIMIT ".$limit.",$num");
	$sql = "SELECT comment_id FROM table_comment WHERE comment_media_id = '".$media_id."' AND comment_type = '".$type."' ORDER BY  comment_time DESC";
	$result = mysqli_query($link_music,$sql);
	$total = mysqli_num_rows($result);
	$phan_trang = pages_ajax('cam_nhan',$total,$num,$page,$media_id,$type);
	$poster_id 	= $_SESSION["mlv_user_id"];
?>	

  <div class="section box-comment" id="comment_field">	
    <div load class="fn-dynamic" data-fn="zmp3Comment" data-id="<?php  echo $media_id;?>" data-type="song"></div>
    <i class="fn_zme_info" style="display: none;" data_uid="" data-thumb=".fn-useravatar" data-thumbsize="120"></i>
    <a name="comment" class="none"></a>
    <h3 class="title-section">Bình luận (<span id="commentCounter"><?php  echo $total;?></span>)</h3>
<form method="post" onSubmit="return false;" name='add' class="frm-comment fn-comment">
<input value="<?php  echo $media_id;?>" type="hidden" id="media_id">
<input value="<?php  echo $poster_id;?>" type="hidden" id="comment_poster">
<input value="<?php  echo $type;?>" type="hidden" id="comment_type">
<input value="<?php  echo $num;?>" type="hidden" id="num">
<p class="avatar"><img width="80" class="fn-useravatar" src="<?php echo check_img($_SESSION["mlv_user_avatar"]);?>" alt=""></p>
<input type="hidden" id="comment_loading">
<div class="wrap-comment">
<textarea id="comment_content" name="comment_content"></textarea>
<p class="frm-checkbox">
Chỉ chấp nhận bình luận bằng tiếng Việt có dấu, những bình luận sai qui định sẽ bị xóa.
</p>
<button type="submit" class="button btn-dark-blue pull-right" value="Bình luận" onClick="return comment_check_values();">Bình luận</button>
</div>
   

    </form>
<?php 	
if ($total) {
		for($i=0;$i<count($arr);$i++) {
				$avatarcm	=	get_data("user","avatar","userid = '".$arr[$i][2]."'");
?>

<ul id="commentList" class="list-comment">
        
    <li class="item-comment fn-page fn-page1" id="zmp32470330459" data-type="comment" data-id="ZW780FFZ">
            <a target="_blank" rel="nofollow" class="thumb-user fn-link" title="<?=get_user($arr[$i][2]);?>">
			<img width="50" height="50" class="fn-thumb zmp3-thumbnail" src="<?=check_avt($avatarcm);?>" alt="<?=get_user($arr[$i][2]);?>"></a>
            <div class="post-comment">
                <a target="_blank" rel="nofollow" class="fn-link fn-dname" title="<?=get_user($arr[$i][2]);?>"><?=get_user($arr[$i][2]);?></a>
                <p class="fn-content"><?=un_htmlchars(ucBr(text_tidy($arr[$i][3])));?></p>
                <span class="fn-time time-comment"><?=GetTIMEDATE($arr[$i][4]);?></span>
            </div>
            <span class="btn-delete fn-delete fn-mod none" data-item="#tplComment">Xóa bình luận</span>
        </li></ul>
<?php  }	} ?>

          <?php  echo $phan_trang;?>

	
</div>

<?php  } 
function bang_xep_hang($type) {
	global $mlivedb;
	if($type == 'bxh_vn') {
	$where 	= "find_in_set(".IDCATVN.",m_cat)";
	}
	elseif($type == 'bxh_am') {
	$where 	= "find_in_set(".IDCATAM.",m_cat)";
	}
	elseif($type == 'bxh_ca') {
	$where 	= "find_in_set(".IDCATCA.",m_cat)";
	}
				$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_img","data",$where." AND m_type = 1 ORDER BY  m_viewed_week DESC LIMIT 0,1");	
				$singer_name 	=	GetSingerName($arr_song[0][2]);
				$get_singer = GetSinger($arr_song[0][2]);
				$singer_big_img = GetSingerIMGBIG($arr_song[0][2]);
				$song_url = url_link(un_htmlchars($arr_song[0][1])."-".$singer_name,$arr_song[0][0],'nghe-bai-hat');
				?>
				 <li>
        <a href="<?php  echo $song_url;?>" class="thumb _trackLink" tracking="_frombox=chart_overviewsong_vietnam_01">
            <img height="179" width="410" src="<?php  echo check_img2($singer_big_img);?>" alt="<?php  echo un_htmlchars($arr_song[0][1]);?> - <?php  echo $singer_name;?>" class="img-responsive" />
        </a>
        <div class="meta">
            <span class="rank rank-01">01</span>
            <h3 class="song-name ellipsis"><a href="<?php  echo $song_url;?>" title="<?php  echo un_htmlchars($arr_song[0][1]);?> - <?php  echo $singer_name;?>" class="txt-primary _trackLink" tracking="_frombox=chart_overviewsong_vietnam_01"><?php  echo rut_ngan(un_htmlchars($arr_song[0][1]),5);?></a></h3>
            <div class="inblock ellipsis">
                
                <h4 class="title-sd-item txt-info"><?=$get_singer?></h4>
                
            </div>
        </div><!-- END .meta -->
    </li>
                <?php 
				$arr_song2 = $mlivedb->query(" m_id, m_title, m_singer ","data",$where."  AND m_type = 1 ORDER BY  m_viewed_week DESC LIMIT 1,9");	
				for($i=0;$i<count($arr_song2);$i++) {
				$singer_name 	=	GetSingerName($arr_song2[0][2]);
				$get_singer = GetSinger($arr_song2[0][2]);
				$singer_big_img = GetSingerIMGBIG($arr_song2[0][2]);
				$song_url2 = url_link(un_htmlchars($arr_song2[$i][1])."-".$singer_name2,$arr_song2[$i][0],'nghe-bai-hat');
				$number	=	$i+2;
				if($i==8)	$class[$i]	=	'fjx';

                ?>
				    <li>
        <span class="rank rank-<?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?>"><?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?></span>
        <h3 class="song-name ellipsis">
            <a href="<?php  echo $song_url2;?>" title="<?php  echo un_htmlchars($arr_song2[$i][1]);?> - <?php  echo $singer_name2;?>" class="txt-primary _trackLink" tracking="_frombox=chart_overviewsong_vietnam_<?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?>">
                <?php  echo rut_ngan(un_htmlchars($arr_song2[$i][1]),5);?>
            </a>
        </h3>
        <div class="inblock ellipsis">
            <h4 class="title-sd-item txt-info"><?php  echo $get_singer;?></h4>
        </div>
    </li>
                 <?php  } ?>
                    <?php 
}
function bxh_video($type) {
	global $mlivedb;
	if($type == 'bxh_vn') {
	$where 	= "m_cat LIKE '%,".IDCATVN.",%'";
	}
	elseif($type == 'bxh_am') {
	$where 	= "m_cat LIKE '%,".IDCATAM.",%'";
	}
	elseif($type == 'bxh_ca') {
	$where 	= "m_cat LIKE '%,".IDCATCA.",%'";
	}
				$arr_song = $mlivedb->query(" m_id, m_title, m_singer, m_img ","data",$where." AND m_type = 2 ORDER BY  m_viewed_week DESC LIMIT 0,1");	
				$singer_name 	=	GetSingerName($arr_song[0][2]);
				$get_singer = GetSinger($arr_song[0][2]);
				$singer_big_img = GetSingerIMGBIG($arr_song[0][2]);
				$song_url = url_link(un_htmlchars($arr_song[0][1])."-".$singer_name,$arr_song[0][0],'xem-video');
				?>
				 <li>
        <a href="<?php  echo $song_url;?>" class="thumb _trackLink" tracking="_frombox=chart_overviewsong_vietnam_01">
            <img height="179" width="410" src="<?php  echo check_img2($arr_song[0][3]);?>" alt="<?php  echo un_htmlchars($arr_song[0][1]);?> - <?php  echo $singer_name;?>" class="img-responsive" />
        </a>
        <div class="meta">
            <span class="rank rank-01">01</span>
            <h3 class="song-name ellipsis"><a href="<?php  echo $song_url;?>" title="<?php  echo un_htmlchars($arr_song[0][1]);?> - <?php  echo $singer_name;?>" class="txt-primary _trackLink" tracking="_frombox=chart_overviewsong_vietnam_01"><?php  echo rut_ngan(un_htmlchars($arr_song[0][1]),5);?></a></h3>
            <div class="inblock ellipsis">
                
                <h4 class="title-sd-item txt-info"><?=$get_singer?></h4>
                
            </div>
        </div><!-- END .meta -->
    </li>
                <?php 
				$arr_song2 = $mlivedb->query(" m_id, m_title, m_singer, m_img ","data",$where."  AND m_type = 2 ORDER BY  m_viewed_week DESC LIMIT 1,9");	
				for($i=0;$i<count($arr_song2);$i++) {
				$singer_name 	=	GetSingerName($arr_song2[0][2]);
				$get_singer = GetSinger($arr_song2[0][2]);
				$singer_big_img = GetSingerIMGBIG($arr_song2[0][2]);
				$song_url2 = url_link(un_htmlchars($arr_song2[$i][1])."-".$singer_name2,$arr_song2[$i][0],'xem-video');
				$number	=	$i+2;
				if($i==8)	$class[$i]	=	'fjx';
                ?>
			 <li>
        <span class="rank rank-<?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?>"><?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?></span>
        <h3 class="song-name ellipsis">
            <a href="<?php  echo $song_url2;?>" title="<?php  echo un_htmlchars($arr_song2[$i][1]);?> - <?php  echo $singer_name2;?>" class="txt-primary _trackLink" tracking="_frombox=chart_overviewsong_vietnam_<?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?>">
                <?php  echo rut_ngan(un_htmlchars($arr_song2[$i][1]),5);?>
            </a>
        </h3>
        <div class="inblock ellipsis">
            <h4 class="title-sd-item txt-info"><?php  echo $get_singer;?></h4>
        </div>
    </li>
                 <?php  } ?>
                    <?php 
}
function bxh_album($type) {
	global $mlivedb;
	if($type == 'bxh_vn') {
	$where 	= "album_cat LIKE '%,".IDCATVN.",%'";
	}
	elseif($type == 'bxh_am') {
	$where 	= "album_cat LIKE '%,".IDCATAM.",%'";
	}
	elseif($type == 'bxh_ca') {
	$where 	= "album_cat LIKE '%,".IDCATCA.",%'";
	}
				$arr_song = $mlivedb->query(" album_id, album_name, album_singer, album_img, album_img_big, album_cat ","album",$where." AND album_type = 0 ORDER BY  album_viewed_week DESC LIMIT 0,1");	
				$singer_name 	=	GetSingerName($arr_song[0][2]);
				$get_singer = GetSinger($arr_song[0][2]);
				$singer_big_img = GetSingerIMGBIG($arr_song[0][2]);
				$song_url = url_link(un_htmlchars($arr_song[0][1])."-".$singer_name,$arr_song[0][0],'nghe-album');

				?>

					<ul>
				 <li>
        <a href="<?php  echo $song_url;?>" class="thumb _trackLink" tracking="_frombox=chart_overviewsong_vietnam_01">
            <img height="179" width="410" src="<?php  echo check_img2($arr_song[0][3]);?>" alt="<?php  echo un_htmlchars($arr_song[0][1]);?> - <?php  echo $singer_name;?>" class="img-responsive" />
        </a>
        <div class="meta">
            <span class="rank rank-01">01</span>
            <h3 class="song-name ellipsis"><a href="<?php  echo $song_url;?>" title="<?php  echo un_htmlchars($arr_song[0][1]);?> - <?php  echo $singer_name;?>" class="txt-primary _trackLink" tracking="_frombox=chart_overviewsong_vietnam_01"><?php  echo rut_ngan(un_htmlchars($arr_song[0][1]),5);?></a></h3>
            <div class="inblock ellipsis">
                
                <h4 class="title-sd-item txt-info"><?=$get_singer?></h4>
                
            </div>
        </div><!-- END .meta -->
    </li>
                <?php 
				$arr_song2 = $mlivedb->query(" album_id, album_name, album_singer, album_img, album_cat ","album",$where." AND album_type = 0 ORDER BY album_viewed_week DESC LIMIT 1,9");	
				for($i=0;$i<count($arr_song2);$i++) {
				$singer_name 	=	GetSingerName($arr_song2[0][2]);
				$get_singer = GetSinger($arr_song2[0][2]);
				$singer_big_img = GetSingerIMGBIG($arr_song2[0][2]);
				$song_url2 = url_link(un_htmlchars($arr_song2[$i][1])."-".$singer_name2,$arr_song2[$i][0],'nghe-album');
				$number	=	$i+2;
				if($i==8)	$class[$i]	=	'fjx';
                ?>
				 <li>
        <span class="rank rank-<?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?>"><?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?></span>
        <h3 class="song-name ellipsis">
            <a href="<?php  echo $song_url2;?>" title="<?php  echo un_htmlchars($arr_song2[$i][1]);?> - <?php  echo $singer_name2;?>" class="txt-primary _trackLink" tracking="_frombox=chart_overviewsong_vietnam_<?php if ($i < 8) { echo '0'.$number;} else { echo $number;}?>">
                <?php  echo rut_ngan(un_htmlchars($arr_song2[$i][1]),5);?>
            </a>
        </h3>
        <div class="inblock ellipsis">
            <h4 class="title-sd-item txt-info"><?php  echo $get_singer;?></h4>
        </div>
    </li>
                 <?php  } ?>
                    <?php  } ?>
