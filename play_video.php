<?php 
define('MLive-Channel',true);
include("./includes/configurations.php");
include("./includes/ajax.php");
include("./includes/class.inputfilter.php");
$myFilter = new InputFilter();
if(isset($_GET["id"])) $id_media = $myFilter->process($_GET['id']); $id_media	=	del_id($id_media);
mysqli_query($link_music,"UPDATE table_data SET m_viewed = m_viewed+".NUMPLAY.", m_viewed_month = m_viewed_month+".NUMPLAY.", m_viewed_week = m_viewed_week+".NUMPLAY.", m_viewed_day = m_viewed_day+".NUMPLAY." WHERE m_id = '".$id_media."'");
$song = $mlivedb->query(" m_title, m_singer, m_cat, m_img, m_poster, m_viewed, m_lyric, m_time, m_sang_tac, m_url,m_is_local,m_lrc,m_official,m_hq,m_hot,m_like,m_album,m_mempost ","data"," m_id = '".$id_media."' ORDER BY m_id DESC ");

$user 		= 	get_user($song[0][4]);
$user_url 	= url_link('user',$song[0][4],'user');
$st_name 	= un_htmlchars($song[0][8]);
$song_name	= un_htmlchars($song[0][0]);
$song_img	= check_img($song[0][3]);
$title 	=	GetSingerName($song[0][1]);
$song_url 	= url_link($song[0][0].'-'.$title,$id_media,'xem-video');
$get_singer = GetSinger($song[0][1]);
$singer_big_img		= GetSingerIMGBIG($song[0][1]);
$singer_img		= GetSingerIMG($song[0][1]);
$lyric_info		= text_tidy(un_htmlchars($song[0][6]));
$download 		= 'down.php?id='.del_id($id).'&key='.md5(del_id($id).'tgt_music');
$url_i = grab(get_url($song[0][10],$song[0][9]));
$arr_singer = $mlivedb->query(" singer_id ","singer"," singer_id = '".GetSingerID($song[0][1])."'");
	for($s=0;$s<count($arr_singer);$s++) {
		$list_singer .= $arr_singer[$s][0].',';
		$singer_list = substr($list_singer,0,-1);
	}
			if(count($arr_singer)>0) {
	 $singer_seach = "m_singer LIKE '%,".$singer_list.",%'";
	 $singer_seach_album = "album_singer LIKE '%,".$singer_list.",%'";
	}
$arr_next = $mlivedb->query(" m_id, m_title, m_singer, m_type ","data"," m_cat = '".$song[0][2]."' AND m_type = 2 AND m_id >$id_media ORDER BY m_id LIMIT 10");
	$singer_name_next	=	GetSingerName($arr_next[0][2]);
	$get_singer_next = GetSinger($arr_next[0][2]);
$song_url_next = url_link(un_htmlchars($arr_next[0][1]).'-'.$singer_name_next,$arr_next[0][0],'xem-video');
	if (count($song)<1) header("Location: ".SITE_LINK."the-loai/404.html");
	$lyric = str_replace("<br>",".",str_replace("<br />","", $lyric_info));
?>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <title><?php echo $song_name;?><?php  if($song[0][17] == '0') {?> - <?php  echo $title; }?> | <?=NAMEWEB?></title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="<?php  echo $song_url;?>">

<meta name="title" content="<?php echo $song_name;?><?php  if($song[0][17] == '0') {?> - <?php  echo $title; }?> | <?=NAMEWEB?>" />
<meta name="description" content="<?php  if($st_name != '') {?>Sáng tác: <?php echo $st_name.' |';}?><?php if($lyric_info != '') { ?><?php echo rut_ngan($lyric,45).' | ';}?> Nghe nhạc miễn phí - Tải nhạc chất lượng cao" />
<meta name="keywords" content="MV <?php  echo str_replace ('-', ' ',replace($song_name)).' - ';?> <?php if($song[0][17] == '0') { echo str_replace ('-', ' ',replace($title)).',';}?> chất lượng cao HD 720 1080, Video clip bản đẹp nhất cực nét có lyrics <?php  echo str_replace ('-', ' ',replace($song_name)).' - ';?> <?php if($song[0][17] == '0') { echo str_replace ('-', ' ',replace($title)).',';}?> viet sub" />
<meta property="og:title" content="<?php echo $song_name;?><?php  if($song[0][17] == '0') {?> - <?php  echo $title; }?> | <?=NAMEWEB?>" />                
<meta property="og:description" content="<?php  if($st_name != '') {?>Sáng tác: <?php echo $st_name.' |';}?><?php if($lyric_info != '') { ?><?php echo rut_ngan($lyric,45).' | ';}?> Nghe nhạc miễn phí - Tải nhạc chất lượng cao" />
<meta property="og:image" content="<?php  echo $song_img;?>" />
<meta property="og:image:url" content="<?php  echo $song_img;?>" />
<meta property="og:url" content="<?php  echo $song_url;?>" />
<link rel="image_src" href="<?php  echo $song_img;?>" />
<?php  include("./theme/ip_java.php");?>
</head>
<body>
	<?php  include("./theme/ip_header.php");?>

	<div class="wrapper-page">
	<?=BANNER('top_banner_play_video','1006');?>  
<div class="container box-play-video">
	 <div id="_player" class="zplayer zp-reset zp-state-paused zp-skin-zmp3 zp-stretch-uniform" tabindex="0" style="width: 650px; height: 366px; display: block;">
	<div id="myvideo" class="player"  style="display:none;"></div>
</div>
</div>

 
	
	<div class="wrap-body page-play-video container group ovisible "> 
	<div class="wrap-content"> 
	
			<div class="info-top-play group">
    <div class="info-content">
        <h1 class="txt-primary"><?php  echo un_htmlchars($song[0][0]);?></h1> 
        <span class="zadash">-</span>    
        <div class="inline"><h2 class="txt-primary"><?=$get_singer?></h2></div>
        <div class="info-song-top">
            <span>Thể loại: </span>
            <div class="inline">
                <h2><?php  echo GetTheLoai($song[0][2],'video');?></h2>
            </div>
        </div>
        
    </div>
	<div class="box-social-2 otr">

        <div style="float:left">
	<?php
// Like
$like_song = $mlivedb->query(" user_video_like ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_video_like LIKE '%,".$id_media.",%' ");
if($like_song != '') { ?>
<!-- user -->
<div class="zlike fn-zlike" id="Load_LikeVideo_<?=$id_media;?>" >
                <a class="fn-btn" href="javascript:;" onclick="UNLIKE(<?=$id_media;?>,3,<?=$song[0][15];?>);"><span class="zicon"></span>Bỏ Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$song[0][15];?></s></span>
            </div>
<?php } else {?>
<!-- user -->
<div class="zlike fn-zlike" id="Load_LikeVideo_<?=$id_media;?>" >
                <a class="fn-btn" href="javascript:;" onclick="ADDLIKE(<?=$id_media;?>,3,<?=$song[0][15];?>);"><span class="zicon"></span>Thích</a>
                <span><i></i><b></b><s class="fn-count"><?=$song[0][15];?></s></span>
            </div>
<?php } ?>
            <div class="g-plusone" data-size="medium"></div>
            <div class="box-fb-like">
                <div class="fb-like" data-size="small" data-mobile-iframe="true" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false" data-href="<?=$song_url?>"></div>
            </div>
        </div>
        <div class="social-mini">            
            <a class="icm ic-gg fn-sharelink fn-track-sharelink" href="https://plus.google.com/share?url=<?=$song_url?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                    return false;"></a>
            <a class="icm ic-fb fn-sharelink fn-track-sharelink" data-layout="button" data-mobile-iframe="true" data-href="<?=$song_url?>" data-type="facebook" data-net="fb" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?=$song_url?>&amp;src=sdkpreparse"></a>

        </div>
    </div>

</div>
            <!-- begin shared -->
			<div class="media-func group fn-tabgroup" >
			<?php
// Like
$like_song = $mlivedb->query(" user_like_video ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_like_video LIKE '%,".$id_media.",%' ");
if($like_song != '') { ?>
<!-- user -->
<div id="Load_Video_<?=$id_media;?>"><a href="javascript:;" onclick="UNFAV(<?=$id_media;?>,3);" class="button-style-1 pull-left fn-add _trackLink added" ><i class="zicon icon-add"></i><span>Đã thêm</span></a></div>
<?php } else {?>
<!-- user -->
<div id="Load_Video_<?=$id_media;?>"> <a href="javascript:;" onclick="ADDFAV(<?=$id_media;?>,3);" class="button-style-1 pull-left fn-add _trackLink" > <i class="zicon icon-add"> </i> <span>Thêm vào</span> </a></div>
<?php } ?>
			<a href="javascript:;" id="btnDownloadBox" class="button-style-1 pull-left" ><i class="zicon icon-download"></i><span>Tải về</span></a>
			<a href="javascript:;" id="btnReportError" class="button-style-1 pull-left" ><i class="zicon icon-flag"></i><span>Báo lỗi</span></a>
				<a href="javascript:;" id="btnShareNowPlaying" class="button-style-1 pull-left " ><i class="zicon icon-share"></i><span>Chia sẻ</span></a>
			<p class="count-view" data-group=".fn-tab-panel" data-panel=".fn-tab-panel-stats">
            <b class="ico">lượt nghe</b>&nbsp;<span class="fn-total-play" data-id="<?=en_id($id_media);?>" data-type="song"><?php  echo number_format($song[0][5]);?></span> <i class="icon-down"></i>
            <span class="ztip">Được tổng hợp dựa trên số liệu lượt nghe của người dùng trên cả desktop, mobile và smart TV</span>
        </p>
			</div>
            <div class="clr"></div>
	
			  <div id="divShowShare" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-share po-r none">
        <div class="tab-menu group">
            <ul>
                <li class="str-active"><a href="#">Chia sẻ</a></li>
            </ul>
        </div>
        <div class="share-container share-container-otr context">
            <div class="share-nwsocial">
                <div class="func-share">
                    <i class="icon-za zshare-zalo" data-net="za" href="javascript:void(0)" style="background: url('http://static.mp3.zdn.vn/skins/zmp3-v4.2/images/icon_zalo.png'); background-size: 33px; background-repeat: no-repeat;"></i>                                        
                    <i class="icon-fb fn-sharelink" data-net="fb" href="<?php  echo $song_url; ?>"></i>                    
                </div><!-- END .func-share -->
            </div><!-- END .share-nwsocial -->

            <div class="context mb20">
                <input type="text" class="frm-textbox pull-left txt-long txt-long-100" name="video-width" value="<?php  echo $song_url; ?>">						
            </div><!-- END .outside-textarea -->
        </div><!-- END .service-container -->

       		  <div class="fn-sub-panel fn-sub-embed embed-container" id="divShowShare" >		
            <div class="context outside-textarea">
                <div class="title-outside-textarea">
                    <label class="ltitle">Mã nhúng</label>
                    <div class="box-checkbox">
                        <input type="radio" id="radioAuto" key="<?=en_id($id_media);?>" rel="video" name="type_embed" checked class="icheckbox_minimal-purple">
                        <label>Tự động play</label>
                    </div>
                    <div class="box-checkbox">
                        <input type="radio" id="radioNormal" key="<?=en_id($id_media);?>" rel="video" name="type_embed" class="icheckbox_minimal-purple">
                        <label>Mã kiểu cũ</label>
                    </div>
					  
                    <div class="clearfix"></div>
                </div>

                <textarea id="urlEmbedBlog" readonly="readonly" name="" cols="30" rows="10"><iframe scrolling="no" width="560" height="355" src="<?=SITE_LINK?>embed/mv/<?=en_id($id_media);?>" frameborder="0" allowfullscreen="true"></iframe></textarea>
                <input type="hidden" name="embedUrl" id="embedUrl" value="<?=SITE_LINK?>embed/mv/<?=en_id($id_media);?>">
            </div><!-- END .outside-textarea -->
            <div class="clearfix"></div>
            <div class="con-select">
                <label class="ltitle">Kích thước</label>
                <select name="video-size" id="embedSize" class="frm-select">
                    <option value="640x180" selected="selected">640x180</option>
                    <option value="853x240">853x240</option>				
                    <option value="640x180">Tùy chỉnh</option>
                </select>
                <div class="option-select none">				
                    <input id="embedWidth" type="text" value="640" maxlength="4" class="fn-change frm-textbox fn-input-number" name="video-height">
                    <span>x</span>				
                    <input id="embedHeight" type="text" value="180" maxlength="4" class="fn-change frm-textbox fn-input-number" name="video-width">		
                </div><!-- END .option-select -->


            </div>
             <div class="clearfix"></div>
        </div><!-- END .service-container -->

        <span class="close fn-closetab" data-tab="#tabShare"></span>
    </div>
	
            <div id="divReportErrorBox" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-report po-r none">
           <h4 class="title-pane"> <span>Phản hồi cho video này (Report this video)</span> <span class="close fn-closetab" data-tab="#tabReport"> </span> </h4>
        <div class="frm-rpt group" >
            <p>Vui lòng chọn cụ thể các mục bên dưới để thông báo cho <?=NAMEWEB?> biết vấn dề bạn gặp phải đối với bài hát này. <br>Để thông báo vi phạm bản quyền, vui lòng gửi (To file a copyright infringement notification, please )</p>
            <form method="post">
            <input type="hidden" id="media_id" value="<?php  echo $id_media;?>" />
			<input type="hidden" id="type" value="1"  />
		
            <div align="center">
<select style="height: 40px;" class="select" id="drlReason" name="drlReason">
<option value="0">Vui lòng chọn nguyên nhân</option>
<optgroup label="Vấn đề về kỹ thuật">
<option value="Play quá chậm">Play quá chậm</option>
<option value="Không play được">Không play được</option>
<option value="Chất lượng kém">Chất lượng kém</option>
</optgroup>
<optgroup label="Vấn đề về nội dung">
<option value="Thông tin bài hát không đúng">Thông tin bài hát không đúng</option>
<option value="Lyrics chưa chính xác">Lyrics chưa chính xác</option>
<option value="Không download được">Không download được</option>
<option value="Video có nội dung khiêu dâm, thô tục">Video có nội dung khiêu dâm, thô tục</option>
<option value="Video có nội dung bạo lực">Video có nội dung bạo lực</option>
<option value="Video có nội dung phản động, kích động thù địch">Video có nội dung phản động, kích động thù địch</option>
<option value="1">Lỗi khác</option>
</optgroup>
</select>
 	 <div align="center" id="ERCT" class="none1">
			<br/><textarea name="txtContent" rows="10" cols="30" id="txtContent" class="textarea"></textarea>
			</div>
             </div>
			 <div align="center">
			 <input type="button" value="Gửi đi" class="button btn-dark-blue" onclick="SendError();"/>
			 </div>
            </form>
            <div class="margin-top10 error_yeu_thich none"></div>
			 </div><!-- /.frm-lyrics -->
    </div>

            <div id="divDownloadBox" class="tab-pane line-bottom fn-tab-panel fn-tab-panel-service po-r none">    
        <div class="service-container fn-sub-panel">
            <div class="row mb0">
                <div class="col-4">
                    <ul class="dl-service fn-list">
					   <li >
                        <a href="<?=$download;?>" title="Tải video 360p" class="button btn-dark-blue small-button ghost-button fn-360 _trackLink" tracking="_frombox=playmv_download_360" target="_ifrTemp">
                            <i class="zicon icon-dl">
                            </i>360p</a>
                        <b>
                            <s class="fn-size-360">
                            </s>mp4 &#8226; miễn phí</b>
                    </li>
                    <li >
                        <a href="<?=$download;?>" title="Tải video 480p" class="button btn-dark-blue small-button ghost-button fn-480 _trackLink" tracking="_frombox=playmv_download_480" target="_ifrTemp">
                            <i class="zicon icon-dl">
                            </i>480p</a>
                        <b>
                            <s class="fn-size-480">
                            </s>mp4 &#8226; miễn phí</b>
                    </li>
                    <li >
                        <a href="<?=$download;?>" title="Tải video 720p" class="button btn-dark-blue small-button fn-720 fn-viprequire _trackLink" tracking="_frombox=playmv_download_720" target="_ifrTemp">
                            <i class="zicon icon-dl">
                            </i>720p</a>
                        <b>
                            <s class="fn-size-720">
                            </s>mp4 &#8226; <a target="_blank" title="Zing MP3 VIP" class="fn-viprequire">VIP</a>
                        </b>
                    </li>
                    <li >
                        <a  href="<?=$download;?>" title="Tải video 1080p" class="button btn-dark-blue small-button fn-1080 fn-viprequire _trackLink" tracking="_frombox=playmv_download_1080" target="_ifrTemp">
                            <i class="zicon icon-dl">
                            </i>1080p</a>
                        <b>
                            <s class="fn-size-1080">
                            </s>mp4 &#8226; <a target="_blank" title="Zing MP3 VIP" class="fn-viprequire">VIP</a>
                        </b>
                    </li>
                       
                    </ul>
                    <div class="xdownload fn-download-off none"><img width="15" height="15" src="./theme/images/x-round.png" alt="Zing MP3"><p>Bài hát này không tải được vì lý do bản quyền</p></div>
                </div><!-- /.col-4 -->

                <div class="col-border-left col-8 fn-notvip">
                    <div class="content-promote">
                        <img width="33" height="37" src="./theme/images/icon-human.png" alt="Zing MP3">
                         <p>Xem và tải MV <strong>chất lượng HD</strong> tốc độ cao với tài khoản <strong class="hightlight"><?=NAMEWEB?></strong>.</p>
                    </div>
                    <div class="content-promote-func align-right">
                        <a href="" target="_blank" class="vip-info"><span>?</span>Tìm hiểu về VIP</a>
                        <a class="button btn-dark-blue small-button fn-viprequire" data-step="2" href="" target="_blank"><i class="icon-crown-small"></i>Nâng cấp VIP</a>
                    </div>
                </div>
            </div>
        </div>
        <span class="close fn-closetab" data-tab="#tabService"></span>
    </div>

<!--- Lyric --->
<?php  if($lyric_info) { ?>

    <div class="tab-pane fn-tab-panel-lyrics">
        <div class="lyrics-container po-r" id="lyrics">
            <div class="fn-container">  <div id="lyrics" class="fn-lyrics fn-lyrics" >
                    <div class="fn-wlyrics title">
                        <strong class="ellipsis fn-wlyrics title">
                            <label>Lời bài hát </label>
                            <s class="fn-name"><?=un_htmlchars($song[0][0]);?></s>
                        </strong>
                        <div class="lyrics-tools fn-wlyrics fn-tools">
                            <div class="lyrics-control">
                                <a href="javascript:void(0);" class="icon-arrow-left-1 prev fn-prev disabled" >
                                </a>
                                <span>phiên bản <bdo class="fn-version">1/1</bdo>
                                </span>
                                <a href="javascript:void(0);" class="icon-arrow-right-1 next fn-next " >
                                </a>
                            </div>
                        </div>
                        <span class="donggop ellipsis">Đóng góp: <span class="fn-user">mp3</span>
                        </span>
                    </div>
                    <p id="lyric_load" class="fn-wlyrics fn-content" style="overflow: hidden; height: 300px;"><?=un_htmlchars($lyric_info);?></p>
                </div>    </div>        
            <div class="lyrics-func group fn-wlyrics">
                <div class="iLyric"><a href="javascript:;" onclick="LYRICSHOWHIDE(1);" class="ml0 pull-left fn-expand" >Xem thêm</a></div>
                <p class="pull-right">Đóng góp: <a href="javascript:;" class="fn-new" data-new="lyrics">Lời bài hát</a></p>

            </div>
        </div>
    </div> 


<?php  } ?>

<!--- Singer Info --->

 <?php 
$arrSinger = $mlivedb->query("  singer_id, singer_name, singer_img, singer_big_img, singer_info,singer_viewed,singer_like  ","singer"," singer_id = '".GetSingerID($song[0][1])."'");
if($arrSinger) {
$singer_name = un_htmlchars($arrSinger[0][1]);
$singer_url = 'nghe-si/'.replace($singer_name);
$singer_info = $arrSinger[0][4];
$singer_img = check_img($arrSinger[0][2]);
 ?>
 <div class="section">
    <div class="box-artist">
        <a href="<?=$singer_url;?>" title="<?=$singer_name;?>" class="_trackLink" tracking="_frombox=play_artistprofile">
            <img width="110" height="110" class="thumb-art" src="<?=$singer_img;?>" alt="<?=$singer_name;?>">
        </a>
        <div class="artist-info">
            <h2><a title="<?=$singer_name;?>" href="<?=$singer_url;?>" class="_trackLink" tracking="_frombox=play_artistprofile"><?=$singer_name;?></a></h2>
<?php
// Like
$like_following = $mlivedb->query(" user_following ","user"," userid = '".$_SESSION["mlv_user_id"]."' AND user_following LIKE '%,".$arrSinger[0][0].",%' ");
if($like_following != '') { ?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$arrSinger[0][0];?>">	
 <a href="javascript:;" onclick="UNLIKE(<?=$arrSinger[0][0];?>,4,<?=$arrSinger[0][6];?>);" class="fn-follow _trackLink active" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arrSinger[0][6] ;?></s></span>
            </div>
<?php } else {?>
<!-- user -->
 <div class="subcribe subcribed" id="Load_LikeSinger_<?=$arrSinger[0][0];?>">	
 <a href="javascript:;" onclick="ADDLIKE(<?=$arrSinger[0][0];?>,4,<?=$arrSinger[0][6];?>);" class="fn-follow _trackLink" tracking="_frombox=play_artistfollow"  ><span></span>Quan tâm</a><span><i></i><b></b><s class="fn-followed" ><?=$arrSinger[0][6] ;?></s></span>
            </div>
<?php } ?>	
        </div>

        <div class="artist-info-text" id="comments-show">
            <p>
 <?php  echo un_htmlchars(rut_ngan($singer_info,40));?>   <a href="#" onclick="showComm('comments');return false;" target="_blank" rel="nofollow" class="readmore pull-right fn-showhide __web-inspector-hide-shortcut__">Xem toàn bộ</a>
 </p>
        </div>
  <div class='hide-content' id='comments' class="none">
            <div class="artist-info-text">
                <p>
               <?php  echo un_htmlchars($singer_info);?>               
                </p>
                <a href="#"  onclick="showComm('comments');return false;" rel="nofollow" class="readmore pull-right fn-showhide" >Rút gọn</a>
            </div>
        </div>
</div>
</div>
<?php  } ?>

<!--- Album Cung Ca Si --->
<?php 
$arrz = $mlivedb->query(" album_id, album_name, album_singer, album_img, album_cat ","album"," $singer_seach_album ORDER BY RAND() LIMIT 4");
if($arrz) {
	$s_album = 'nghe-si/'.replace(un_htmlchars($arrSinger[0][1])).'/album';
?>
	<div class="section po-r" id="albumOfArtist" data-total="8" data-id="IWZ997CU">  
 <h2 class="title-section"><a href="<?=$s_album?>" title="Xem album <?=un_htmlchars($arrSinger[0][1]);?>">Album <?=un_htmlchars($arrSinger[0][1])?>  <i class="icon-arrow"></i></a></h2>
    <div class="row fn-list slick-initialized slick-slider">
            <div aria-live="polite" class="slick-list draggable" tabindex="0">
<div class="slick-track" style="opacity: 1; width: 1336px; transform: translate3d(0px, 0px, 0px);">
<?php 
 for($z=0;$z<count($arrz);$z++) {
	 $name_album = un_htmlchars($arrz[$z][1]);
	$img_album = check_img($arrz[$z][3]);
	$singer_name	=	GetSingerName($arrz[$z][2]);
	$get_singer = GetSinger($arrz[$z][2]);
     $album_url = url_link($arrz[$z][1].'-'.$singer_name,$arrz[$z][0],'nghe-album');
	 if($z==3)	$class[$z]	=	"fjx";
?>
				<div class="album-item col-3 fn-item slick-slide slick-active" data-slick-index="0" aria-hidden="false" style="width: 167px;">
 <a href="<?php echo $album_url?>" title="<?php echo $name_album;?> - <?php echo $singer_name;?>" class="thumb fn-link _trackLink" tracking="_frombox=play_artistvideo_">
<img width="200" height="150" src="<?php echo $img_album;?>" alt="<?php echo $name_album;?> - <?php echo $singer_name;?>" class="img-responsive fn-thumb" style="height: 150px;">
        <span class="icon-circle-play otr"></span>
    </a>
    <h3 class="title-item ellipsis">
        <a href="<?php echo $album_url?>" title="<?php echo $name_album;?> - <?php echo $singer_name;?>" class="txt-primary fn-name fn-link _trackLink" tracking="_frombox=play_artistvideo_">
            <?php echo $name_album;?> 
        </a>
    </h3>
    <div class="inblock ellipsis fn-artist_list">
        <h4 class="title-sd-item txt-info fn-artist"><?php echo $get_singer;?></h4>
    </div>
    <span class=" fn-badge"></span>
</div>
<?php  } ?>
</div></div>
    </div>
 <!-- <div class="nav-caro fn-nav ">
        <span class="next fn-next" style="display: block;"></span>
        <span class="prev fn-prev disabled" style="display: block;"></span>
    </div> -->
</div>
<?php  } ?>
 <!--- Video cung ca si --->
<?php 
$arrz = $mlivedb->query(" m_id, m_title, m_singer, m_img, m_cat ","data"," $singer_seach AND m_type = 2 ORDER BY RAND() LIMIT 4");
if($arrz) {
	$s_video = 'nghe-si/'.replace(un_htmlchars($arrSinger[0][1])).'/video';
?>
     <div class="section po-r" id="videoOfArtist" data-total="26" data-id="IWZ997CU">
    <h2 class="title-section"><a href="<?=$s_video?>" title="Xem video <?=un_htmlchars($arrSinger[0][1])?> ">Video <?=un_htmlchars($arrSinger[0][1]);?>  <i class="icon-arrow"></i></a></h2>
    <div class="row">
        <div class="fn-list slick-initialized slick-slider">
                <div aria-live="polite" class="slick-list draggable" tabindex="0">
				<div class="slick-track" style="opacity: 1; width: 1336px; transform: translate3d(0px, 0px, 0px);">
<?php 
for($z=0;$z<count($arrz);$z++) {
	$name_video = un_htmlchars($arrz[$z][1]);
	$img_video = check_img($arrz[$z][3]);
	$singer_name	=	GetSingerName($arrz[$z][2]);
	$get_singer = GetSinger($arrz[$z][2]);
    $video_url 		= url_link($arrz[$z][1].'-'.$singer_name,$arrz[$z][0],'xem-video');
	if($z==3)	$class[$z]	=	"fjx";
?>
  <div class="album-item col-3 fn-item slick-slide slick-active" data-slick-index="0" aria-hidden="false" style="width: 167px;">
    <a href="<?php echo $video_url?>" title="<?php echo $name_video;?> - <?php echo $singer_name;?>" class="thumb fn-link _trackLink" tracking="_frombox=play_artistvideo_">
        <img width="151" height="85" src="<?php echo $img_video;?>" alt="<?php echo $name_video;?> - <?php echo $singer_name;?>" class="img-responsive fn-thumb" style="height: 85px;">
        <span class="icon-circle-play otr"></span>
    </a>
    <h3 class="title-item ellipsis">
        <a href="<?php echo $video_url?>" title="<?php echo $name_video;?> - <?php echo $singer_name;?>" class="txt-primary fn-name fn-link _trackLink" tracking="_frombox=play_artistvideo_">
         <?php echo $name_video;?>
        </a>
    </h3>
    <div class="inblock ellipsis fn-artist_list">
        
        <h4 class="title-sd-item txt-info fn-artist"><?php echo $get_singer;?></h4>
        
    </div>
    <span class=" fn-badge"></span>
</div>
<?php  } ?>
	</div></div>
            </div>
    </div><!-- END .row -->
    
   <!-- <div class="nav-caro fn-nav ">
        <span class="next fn-next" style="display: block;"></span>
        <span class="prev fn-prev disabled" style="display: block;"></span>
    </div> -->
    
</div>
<?php  } ?>
<!--- Binh luan --->
<div class="section box-comment">
<h3 class="title-section"> <div style="float:right">
				<a class="active fn-chart" href="javascript:;" id="btnCommentFB">FB</a>
				| <a class="fn-chart" href="javascript:;" id="btnCommentSite">WEBSITE</a>
				</div></h3>	
			</div>
<div id="divFBBox" class="tab-pane-cm ">
<div class="fb-comments" data-href="<?=$song_url?>" data-width="650" data-numposts="5"></div>
</div>
<div id="divWEBBox" class="tab-pane-cm none">
<?=cam_nhan($id_media,1,3);?>
</div>
<!-- end binh luan -->
</div>


<!--- Khung Phai --->
        <div class="wrap-sidebar">
		<!--- Quang cao --->
        <?=BANNER('play_right','345');?>
	<!--- Co the ban muon xem --->
<?php 
	$query = mysqli_query($link_music,"SELECT * FROM table_data WHERE m_cat = '".$song[0][2]."' AND m_type = 2 AND m_id>$id_media ORDER BY m_id LIMIT 10");
	//get rows query
	$rowCount = mysqli_num_rows($query);
	if($rowCount) {
?>	
<div id="block-video-suggest" >
<div class="widget widget-video-countdown">
    <h2 class="title-section sz-title-sm">Gợi Ý</h2>
    <div class="widget-content no-padding no-border" id="videoRec" >
        <ul class="fn-list">
<?php
//number of rows
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

<a href="javascript:void(0);" id="<?php echo en_id($tutorial_id);?>" class="load-more fn-rec" data-item="#videoRec"><span>Xem thêm</span></a>
</ul>
<?php } ?>
</div> 
<div class="autoplay">
        <span class="label">Autoplay</span>
        <span class="atip">i<i>Tự động chuyển sang bài hát được gợi ý khi kết thúc bài hát đang nghe. (Yêu cầu player ở chế độ không lặp)</i></span>
        <span class="btn-sw btn-sw-off fn-autoplay"><a onclick="change_auto_next();"><i class="node"></i><b class="zicon"></b></a></span>
    </div>	
			</div> </div>
<?php  } ?>
		<!--- Co the ban muon xem --->

    </div>
</div></div></div>
    <?php  include("./theme/ip_footer.php");?>
	<link rel="stylesheet" type="text/css" href="<?=SITE_LINK?>/player/jwplayer_nhac/nhac-1.0.0.css" />
<script type="text/javascript" src="<?=SITE_LINK?>/player/jwplayer-7.8.7/jwplayer.js"></script>
 <script type="text/javascript">
/*<![CDATA[*/
jwplayer.key="YgtWotBOi+JsQi+stgRlQ3SK21W2vbKi/K2V86kVbwU="

             var embed = 0;
            var firstPause = false;
            var wdoc = $(window).width();
            var hplayer = '366';
            if(wdoc<1153 && embed!=1){
                hplayer = 366;
            }
            console.log('wdoc:'+wdoc);
            jwplayer('myvideo').setup({
				      width: '100%',
               		  height: hplayer,
				      file: '<?=$url_i?>',
					  "image":"<?php echo check_img($song[0][3]);?>",
				      base: '<?=SITE_LINK?>/player/jwplayer-7.8.7/',
				      androidhls: 'true',
				      skin: {
				        name: 'nhac'
				      },
					    primary: "primaryCookie",
					events: {
					onComplete: function(event) {
					<?php if ($arr_next){?>	if (localStorage.getItem("auto_next") == "on")
						{
							top.location = "<?=$song_url_next?>";
						} <?php } ?>
					},
				},
				      plugins: {
				        '<?=SITE_LINK?>/player/jwplayer_nhac/nhac-1.js': {
				          showVIP: true,
                            showVIP: 1,
                            showVIP: 2
                            
				        }
				      },
				      autostart: true,
                      repeat: true,
				      primary: 'html5'
				    });
            setInterval(function(){
                var state = jwplayer().getState();
                if(state.toLowerCase()=='playing'){
        			var typePlaylist = typeof jwplayer().getPlaylistItem()
                    if(typePlaylist.toLowerCase() == 'object'){
                        ajax_load('/player/logPlayEverytime',{'content_type':'video','content_id':<?=$id_media?>});
                    }
                }
            }, 60000);

            // Chuyen trang sang trang khac neu khong auto
            jwplayer().onBeforeComplete(function() {
                console.log('complete');
                if(typeof NhacVNAutoPlay=='function'){
                    console.log('call NhacVNAutoPlay');
                    NhacVNAutoPlay();
                }
            });
        

            function onPlayerExpandCollapse() {
                if(jwplayer('myvideo').getFullscreen) {
                    jwplayer('myvideo').setFullscreen(false);
                }
                var w_window = $(window).width();
                var h_window = $(window).height();
                 if($('.zplayer').width() <= 650){
                    $('.zplayer').css({'height':'550px'});
                    $('.zplayer').css({'width':'980px'});
                    $('#_player').removeClass('zp-flag-user-inactive');
                    $('#_player').addClass('zp-flag-user-inactive');
                    $('.box-play-video').css({'height':'550px'});
					$('.wrap-sidebar').css({'margin-top':'20px'});
                    var w=980;
                    var h=550;
                    onPlayerExpand(w,h);
                }else{
                    var w=650;
                    var h=366;
                    if(w_window<1170){
                        w=650;
                    }
                    onPlayerCollapse(w,h);
                    $('.box-play-video').css({'height':''});
					$('.wrap-sidebar').css({'margin-top':''});
                    $('.zplayer').css({'height':h+'px'});
                    $('.zplayer').css({'width':w+'px'});
                    $('#_player').removeClass('zp-flag-user-inactive');
                    $('#_player').addClass('zp-flag-user-inactive');
                }
            }

            function onPlayerExpand(w,h) {
              jwplayer('myvideo').resize(w,h);
            }

            function onPlayerCollapse(w,h) {
              jwplayer('myvideo').resize(w,h);
            }
            ;
        

            var device_type = 'desktop';
            var listPlayed =Array();
            var playVideoFlag = true;
            var logedin = true;
			jwplayer().onBeforePlay(function() {
				playVideoFlag = true;
			});
			jwplayer().onTime(function(event) {
			    if(firstPause==false && embed==1){
                    firstPause = true;
                    jwplayer().pause();
                }
				if(Math.round(event.position) >=5){
					if(playVideoFlag) {
						playVideoFlag = false;
                        var action = 'Play Video';
						if(in_array(listPlayed,'video_'+<?=$id_media?>)){
							var action = 'Replay Video';
						}
						var item = {id:'video_44539'};
                        if(!in_array(listPlayed,item.id)){
                            listPlayed.push(item);
                        }
                        ajax_load('/player/logVideo',{'id':<?=$id_media?>});
                        var eventLabel = '<?=$name?>-44539';
						
                        var eventLabelGenre = $('#event_genre').val();;
                        NhacVnCoreJs.gaTrackingEvents('Play By Content',action,eventLabel);
                        NhacVnCoreJs.gaTrackingEvents('Play By Genre',action,eventLabelGenre);
                        NhacVnCoreJs.gaTrackingEvents('Play By Artist',action,'40978|<?=$singer_name?>');
					}
				}
			});
            

                console.log('userStatus:1');
                var userStatus = 1;
                jwplayer().onQualityLevels(function(event){
                    
                    var currQIndex = jwplayer().getCurrentQuality();
                    var currQL = jwplayer().getQualityLevels();
                    var defaultProfile = '480p';
                    var isSetDf = false;
                    for(var i=0; i<currQL.length;i++){
                        if(!isSetDf){
                            if(currQL[i].label=='480p'){
                                defaultProfile='480p';
                                isSetDf=true;
                            }else if(currQL[i].label=='360p'){
                                defaultProfile='360p';
                                isSetDf=true;
                            }else if(currQL[i].label=='240p'){
                                defaultProfile='240p';
                                isSetDf=true;
                            }
                        }
                    }
                    console.log('default:',defaultProfile);
                    if(userStatus==1){
                        defaultProfile = '720p';
                    }else if(userStatus==2){
                        defaultProfile = '1080p';
                    }
                    var ons = false;
                    for(var i=0; i<currQL.length;i++){
                        //console.log(currQL[i].label);
                        if(currQL[i].label==defaultProfile){
                            ons = true;
                            jwplayer().setCurrentQuality(i);
                        }
                    }
                    /*var bitrate = currQL[currQIndex].label;
                    if(logedin==false && bitrate=='720p'){
                        jwplayer().setCurrentQuality(currQIndex+1);
                    }*/
                });
                jwplayer().onQualityChange(function(event){
                    /*var logedin = false;
                    $.ajax({
                        url: '/ajax/isAuthenticate',
                        type: 'post',
                        data: {fa:'720p',url_return:'<?=$song_url?>'},
                        async: false,
                        dataType: 'json',
                        success: function(data){
                            if(data.errorCode==0){
                                logedin = true;
                            }
                        }
                    })*/
                    var currEQIndex = jwplayer().getCurrentQuality();
                    var currQL = jwplayer().getQualityLevels();
                    var bitrate = currQL[currEQIndex].label;
                    bitrate = parseInt(bitrate.replace('p',''));
                    var defaultProfile = '';
                    if(userStatus==0 && bitrate>=720){
                        NhacVnCoreJs.popupLoginVegaId();
                        //jwplayer().setCurrentQuality(currEQIndex+1);
                        defaultProfile = '480p';
                        var isSetDf = false;
                        for(var i=0; i<currQL.length;i++){
                            if(!isSetDf){
                                if(currQL[i].label=='480p'){
                                    defaultProfile='480p';
                                    isSetDf=true;
                                }else if(currQL[i].label=='360p'){
                                    defaultProfile='360p';
                                    isSetDf=true;
                                }else if(currQL[i].label=='240p'){
                                    defaultProfile='240p';
                                    isSetDf=true;
                                }
                            }
                        }
                    }else if(userStatus==1 && bitrate>=1080){
                        NhacVnCoreJs.requiredPackage();
                        //jwplayer().setCurrentQuality(currEQIndex+1);
                        defaultProfile = '720p';
                        var isSetDf = false;
                        for(var i=0; i<currQL.length;i++){
                            if(!isSetDf){
                                if(currQL[i].label=='720p'){
                                    defaultProfile='720p';
                                    isSetDf=true;
                                }else if(currQL[i].label=='480p'){
                                    defaultProfile='480p';
                                    isSetDf=true;
                                }else if(currQL[i].label=='360p'){
                                    defaultProfile='360p';
                                    isSetDf=true;
                                }else if(currQL[i].label=='240p'){
                                    defaultProfile='240p';
                                    isSetDf=true;
                                }
                            }
                        }
                    }
                    console.log('set pr:',defaultProfile);
                    if(defaultProfile!=''){
                        for(var i=0; i<currQL.length;i++){
                            if(currQL[i].label==defaultProfile){
                                jwplayer().setCurrentQuality(i);
                            }
                        }
                    }
                });
            

/*]]>*/
</script>
</body>
</html>